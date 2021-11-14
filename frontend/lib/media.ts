import { Media } from "../types"
import { getApiUrl } from "./api"

/**
 * Helper to get a working image url
 *
 * @param media
 * @returns imageURL as string
 */
export function getMedia(media: Media) {
  if (media == null) {
    return ""
  }

  const imageUrl = media.url.startsWith("/") ? getApiUrl(media.url) : media.url
  return encodeURI(imageUrl)
}
