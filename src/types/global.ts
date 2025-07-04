export interface Sauce {
  id: number
  title: string
  description: string
  isNew: boolean
  highlightedContent: string
  isSuggested: boolean
}

export interface FilterSaucesOption {
  selectedValue: number[]
  options: { value: string; label: string }[]
  placeHolder: string
}