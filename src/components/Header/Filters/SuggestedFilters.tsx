'use client'
// Family Icons
import FamilyIcon from '@/assets/svgs/filters/family/family-icon.svg'

// Alergens Icons
import AlergensIcon from '@/assets/svgs/filters/alergens/alergens-icon.svg'

// Diet Icons
import DietIcon from '@/assets/svgs/filters/diet/diet-icon.svg'

// Ingredients Icons
import IngredientsIcon from '@/assets/svgs/filters/ingredients/ingredients-icon.svg'

//Flavours Icons
import FlavoursIcon from '@/assets/svgs/filters/flavours/flavours-icon.svg'

// Base pasta Icons

import { useFilters } from '@/components/Layout/context/FilterContext'
import { CategoryFilter } from './CategoryFitler'
import {
  allergensFilters,
  dietFilters,
  familyFilters,
  flavoursFilters,
  ingredientsFilters,
} from './constants'

export const SuggestedFilters = () => {
  const { filters } = useFilters()

  const getItemName = (item: any) =>
    (item.label ?? item.name ?? item.id ?? '').toString().toLowerCase()

  const isInAvailable = (availableArr: string[] | undefined, item: any) => {
    if (
      !availableArr ||
      !Array.isArray(availableArr) ||
      availableArr.length === 0
    )
      return true
    const name = getItemName(item)
    return availableArr.some((av) => av.toString().toLowerCase() === name)
  }
  return (
    <div className="w-fit ml-auto mr-5  gap-5  flex " id="filters-container">
      <CategoryFilter
        filterBy="family"
        triggerIcon={FamilyIcon}
        items={familyFilters}
        page="recomendados"
      />
      <CategoryFilter
        filterBy="allergen"
        triggerIcon={AlergensIcon}
        items={allergensFilters.filter((item) => {
          if (!filters.filtersAvaible?.allergens) return item
          return filters.filtersAvaible.allergens?.some(
            (available: string) =>
              available.toLowerCase() === item.label.toLowerCase(),
          )
        })}
        page="recomendados"
      />
      <CategoryFilter
        filterBy="diet"
        triggerIcon={DietIcon}
        items={dietFilters.filter((item) => {
          if (!filters.filtersAvaible?.diets) return item
          return filters.filtersAvaible.diets?.some(
            (available: string) =>
              available.toLowerCase() === item.id.toLowerCase(),
          )
        })}
        page="recomendados"
      />
      <CategoryFilter
        filterBy="ingredients"
        triggerIcon={IngredientsIcon}
        items={
          filters.filtersAvaible?.ingredients?.length
            ? ingredientsFilters.filter((item) => {
                const name = getItemName(item)
                if (filters.family === 'le-pizze' && name === 'mass')
                  return false
                if (!isInAvailable(filters.filtersAvaible?.ingredients, item))
                  return false

                return true
              })
            : []
        }
        page="recomendados"
      />
      <CategoryFilter
        filterBy="flavour"
        triggerIcon={FlavoursIcon}
        items={
          filters.filtersAvaible?.flavors?.length
            ? flavoursFilters.filter((item) => {
                const name = getItemName(item)
                if (filters.family === 'le-pizze' && name === 'crujiente')
                  return false
                if (filters.family === 'postres' && name === 'dulce')
                  return false
                if (!isInAvailable(filters.filtersAvaible?.flavors, item)) {
                  return false
                }

                return true
              })
            : []
        }
        page="recomendados"
      />
    </div>
  )
}
