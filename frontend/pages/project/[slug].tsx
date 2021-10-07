import { GetStaticPaths, GetStaticProps } from "next"
import Link from "next/link"
import React from "react"
import Layout from "../../components/Layout"
import Seo from "../../components/Seo"
import { fetchApi } from "../../lib/api"
import { Project as ProjectData } from "../../types"

interface ProjectProps {
  project: ProjectData
}

const Project = ({ project }: ProjectProps) => {
  const seo = {
    metaTitle: project.title,
    metaDescription: project.description,
    shareImage: project.image,
  }

  return (
    <Layout>
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h2>
            {project.title} <span className="subtitle">{project.license} licensed</span>
          </h2>
          <hr className="uk-divider-small" />
          Source:{" "}
          <Link as={`${project.url}`} href={`${project.url}`}>
            <a className="uk-link-reset">{project.url}</a>
          </Link>
          <p>{project.description}</p>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await fetchApi("/projects")

  return {
    paths: projects.map((project: ProjectData) => ({
      params: {
        slug: project.slug,
      },
    })),
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    }
  }

  const projects = await fetchApi(`/projects?slug=${params.slug}`)

  if (projects.length === 0) {
    return {
      notFound: true,
    }
  }

  return {
    props: { project: projects[0] },
    revalidate: 1,
  }
}

export default Project
