import { Media, MediaFormat } from "../types"
import { getApiUrl } from "./api"

/**
 * Helper to get a working image URL.
 *
 * @param media
 * @param format
 * @returns imageURL as string
 */
export function getMedia(media?: Media, format?: MediaFormat) {
  if (!media?.url) {
    return ""
  }

  const imageUrl = !format ? media.url : media.formats[format].url
  const finalUrl = imageUrl.startsWith("/") ? getApiUrl(imageUrl, true) : imageUrl

  return encodeURI(finalUrl)
}

/**
 * Returns saucenao query URL.
 *
 * @param imageUrl
 * @returns saucenao URL
 */
export function sauce(imageUrl: string) {
  return encodeURI(`https://saucenao.com/search.php?output_type=0&dbmask=32&url=${imageUrl}`)
}

/**
 * Extracts pixiv ID from given string.
 *
 * @param input Format: `text (id)`
 * @returns pixiv illustration ID
 */
export function extractPixiv(input?: string) {
  // TODO: source site to the img caption and character + artist to alt? It'd be easier to add sites other than pixiv.
  if (!input) {
    return null
  }

  const match = input.match(/^.*\((\d+)\)$/)
  return !match || !match[1] ? null : match[1]
}

export const defaultPlaceholder =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8v+OeJAAIAwKwUCCAhwAAAABJRU5ErkJggg=="
