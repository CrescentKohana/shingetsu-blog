import Layout from "../components/Layout"
import Seo from "../components/Seo"

const Custom404 = () => {
  const seo = {
    metaTitle: "404",
    metaDescription: "404 - Page not found",
  }

  return (
    <Layout>
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

export default Custom404
