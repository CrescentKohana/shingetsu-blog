import { GetStaticProps } from "next"
import { getPlaiceholder } from "plaiceholder"
import Articles from "../components/Articles"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import Tags from "../components/Tags"
import { fetchApi } from "../lib/api"
import { getMedia } from "../lib/media"
import { Article, Tag } from "../types"

interface BlogProps {
  articles: Article[]
  tags: Tag[]
}

const Blog = ({ articles, tags }: BlogProps) => {
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
            Blog <span className="subtitle">Filter tags below</span>
          </h1>

          <Tags tags={tags} links />
          {articles.length > 0 && <Articles articles={articles} />}
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const [articles, tags] = await Promise.all([fetchApi("/articles?populate=*"), fetchApi("/tags")])

  if (!articles) {
    return {
      props: { articles: [], tags: tags ? tags : [] },
      revalidate: 10,
    }
  }

  const articlesWithPlaceholders = await Promise.all(
    articles.map(async (article: Article) => {
      const { base64 } = await getPlaiceholder(getMedia(article.image))
      return {
        ...article,
        image: {
          ...article.image,
          placeholder: base64,
        },
      }
    })
  )

  return {
    props: { articles: articlesWithPlaceholders, tags: tags ? tags : [] },
    revalidate: 10,
  }
}

export default Blog
