'use client'
import { FilterItem, VerticalFilterMenu } from './VerticalFilterMenu'
// Family Icons
import AntipastiIcon from '@/assets/svgs/filters/family/antipasti-icon.svg'
import AperitiviIcon from '@/assets/svgs/filters/family/aperitivi-icon.svg'
import HeartIcon from '@/assets/svgs/filters/family/cuore-felici-icon.svg'
import DessertsIcon from '@/assets/svgs/filters/family/desserts-icon.svg'
import FamilyIcon from '@/assets/svgs/filters/family/family-icon.svg'
import MainDishesIcon from '@/assets/svgs/filters/family/main-dishes-icon.svg'
import PizzaIcon from '@/assets/svgs/filters/family/pizza-icon.svg'
import SaladsIcon from '@/assets/svgs/filters/family/salads-icon.svg'

// Alergens Icons
import AlergensIcon from '@/assets/svgs/filters/alergens/alergens-icon.svg'
import CeleryIcon from '@/assets/svgs/filters/alergens/celery-icon.svg'
import CrustaceansIcon from '@/assets/svgs/filters/alergens/crustaceans-icon.svg'
import EggsIcon from '@/assets/svgs/filters/alergens/egg-icon.svg'
import FishIcon from '@/assets/svgs/filters/alergens/fish-icon.svg'
import GlutenIcon from '@/assets/svgs/filters/alergens/gluten-icon.svg'
import MilkIcon from '@/assets/svgs/filters/alergens/milk-icon.svg'
import MollusksIcon from '@/assets/svgs/filters/alergens/mollusks-icon.svg'
import MustardIcon from '@/assets/svgs/filters/alergens/mustard-icon.svg'
import NutsIcon from '@/assets/svgs/filters/alergens/nuts-icon.svg'
import SesameIcon from '@/assets/svgs/filters/alergens/sesame-icon.svg'
import SulphitesIcon from '@/assets/svgs/filters/alergens/sulphite-icon.svg'

// Diet Icons
import DietIcon from '@/assets/svgs/filters/diet/diet-icon.svg'
import PregnantIcon from '@/assets/svgs/filters/diet/pregnant-icon.svg'
import VegetarianIcon from '@/assets/svgs/filters/diet/vegetarian-icon.svg'

// Ingredients Icons
import CheeseIcon from '@/assets/svgs/filters/ingredients/cheese-icon.svg'
import IngredientsIcon from '@/assets/svgs/filters/ingredients/ingredients-icon.svg'
import MassIcon from '@/assets/svgs/filters/ingredients/mass-icon.svg'
import MeatIcon from '@/assets/svgs/filters/ingredients/meat-icon.svg'
import SeafoodIcon from '@/assets/svgs/filters/ingredients/seafood-icon.svg'
import StiffIcon from '@/assets/svgs/filters/ingredients/stiff-icon.svg'
import TomatoIcon from '@/assets/svgs/filters/ingredients/tomato-icon.svg'
import VegetablesIcon from '@/assets/svgs/filters/ingredients/vegetables-icon.svg'

//Flavours Icons
import CrunchyIcon from '@/assets/svgs/filters/flavours/crunchy-icon.svg'
import FlavoursIcon from '@/assets/svgs/filters/flavours/flavours-icon.svg'
import FreshIcon from '@/assets/svgs/filters/flavours/fresh-icon.svg'
import IntenseIcon from '@/assets/svgs/filters/flavours/intense-icon.svg'
import SoftIcon from '@/assets/svgs/filters/flavours/soft-icon.svg'
import SpicyIcon from '@/assets/svgs/filters/flavours/spicy-icon.svg'
import SweetIcon from '@/assets/svgs/filters/flavours/sweet-icon.svg'

// Base pasta Icons
import CreamyIcon from '@/assets/svgs/filters/base-pasta/creamy-icon.svg'
import OilIcon from '@/assets/svgs/filters/base-pasta/oil-icon.svg'

import { Filters, useFilters } from '@/components/Layout/context/FilterContext'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const ingredientsFilters: FilterItem[] = [
  {
    id: 'queso',
    label: 'Queso',
    icon: CheeseIcon,
    selectedColorIcon: '#FEE67B',
  },
  { id: 'carne', label: 'Carne', icon: MeatIcon, selectedColorIcon: '#E59A61' },
  {
    id: 'seafood',
    label: 'Productos del mar',
    icon: SeafoodIcon,
    selectedColorIcon: '#E7A5AD',
  },
  {
    id: 'stiff',
    label: 'Fiambre',
    icon: StiffIcon,
    selectedColorIcon: '#734A84',
  },
  { id: 'masa', label: 'Masa', icon: MassIcon, selectedColorIcon: '#C5A468' },
  {
    id: 'vegetales',
    label: 'Vegetales',
    icon: VegetablesIcon,
    selectedColorIcon: '#78B591',
  },
  {
    id: 'tomate',
    label: 'Tomate',
    icon: TomatoIcon,
    selectedColorIcon: '#B74A35',
  },
]

const basePastaFilters: FilterItem[] = [
  {
    id: 'creamy',
    label: 'Crema',
    icon: CreamyIcon,
    selectedColorIcon: '#93CBDC',
  },
  {
    id: 'aceite',
    label: 'Aceite',
    icon: OilIcon,
    selectedColorIcon: '#FFA92D',
  },
  {
    id: 'tomate',
    label: 'Tomate',
    icon: TomatoIcon,
    selectedColorIcon: '#B74A35',
  },
]

const flavoursFilters: FilterItem[] = [
  {
    id: 'crujiente',
    label: 'Crujiente',
    icon: CrunchyIcon,
    selectedColorIcon: '#A55D56',
  },
  {
    id: 'picante',
    label: 'Picante',
    icon: SpicyIcon,
    selectedColorIcon: '#9B3944',
  },
  {
    id: 'dulce',
    label: 'Dulce',
    icon: SweetIcon,
    selectedColorIcon: '#DDB1ED',
  },
  {
    id: 'intenso',
    label: 'Intenso',
    icon: IntenseIcon,
    selectedColorIcon: '#30709D',
  },
  {
    id: 'fresco',
    label: 'Fresco',
    icon: FreshIcon,
    selectedColorIcon: '#84C2A5',
  },
  { id: 'suave', label: 'Suave', icon: SoftIcon, selectedColorIcon: '#FFCFDC' },
]

const dietFilters: FilterItem[] = [
  {
    id: 'vegetariano',
    label: 'Vegetariana',
    icon: VegetarianIcon,
    selectedColorIcon: '#648E31',
  },
  {
    id: 'embarazadas',
    label: 'Embarazada',
    icon: PregnantIcon,
    selectedColorIcon: '#FB8FEF',
  },
]

const allergensFilters: FilterItem[] = [
  {
    id: 'gluten',
    label: 'Gluten',
    icon: GlutenIcon,
    selectedColorIcon: '#F9AD73',
  },
  {
    id: 'lacteos',
    label: 'Lácteos',
    icon: MilkIcon,
    selectedColorIcon: '#93CBDC',
  },
  {
    id: 'frutos con cascara',
    label: 'Frutos con cáscara',
    icon: NutsIcon,
    selectedColorIcon: '#81582F',
  },
  {
    id: 'pescado',
    label: 'Pescado',
    icon: FishIcon,
    selectedColorIcon: '#4591C7',
  },
  { id: 'huevo', label: 'Huevo', icon: EggsIcon, selectedColorIcon: '#D8C3AC' },
  {
    id: 'sulfitos',
    label: 'Sulfitos',
    icon: SulphitesIcon,
    selectedColorIcon: '#969D9E',
  },
  {
    id: 'apio',
    label: 'Apio',
    icon: CeleryIcon,
    selectedColorIcon: '#A5C295',
  },
  {
    id: 'moluscos',
    label: 'Moluscos',
    icon: MollusksIcon,
    selectedColorIcon: '#162847',
  },
  {
    id: 'custaceos',
    label: 'Crustaceos',
    icon: CrustaceansIcon,
    selectedColorIcon: '#E1664F',
  },
  {
    id: 'mostaza',
    label: 'Mostaza',
    icon: MustardIcon,
    selectedColorIcon: '#E2BD17',
  },
  {
    id: 'sesamo',
    label: 'Sesamo',
    icon: SesameIcon,
    selectedColorIcon: '#CAABD5',
  },
]

export const familyFilters: FilterItem[] = [
  {
    id: 'aperitivi',
    label: 'Aperitivi',
    icon: AperitiviIcon,
    selectedColorIcon: '#E7CAA1',
  },
  {
    id: 'antipasti',
    label: 'Antipasti',
    icon: AntipastiIcon,
    selectedColorIcon: '#5D5F34',
  },
  {
    id: 'insalate',
    label: 'Ensaladas',
    icon: SaladsIcon,
    selectedColorIcon: '#9E9E26',
  },
  {
    id: 'piatti-principali',
    label: 'Platos Principales',
    icon: MainDishesIcon,
    selectedColorIcon: '#8D3984',
  },
  {
    id: 'postres',
    label: 'Postres',
    icon: DessertsIcon,
    selectedColorIcon: '#E75E83',
  },
  {
    id: 'le-pizze',
    label: 'Pizza',
    icon: PizzaIcon,
    selectedColorIcon: '#E7B864',
  },
  {
    id: 'cuore-felice',
    label: 'Cuore Felici',
    icon: HeartIcon,
    selectedColorIcon: '#960313',
  },
]

const filterMap: Record<keyof Filters, FilterItem[]> = {
  family: familyFilters,
  allergen: allergensFilters,
  diet: dietFilters,
  ingredients: ingredientsFilters,
  flavour: flavoursFilters,
  basePasta: basePastaFilters,
  filtersAvaible: [],
}

const CategoryFilter = ({
  triggerIcon: TriggerIcon,
  items,
  filterBy,
}: {
  triggerIcon: any
  filterBy: keyof Filters
  items: FilterItem[]
}) => {
  const { focusedFilter, setFocusedFilter, filters, setFilters } = useFilters()
  const [mounted, setMounted] = useState(false)
  const container = mounted && document.getElementById('filters-container')
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => setMounted(true), [])

  const ref = useRef<HTMLDivElement>(null)

  const disabled = filterBy !== 'family' && filters.family === null
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
      : ''

  return (
    <div>
      <div ref={ref} className="relative">
        <button
          className={` ${
            disabled || items.length === 0
              ? 'cursor-not-allowed opacity-50'
              : ''
          } rounded-full size-10 justify-center items-center flex shadow-md text-xl `}
          disabled={disabled || items.length === 0}
          onClick={() =>
            setFocusedFilter((prev) => (prev === filterBy ? null : filterBy))
          }
          style={{
            backgroundColor: selectedColorIcon || '#525252', // fallback
          }}
        >
          {!!filters[filterBy] ? (
            <SelectedIcon className=" mx-auto self-center px-auto flex [&_path]:fill-white" />
          ) : (
            <TriggerIcon />
          )}
        </button>
        {focusedFilter === filterBy &&
          mounted &&
          container &&
          createPortal(
            <div
              className="absolute top-18 left-0 z-[9999]"
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
    <div className="w-fit ml-auto mr-5 flex gap-5" id="filters-container">
      <CategoryFilter
        filterBy="family"
        triggerIcon={FamilyIcon}
        items={familyFilters}
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
      />
      <CategoryFilter
        filterBy="ingredients"
        triggerIcon={IngredientsIcon}
        items={ingredientsFilters.filter((item) => {
          const name = getItemName(item)
          if (filters.family === 'le-pizze' && name === 'mass') return false
          if (!isInAvailable(filters.filtersAvaible?.ingredients, item))
            return false

          return true
        })}
      />
      <CategoryFilter
        filterBy="flavour"
        triggerIcon={FlavoursIcon}
        items={flavoursFilters.filter((item) => {
          const name = getItemName(item)
          if (filters.family === 'le-pizze' && name === 'crujiente')
            return false
          if (filters.family === 'postres' && name === 'dulce') return false
          if (!isInAvailable(filters.filtersAvaible?.flavors, item)) {
            return false
          }

          return true
        })}
      />
    </div>
  )
}
