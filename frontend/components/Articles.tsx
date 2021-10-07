import React from "react"
import { Article } from "../types"
import ArticleCard from "./ArticleCard"

interface ArticlesProps {
  articles: Article[]
  even?: boolean
}

const Articles = ({ articles, even }: ArticlesProps) => {
  const orderedArticles = articles.sort(
    (a: Article, b: Article) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)
  )

  if (even) {
    return (
      <div>
        <div>
          <div className="uk-child-width-1-3@m uk-grid-match" data-uk-grid>
            {orderedArticles.map((article) => {
              return <ArticleCard article={article} key={`article__left__${article.slug}`} />
            })}
          </div>
        </div>
      </div>
    )
  }

  const showcasedArticles = orderedArticles.filter((article) => article.showcased)
  const otherArticles = orderedArticles.filter((article) => !article.showcased)

  return (
    <div>
      <div className="uk-child-width-1-2@s" data-uk-grid>
        <div>
          {showcasedArticles.map((article) => {
            return <ArticleCard article={article} key={`article__left__${article.slug}`} />
          })}
        </div>
        <div>
          <div className="uk-child-width-1-2@m uk-grid-match" data-uk-grid>
            {otherArticles.map((article) => {
              return <ArticleCard article={article} key={`article__left__${article.slug}`} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Articles
