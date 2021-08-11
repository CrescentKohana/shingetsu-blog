// Pages

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

// Components and other types

interface Footer {
  text: string
  image: Media
  imgWidth: number
  imgHeight: number
}

export interface Global {
  defaultSeo?: SeoData
  siteName?: string
  author?: string
  footer?: Footer
  favicon?: Media
}

export interface Author {
  name: string
  picture: Media
}

export interface Media {
  url: string
  name: string
  alternativeText: string
  width?: number
  height?: number
}

export interface SeoData {
  metaTitle: string
  metaDescription: string
  shareImage?: Media
  article?: boolean
}