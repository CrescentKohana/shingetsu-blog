import { StrapiData } from "../types"

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
          const tmp = recursiveFlat(value, depth + 1)
          const id = response.id ? response.id : undefined

          return tmp && typeof tmp === "object" ? { ...tmp, id } : tmp
        case "id":
          flat[key] = recursiveFlat(value, depth + 1)
          break
        default:
          flat[key] = recursiveFlat(value, depth + 1)
      }
    }

    return flat
  }

  return response
}
