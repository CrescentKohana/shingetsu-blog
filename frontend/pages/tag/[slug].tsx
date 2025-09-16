import { GetStaticPaths, GetStaticProps } from "next"
import Articles from "../../components/Articles"
import Layout from "../../components/Layout"
import Seo from "../../components/Seo"
import Tags from "../../components/Tags"
import { fetchApi } from "../../lib/api"
import { filterItemsBasedOnLocale } from "../../lib/helpers"
import { Article, Tag as TagData, type Tag } from "../../types"

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

  if (!tags.data) {
    return {
      paths: [],
      fallback: "blocking",
    }
  }

  return {
    paths: tags.data.map((tag: TagData) => ({
      params: {
        slug: tag.slug,
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

  const [tags, allTags] = await Promise.all([
    fetchApi(`/tags?filters[slug]=${params.slug}&populate[0]=articles&populate[1]=articles.image`),
    fetchApi("/tags"),
  ])

  if (!tags.data || tags.data.length === 0) {
    return {
      notFound: true,
    }
  }

  const localeFilteredArticles = filterItemsBasedOnLocale((tags.data[0] as Tag).articles, locale) as Article[]
  tags.data[0].articles = localeFilteredArticles

  return {
    props: { tag: tags.data[0], tags: allTags.data },
    revalidate: 10,
  }
}

export default Tag
