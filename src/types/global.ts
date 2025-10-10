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

export interface EntityT {
  id: number
  isAvailable: boolean
  isRecommended: boolean
  thumbnailUrl: string
  imageUrl: string
  isNew: boolean
  description?: string
}

enum FamilyType  {
  INSALATE = "INSALATE",
  APERITIVI = "APERITIVI",
  ANTIPASTI = "ANTIPASTI",
  POSTRES = "POSTRES",
  PIZZA = "LE PIZZA",
  CUORE_FELICE = "CUORE FELICE",
  PIATTI_PRINCIPALI = "PIATTI PRINCIPALI",
}