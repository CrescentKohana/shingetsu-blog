import Link from "next/link"
import React from "react"
import styles from "../styles/Card.module.css"
import { Project } from "../types"
import ImageWrap from "./ImageWrap"

interface CardProps {
  project: Project
}

const ProjectCard = ({ project }: CardProps) => {
  return (
    <Link as={`/project/${project.slug}`} href="/project/[slug]">
      <a className="uk-link-reset">
        <div className="uk-card uk-card-muted">
          <div className={`uk-card-badge ${project.status}-badge`}>{project.status}</div>
          <div className="uk-card-media-top">
            <ImageWrap className={styles.cardImg} image={project.image} priority />
          </div>
          <div className="uk-card-body">
            <p id="title" className="uk-text-large">
              {project.title}
            </p>

            <p className="uk-margin-remove-top">{project.description}</p>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ProjectCard
