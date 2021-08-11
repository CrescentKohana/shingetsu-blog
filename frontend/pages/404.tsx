import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import { fetchApi } from "../lib/api"
import { Category } from "../types/page"

interface Custom404Props {
  categories: Category[]
}

const Custom404 = ({ categories }: Custom404Props) => {
  const seo = {
    metaTitle: "404",
    metaDescription: "404 - Page not found",
  }

  return (
    <Layout categories={categories}>
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>404 - Page not found</h1>
          <hr className="uk-divider-icon" />
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const [categories] = await Promise.all([fetchApi("/categories")])

  return {
    props: { categories },
    revalidate: 1,
  }
}

export default Custom404
