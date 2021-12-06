import { GetStaticPaths, GetStaticProps } from "next"
import Articles from "../../components/Articles"
import Layout from "../../components/Layout"
import Seo from "../../components/Seo"
import { fetchApi } from "../../lib/api"
import { Tag, Tag as TagData } from "../../types"

interface TagProps {
  tag: TagData
}

const Tag = ({ tag }: TagProps) => {
  const seo = {
    metaTitle: `${tag.name} tag`,
    metaDescription: `All ${tag.name} tagged articles`,
  }

  return (
    <Layout>
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

  if (!tags) {
    return {
      paths: [],
      fallback: false,
    }
  }

  return {
    paths: tags.map((tag: Tag) => ({
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

  const tags = await fetchApi(`/tags?filters[slug]=${params.slug}&populate=articles,articles.image`)
  if (!tags || tags.length === 0) {
    return {
      notFound: true,
    }
  }

  return {
    props: { tag: tags[0] },
    revalidate: 1,
  }
}

export default Tag
