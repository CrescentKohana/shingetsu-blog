import Link from "next/link"
import React from "react"
import Moment from "react-moment"
import styles from "../styles/Card.module.css"
import { Article } from "../types"
import ImageWrap from "./ImageWrap"
import Tags from "./Tags"

interface CardProps {
  article: Article
}

const Card = ({ article }: CardProps) => {
  return (
    <Link as={`/article/${article.slug}`} href="/article/[slug]">
      <a className="uk-link-reset">
        <div className="uk-card uk-card-muted">
          <div className="uk-card-media-top">
            <ImageWrap className={styles.articleImg} image={article.image} />
          </div>
          <div className="uk-card-body">
            <p id="title" className="uk-text-large">
              {article.title}
            </p>
            <p className="uk-text-meta uk-margin-remove-top">
              <Moment format="MMM Do YYYY">{article.publishedAt}</Moment>
              {article.tags && (
                <div style={{ marginTop: 10 }}>
                  <Tags tags={article.tags} />
                </div>
              )}
            </p>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default Card
