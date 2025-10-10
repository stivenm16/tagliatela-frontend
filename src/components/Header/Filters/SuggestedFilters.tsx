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
import basePastaIcon from '@/assets/svgs/filters/base-pasta/base-pasta-icon.svg'
import CreamyIcon from '@/assets/svgs/filters/base-pasta/creamy-icon.svg'
import OilIcon from '@/assets/svgs/filters/base-pasta/oil-icon.svg'

import { Filters, useFilters } from '@/components/Layout/context/FilterContext'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const ingredientsFilters: FilterItem[] = [
  { id: 'cheese', label: 'Queso', icon: CheeseIcon },
  { id: 'meat', label: 'CArne', icon: MeatIcon },
  { id: 'seafood', label: 'Productos del mar', icon: SeafoodIcon },
  { id: 'stiff', label: 'Fiambre', icon: StiffIcon },
  { id: 'mass', label: 'Masa', icon: MassIcon },
  { id: 'vegetables', label: 'Vegetales', icon: VegetablesIcon },
  { id: 'tomato', label: 'Tomate', icon: TomatoIcon },
]

const basePastaFilters: FilterItem[] = [
  { id: 'creamy', label: 'Crema', icon: CreamyIcon },
  { id: 'oil', label: 'Aceite', icon: OilIcon },
  { id: 'tomato', label: 'Tomate', icon: TomatoIcon },
]

const flavoursFilters: FilterItem[] = [
  { id: 'crunchy', label: 'Crujiente', icon: CrunchyIcon },
  { id: 'spicy', label: 'Picante', icon: SpicyIcon },
  { id: 'sweet', label: 'Dulce', icon: SweetIcon },
  { id: 'intense', label: 'Intenso', icon: IntenseIcon },
  { id: 'fresh', label: 'Fresco', icon: FreshIcon },
  { id: 'soft', label: 'Suave', icon: SoftIcon },
]

const dietFilters: FilterItem[] = [
  { id: 'vegetarian', label: 'Vegetariana', icon: VegetarianIcon },
  { id: 'pregnant', label: 'Embarazada', icon: PregnantIcon },
]

const allergensFilters: FilterItem[] = [
  { id: 'gluten', label: 'Gluten', icon: GlutenIcon },
  { id: 'milk', label: 'Lácteos', icon: MilkIcon },
  { id: 'nuts', label: 'Frutos con cáscara', icon: NutsIcon },
  { id: 'fish', label: 'Pescado', icon: FishIcon },
  { id: 'eggs', label: 'Huevo', icon: EggsIcon },
  { id: 'sulphites', label: 'Sulfitos', icon: SulphitesIcon },
  { id: 'celery', label: 'Apio', icon: CeleryIcon },
  { id: 'mollusks', label: 'Moluscos', icon: MollusksIcon },
  { id: 'crustaceans', label: 'Crustaceos', icon: CrustaceansIcon },
  { id: 'mustard', label: 'Mostaza', icon: MustardIcon },
  { id: 'sesame', label: 'Sesamo', icon: SesameIcon },
]

export const familyFilters: FilterItem[] = [
  { id: 'aperitivi', label: 'Aperitivi', icon: AperitiviIcon },
  { id: 'antipasti', label: 'Antipasti', icon: AntipastiIcon },
  { id: 'insalate', label: 'Ensaladas', icon: SaladsIcon },
  {
    id: 'piatti-principali',
    label: 'Platos Principales',
    icon: MainDishesIcon,
  },
  { id: 'postres', label: 'Postres', icon: DessertsIcon },
  { id: 'le-pizze', label: 'Pizza', icon: PizzaIcon },
  { id: 'cuore-felice', label: 'Cuore Felici', icon: HeartIcon },
]

const filterMap: Record<keyof Filters, FilterItem[]> = {
  family: familyFilters,
  allergen: allergensFilters,
  diet: dietFilters,
  ingredients: ingredientsFilters,
  flavour: flavoursFilters,
  basePasta: basePastaFilters,
}

const CategoryFilter = ({
  triggerIcon,
  items,
  filterBy,
}: {
  triggerIcon: string
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

  const selectedIcon =
    filters[filterBy] && filterMap[filterBy]
      ? filterMap[filterBy].find((item) => item.id === filters[filterBy])
          ?.icon ?? triggerIcon
      : triggerIcon
  return (
    <div>
      <div ref={ref} className="relative">
        <button
          className={` ${
            disabled ? 'cursor-not-allowed opacity-50' : ''
          } rounded-full bg-neutral-600 size-10 justify-center flex shadow-md text-xl`}
          disabled={disabled}
          onClick={() =>
            setFocusedFilter((prev) => (prev === filterBy ? null : filterBy))
          }
        >
          {!!filters[filterBy] ? (
            <Image
              src={selectedIcon}
              alt={`${filterBy} icon`}
              className="text-checkmeeting-main"
            />
          ) : (
            <Image
              src={selectedIcon}
              alt={`${filterBy} icon`}
              className="text-checkmeeting-main"
            />
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
        items={allergensFilters}
      />
      <CategoryFilter
        filterBy="diet"
        triggerIcon={DietIcon}
        items={dietFilters}
      />
      <CategoryFilter
        filterBy="ingredients"
        triggerIcon={IngredientsIcon}
        items={ingredientsFilters}
      />
      <CategoryFilter
        filterBy="flavour"
        triggerIcon={FlavoursIcon}
        items={flavoursFilters}
      />
      <CategoryFilter
        filterBy="basePasta"
        triggerIcon={basePastaIcon}
        items={basePastaFilters}
      />
    </div>
  )
}
