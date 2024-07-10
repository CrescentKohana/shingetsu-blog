import { GetStaticProps } from "next"
import { MDXRemote } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import rehypeRaw from "rehype-raw"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import Typewriter from "../components/Typewriter"
import { fetchApi } from "../lib/api"
import { MDXSerialized, type Home } from "../types"

interface HomeProps {
  home: Home
}

const Home = ({ home }: HomeProps) => {
  const content = home.content as MDXSerialized

  return (
    <Layout landing>
      <Seo seo={home.seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{home.title}</h1>
          <Typewriter strings={[home.selftyping]} delay={100} />
          <MDXRemote {...content} />
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const home = await fetchApi(`/home?populate=seo.shareImage${locale ? `&locale=${locale}` : ""}`)

  const mdxSource = await serialize(home.content, {
    mdxOptions: {
      rehypePlugins: [rehypeRaw],
      format: "mdx",
    },
  })

  return {
    props: { home: { ...home, content: mdxSource } },
    revalidate: 10,
  }
}

export default Home
