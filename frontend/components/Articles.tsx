import React from "react"
import { Article } from "../types"
import Card from "./Card"

interface ArticlesProps {
  articles: Article[]
}

const Articles = ({ articles }: ArticlesProps) => {
  const orderedArticles = articles.sort(
    (a: Article, b: Article) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)
  )
  const showcaseArticles = orderedArticles.filter((article) => article.showcased)
  const otherArticles = orderedArticles.filter((article) => !article.showcased)

  return (
    <div>
      <div className="uk-child-width-1-2@s" data-uk-grid>
        <div>
          {showcaseArticles.map((article) => {
            return <Card article={article} key={`article__left__${article.slug}`} />
          })}
        </div>
        <div>
          <div className="uk-child-width-1-2@m uk-grid-match" data-uk-grid>
            {otherArticles.map((article) => {
              return <Card article={article} key={`article__left__${article.slug}`} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Articles
