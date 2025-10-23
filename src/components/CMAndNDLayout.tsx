'use client'
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
import { CustomMultiSelect } from './buttons/MultiSelect'

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
}: {
  name: string
  category: FamilyType
  variant: CMAndNDLayoutProps['variant']
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
        <CloseButton onClick={() => {}} variant={variant} />
        {!!imgSrc ? (
          <Image
            src={imgSrc}
            alt={name}
            className="object-cover size-40 rounded-xl shadow-lg"
          />
        ) : null}
      </div>

      <h2 className="text-center text-sm uppercase font-bold ">{name}</h2>
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
          className=" animate-pulse h-6 w-full rounded mb-4"
          style={{
            backgroundColor:
              variant === 'no-disponibles'
                ? 'var(--not-available-main)'
                : 'var(--checkmeeting-main)',
          }}
        />
      ))}
    </div>
  )
}
const CMAndNDLayout = ({ title, variant }: CMAndNDLayoutProps) => {
  const [selectedDishes, setSelectedDishes] =
    useState<SelectedDishes[]>(initialState)
  const [fields, setFields] = useState<FieldDishes[]>([])
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
    if (variant === 'no-disponibles') return
    try {
      const response = await axiosInstance.get(baseUrl, {
        withCredentials: true,
      })
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
          const formattedSelectedDishes: SelectedDishes[] = (
            selectedDishesData as FieldDishes[]
          ).map((dish) => {
            return {
              name: dish.name as FamilyType,
              dishes: dish.dishes.map((d: Dish) => d.id) || [],
            }
          })
          setSelectedDishes(formattedSelectedDishes)
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
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
          <div className="flex flex-col mt-4 h-[45rem] pb-20 overflow-y-auto  w-full mb-2">
            {selectedDishes.map((s, i) => {
              return (
                <div key={i} className="flex flex-col items-center gap-3">
                  {s.dishes.length > 0 && (
                    <h2
                      className={`text-center uppercase font-bold ${
                        i > 0 ? 'mt-6' : ''
                      } ${
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
                        category={s.name}
                        variant={variant}
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
        <div className="w-full flex flex-col gap-4 items-center">
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
                onChange={(selectedOptions) =>
                  handleOnChange(field.name, selectedOptions)
                }
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
