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
          <div className="uk-card-media-top">
            <ImageWrap className={styles.cardImg} image={project.image} />
          </div>
          <div className="uk-card-body">
            <p id="title" className="uk-text-large">
              {project.title}{" "}
              <span className={`uk-badge ${project.status}-badge`} style={{ marginBottom: 2 }}>
                {project.status}
              </span>
            </p>

            <p className="uk-margin-remove-top">{project.description}</p>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ProjectCard
