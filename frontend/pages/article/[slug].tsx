import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import Markdown from "react-markdown"
import Moment from "react-moment"
import rehypeRaw from "rehype-raw"
import ImageWrap from "../../components/ImageWrap"
import Layout from "../../components/Layout"
import Seo from "../../components/Seo"
import Tags from "../../components/Tags"
import { fetchApi } from "../../lib/api"
import { Label, i18n } from "../../lib/localization"
import styles from "../../styles/Article.module.css"
import { Article as ArticleData } from "../../types"

interface ArticleProps {
  article: ArticleData
}

const Article = ({ article }: ArticleProps) => {
  const router = useRouter()
  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    shareImage: article.image,
    article: true,
  }

  return (
    <Layout>
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h2>{article.title}</h2>
          <Tags tags={article.tags} links />
          <hr className="uk-divider-small" />
          <Markdown rehypePlugins={[rehypeRaw]}>{article.content}</Markdown>
          <hr className="uk-divider-icon" />
          <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
            <div style={{ width: 60 }}>
              {article.writer.avatar && <ImageWrap image={article.writer.avatar} className={styles.authorAvatar} />}
            </div>
            <div className="uk-width-expand">
              <p className="uk-margin-remove-bottom">
                {i18n(Label.By, router.locale)} {article.writer.name}
              </p>
              <p className="uk-text-meta uk-margin-remove-top">
                <Moment format={i18n(Label.LongDate, router.locale)} locale={router.locale}>
                  {article.published}
                </Moment>
                {article.updated && (
                  <>
                    {` (${i18n(Label.Updated, router.locale)} `}
                    <Moment format={i18n(Label.LongDate, router.locale)} locale={router.locale}>
                      {article.updated}
                    </Moment>
                    )
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await fetchApi("/articles?locale=all")

  if (!articles) {
    return {
      paths: [],
      fallback: false,
    }
  }

  return {
    paths: articles.map((article: ArticleData) => ({
      params: {
        slug: article.i18nslug,
      },
    })),
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  if (!params) {
    return {
      notFound: true,
    }
  }

  let articles = await fetchApi(
    `/articles?filters[i18nslug]=${params.slug}&populate=image,tags,writer.avatar${locale ? `&locale=${locale}` : ""}`,
  )

  if (!articles || articles.length === 0) {
    // Fallback to default locale.
    articles = await fetchApi(`/articles?filters[i18nslug]=${params.slug}&populate=image,tags,writer.avatar`)
    if (!articles || articles.length === 0) {
      return {
        notFound: true,
      }
    }
  }

  return {
    props: { article: articles[0] },
    revalidate: 10,
  }
}

export default Article
