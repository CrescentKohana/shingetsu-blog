import React from "react"
import { Tag } from "../types"

interface TagsProps {
  tags: Tag[]
}

const Tags = ({ tags }: TagsProps) => {
  return (
    <div>
      {tags.map((tag: Tag) => {
        return (
          <span key={tag.id} className="uk-badge">
            {tag.name}
          </span>
        )
      })}
    </div>
  )
}

export default Tags
