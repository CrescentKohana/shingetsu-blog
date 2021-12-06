import Link from "next/link"
import React, { useState } from "react"
import { Tag } from "../types"

interface TagsProps {
  tags: Tag[]
  links?: boolean
  onClick?: (tag: Tag, add: boolean) => void
}

const Tags = ({ tags, links, onClick }: TagsProps) => {
  const [tagsState, setTagsState] = useState<number[]>([])

  // Basic links without fancy filtering.
  if (!onClick) {
    return (
      <div>
        {tags.map((tag) => {
          return links ? (
            <Link key={tag.id} as={`/tag/${tag.slug}`} href="/tag/[slug]" passHref>
              <a className="uk-badge">{tag.name}</a>
            </Link>
          ) : (
            <span key={tag.id} className="uk-badge">
              {tag.name}
            </span>
          )
        })}
      </div>
    )
  }

  const tagHelper = (tag: Tag) => {
    if (tagsState.some((id: number) => id === tag.id)) {
      setTagsState(tagsState.filter((id) => id !== tag.id))
      onClick(tag, false)
    } else {
      setTagsState([...tagsState, tag.id])
      onClick(tag, true)
    }
  }

  return (
    <div>
      {tags.map((tag) => {
        return (
          <a key={tag.id} onClick={() => tagHelper(tag)} uk-toggle={`target: #tag-${tag.id}; cls: toggled-badge`}>
            <div className={`uk-badge #tag-${tag.id}`}>{tag.name}</div>
          </a>
        )
      })}
    </div>
  )
}

export default Tags
