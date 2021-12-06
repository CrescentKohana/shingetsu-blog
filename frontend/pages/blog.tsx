import { GetStaticProps } from "next"
import { getPlaiceholder } from "plaiceholder"
import React, { useEffect, useState } from "react"
import Articles from "../components/Articles"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import Tags from "../components/Tags"
import { fetchApi } from "../lib/api"
import { getMedia } from "../lib/media"
import { Article, Tag } from "../types"

interface BlogProps {
  articles: Article[]
  tags: Tag[]
}

const Blog = ({ articles, tags }: BlogProps) => {
  const seo = {
    metaTitle: "Blog",
    metaDescription: "Blog articles",
  }

  const [currentTags, setCurrenTags] = useState<string[]>([])
  const [currentArticles, setCurrentArticles] = useState(articles)

  const filterByTag = (tag: Tag, add: boolean) => {
    if (add) {
      setCurrenTags([...currentTags, tag.slug])
    } else {
      setCurrenTags(currentTags.filter((slug) => slug !== tag.slug))
    }
  }

  useEffect(() => {
    if (currentTags.length === 0) {
      setCurrentArticles(articles)
      return
    }

    const matchingArticles: Article[] = []
    articles.forEach((article) => {
      if (article.tags.some((tag) => currentTags.includes(tag.slug))) {
        matchingArticles.push(article)
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
    articles.map(async (article: Article) => {
      const { base64 } = await getPlaiceholder(getMedia(article.image))
      return {
        ...article,
        image: {
          ...article.image,
          placeholder: base64,
        },
      }
    })
  )

  return {
    props: { articles: articlesWithPlaceholders, tags: tags },
    revalidate: 1,
  }
}

export default Blog
