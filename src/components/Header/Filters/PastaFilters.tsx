import { useFilters } from '@/components/Layout/context/FilterContext'

import AlergensIcon from '@/assets/svgs/filters/alergens/alergens-icon.svg'
import DietIcon from '@/assets/svgs/filters/diet/diet-icon.svg'

import { CategoryFilter } from './CategoryFitler'
import { allergensFilters, dietFilters } from './constants'

export const PastaFilters = () => {
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
    </div>
  )
}
