import { GetStaticProps } from "next"
import ReactMarkdown from "react-markdown"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import { fetchApi } from "../lib/api"
import { About as AboutData } from "../types"

interface AboutProps {
  about: AboutData
}

const About = ({ about }: AboutProps) => {
  const seo = {
    metaTitle: about.name,
    metaDescription: "A short introduction",
  }

  return (
    <Layout>
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
  const about = await fetchApi("/about")

  return {
    props: { about },
    revalidate: 1,
  }
}

export default About
