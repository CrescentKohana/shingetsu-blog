/**
 * Returns the API URL with specified path.
 *
 * @param path
 * @param notApi no /api path prefix
 * @returns API URL as string
 */
export function getApiUrl(path = "", notApi?: boolean) {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1447"}${notApi ? "" : "/api"}${path}`
}

/**
 * Helper to make GET requests to the API
 *
 * @param path
 * @param flat flatten the API request?
 * @returns data response as json
 */
export async function fetchApi(path: string) {
  const requestUrl = getApiUrl(path)
  const response = await fetch(requestUrl)
  if (!response.ok) {
    return null
  }

  const content = await response.json()
  return content
}
