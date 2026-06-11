'use client'
import BeveragesIcon from '@/../../public/svgs/beverages-card-icon.svg'
import IngredientsIcon from '@/../../public/svgs/filters/ingredients/ingredients-icon.svg'
import CloseButton from '@/components/buttons/AlertCloseButton'
import Card from '@/components/Cards/Card'
import { WineDialogContent } from '@/components/Dialog/BeveragesDialog'
import { ClickableItem } from '@/components/Dialog/ClickableItem'
import GeneralDialogContent from '@/components/Dialog/GeneralDialog'
import OverlayPopup from '@/components/Dialog/OverlayPopup'
import { useFilters } from '@/components/Layout/context/FilterContext'
import { Skeleton } from '@/components/ui/skeleton'

import axiosInstance from '@/lib/axios'
import { EntityT } from '@/types/global'
import {
  excludesAllergen,
  extractUniqueFilterData,
  matchesFilter,
} from '@/utils/functions'
import React, { JSX, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import DishCard from './DishCard'

const MemoizedDishCard = React.memo(DishCard)

export interface Ingredient extends EntityT {
  name: string
  typeIngredientId: number | null
  typeIngredient: string | null
  flavorsIceCream: string[]
}

interface PairingWineDishes {
  id: number
  name: string
}

interface PairingWine extends EntityT {
  name: string
  isServedByBottle: boolean
  isSevervedByBottle: boolean
  origin: string
  type: string
  dishes: PairingWineDishes[]
}

interface SideDish extends Omit<EntityT, 'isNew' | ' isRecommended'> {
  name: string
}

interface BasicObject {
  id: string
  name: string
}
interface Filter {
  diets?: BasicObject[]
  allergens?: BasicObject[]
  flavors?: BasicObject[]
  ingredients?: BasicObject[]
  families?: BasicObject[]
  basePastas?: BasicObject[]
}

export interface Dish extends EntityT {
  familyName: string
  filter: Filter
  ingredients: Ingredient[]
  name: string
  pairing_wine: PairingWine[]
  side_dishes: SideDish[]
  vinaigrettes: SideDish[]
  flavorsIceCream: BasicObject[]
  type: string
}

const FAMILY_ORDER = [
  'APERITIVI',
  'ANTIPASTI',
  'CUORE FELICE',
  'INSALATE',
  'PIATTI PRINCIPALI',
  'LE PIZZE',
  'POSTRES',
]

const normalizeFamily = (name: string) =>
  name.toLowerCase().replace(/\s+/g, '-')

const suggestionsMessage = (
  <>Por favor selecciona otro de los filtros para ver más recomendaciones</>
)

const supervisorMessage = (
  <>
    Si eres el supervisor, continúa con el servicio de lo contrario por favor
    <strong> informaselo </strong> al finalizar la comanda
  </>
)
const Page = () => {
  const [dishes, setDishes] = useState<Dish[]>([])
  const [openTooltipId, setOpenTooltipId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [alertMessage, setAlertMessage] =
    useState<JSX.Element>(suggestionsMessage)

  const { filters, updateFilter } = useFilters()

  const getContent = useCallback(async () => {
    const response = await axiosInstance.get(`dish/search`, {
      withCredentials: true,
    })

    if (response.status !== 200) {
      throw new Error('Error fetching dishes')
    }

    return response.data
  }, [])

  useEffect(() => {
    if (filters.allergen) {
      setOpen(true)
      setAlertMessage(supervisorMessage)
    }
  }, [filters.allergen])

  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      const { filter, ingredients } = dish
      return (
        matchesFilter(filter.diets, filters.diet) &&
        excludesAllergen(filter.allergens, filters.allergen) &&
        matchesFilter(filter.flavors, filters.flavour) &&
        matchesFilter(ingredients, filters.ingredients) &&
        matchesFilter(filter.basePastas, filters.basePasta) &&
        (!filters.family || normalizeFamily(dish.type) === filters.family)
      )
    })
  }, [dishes, filters])

  useEffect(() => {
    const newFiltersAvailable = extractUniqueFilterData(filteredDishes)

    if (
      filters.allergen &&
      !newFiltersAvailable.allergens?.includes(filters.allergen)
    ) {
      newFiltersAvailable.allergens = [
        ...(newFiltersAvailable.allergens ?? []),
        filters.allergen,
      ]
    }
    const oldFilters = filters.filtersAvaible ?? {}

    const isDifferent =
      JSON.stringify(newFiltersAvailable) !== JSON.stringify(oldFilters)

    if (isDifferent) {
      updateFilter('filtersAvaible', newFiltersAvailable)
    }
  }, [filteredDishes])

  useEffect(() => {
    setIsLoading(true)
    getContent()
      .then((data) => {
        if (data && data.length > 0) {
          const uniqueFilters = extractUniqueFilterData(data)
          updateFilter('filtersAvaible', uniqueFilters)
        }
        setDishes(data ?? [])
      })
      .catch((error) => {
        console.error('Error fetching dishes:', error)
        setDishes([])
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [getContent])

  const onCloseDialog = () => {
    setOpen(false)
    setAlertMessage(suggestionsMessage)
  }

  const familySections = useMemo(() => {
    const grouped: Record<string, Dish[]> = {}
    filteredDishes.forEach((dish) => {
      const family = dish.type || 'OTROS'
      if (!grouped[family]) grouped[family] = []
      grouped[family].push(dish)
    })
    return FAMILY_ORDER.filter((f) => grouped[f]).map((family) => ({
      family,
      dishes: grouped[family],
    }))
  }, [filteredDishes])

  // Lazy render: initially only render first family, observe rest
  const [visibleFamilies, setVisibleFamilies] = useState<Set<string>>(() =>
    new Set(familySections.length > 0 ? [familySections[0].family] : []),
  )
  const sectionRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    const refs = sectionRefs.current

    familySections.forEach(({ family }) => {
      if (visibleFamilies.has(family)) return
      const el = refs.get(family)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleFamilies((prev) => new Set([...prev, family]))
            observer.disconnect()
          }
        },
        { rootMargin: '200px' },
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [familySections, visibleFamilies])

  // Update visible families when sections change (e.g. after filter)
  useEffect(() => {
    if (familySections.length > 0) {
      setVisibleFamilies((prev) => {
        const next = new Set(prev)
        // Always keep first family visible
        next.add(familySections[0].family)
        return next
      })
    }
  }, [familySections])

  return (
    <div className="flex-1 min-h-0 overflow-y-auto">
      {isLoading ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(14.5rem,1fr))] gap-x-2 px-4 gap-y-5 pt-10 pb-28">
          <Skeleton className="h-72 w-[220px] bg-white/50" />
          <Skeleton className="h-72 w-[220px] bg-white/50" />
          <Skeleton className="h-72 w-[220px] bg-white/50" />
          <Skeleton className="h-72 w-[220px] bg-white/50" />
          <Skeleton className="h-72 w-[220px] bg-white/50" />
          <Skeleton className="h-72 w-[220px] bg-white/50" />
          <Skeleton className="h-72 w-[220px] bg-white/50" />
          <Skeleton className="h-72 w-[220px] bg-white/50" />
          <Skeleton className="h-72 w-[220px] bg-white/50" />
          <Skeleton className="h-72 w-[220px] bg-white/50" />
          <Skeleton className="h-72 w-[220px] bg-white/50" />
          <Skeleton className="h-72 w-[220px] bg-white/50" />
        </div>
      ) : (
        <>
          <OverlayPopup open={open} onClose={onCloseDialog}>
            <div
              className={`p-5  bg-white/80 backdrop-blur-sm uppercase  md:w-[26rem] w-[23rem] px-10 ${'border-2 border-red-600'} rounded-2xl text-center shadow-lg relative`}
            >
              <span>{alertMessage}</span>
              <CloseButton onClick={onCloseDialog} />
            </div>
          </OverlayPopup>
          <div className="flex flex-col gap-10 px-4 pb-28 pt-10">
            {familySections.length === 0 && !isLoading && (
              <div className="text-center text-text-muted mt-20 text-lg font-semibold">
                No hay platos que coincidan con los filtros seleccionados
              </div>
            )}
            {familySections.map(({ family, dishes }) => {
              const isVisible = visibleFamilies.has(family)
              return (
              <div
                key={family}
                ref={(el) => {
                  if (el) sectionRefs.current.set(family, el)
                  else sectionRefs.current.delete(family)
                }}
              >
                <h2
                  className="text-suggested-main font-bold text-2xl uppercase mb-4 ml-2"
                  style={{ color: 'var(--suggested-main)' }}
                >
                  {family}
                </h2>
                {isVisible && (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(14.5rem,1fr))] gap-x-2 gap-y-5">
                  {dishes
                    .sort(
                      (a, b) =>
                        (b.isRecommended ? 1 : 0) - (a.isRecommended ? 1 : 0),
                    )
                    .map((item) => (
                      <Card
                        key={item.id}
                        modalContent={
                          <GeneralDialogContent
                            title={item.name}
                            description={item.description!}
                            img={{
                              name: item.name,
                              type: item.type,
                            }}
                          />
                        }
                        height="28rem"
                        width="14.5rem"
                        backgroundCard="bg-neutral-50"
                        flipContentOptions={[
                          {
                            content: (
                              <div
                                className="p-4 text-white w-[12rem] flex flex-col mx-auto"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  e.preventDefault()
                                }}
                              >
                                <h2 className="text-xl font-semibold my-4 text-center">
                                  {item.name}
                                </h2>
                                <ul className="flex flex-col gap-1 w-44 overflow-y-auto pr-2 mx-auto justify-center">
                                  {item.pairing_wine &&
                                  item.pairing_wine.length > 0
                                    ? item.pairing_wine.map((ingredient) => (
                                        <div key={ingredient.id}>
                                          {ingredient.origin ? (
                                            <ClickableItem
                                              title={ingredient.name}
                                              description={
                                                ingredient.description!
                                              }
                                              ingredient={ingredient}
                                              origin={ingredient.origin}
                                              lightIcon={false}
                                              customDialog={
                                                <div className="bg-white w-full p-5 h-full flex justify-center items-center rounded-xl">
                                                  <WineDialogContent
                                                    title={ingredient.name}
                                                    img={
                                                      '/images/vini-reference-image.png'
                                                    }
                                                    origin={ingredient.origin}
                                                    description={
                                                      ingredient.description
                                                    }
                                                    pairing={ingredient.dishes.map(
                                                      (d) => d.name,
                                                    )}
                                                  />
                                                </div>
                                              }
                                            />
                                          ) : (
                                            <div className="flex gap-2 items-center">
                                              <div className="size-2 rounded-full bg-white ml-[5px] text-sm" />
                                              <span className="ml-3">
                                                {ingredient.name}
                                              </span>
                                            </div>
                                          )}
                                        </div>
                                      ))
                                    : null}
                                </ul>
                              </div>
                            ),
                            icon: BeveragesIcon,
                            label: 'Bebidas',
                            color: 'bg-pasta-main',
                            iconWidth: 15,
                          },
                          {
                            content: (
                              <div
                                className="p-4 text-white w-[12rem] flex flex-col mx-auto"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  e.preventDefault()
                                }}
                              >
                                <h2 className="text-xl font-semibold my-4 text-center">
                                  {item.name}
                                </h2>
                                <ul className="flex flex-col gap-1 w-44 overflow-y-auto pr-2 mx-auto max-h-74">
                                  {item.ingredients.length > 0
                                    ? item.ingredients.map((ingredient) => (
                                        <div key={ingredient.id}>
                                          {ingredient?.imageUrl ? (
                                            <ClickableItem
                                              title={ingredient.name}
                                              description={
                                                ingredient.description!
                                              }
                                              ingredient={ingredient}
                                              origin="Italiano"
                                              lightIcon={false}
                                            />
                                          ) : (
                                            <div className="flex gap-2 items-center">
                                              <div className="size-2 rounded-full bg-white ml-[5px]" />
                                              <span className="ml-3 text-sm">
                                                {ingredient.name}
                                              </span>
                                            </div>
                                          )}
                                        </div>
                                      ))
                                    : null}
                                </ul>
                              </div>
                            ),
                            icon: IngredientsIcon,
                            label: 'Ingredientes',
                            color: 'bg-italian-main',
                            iconWidth: 24,
                          },
                        ]}
                        isSuggested={item.isRecommended}
                        hasPairing={item.pairing_wine.length > 0}
                      >
                          <MemoizedDishCard
                            item={item}
                            openTooltipId={openTooltipId}
                            setOpenTooltipId={setOpenTooltipId}
                          />
                      </Card>
                    ))}
                </div>
                )}
                {!isVisible && (
                  <div className="h-72" />
                )}
              </div>
            )})}
          </div>
        </>
      )}
    </div>
  )
}

export default Page
