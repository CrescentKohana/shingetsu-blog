export const shuffle = (array: unknown[]) => {
  let counter = array.length

  while (counter > 0) {
    const randomIndex = Math.floor(Math.random() * counter)

    counter--

    const tempArr = array[counter]
    array[counter] = array[randomIndex]
    array[randomIndex] = tempArr
  }

  return array
}
