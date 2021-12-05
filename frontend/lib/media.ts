import { Media, Strapi } from "../types"
import { getApiUrl } from "./api"

/**
 * Helper to get a working image url
 *
 * @param media
 * @returns imageURL as string
 */
export function getMedia<T extends boolean>(url: T, response?: Strapi<Media>): T extends true ? string : Media {
  if (!response?.data) {
    return (url ? "" : {}) as T extends true ? string : Media
  }

  const media = response.data.attributes
  const imageUrl = media.url.startsWith("/") ? getApiUrl(media.url, true) : media.url

  if (url) {
    return encodeURI(imageUrl) as T extends true ? string : Media
  }

  return { ...response.data.attributes, url: encodeURI(imageUrl) } as T extends true ? string : Media
}

export const defaultPlaceholder =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8v+OeJAAIAwKwUCCAhwAAAABJRU5ErkJggg=="
