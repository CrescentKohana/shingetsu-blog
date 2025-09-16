export enum StorageKeys {
  FooterImage = "footerImage",
}

export function getValue(key: string): unknown {
  try {
    const item = window.localStorage.getItem(key) || ""
    return item ? JSON.parse(item) : undefined
  } catch {
    return undefined
  }
}

export function setValue(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error(e)
  }
}
