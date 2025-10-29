import { Filters, useFilters } from '@/components/Layout/context/FilterContext'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  allergensFilters,
  basePastaFilters,
  dietFilters,
  familyFilters,
  flavoursFilters,
  ingredientsFilters,
} from './constants'
import { FilterItem, VerticalFilterMenu } from './VerticalFilterMenu'

interface FallbackColors {
  [key: string]: string
}

const fallbackColor: FallbackColors = {
  recomendados: 'var(--suggested-main)',
  pasta: 'var(--pasta-main)',
}

const getFallbackColor = (category: string) => {
  if (!category) return '#FFFFFF'
  return fallbackColor[category]
}

const filterMap: Record<keyof Filters, FilterItem[]> = {
  family: familyFilters,
  allergen: allergensFilters,
  diet: dietFilters,
  ingredients: ingredientsFilters,
  flavour: flavoursFilters,
  basePasta: basePastaFilters,
  filtersAvaible: [],
}
export const CategoryFilter = ({
  triggerIcon: TriggerIcon,
  items,
  filterBy,
  page,
  disableIcon = false,
}: {
  triggerIcon: any
  filterBy: keyof Filters
  items: FilterItem[]
  page?: string
  disableIcon?: boolean
}) => {
  const { focusedFilter, setFocusedFilter, filters, setFilters } = useFilters()
  const [mounted, setMounted] = useState(false)
  const container = mounted && document.getElementById('filters-container')
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => setMounted(true), [])

  const ref = useRef<HTMLDivElement>(null)

  const noFamilySelected =
    filters.family === null || filters.family === undefined
  const disabled =
    filterBy !== 'family' && noFamilySelected && page === 'recomendados'
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setFocusedFilter(null)
      }
    }

    if (focusedFilter === filterBy) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [focusedFilter, filterBy, setFocusedFilter])

  const SelectedIcon =
    filters[filterBy] && filterMap[filterBy]
      ? filterMap[filterBy].find((item) => item.id === filters[filterBy])
          ?.icon ?? TriggerIcon
      : TriggerIcon

  const selectedColorIcon =
    filters[filterBy] && filterMap[filterBy]
      ? filterMap[filterBy].find((item) => item.id === filters[filterBy])
          ?.selectedColorIcon
      : '#FFFFFF'

  const shouldDisable =
    (items.length === 0 && !['family'].includes(filterBy)) || disabled
  return (
    <div>
      <div ref={ref} className="relative">
        <button
          className={` ${
            shouldDisable || disabled ? 'cursor-not-allowed opacity-50' : ''
          } rounded-full size-10 justify-center items-center flex shadow-md text-xl `}
          disabled={disabled || items.length === 0}
          onClick={() =>
            setFocusedFilter((prev) => (prev === filterBy ? null : filterBy))
          }
          style={{
            backgroundColor: selectedColorIcon || getFallbackColor(page ?? ''),
          }}
        >
          {!!filters[filterBy] ? (
            <SelectedIcon
              className={` mx-auto self-center px-auto flex [&_path]:fill-white `}
            />
          ) : (
            <TriggerIcon
              className={` mx-auto self-center px-auto flex [&_path]:fill-[var(--icon-color)] `}
              style={
                {
                  '--icon-color': getFallbackColor(page ?? ''),
                } as React.CSSProperties
              }
            />
          )}
        </button>
        {focusedFilter === filterBy &&
          mounted &&
          container &&
          createPortal(
            <div
              className="absolute top-10 left-0 -z-[9999]"
              style={{
                position: 'absolute',
                transform: `translateX(${ref.current?.offsetLeft ?? 0}px)`,
              }}
              ref={menuRef}
            >
              <VerticalFilterMenu
                items={items}
                activeColor="white"
                category={filterBy}
              />
            </div>,
            container,
          )}
      </div>
    </div>
  )
}
