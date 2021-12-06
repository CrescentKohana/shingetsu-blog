import { useRouter } from "next/router"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

const Custom404 = () => {
  const router = useRouter()
  const description = router.locale === "ja" ? "ページが見つからない" : "Page not found"

  const seo = {
    metaTitle: "404",
    metaDescription: description,
  }

  return (
    <Layout>
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h2>404・{description}</h2>
          <hr className="uk-divider-icon" />
        </div>
      </div>
    </Layout>
  )
}

export default Custom404
