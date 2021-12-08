import Link from "next/link"
import { Tag } from "../types"

interface TagsProps {
  tags: Tag[]
  links?: boolean
  all?: boolean
  highlighted?: number
}

const Tags = ({ tags, links, all, highlighted }: TagsProps) => {
  return (
    <div>
      {tags.map((tag) => {
        return links ? (
          <Link key={tag.id} href={`/tag/${tag.slug}`}>
            <a className={`uk-badge ${highlighted === tag.id ? "highlighted-badge" : ""}`}>{tag.name}</a>
          </Link>
        ) : (
          <span key={tag.id} className="uk-badge">
            {tag.name}
          </span>
        )
      })}
      {all && (
        <Link href="/blog">
          <a className="uk-badge">all</a>
        </Link>
      )}
    </div>
  )
}

export default Tags
