import { GetStaticProps } from "next"
import ReactMarkdown from "react-markdown"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import { fetchApi } from "../lib/api"
import { About as AboutData, Category } from "../types"

interface AboutProps {
  about: AboutData
  categories: Category[]
}

const About = ({ about, categories }: AboutProps) => {
  const seo = {
    metaTitle: about.name,
    metaDescription: `A short introduction`,
  }

  return (
    <Layout categories={categories}>
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{about.name}</h1>
          <ReactMarkdown skipHtml={false}>{about.content}</ReactMarkdown>
          <hr className="uk-divider-icon" />
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const [categories, about] = await Promise.all([fetchApi("/categories"), fetchApi("/about")])

  return {
    props: { categories, about },
    revalidate: 1,
  }
}

export default About
