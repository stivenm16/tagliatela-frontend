import { useFilters } from '@/components/Layout/context/FilterContext'

import AlergensIcon from '@/assets/svgs/filters/alergens/alergens-icon.svg'
import DietIcon from '@/assets/svgs/filters/diet/diet-icon.svg'
// Ingredients Icons
import IngredientsIcon from '@/assets/svgs/filters/ingredients/ingredients-icon.svg'

//Flavours Icons
import BasePastaIcon from '@/assets/svgs/filters/base-pasta/base-pasta-icon.svg'
import FlavoursIcon from '@/assets/svgs/filters/flavours/flavours-icon.svg'
import { CategoryFilter } from './CategoryFitler'
import {
  allergensFilters,
  basePastaFilters,
  dietFilters,
  fiambre,
  flavoursFilters,
  ingredientsFilters,
  meats,
} from './constants'

export const SaucesFilters = () => {
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
        filterBy="allergen"
        triggerIcon={AlergensIcon}
        items={allergensFilters.filter((item) => {
          if (!filters.filtersAvaible?.allergens) return item
          return filters.filtersAvaible.allergens?.some(
            (available: string) =>
              available.toLowerCase() === item.label.toLowerCase(),
          )
        })}
        page="pasta"
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
        page="pasta"
      />
      <CategoryFilter
        filterBy="ingredients"
        triggerIcon={IngredientsIcon}
        items={ingredientsFilters.filter((item) => {
          const name = getItemName(item)
          if (filters.family === 'le-pizze' && name === 'mass') return false

          if (
            item.id.toLowerCase() === 'carne' &&
            meats.some((filtersAvailable) =>
              filters.filtersAvaible?.ingredients?.includes(filtersAvailable),
            )
          )
            return true

          if (
            item.id.toLowerCase() === 'fiambre' &&
            fiambre.some((filtersAvailable) =>
              filters.filtersAvaible?.ingredients?.includes(filtersAvailable),
            )
          )
            return true
          if (!isInAvailable(filters.filtersAvaible?.ingredients, item))
            return false

          return true
        })}
        page="pasta"
      />
      <CategoryFilter
        filterBy="basePasta"
        triggerIcon={BasePastaIcon}
        items={basePastaFilters.filter((item) => {
          if (!filters.filtersAvaible?.basePasta) return item
          return filters.filtersAvaible?.basePasta?.some(
            (available: string) =>
              available.toLowerCase() === item.id.toLowerCase(),
          )
        })}
        page="pasta"
      />
      <CategoryFilter
        filterBy="flavour"
        triggerIcon={FlavoursIcon}
        items={flavoursFilters.filter((item) => {
          const name = getItemName(item)
          if (filters.family === 'le-pizze' && name === 'crujiente')
            return false
          if (filters.family === 'postres' && name === 'dulce') return []
          if (!isInAvailable(filters.filtersAvaible?.flavors, item)) {
            return false
          }

          return true
        })}
        page="pasta"
      />
    </div>
  )
}
