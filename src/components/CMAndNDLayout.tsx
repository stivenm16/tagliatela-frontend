'use client'
import SaveIcon from '@/assets/svgs/SaveIcon.svg'
import TrashIcon from '@/assets/svgs/TrashIcon.svg'
import axiosInstance from '@/lib/axios'
import { FamilyType } from '@/types/global'
import { getDishImage } from '@/utils/getImage'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import CloseButton from './buttons/AlertCloseButton'
import { CustomMultiSelect } from './buttons/MultiSelect'

const fieldsToRender = [
  'Aperitivi',
  'Antipasti',
  'Curoe Felici',
  'Insalate',
  'Pati Principali',
  'Guarniciones',
  'Dolce Artigianali',
  'Edizione',
]
const options = [
  'Lasagna',
  'Risotto',
  'Pollo alla Cacciatora',
  'Bistecca',
  'Melanzane alla Parmigiana',
]

interface CMAndNDLayoutProps {
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
}: {
  name: string
  category: FamilyType
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
        <CloseButton onClick={() => {}} />
        {!!imgSrc ? (
          <Image
            src={imgSrc}
            alt={name}
            className="object-cover rounded-xl shadow-lg"
          />
        ) : null}
      </div>

      <h2 className="text-center text-sm uppercase font-bold ">{name}</h2>
    </div>
  )
}

const CMAndNDLayout = ({ title, variant }: CMAndNDLayoutProps) => {
  const [selectedDishes, setSelectedDishes] = useState<SelectedDishes[]>([
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
  ])
  const [fields, setFields] = useState<FieldDishes[]>([])

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

  useEffect(() => {
    getContent()
      .then((data) => {
        setFields(data)
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
              className={`cursor-pointer bg-${
                variant === 'check-meeting' ? 'checkmeeting' : 'not-available'
              }-main rounded-full size-8 flex justify-center items-center`}
            >
              <TrashIcon />
            </div>
            <div
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
                        i > 0 ? 'mt-10' : ''
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
          {fields &&
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
            ))}
        </div>
      </div>
    </div>
  )
}

export default CMAndNDLayout
