import "moment/locale/ja"

export enum Label {
  LongDate,
  Updated,
  By,
  FilterTags,
}

export enum Locale {
  EN = "en",
  JA = "ja",
  Unknown = "unknown",
}

export function i18n(label: Label, locale?: Locale | string) {
  switch (locale) {
    case Locale.JA:
      return japanese.get(label)
    default:
      return english.get(label)
  }
}

const english = new Map<number, string>([
  [Label.LongDate, "YYYY/MM/DD"],
  [Label.Updated, "updated"],
  [Label.By, "By"],
  [Label.FilterTags, "Filter posts by clicking tags below"],
])

const japanese = new Map<number, string>([
  [Label.LongDate, "LL"],
  [Label.Updated, "更新"],
  [Label.By, "執筆"],
  [Label.FilterTags, "以下のタグを選択すると投稿を絞り込める"],
])
