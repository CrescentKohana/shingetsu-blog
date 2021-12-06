import { Media } from "../types"
import { getApiUrl } from "./api"

/**
 * Helper to get a working image url
 *
 * @param media
 * @returns imageURL as string
 */
export function getMedia(media?: Media) {
  if (!media?.url) {
    return ""
  }

  const imageUrl = media.url.startsWith("/") ? getApiUrl(media.url, true) : media.url

  return encodeURI(imageUrl)
}

export const defaultPlaceholder =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8v+OeJAAIAwKwUCCAhwAAAABJRU5ErkJggg=="
