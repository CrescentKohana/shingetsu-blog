import Link from "next/link"
import Moment from "react-moment"
import styles from "../styles/Card.module.css"
import { Article } from "../types"
import ImageWrap from "./ImageWrap"
import Tags from "./Tags"

interface CardProps {
  article: Article
}

const ArticleCard = ({ article }: CardProps) => {
  return (
    <Link href={`/article/${article.slug}`}>
      <a className="uk-link-reset">
        <div className="uk-card uk-card-muted">
          <div className="uk-card-media-top">
            <ImageWrap className={styles.cardImg} image={article.image} />
          </div>
          <div className="uk-card-body">
            <p id="title" className="uk-text-large">
              {article.title}
            </p>
            <div className="uk-text-meta">
              <Moment format="MMM Do YYYY">{article.updated || article.published}</Moment>
            </div>
            {article.tags && (
              <div style={{ marginTop: 5 }}>
                <Tags tags={article.tags} />
              </div>
            )}
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ArticleCard
