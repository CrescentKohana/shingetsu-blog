import type { GetStaticProps } from "next"
import { useRouter } from "next/router"
import { getPlaiceholder } from "plaiceholder"

import Articles from "../components/Articles"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import Tags from "../components/Tags"
import { fetchApi } from "../lib/api"
import { filterItemsBasedOnLocale } from "../lib/helpers"
import { Label, i18n } from "../lib/localization"
import { getMedia } from "../lib/media"
import type { Article, Tag } from "../types"

interface BlogProps {
  articles: Article[]
  tags: Tag[]
}

const Blog = ({ articles, tags }: BlogProps) => {
  const router = useRouter()
  const seo = {
    metaTitle: "Blog",
    metaDescription: "Blog articles",
  }

  return (
    <Layout>
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1 style={{ marginBottom: 10 }}>
            Blog <span className="subtitle">{i18n(Label.FilterTags, router.locale)}</span>
          </h1>

          <Tags tags={tags} links />
          {articles.length > 0 && <Articles articles={articles} />}
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [articlesEnRes, articlesJaRes, tagsRes] = await Promise.all([
    fetchApi("/articles?populate=*&locale=en"),
    fetchApi("/articles?populate=*&locale=ja"),
    fetchApi("/tags"),
  ])

  const articlesEnData = (articlesEnRes?.data ?? []) as Article[]
  const articlesJaData = (articlesJaRes?.data ?? []) as Article[]
  const tagsData = (tagsRes?.data ?? []) as Tag[]

  if (!articlesEnData && !articlesJaData) {
    return {
      props: { articles: [], tags: tagsData },
      revalidate: 10,
    }
  }

  const localeFilteredArticles = filterItemsBasedOnLocale([...articlesEnData, ...articlesJaData], locale) as Article[]
  const articlesWithPlaceholders = await Promise.all(
    localeFilteredArticles.map(async (article: Article) => {
      const { base64 } = await getPlaiceholder(getMedia(article.image))
      return {
        ...article,
        image: {
          ...article.image,
          placeholder: base64,
        },
      }
    }),
  )

  return {
    props: { articles: articlesWithPlaceholders, tags: tagsData },
    revalidate: 10,
  }
}

export default Blog
