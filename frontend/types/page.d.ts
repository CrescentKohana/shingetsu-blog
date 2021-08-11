import { SeoData } from "./data"

enum ArticleStatuses {
  draft,
  published,
}

export interface Homepage {
  title: string
  content: string
  selftyping: string
  seo: SeoData
}

export interface About {
  name: string
  content: string
}

export interface Category {
  id: number
  name: string
  slug: string
  articles: Article[]
}

export interface Article {
  title: string
  description: string
  content: string
  publishedAt: string
  status: ArticleStatuses
  slug: string
  category: Category
  image: Media
  author: Author
  showcased: boolean
}
