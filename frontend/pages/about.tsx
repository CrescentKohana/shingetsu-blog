import { GetStaticProps } from "next"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
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
          <hr className="uk-divider-icon" />
          <Markdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>{about.content}</Markdown>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const about = await fetchApi(`/about?locale=${locale}`)

  if (!about) {
    return {
      notFound: true,
    }
  }

  return {
    props: { about: about },
    revalidate: 10,
  }
}

export default About
