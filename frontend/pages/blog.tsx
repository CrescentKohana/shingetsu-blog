import { GetStaticProps } from "next"
import { useEffect, useState } from "react"
import Articles from "../components/Articles"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import Tags from "../components/Tags"
import { fetchApi } from "../lib/api"
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
    articles.forEach((article: Article) => {
      if (article.tags.some((tag: Tag) => currentTags.includes(tag.slug))) {
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
          <Articles articles={currentArticles} />
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const [articles, tags] = await Promise.all([fetchApi("/articles"), fetchApi("/tags")])

  return {
    props: { articles, tags },
    revalidate: 1,
  }
}

export default Blog
