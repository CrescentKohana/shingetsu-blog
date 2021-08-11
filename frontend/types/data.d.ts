interface Footer {
  text: string
  image: Media
  imgWidth: number
  imgHeight: number
}

export interface Global {
  defaultSeo?: SeoData
  siteName?: string
  favicon?: Media
  footer?: Footer
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
