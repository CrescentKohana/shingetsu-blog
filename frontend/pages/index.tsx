import { GetStaticProps } from "next"
import React from "react"
import Markdown from "react-markdown"
// TODO: Update rehype-raw and rehype-sanitize when TypeScript errors are fixed.
// https://github.com/remarkjs/react-markdown/issues/626
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import Typewriter from "../components/Typewriter"
import { fetchApi } from "../lib/api"
import { Homepage } from "../types"

interface HomeProps {
  homepage: Homepage
}

const Home = ({ homepage }: HomeProps) => {
  return (
    <Layout>
      <Seo seo={homepage.seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{homepage.title}</h1>
          <Typewriter strings={[homepage.selftyping]} delay={100} />
          <Markdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>{homepage.content}</Markdown>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const homepage = await fetchApi("/homepage")

  return {
    props: { homepage },
    revalidate: 1,
  }
}

export default Home
