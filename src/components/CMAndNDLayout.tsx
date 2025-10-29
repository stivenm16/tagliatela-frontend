'use client'
import MinusIcon from '@/assets/svgs/minus-icon.svg'
import SaveIcon from '@/assets/svgs/SaveIcon.svg'
import TrashIcon from '@/assets/svgs/TrashIcon.svg'
import axiosInstance from '@/lib/axios'
import { FamilyType } from '@/types/global'
import { getDishImage } from '@/utils/getImage'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import CloseButton from './buttons/AlertCloseButton'
import { CustomMultiSelect } from './Selects/MultiSelect'

export interface CMAndNDLayoutProps {
  variant: 'check-meeting' | 'no-disponibles'
  title?: string
}

interface Dish {
  id: number
  name: string
  thumbnailUrl: string
}
interface FieldDishes {
  name: FamilyType
  dishes: Dish[]
}

interface SelectedDishes {
  name: FamilyType
  dishes: number[]
}

const SelectedDishCard = ({
  name,
  category,
  variant,
  id,
  removeDish,
}: {
  name: string
  category: FamilyType
  variant: CMAndNDLayoutProps['variant']
  id: number
  removeDish: (dishId: number, category: FamilyType) => void
}) => {
  const [imgSrc, setImgSrc] = useState<StaticImport | string>('')

  useEffect(() => {
    let isMounted = true
    getDishImage(name, category).then((src) => {
      if (isMounted) setImgSrc(src as any)
    })
    return () => {
      isMounted = false
    }
  }, [name, category])

  return (
    <div className="flex flex-col w-full h-full relative  justify-center items-center gap-2">
      <div className="relative">
        <CloseButton
          onClick={() => removeDish(id, category)}
          variant={variant}
          icon={<MinusIcon />}
        />
        {!!imgSrc ? (
          <Image
            src={imgSrc}
            alt={name}
            className="object-cover size-40 rounded-xl shadow-lg"
          />
        ) : null}
      </div>

      <h2
        className="text-center text-md uppercase font-semibold"
        style={{
          color:
            variant === 'check-meeting'
              ? 'var(--pasta-main)'
              : 'var(--suggested-main)',
        }}
      >
        {name}
      </h2>
    </div>
  )
}

const initialState: SelectedDishes[] = [
  {
    name: FamilyType.APERITIVI,
    dishes: [],
  },
  {
    name: FamilyType.INSALATE,
    dishes: [],
  },
  {
    name: FamilyType.ANTIPASTI,
    dishes: [],
  },
  {
    name: FamilyType.PIATTI_PRINCIPALI,
    dishes: [],
  },
  {
    name: FamilyType.GUARNICIONES,
    dishes: [],
  },
  {
    name: FamilyType.SALSAS,
    dishes: [],
  },
  {
    name: FamilyType.LE_PIZZE,
    dishes: [],
  },
  {
    name: FamilyType.POSTRES,
    dishes: [],
  },
  {
    name: FamilyType.CUORE_FELICE,
    dishes: [],
  },
]

const Skeletons = ({ variant }: { variant: CMAndNDLayoutProps['variant'] }) => {
  return (
    <div className="flex flex-col  w-full h-full gap-6  mx-auto px-16 ml-10">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className=" animate-pulse h-6 w-full rounded mb-4 bg-white/40"
        />
      ))}
    </div>
  )
}
const CMAndNDLayout = ({ title, variant }: CMAndNDLayoutProps) => {
  const [selectedDishes, setSelectedDishes] =
    useState<SelectedDishes[]>(initialState)
  const [fields, setFields] = useState<FieldDishes[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const baseUrl =
    variant === 'check-meeting'
      ? 'checkmeeting/recommended'
      : 'unavailable/disable'

  const getContent = async () => {
    const response = await axiosInstance.get(
      `checkmeeting?is_checkmeeting=${variant === 'check-meeting'}`,
      {
        withCredentials: true,
      },
    )

    if (response.status !== 200) {
      throw new Error('Error fetching dishes')
    }

    return response.data
  }

  const updateDishes = async (dishes: SelectedDishes[] | any[]) => {
    try {
      const response = await axiosInstance.post(baseUrl, dishes)
      if (response.status !== 200 && response.status !== 201) {
        throw new Error('Error updating dishes')
      }
      toast('Actualizado con éxito', {
        description: 'Los platos fueron actualizados correctamente',
        action: {
          label: 'Cerrar',
          onClick: () => toast.dismiss(),
        },
      })
      return response.data
    } catch (error) {
      console.error('Error updating dishes:', error)
    }
  }

  const getSelectedDishesFromDB = async (
    variant: CMAndNDLayoutProps['variant'],
  ) => {
    try {
      const response = await axiosInstance.get(
        variant === 'check-meeting' ? baseUrl : '/unavailable',
        {
          withCredentials: true,
        },
      )
      return response.data
    } catch (error) {
      console.error('Error fetching selected dishes:', error)
    }
  }
  useEffect(() => {
    Promise.all([getSelectedDishesFromDB(variant), getContent()])
      .then(([selectedDishesData, fieldsData]) => {
        if (fieldsData) {
          setFields(fieldsData)
        }
        if (selectedDishesData) {
          const formattedSelectedDishes: SelectedDishes[] = selectedDishes.map(
            (s) => {
              const fieldFromDB = (selectedDishesData as FieldDishes[]).find(
                (f) => f.name === s.name,
              )
              return {
                name: s.name,
                dishes: fieldFromDB ? fieldFromDB.dishes.map((d) => d.id) : [],
              }
            },
          )
          setSelectedDishes(formattedSelectedDishes)
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const handleOnChange = (fieldName: FamilyType, selectedIndices: number[]) => {
    const updatedSelectedDishes = selectedDishes.map((s) => {
      if (s.name === fieldName) {
        return {
          ...s,
          dishes: [...selectedIndices],
        }
      }
      return s
    })
    setSelectedDishes(updatedSelectedDishes)
  }

  const onSubmit = (dishesParam?: SelectedDishes[]) => {
    const filteredDishes = (dishesParam ?? selectedDishes).filter(
      (s) => s.dishes.length > 0,
    )
    if (filteredDishes.length === 0) {
      updateDishes([{}])
    } else {
      updateDishes(filteredDishes)
    }
  }

  const removeDishesFromSelected = (dishId: number, category: FamilyType) => {
    const updatedSelectedDishes = selectedDishes.map((s) => {
      if (s.name === category) {
        return {
          ...s,
          dishes: s.dishes.filter((d) => d !== dishId),
        }
      }
      return s
    })
    setSelectedDishes(updatedSelectedDishes)
  }
  return (
    <div className="w-full flex flex-col">
      <div className="flex relative px-10 ">
        <div className="w-[60%] flex flex-col items-center">
          <span
            className={`uppercase ${
              variant === 'check-meeting'
                ? 'text-checkmeeting-main'
                : 'text-not-available-main'
            } font-bold text-xl text-center`}
          >
            Seleccionados
          </span>

          <div className="flex gap-24 mt-4">
            <div
              onClick={() => {
                setSelectedDishes(() => {
                  onSubmit(initialState)
                  return initialState
                })
              }}
              className={`cursor-pointer bg-${
                variant === 'check-meeting' ? 'checkmeeting' : 'not-available'
              }-main rounded-full size-8 flex justify-center items-center`}
            >
              <TrashIcon />
            </div>
            <div
              onClick={() => onSubmit(selectedDishes)}
              className={`cursor-pointer bg-${
                variant === 'check-meeting' ? 'checkmeeting' : 'not-available'
              }-main rounded-full size-8 flex justify-center items-center`}
            >
              <SaveIcon />
            </div>
          </div>
          <div className="flex flex-col mt-2 h-[45rem] pb-20 overflow-y-auto  w-full mb-2">
            {isLoading ? (
              <div className="h-full">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className=" animate-pulse size-48 rounded-md mx-auto my-2 mb-4 bg-white/40"
                  />
                ))}
              </div>
            ) : null}

            {selectedDishes.map((s, i) => {
              return (
                <div key={i} className="flex flex-col items-center gap-3">
                  {s.dishes.length > 0 && (
                    <h2
                      className={`text-center uppercase mt-8 font-bold  text-lg ${
                        variant === 'check-meeting'
                          ? 'text-checkmeeting-main'
                          : 'text-not-available-main'
                      }`}
                    >
                      {s.name}
                    </h2>
                  )}
                  {s.dishes.map((d, index) => {
                    return (
                      <SelectedDishCard
                        key={index}
                        removeDish={removeDishesFromSelected}
                        category={s.name}
                        variant={variant}
                        id={
                          fields
                            .find((f) => f.name === s.name)
                            ?.dishes.find((dish) => dish.id === d)?.id || 0
                        }
                        name={
                          fields
                            .find((f) => f.name === s.name)
                            ?.dishes.find((dish) => dish.id === d)?.name || ''
                        }
                      />
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
        <div className="border-r border-checkmeeting-main  h-[45rem]" />
        <div className="w-full flex flex-col gap-6 items-center">
          {fields.length > 0 ? (
            fields.map((field, i) => (
              <CustomMultiSelect
                label={field.name}
                options={field.dishes.map((d) => {
                  return {
                    id: d.id,
                    name: d.name,
                  }
                })}
                key={i}
                variant={variant}
                selectedIndices={
                  selectedDishes.find((s) => s.name === field.name)?.dishes ||
                  []
                }
                onChange={(selectedOptions) => {
                  handleOnChange(field.name, selectedOptions)
                }}
              />
            ))
          ) : (
            <Skeletons variant={variant} />
          )}
        </div>
      </div>
    </div>
  )
}

export default CMAndNDLayout
