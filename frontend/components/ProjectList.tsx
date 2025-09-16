import type { Project } from "../types"
import ProjectCard from "./ProjectCard"

interface ProjectListProps {
  projects: Project[]
  even?: boolean
}

const ProjectList = ({ projects, even }: ProjectListProps) => {
  const orderedProjects = projects.sort(
    (a, b) => Date.parse(b.publishedAt || b.publishedAt) - Date.parse(a.publishedAt || a.publishedAt),
  )

  if (even) {
    return (
      <div>
        <div>
          <div className="uk-child-width-1-3@m uk-grid-match" data-uk-grid>
            {orderedProjects.map((project) => {
              return <ProjectCard project={project} key={`project__left__${project.slug}`} />
            })}
          </div>
        </div>
      </div>
    )
  }

  const showcasedProjects = projects.filter((project) => project.showcased)
  const otherProjects = projects.filter((project) => !project.showcased)

  return (
    <div>
      <div className="uk-child-width-1-2@s" data-uk-grid>
        <div>
          {showcasedProjects.map((project) => {
            return <ProjectCard project={project} key={`project__left__${project.slug}`} />
          })}
        </div>
        <div>
          <div className="uk-child-width-1-2@m uk-grid-match" data-uk-grid>
            {otherProjects.map((project) => {
              return <ProjectCard project={project} key={`project__left__${project.slug}`} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectList
