import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import ProjectList from "../components/ProjectList"
import Seo from "../components/Seo"
import { fetchApi } from "../lib/api"
import { Project } from "../types"

interface ProjectsProps {
  projects: Project[]
}

const Projects = ({ projects }: ProjectsProps) => {
  const seo = {
    metaTitle: "Projects",
    metaDescription: "Code projects and repositories",
  }

  return (
    <Layout>
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>Projects</h1>
          <ProjectList projects={projects} />
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const projects = await fetchApi("/projects")

  return {
    props: { projects },
    revalidate: 1,
  }
}

export default Projects
