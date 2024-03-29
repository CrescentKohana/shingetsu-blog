import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import Moment from "react-moment"
import { Label, Locale, i18n } from "../lib/localization"
import englishSvg from "../public/icons/en.svg"
import japaneseSvg from "../public/icons/ja.svg"
import styles from "../styles/Card.module.css"
import { Article } from "../types"
import ImageWrap from "./ImageWrap"
import Tags from "./Tags"

interface CardProps {
  article: Article
}

const ArticleCard = ({ article }: CardProps) => {
  const router = useRouter()
  let flag: JSX.Element | null
  if (article.locale === Locale.EN) {
    flag = <Image alt="English" src={englishSvg} height={40} width={40} priority />
  } else if (article.locale === Locale.JA) {
    flag = <Image alt="Japanese" src={japaneseSvg} height={40} width={40} priority />
  } else {
    flag = null
  }

  return (
    <Link href={`/article/${article.i18nslug}`} className="uk-link-reset">
      <div className="uk-card uk-card-muted">
        <div className="flag-badge">{flag}</div>
        <div className="uk-card-media-top">
          <ImageWrap className={styles.cardImg} image={article.image} />
        </div>
        <div className="uk-card-body">
          <p id="title" className="uk-text-large">
            {article.title}
          </p>
          <div className="uk-text-meta">
            <Moment format={i18n(Label.LongDate, router.locale)} locale={router.locale}>
              {article.updated || article.published}
            </Moment>
          </div>
          {article.tags && (
            <div style={{ marginTop: 5 }}>
              <Tags tags={article.tags} />
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ArticleCard
