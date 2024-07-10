import { MDXRemoteSerializeResult } from "next-mdx-remote"

// For MDX serialization
export type MDXSerialized = MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>

// Strapi specific
export interface StrapiResponse<Type> {
  data: StrapiData<Type> | StrapiData<Type>[]
  meta?: unknown
  error?: StrapiError
}

export interface StrapiData<Type> {
  id: number
  attributes: Type
}

export interface StrapiError {
  status: string
  name: string
  message: string
  details: unknown // TOOD
}

// Pages
export interface Home {
  title: string
  content: string | MDXSerialized
  selftyping: string
  seo: SeoData
}

export interface About {
  name: string
  subtitle?: string
  content: string | MDXSerialized
}

export interface Ecchi {
  name: string
  content: string | MDXSerialized
  lowerContent: string | MDXSerialized
  header: Media
  overlay: Media[]
  sliders: Slider[]
}

export enum SlideCategory {
  art = "art",
  doujinshi = "doujinshi",
  video = "video",
}

export interface Slider {
  id: number
  name: string
  category: SlideCategory
  horizontal: boolean
  media: Media[]
}

export enum ArticleVisibility {
  Showcased = "showcased",
  Standard = "standard",
  Hidden = "hidden",
}

export interface Article {
  slug: string
  i18nslug: string
  title: string
  description: string
  content: string | MDXSerialized
  published: string
  updated: string
  image: Media
  writer: Author
  visibility: ArticleVisibility
  locale: string
  tags: Tag[]
}

export interface Tag {
  id: number
  slug: string
  name: string
  articles: Article[]
}

export enum ProjectStatus {
  created,
  contributed,
  endorsed,
}

export interface Project {
  id: number
  slug: string
  i18nslug: string
  title: string
  description: string
  content: string
  url: string
  license: string
  status: ProjectStatus
  showcased: boolean
  image: Media
  tech: Tech
  publishedAt: string
  locale: string
}

// Components and other types
export interface Tech {
  id: number
  name: string
}

export interface FooterImage {
  id: number
  sort: number
  image: Media
  width?: string
  maxWidth?: string
}

interface Footer {
  text: string
  images: FooterImage[]
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
  avatar: Media
}

export enum MediaFormat {
  thumbnnail = "thumbnail",
  small = "small",
  medium = "medium",
  large = "large",
}

interface MediaFormatProps {
  url: string
  name: string
  caption: string
  width: number
  height: number
}

export interface Media {
  url: string
  name: string
  caption: string
  alternativeText: string
  width: number
  height: number
  formats: { [Property in MediaFormat]: MediaFormatProps }
  placeholder?: string
}

export interface SeoData {
  metaTitle: string
  metaDescription: string
  shareImage?: Media
  article?: boolean
}
