import { GetStaticProps } from "next"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import Typewriter from "../components/Typewriter"
import { fetchApi } from "../lib/api"
import { Home } from "../types"

interface HomeProps {
  home: Home
}

const Home = ({ home }: HomeProps) => {
  return (
    <Layout>
      <Seo seo={home.seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{home.title}</h1>
          <Typewriter strings={[home.selftyping]} delay={100} />
          <Markdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>{home.content}</Markdown>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const home = await fetchApi(`/home?locale=${locale}&populate=*`)

  return {
    props: { home },
    revalidate: 1,
  }
}

export default Home
