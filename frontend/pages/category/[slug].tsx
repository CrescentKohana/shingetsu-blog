import { GetStaticPaths, GetStaticProps } from "next"
import Articles from "../../components/Articles"
import Layout from "../../components/Layout"
import Seo from "../../components/Seo"
import { fetchApi } from "../../lib/api"
import { Category as CategoryData } from "../../types"

interface CategoryProps {
  category: CategoryData
  categories: CategoryData[]
}

const Category = ({ category, categories }: CategoryProps) => {
  const seo = {
    metaTitle: category.name,
    metaDescription: `All ${category.name} articles`,
  }

  return (
    <Layout categories={categories}>
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{category.name}</h1>
          <Articles articles={category.articles} />
        </div>
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await fetchApi("/categories")

  return {
    paths: categories.map((category: CategoryData) => ({
      params: {
        slug: category.slug,
      },
    })),
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categories = await fetchApi("/categories")
  const category = categories.filter((category: CategoryData) => category.slug === params?.slug)[0]

  if (!category) {
    return {
      notFound: true,
    }
  }

  return {
    props: { categories, category },
    revalidate: 1,
  }
}

export default Category
