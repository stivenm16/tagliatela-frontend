// context/FilterContext.tsx
'use client'

import React, { createContext, useContext, useState } from 'react'

export type FilterAvaible = {
  allergens?: string[]
  diets?: string[]
  ingredients?: string[]
  flavors?: string[]
}

export type Filters = {
  diet: string | null
  allergen: string | null
  ingredients: string | null
  flavour: string | null
  family: string | null
  basePasta: string | null
  filtersAvaible?: FilterAvaible | null
}

type FilterContextType = {
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
  updateFilter: (
    key: keyof Filters,
    value: string | FilterAvaible | null,
  ) => void
  focusedFilter: keyof Filters | null
  setFocusedFilter: React.Dispatch<React.SetStateAction<keyof Filters | null>>
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [filters, setFilters] = useState<Filters>({
    diet: null,
    allergen: null,
    ingredients: null,
    flavour: null,
    family: null,
    basePasta: null,
    filtersAvaible: null,
  })
  const [focusedFilter, setFocusedFilter] = useState<keyof Filters | null>(null)

  const updateFilter = (
    key: keyof Filters,
    value: string | FilterAvaible | null,
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilters,
        updateFilter,
        focusedFilter,
        setFocusedFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilters = () => {
  const ctx = useContext(FilterContext)
  if (!ctx) throw new Error('useFilters must be used inside FilterProvider')
  return ctx
}
