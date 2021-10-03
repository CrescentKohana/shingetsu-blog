import Link from "next/link"
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
          <Link key={tag.id} as={`/tag/${tag.slug}`} href="/tag/[slug]" passHref>
            <a className="uk-badge">{tag.name}</a>
          </Link>
        )
      })}
    </div>
  )
}

export default Tags
