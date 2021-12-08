import { GetStaticPaths, GetStaticProps } from "next"
import Articles from "../../components/Articles"
import Layout from "../../components/Layout"
import Seo from "../../components/Seo"
import Tags from "../../components/Tags"
import { fetchApi } from "../../lib/api"
import { Tag as TagData } from "../../types"

interface TagProps {
  tag: TagData
  tags: TagData[]
}

const Tag = ({ tag, tags }: TagProps) => {
  const seo = {
    metaTitle: `${tag.name} tag`,
    metaDescription: `All articles tagged as ${tag.name}`,
  }

  return (
    <Layout>
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1 style={{ marginBottom: 10 }}>
            {tag.name} <span className="subtitle">tag</span>
          </h1>
          <Tags tags={tags} links all highlighted={tag.id} />

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

  // const tags = await fetchApi(`/tags?filters[slug]=${params.slug}&populate=articles,articles.image`)
  const [tags, allTags] = await Promise.all([
    fetchApi(`/tags?filters[slug]=${params.slug}&populate=articles,articles.image`),
    fetchApi("/tags?filters"),
  ])
  if (!tags || tags.length === 0) {
    return {
      notFound: true,
    }
  }

  return {
    props: { tag: tags[0], tags: allTags },
    revalidate: 1,
  }
}

export default Tag
