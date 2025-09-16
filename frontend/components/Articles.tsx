import { Article, ArticleVisibility } from "../types"
import ArticleCard from "./ArticleCard"

interface ArticlesProps {
  articles: Article[]
  even?: boolean
}

const Articles = ({ articles, even }: ArticlesProps) => {
  const orderedArticles = articles.sort(
    (a, b) => Date.parse(b.updated || b.published) - Date.parse(a.updated || a.published),
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

  const showcasedArticles = orderedArticles.filter((article) => article.visibility === ArticleVisibility.Showcased)
  const otherArticles = orderedArticles.filter((article) => article.visibility === ArticleVisibility.Standard)

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
