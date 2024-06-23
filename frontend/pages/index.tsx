import { GetStaticProps } from "next"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import Typewriter from "../components/Typewriter"
import { fetchApi } from "../lib/api"
import { type Home } from "../types"

interface HomeProps {
  home: Home
}

const Home = ({ home }: HomeProps) => {
  return (
    <Layout landing>
      <Seo seo={home.seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{home.title}</h1>
          <Typewriter strings={[home.selftyping]} delay={100} />
          <Markdown rehypePlugins={[rehypeRaw]}>{home.content}</Markdown>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const home = await fetchApi(`/home?populate=seo.shareImage${locale ? `&locale=${locale}` : ""}`)

  return {
    props: { home },
    revalidate: 10,
  }
}

export default Home
