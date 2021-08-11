import { GetStaticPaths, GetStaticProps } from "next"
import Markdown from "react-markdown"
import Moment from "react-moment"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import ImageWrap from "../../components/ImageWrap"
import Layout from "../../components/Layout"
import Seo from "../../components/Seo"
import { fetchApi } from "../../lib/api"
import styles from "../../styles/Article.module.css"
import { Article as ArticleData, Category } from "../../types/page"

interface ArticleProps {
  article: ArticleData
  categories: Category[]
}

const Article = ({ article, categories }: ArticleProps) => {
  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    shareImage: article.image,
    article: true,
  }

  return (
    <Layout categories={categories}>
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h2>{article.title}</h2>
          <hr className="uk-divider-small" />
          <Markdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>{article.content}</Markdown>
          <hr className="uk-divider-icon" />
          <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
            <div style={{ width: 60 }}>
              {article.author.picture && <ImageWrap image={article.author.picture} className={styles.authorAvatar} />}
            </div>
            <div className="uk-width-expand">
              <p className="uk-margin-remove-bottom">By {article.author.name}</p>
              <p className="uk-text-meta uk-margin-remove-top">
                <Moment format="MMM Do YYYY">{article.publishedAt}</Moment>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await fetchApi("/articles")

  return {
    paths: articles.map((article: ArticleData) => ({
      params: {
        slug: article.slug,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    }
  }

  const [articles, categories] = await Promise.all([
    fetchApi(`/articles?slug=${params.slug}&status=published`),
    fetchApi("/categories"),
  ])

  return {
    props: { article: articles[0], categories },
    revalidate: 1,
  }
}

export default Article
