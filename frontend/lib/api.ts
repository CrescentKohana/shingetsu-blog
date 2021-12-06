import { StrapiData } from "../types"
import { recursiveFlat } from "./helpers"

/**
 * Returns the API URL with specified path.
 *
 * @param path
 * @returns API URL as string
 */
export function getApiUrl(path = "", notApi?: boolean) {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1447"}${notApi ? "" : "/api"}${path}`
}

/**
 * Helper to make GET requests to the API
 *
 * @param path
 * @returns data response as json
 */
export async function fetchApi(path: string, flat = true) {
  const requestUrl = getApiUrl(path)
  const response = await fetch(requestUrl)
  if (!response.ok) {
    return null
  }

  const content = await response.json()
  if (flat) {
    if (Array.isArray(content.data)) {
      return content.data.map((entry: StrapiData<unknown>) => recursiveFlat(entry))
    }

    return recursiveFlat(content.data)
  }
  return content
}

export function sauce(imageUrl: string) {
  return encodeURI(`https://saucenao.com/search.php?output_type=0&dbmask=32&url=${imageUrl}`)
}
