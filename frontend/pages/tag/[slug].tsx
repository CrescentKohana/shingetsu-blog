import type { GetStaticPaths, GetStaticProps } from "next"

import Articles from "../../components/Articles"
import Layout from "../../components/Layout"
import Seo from "../../components/Seo"
import Tags from "../../components/Tags"
import { fetchApi } from "../../lib/api"
import { filterItemsBasedOnLocale } from "../../lib/helpers"
import type { Article, Tag, Tag as TagData } from "../../types"

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
  const res = await fetchApi("/tags")

  const data = (res?.data ?? []) as TagData[]

  if (!data) {
    return {
      paths: [],
      fallback: "blocking",
    }
  }

  return {
    paths: data.map((tag: TagData) => ({
      params: {
        slug: tag.slug,
      },
    })),
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  if (!params || Array.isArray(params.slug) || !params.slug) {
    return {
      notFound: true,
    }
  }

  const [tagsRes, allTagsRes] = await Promise.all([
    fetchApi(`/tags?filters[slug]=${params.slug}&populate[0]=articles&populate[1]=articles.image`),
    fetchApi("/tags"),
  ])

  const tagsData = (tagsRes?.data ?? []) as TagData[]
  const allTagsData = (allTagsRes?.data ?? []) as TagData[]

  if (!tagsData || tagsData.length === 0) {
    return {
      notFound: true,
    }
  }

  const localeFilteredArticles = filterItemsBasedOnLocale(tagsData[0].articles, locale) as Article[]
  tagsData[0].articles = localeFilteredArticles

  return {
    props: { tag: tagsData[0], tags: allTagsData },
    revalidate: 10,
  }
}

export default Tag
