/**
 * Returns the API URL with specified path.
 *
 * @param path
 * @returns API URL as string
 */
export function getApiUrl(path = "") {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1447"}${path}`
}

/**
 * Helper to make GET requests to the API
 *
 * @param path
 * @returns data response as json
 */
export async function fetchApi(path: string) {
  const requestUrl = getApiUrl(path)
  const response = await fetch(requestUrl)
  if (!response.ok) {
    return null
  }

  const data = await response.json()
  return data
}
