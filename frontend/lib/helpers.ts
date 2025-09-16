import type { Article, Project, StrapiData } from "../types"
import { Locale } from "./localization"

/**
 * Shuffles the given array with Fisher–Yates algorithm.
 *
 * @param array
 * @returns shuffled array
 */
export const shuffle = (array: unknown[]) => {
  let counter = array.length
  if (counter <= 1) {
    return array
  }

  while (counter > 0) {
    const randomIndex = Math.floor(Math.random() * counter)

    counter--

    const tempArr = array[counter]
    array[counter] = array[randomIndex]
    array[randomIndex] = tempArr
  }

  return array
}

/**
 * Flattens the Strapi v4 API response by removing 'data' and 'attributes' abstractions.
 *
 * @param response For example: { data: { id: number attributes: unknown }}
 * @param depth depth of recursivity
 * @returns flattened data
 *
 * @deprecated Used with Strapi v4
 */
export const recursiveFlat = (response: StrapiData<unknown> | Record<string, unknown>, depth = 0): unknown => {
  if (!response || depth > 10) {
    return response
  }

  if (Array.isArray(response)) {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    return response.map((item) => recursiveFlat(item as StrapiData<unknown>, depth + 1))
  } else if (typeof response === "object") {
    const flat = {} as Record<string, unknown>

    for (const [key, value] of Object.entries(response)) {
      switch (key) {
        case "data": {
          // eslint-disable-next-line @typescript-eslint/no-deprecated
          return recursiveFlat(value as StrapiData<unknown>, depth + 1)
        }
        case "attributes": {
          // eslint-disable-next-line @typescript-eslint/no-deprecated
          const tmpFlat = recursiveFlat(value as StrapiData<unknown>, depth + 1)
          // If there's an ID on the same level as attributes, add it to the same level as other attributes.
          const id = response.id ? response.id : undefined
          return tmpFlat && typeof tmpFlat === "object" ? { ...tmpFlat, id } : tmpFlat
        }
        default: {
          // eslint-disable-next-line @typescript-eslint/no-deprecated
          flat[key] = recursiveFlat(value as StrapiData<unknown>, depth + 1)
        }
      }
    }

    return flat
  }

  return response
}

export const filterItemsBasedOnLocale = (items: Array<Article | Project>, locale?: Locale | string) => {
  if (locale === Locale.JA) {
    return items.filter((item: Article | Project) => {
      const duplicateJapaneseItem = items.some(
        (item2: Article | Project) => item2.locale === "ja" && item.slug === item2.slug,
      )
      if (item.locale === "en" && !duplicateJapaneseItem) return true
      if (item.locale === "ja") return true
      return false
    })
  }
  return items.filter((item: Article | Project) => item.locale === "en")
}
