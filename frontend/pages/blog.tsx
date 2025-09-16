import { GetStaticProps } from "next"
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
import { Article, Tag } from "../types"

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
  const [articlesEn, articlesJa, tags] = await Promise.all([
    fetchApi("/articles?populate=*&locale=en"),
    fetchApi("/articles?populate=*&locale=ja"),
    fetchApi("/tags"),
  ])

  if (!articlesEn.data && !articlesJa.data) {
    return {
      props: { articles: [], tags: tags.data ? tags.data : [] },
      revalidate: 10,
    }
  }

  const localeFilteredArticles = filterItemsBasedOnLocale([...articlesEn.data, ...articlesJa.data], locale) as Article[]
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
    props: { articles: articlesWithPlaceholders, tags: tags.data ? tags.data : [] },
    revalidate: 10,
  }
}

export default Blog
