import Link from "next/link"

import styles from "../styles/Card.module.css"
import type { Project } from "../types"
import ImageWrap from "./ImageWrap"

interface CardProps {
  project: Project
}

const ProjectCard = ({ project }: CardProps) => {
  return (
    <Link href={`${project.url}`} target="_blank" rel="noopener noreferrer" className="uk-link-reset">
      <div className="uk-card uk-card-muted uk-transition-toggle" tabIndex={0}>
        <div>
          <div className={`uk-card-badge ${project.relation}-badge`}>{project.relation}</div>
          <div className={`uk-card-badge ${styles.secondBadge} ${project.relation}-badge`}>{project.license}</div>
          <div className="uk-card-media-top">
            <ImageWrap className={styles.cardImg} image={project.image} />
          </div>
          <div className="uk-card-body">
            <p id="title" className="uk-text-large">
              {project.title}
            </p>

            <p>{project.description}</p>
          </div>
        </div>
        <div className="uk-transition-fade uk-position-cover uk-overlay uk-overlay-primary uk-flex uk-flex-center uk-flex-middle">
          <p className="uk-margin-remove">{project.content}</p>
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard
