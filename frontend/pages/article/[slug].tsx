import { GetStaticPaths, GetStaticProps } from "next"
import { MDXRemote } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import { useRouter } from "next/router"
import rehypePrettyCode, { Options } from "rehype-pretty-code"
import ImageWrap from "../../components/ImageWrap"
import Layout from "../../components/Layout"
import Seo from "../../components/Seo"
import Tags from "../../components/Tags"
import { fetchApi } from "../../lib/api"
import { Label, Locale, countWords, i18n, i18nDateFormatter } from "../../lib/localization"
import styles from "../../styles/Article.module.css"
import { Article as ArticleData, MDXSerialized } from "../../types"

interface ArticleProps {
  article: ArticleData & { wordCount: number; readingTime: number }
}

const Article = ({ article }: ArticleProps) => {
  const router = useRouter()
  const dateFormatter = i18nDateFormatter(router.locale)

  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    shareImage: article.image,
    article: true,
  }
  const content = article.content as MDXSerialized

  return (
    <Layout>
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h2>{article.title}</h2>

          <Tags tags={article.tags} links />
          <hr className="uk-divider-small" />
          <MDXRemote {...content} />
          <hr className="uk-divider-icon" />
          <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
            <div style={{ width: 60 }}>
              {article.writer.avatar && <ImageWrap image={article.writer.avatar} className={styles.authorAvatar} />}
            </div>
            <div className="uk-width-expand">
              <p className="uk-margin-remove-bottom">{i18n(Label.By, router.locale, article.writer.name)}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p className="uk-text-meta uk-margin-remove-top">
                  {dateFormatter.format(new Date(article.published))}
                  {article.updated && (
                    <>
                      {` (${i18n(Label.Updated, router.locale, " ")} `}
                      {dateFormatter.format(new Date(article.updated))})
                    </>
                  )}
                </p>
                <div className="uk-text-meta uk-margin-remove-top">
                  <div>{i18n(Label.WordCount, router.locale, article.wordCount.toString())}</div>
                  <div>{i18n(Label.ReadingTime, router.locale, article.readingTime.toString())}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const [articlesEn, articlesJa] = await Promise.all([fetchApi("/articles?locale=en"), fetchApi("/articles?locale=ja")])

  if (!articlesEn.data && !articlesJa.data) {
    return {
      paths: [],
      fallback: "blocking",
    }
  }

  return {
    paths: [...articlesEn.data, ...articlesJa.data].map((article: ArticleData) => ({
      params: {
        slug: article.slug,
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

  let { data: articles } = await fetchApi(
    `/articles?filters[slug]=${params.slug}&populate[0]=image&populate[1]=tags&populate[2]=writer.avatar${locale ? `&locale=${locale}` : ""}`,
  )

  console.log("articles1", articles)

  if (!articles || articles.length === 0) {
    // Fallback to default locale.
    const { data: fallbackArticles } = await fetchApi(
      `/articles?filters[slug]=${params.slug}&populate[0]=image&populate[1]=tags&populate[2]=writer.avatar`,
    )

    if (!fallbackArticles || fallbackArticles.length === 0) {
      return {
        notFound: true,
      }
    }

    articles = fallbackArticles
  }

  // Options for pretty code.
  const options = {
    grid: true,
    keepBackground: false,
  } satisfies Options

  console.log("articles3", articles)
  const mdxSource = await serialize(articles[0].content, {
    mdxOptions: {
      rehypePlugins: [[rehypePrettyCode, options]],
    },
  })

  const { wordCount, readingTime } = countWords(articles[0].content, locale as Locale)

  return {
    props: { article: { ...articles[0], content: mdxSource, wordCount, readingTime } },
    revalidate: 10,
  }
}

export default Article
