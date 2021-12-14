import { StrapiData } from "../types"

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

type Obj = { [key: string]: unknown }

/**
 * Flattens the API response by removing 'data' and 'attributes' abstractions.
 *
 * @param response For example: { data: { id: number attributes: unknown }}
 * @param depth depth of recursivity
 * @returns flattened data
 */
export const recursiveFlat = (response: StrapiData<unknown> | Obj, depth = 0): unknown => {
  if (!response || depth > 10) {
    return response
  }

  if (Array.isArray(response)) {
    return response.map((item) => recursiveFlat(item, depth + 1))
  } else if (typeof response === "object") {
    const flat = {} as Obj

    for (const [key, value] of Object.entries(response)) {
      switch (key) {
        case "data":
          return recursiveFlat(value, depth + 1)
        case "attributes":
          const tmpFlat = recursiveFlat(value, depth + 1)
          // If there's an ID on the same level as attributes, add it to the same level as other attributes.
          const id = response.id ? response.id : undefined
          return tmpFlat && typeof tmpFlat === "object" ? { ...tmpFlat, id } : tmpFlat
        default:
          flat[key] = recursiveFlat(value, depth + 1)
      }
    }

    return flat
  }

  return response
}
