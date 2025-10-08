'use client'
import CardReferenceImage from '@/assets/images/card-reference-image.png'
import BeveragesIcon from '@/assets/svgs/beverages-card-icon.svg'
import IngredientsIcon from '@/assets/svgs/filters/ingredients/ingredients-icon.svg'
import InfoIcon from '@/assets/svgs/info-icon.svg'
import Alert from '@/components/Alert'
import Card from '@/components/Cards/Card'
import { ClickableItem } from '@/components/Dialog/ClickableItem'
import GeneralDialogContent from '@/components/Dialog/GeneralDialog'
import OverlayPopup from '@/components/Dialog/OverlayPopup'
import { useFilters } from '@/components/Layout/context/FilterContext'
import { Skeleton } from '@/components/ui/skeleton'
import axiosInstance from '@/lib/axios'
import Image from 'next/image'
import {
  JSX,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

export interface Ingredient {
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
  type: string
}

interface Props {
  text: string
  id: string
  openId: string | null
  setOpenId: (id: string | null) => void
}

function InfoWithPortal({ text, id, openId, setOpenId }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const tooltipRef = useRef<HTMLDivElement | null>(null)
  const isOpen = openId === id
  const [pos, setPos] = useState({ left: 0, top: 0 })
  const [flip, setFlip] = useState(false)

  useLayoutEffect(() => {
    if (!isOpen || !ref.current) return

    const rect = ref.current.getBoundingClientRect()

    // Calculate if we have enough space to the right
    const tooltipWidth = 150
    const spaceRight = window.innerWidth - rect.right
    const needsFlip = spaceRight < tooltipWidth + 12 // padding

    setFlip(needsFlip)
    setPos({ left: rect.left + rect.width / 2, top: rect.top })
  }, [isOpen])

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setOpenId(isOpen ? null : id)
  }

  return (
    <>
      <div
        ref={ref}
        onClick={handleToggle}
        className="flex items-center gap-2 cursor-pointer z-20 w-full"
      >
        <Image src={InfoIcon} alt="info" width={15} />
        <span className="pt-[1px]">vinagretas</span>
      </div>

      {isOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            onClick={(e) => e.stopPropagation()}
            className="fixed z-[9999] pointer-events-auto"
            style={{
              left: pos.left,
              top: pos.top - 8,
              transform: flip
                ? 'translate(-100%, -120%)'
                : 'translate(10%, -120%)',
            }}
          >
            <div
              ref={tooltipRef}
              className={`bg-suggested-main p-3 text-xs shadow-lg w-[15rem] max-w-xs rounded-xl ${
                flip ? 'rounded-br-none' : 'rounded-bl-none'
              }`}
            >
              <div className="text-pasta-main capitalize">
                Vinagretas:{' '}
                <span className="text-white normal-case">{text}</span>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
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

  const { filters } = useFilters()

  const getContent = useCallback(async () => {
    const response = await axiosInstance.get(
      `dish/search?typeName=${filters.family?.toUpperCase()}`,
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
                            content: (
                              <div className="p-4 text-white  w-[12rem] flex flex-col mx-auto ">
                                <h2 className="text-xl font-semibold my-4 text-center">
                                  {item.name}
                                </h2>
                                <ul className="flex flex-col gap-1 w-44 overflow-y-auto pr-2 mx-auto justify-center">
                                  {item.pairing_wine &&
                                  item.pairing_wine.length > 0
                                    ? item.pairing_wine.map((ingredient) => (
                                        <div key={ingredient.id}>
                                          {ingredient.imageUrl ? (
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
                                          {ingredient.imageUrl ? (
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
                        <div className="flex flex-col items-center gap-2 p-4 h-full w-full ">
                          <h2 className="capitalize text-center font-bold text-xl h-16 self-center flex items-center">
                            {item.name}
                          </h2>
                          <div className="relative overflow-visible">
                            <Image
                              src={CardReferenceImage}
                              alt={item.name}
                              width={210}
                              height={50}
                              className="rounded-2xl overflow-hidden"
                            />
                            {item.type.toLowerCase() === 'insalate' ? (
                              <div
                                className="bg-suggested-main  rounded-tl-full text-center h-8 flex items-center text-[13px] justify-start pl-6 text-white uppercase absolute w-full bottom-0"
                                onClick={(e) => {
                                  e.stopPropagation()
                                }}
                              >
                                <InfoWithPortal
                                  text="miel y pistachos, mango y albahaca y aliño tradicional"
                                  id={item.id}
                                  openId={openTooltipId}
                                  setOpenId={setOpenTooltipId}
                                />
                              </div>
                            ) : null}
                          </div>
                          <h2 className="font-medium text-sm text-center">
                            {item.description.slice(0, 80)}...
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
