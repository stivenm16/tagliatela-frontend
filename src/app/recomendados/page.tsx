'use client'
import WineImageRerence from '@/assets/images/vini-reference-image.png'
import BeveragesIcon from '@/assets/svgs/beverages-card-icon.svg'
import IngredientsIcon from '@/assets/svgs/filters/ingredients/ingredients-icon.svg'
import Alert from '@/components/Alert'
import Card from '@/components/Cards/Card'
import { WineDialogContent } from '@/components/Dialog/BeveragesDialog'
import { ClickableItem } from '@/components/Dialog/ClickableItem'
import GeneralDialogContent from '@/components/Dialog/GeneralDialog'
import OverlayPopup from '@/components/Dialog/OverlayPopup'
import {
  FilterAvaible,
  useFilters,
} from '@/components/Layout/context/FilterContext'
import { Skeleton } from '@/components/ui/skeleton'
import axiosInstance from '@/lib/axios'
import { EntityT } from '@/types/global'
import { JSX, useCallback, useEffect, useMemo, useState } from 'react'
import DishCard from './DishCard'

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

function extractUniqueFilterData(dishes: any): FilterAvaible {
  const result = {
    allergens: new Set<string>(),
    diets: new Set<string>(),
    flavors: new Set<string>(),
    ingredients: new Set<string>(),
  }

  for (const dish of dishes) {
    const { filter, ingredients } = dish

    filter?.allergens?.forEach((a: any) => result.allergens.add(a.name))
    filter?.diets?.forEach((d: any) => result.diets.add(d.name))

    if (filter?.flavors)
      Object.values(filter.flavors).forEach((f: any) => {
        if (typeof f?.name === 'string') result.flavors.add(f.name)
      })

    ingredients?.forEach((i: any) => result.ingredients.add(i.name))
  }

  return {
    allergens: [...result.allergens],
    diets: [...result.diets],
    flavors: [...result.flavors],
    ingredients: [...result.ingredients],
  }
}

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
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(true)
  const [alertMessage, setAlertMessage] =
    useState<JSX.Element>(suggestionsMessage)

  const { filters, updateFilter } = useFilters()

  const getContent = useCallback(async () => {
    const response = await axiosInstance.get(
      `dish/search?typeName=${filters.family?.toUpperCase()}`,
      {
        withCredentials: true,
      },
    )

    if (response.status !== 200) {
      throw new Error('Error fetching dishes')
    }

    return response.data
  }, [filters.family])

  useEffect(() => {
    if (filters.allergen) {
      setOpen(true)
      setAlertMessage(supervisorMessage)
    }
  }, [filters.allergen])

  useEffect(() => {
    if (filters.family) {
      setIsLoading(true)
      getContent()
        .then((data) => {
          if (data.length === 0) {
            setDishes([])
          } else {
            const filters = extractUniqueFilterData(data)
            updateFilter('filtersAvaible', filters)
            setDishes(data)
          }
        })
        .catch((error) => {
          console.error('Error fetching dishes:', error)
          setDishes([])
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [filters.family, getContent])

  const matchesFilter = (
    dishValues: { name: string }[] | undefined,
    filterValue: string | undefined | null,
  ) => {
    if (filterValue && dishValues) {
      return dishValues.some(
        (value) => value.name.toLowerCase() === filterValue.toLowerCase(),
      )
    }
    return true
  }

  // This filter implementation will now work as expected
  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      const { filter, ingredients } = dish
      return (
        matchesFilter(filter.diets, filters.diet) &&
        matchesFilter(filter.allergens, filters.allergen) &&
        matchesFilter(filter.flavors, filters.flavour) &&
        matchesFilter(ingredients, filters.ingredients) &&
        matchesFilter(filter.basePastas, filters.basePasta) &&
        matchesFilter(filter.families, filters.family)
      )
    })
  }, [dishes, filters])

  useEffect(() => {
    const newFiltersAvailable = extractUniqueFilterData(filteredDishes)
    const oldFilters = filters.filtersAvaible ?? {}

    const isDifferent =
      JSON.stringify(newFiltersAvailable) !== JSON.stringify(oldFilters)

    if (isDifferent) {
      updateFilter('filtersAvaible', newFiltersAvailable)
    }
  }, [filteredDishes])

  const onCloseDialog = () => {
    setOpen(false)
    setAlertMessage(suggestionsMessage)
  }

  return (
    <div className="">
      {!filters.family ? (
        <Alert closeButton={false}>
          POR FAVOR SELECCIONA LA FAMILIA DE PLATOS DESEADA
        </Alert>
      ) : (
        <>
          {isLoading ? (
            <div className="grid grid-cols-3 gap-5 px-6 mt-10">
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
                <div className="bg-red-200 w-full h-screen rounded shadow-lg">
                  <Alert closeButton={true} applyBorder={true}>
                    {alertMessage}
                  </Alert>
                </div>
              </OverlayPopup>
              <div className="flex flex-col gap-3  ">
                <div className="grid grid-cols-3 gap-x-2 px-4 gap-y-5 py-10 pb-32 mt-2 overflow-y-auto h-[950px]">
                  {filteredDishes.length > 0 &&
                    filteredDishes.map((item, i) => (
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
                                className="p-4 text-white  w-[12rem] flex flex-col mx-auto"
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
                                              origin={ingredient.origin}
                                              lightIcon={false}
                                              customDialog={
                                                <div className="bg-white w-full p-5 h-full flex justify-center items-center rounded-xl">
                                                  <WineDialogContent
                                                    title={ingredient.name}
                                                    img={WineImageRerence}
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
                              <div className="p-4 text-white  w-[12rem] flex flex-col mx-auto ">
                                <h2 className="text-xl font-semibold my-4 text-center">
                                  {item.name}
                                </h2>
                                <ul className="flex flex-col gap-1 w-44 overflow-y-auto pr-2 mx-auto justify-center">
                                  {item.ingredients.length > 0
                                    ? item.ingredients.map((ingredient) => (
                                        <div key={ingredient.id}>
                                          {ingredient?.imageUrl ? (
                                            <ClickableItem
                                              title={ingredient.name}
                                              description={
                                                ingredient.description!
                                              }
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
                        isSuggested={i == 0}
                        hasPairing={item.pairing_wine.length > 0}
                      >
                        <DishCard
                          item={item}
                          openTooltipId={openTooltipId}
                          setOpenTooltipId={setOpenTooltipId}
                        />
                      </Card>
                    ))}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Page
