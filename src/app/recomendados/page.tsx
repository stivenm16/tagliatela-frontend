'use client'
import CardReferenceImage from '@/assets/images/card-reference-image.png'
import BeveragesIcon from '@/assets/svgs/beverages-card-icon.svg'
import IngredientsIcon from '@/assets/svgs/filters/ingredients/ingredients-icon.svg'
import Alert from '@/components/Alert'
import Card from '@/components/Cards/Card'
import GeneralDialogContent from '@/components/Dialog/GeneralDialog'
import OverlayPopup from '@/components/Dialog/OverlayPopup'
import { useFilters } from '@/components/Layout/context/FilterContext'
import { Skeleton } from '@/components/ui/skeleton'
import axiosInstance from '@/lib/axios'
import Image from 'next/image'
import { JSX, useCallback, useEffect, useState } from 'react'

interface Ingredient {
  id: string
  name: string
  description?: string
  imageUrl?: string
  isAvaible?: boolean
  isRecommended?: boolean
  origin?: string
  thubnailUrl?: string
}

interface Filter {
  diets?: { id: string; name: string }[]
  allergens?: { id: string; name: string }[]
  flavors?: { id: string; name: string }[]
  ingredients?: { id: string; name: string }[]
  families?: { id: string; name: string }[]
  basePastas?: { id: string; name: string }[]
}
interface Dish {
  description: string
  familyName: string
  filter: Filter
  id: string
  imgUrl: string
  ingredients: Ingredient[]
  isAvaible: boolean
  isNew: boolean
  isRecommended: boolean
  name: string
  pairing_wine: Ingredient[]
  thumbnailUrl: string
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
  const [filtersSelected, setFiltersSelected] = useState({
    diet: null,
    allergen: null,
    ingredient: null,
    flavor: null,
    family: null,
  })

  const [dishes, setDishes] = useState<Dish[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(true)
  const [alertMessage, setAlertMessage] =
    useState<JSX.Element>(suggestionsMessage)

  const { filters } = useFilters()

  const getContent = useCallback(async () => {
    const response = await axiosInstance.get(
      `dish/search?familyName=${filters.family?.toUpperCase()}`,
      {
        withCredentials: true,
      },
    )
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
            setDishes(data)
            console.log(data, '<====== data')
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

  const fakeIngredients = Array.from({ length: 3 }, (_, i) => ({
    id: i + 1,
    name: `Ingrediente ${i + 1}`,
    description: `Descripción del ${i + 1}`,
  }))

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
  const filteredDishes = dishes.filter((dish) => {
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
                            description={item.description}
                            img={CardReferenceImage}
                          />
                        }
                        height="28rem"
                        width="14.5rem"
                        backgroundCard="bg-neutral-50"
                        flipContentOptions={[
                          {
                            content: <div>Contenido 2</div>,
                            icon: BeveragesIcon,
                            label: 'Bebidas',
                            color: 'bg-pasta-main',
                            iconWidth: 15,
                          },
                          {
                            content: (
                              <div className="p-4">
                                <h2 className="text-lg font-semibold mb-2">
                                  Ingredientes
                                </h2>
                                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-2">
                                  {(item.ingredients.length > 0
                                    ? item.ingredients
                                    : fakeIngredients
                                  ).map((ingredient) => (
                                    <div key={ingredient.id}> test</div>
                                    // <ClickableItem
                                    //   key={ingredient.id}
                                    //   // icon={IngredientsIcon}
                                    //   text={ingredient.name}
                                    // />
                                  ))}
                                </div>
                              </div>
                            ),
                            icon: IngredientsIcon,
                            label: 'Ingredientes',
                            color: 'bg-italian-main',
                            iconWidth: 24,
                          },
                        ]}
                        isSuggested={i == 0}
                      >
                        <div className="flex flex-col items-center gap-2 p-4 h-full w-full ">
                          <h2 className="capitalize text-center font-bold text-xl mt-3">
                            {item.name}
                          </h2>
                          <Image
                            src={CardReferenceImage}
                            alt={item.name}
                            width={210}
                            height={50}
                            className="rounded-2xl overflow-hidden"
                          />
                          <h2 className="font-medium text-center">
                            {item.description.slice(0, 70)}...
                          </h2>
                        </div>
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
