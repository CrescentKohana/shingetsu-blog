import { GetStaticProps } from "next"
import { getPlaiceholder } from "plaiceholder"
import Layout from "../components/Layout"
import ProjectList from "../components/ProjectList"
import Seo from "../components/Seo"
import { fetchApi } from "../lib/api"
import { getMedia } from "../lib/media"
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
          {projects.length > 0 && <ProjectList projects={projects} />}
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const projects = await fetchApi("/projects?populate=image,tech")

  if (!projects) {
    return {
      props: { projects: [] },
      revalidate: 10,
    }
  }

  const projectsWithPlaceholders = await Promise.all(
    projects.map(async (project: Project) => {
      const { base64 } = await getPlaiceholder(getMedia(project.image))
      return {
        ...project,
        image: {
          ...project.image,
          placeholder: base64,
        },
      }
    })
  )

  return {
    props: { projects: projectsWithPlaceholders },
    revalidate: 10,
  }
}

export default Projects
