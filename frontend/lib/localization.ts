import "moment/locale/ja"

export enum Label {
  LongDate,
  Updated,
  By,
  FilterTags,
  WordCount,
  ReadingTime,
}

export enum Locale {
  EN = "en",
  JA = "ja",
  Unknown = "unknown",
}

const english = new Map<number, string | string[]>([
  [Label.LongDate, "YYYY/MM/DD"],
  [Label.Updated, "updated "],
  [Label.By, "By "],
  [Label.FilterTags, "Filter posts by clicking tags below"],
  [Label.WordCount, "Word count: "],
  [Label.ReadingTime, ["", " min read"]],
])

const japanese = new Map<number, string | string[]>([
  [Label.LongDate, "LL"],
  [Label.Updated, "更新"],
  [Label.By, "執筆"],
  [Label.FilterTags, "以下のタグを選択すると投稿を絞り込める"],
  [Label.WordCount, "文字数："],
  [Label.ReadingTime, ["", "分で読めます"]],
])

export function i18n(label: Label, locale?: Locale | string, additionalText?: string) {
  let text: string | string[] | undefined
  switch (locale) {
    case Locale.JA:
      text = japanese.get(label)
      break
    default:
      text = english.get(label)
  }

  if (Array.isArray(text)) {
    return text[0] + additionalText + text[1]
  }

  return (text ?? "") + (additionalText ?? "")
}

const ignoredChars = /[#_\*;:-_`\(\)\[\]]/g
const ignoredCharsJpn = /(\s|[#_\*;:-_`\(\)\[\]、。？！＃「」『』（）【】A-Za-z])/g
const latinWords = /([A-Za-z]+(?:'|-)?[A-Za-z]*)/g

export function countWords(text: string, locale?: Locale) {
  // Average words per minute for English and characters for Japanese
  // https://irisreading.com/average-reading-speed-in-various-languages/
  let wordCount: number, readingTime: number

  switch (locale) {
    case Locale.JA:
      const charCount = text.replace(ignoredCharsJpn, "").length
      const latinWordMatches = text.match(latinWords) || []
      const latinWordCount = latinWordMatches.length

      wordCount = charCount + latinWordMatches.reduce((acc, word) => acc + word.length, 0)
      // Total word count used here is the sum of characters and Latin alphabet words
      readingTime = Math.ceil((charCount + latinWordCount) / 357)
      break
    default:
      wordCount = text.replace(ignoredChars, "").split(/\s+/).length
      readingTime = Math.ceil(wordCount / 228)
  }

  return { wordCount, readingTime }
}
