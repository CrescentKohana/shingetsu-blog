import { GetStaticPaths, GetStaticProps } from "next"
import Articles from "../../components/Articles"
import Layout from "../../components/Layout"
import Seo from "../../components/Seo"
import { fetchApi } from "../../lib/api"
import { Category, Tag as TagData } from "../../types"

interface TagProps {
  tag: TagData
  categories: Category[]
}

const Tag = ({ tag, categories }: TagProps) => {
  const seo = {
    metaTitle: `${tag.name} tag`,
    metaDescription: `All ${tag.name} tagged articles`,
  }

  return (
    <Layout categories={categories}>
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h2>
            {tag.name} <span className="subtitle">tag</span>
          </h2>

          <Articles articles={tag.articles} even />
        </div>
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = await fetchApi("/tags")

  return {
    paths: tags.map((tag: TagData) => ({
      params: {
        slug: tag.slug,
      },
    })),
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    }
  }

  const [tags, categories] = await Promise.all([fetchApi(`/tags?slug=${params.slug}`), fetchApi("/categories")])

  return {
    props: { tag: tags[0], categories },
    revalidate: 1,
  }
}

export default Tag
