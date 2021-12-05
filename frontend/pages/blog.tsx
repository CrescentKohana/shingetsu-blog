import { GetStaticProps } from "next"
import { getPlaiceholder } from "plaiceholder"
import { useEffect, useState } from "react"
import Articles from "../components/Articles"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import Tags from "../components/Tags"
import { fetchApi } from "../lib/api"
import { getMedia } from "../lib/media"
import { Article, StrapiArr, StrapiData, Tag } from "../types"

interface BlogProps {
  articles: StrapiData<Article>[]
  tags: StrapiArr<Tag>
}

const Blog = ({ articles, tags }: BlogProps) => {
  const seo = {
    metaTitle: "Blog",
    metaDescription: "Blog articles",
  }

  const [currentTags, setCurrenTags] = useState<string[]>([])
  const [currentArticles, setCurrentArticles] = useState(articles.map((article) => article.attributes))

  const filterByTag = (tag: Tag, add: boolean) => {
    if (add) {
      setCurrenTags([...currentTags, tag.slug])
    } else {
      setCurrenTags(currentTags.filter((slug) => slug !== tag.slug))
    }
  }

  useEffect(() => {
    if (currentTags.length === 0) {
      setCurrentArticles(articles.map((article) => article.attributes))
      return
    }

    const matchingArticles: Article[] = []
    articles.forEach((article) => {
      if (article.attributes.tags.data.some((tag) => currentTags.includes(tag.attributes.slug))) {
        matchingArticles.push(article.attributes)
      }
    })

    setCurrentArticles(matchingArticles)
  }, [articles, currentTags])

  return (
    <Layout>
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>
            Blog <span className="subtitle">Filter tags below</span>
          </h1>

          <Tags tags={tags} onClick={filterByTag} />
          {articles.length > 0 && <Articles articles={currentArticles} />}
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const [articles, tags] = await Promise.all([fetchApi("/articles?populate=*"), fetchApi("/tags")])

  if (!articles) {
    return {
      props: { articles: [], tags: tags },
      revalidate: 1,
    }
  }

  const articlesWithPlaceholders = await Promise.all(
    (articles.data as StrapiData<Article>[]).map(async (article) => {
      const image = getMedia(false, (article.attributes as Article).image)
      const { base64 } = await getPlaiceholder(image.url)
      return {
        ...article,
        image: {
          ...image,
          placeholder: base64,
        },
      }
    })
  )

  return {
    props: { articles: articlesWithPlaceholders, tags },
    revalidate: 1,
  }
}

export default Blog
