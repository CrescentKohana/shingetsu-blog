import { GetStaticProps } from "next"
import { MDXRemote } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import { fetchApi } from "../lib/api"
import { About as AboutData, MDXSerialized } from "../types"

interface AboutProps {
  about: AboutData
}

const About = ({ about }: AboutProps) => {
  const seo = {
    metaTitle: about.name,
    metaDescription: "A short introduction",
  }
  const content = about.content as MDXSerialized

  return (
    <Layout>
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1 style={{ marginBottom: 0 }}>{about.name}</h1>
          {about.subtitle && <h3 style={{ margin: "0 0 0 3px" }}>{about.subtitle}</h3>}
          <hr className="uk-divider-icon" />
          <MDXRemote {...content} />
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const about = await fetchApi(`/about${locale ? `?locale=${locale}` : ""}`)

  if (!about) {
    return {
      notFound: true,
    }
  }

  const mdxSource = await serialize(about.content)

  return {
    props: { about: { ...about, content: mdxSource } },
    revalidate: 10,
  }
}

export default About
