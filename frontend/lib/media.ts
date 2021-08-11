import { Media } from "../types/data"
import { getApiUrl } from "./api"

export function getMedia(media: Media) {
  if (media == null) {
    return ""
  }
  const imageUrl = media.url.startsWith("/") ? getApiUrl(media.url) : media.url
  return imageUrl
}
