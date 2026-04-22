'use client'
import SaveIcon from '@/../../public/svgs/SaveIcon.svg'
import TrashIcon from '@/../../public/svgs/TrashIcon.svg'
import useIsLandscape from '@/hooks/useIsLandscape'
import { FamilyType } from '@/types/global'
import { useEffect, useState } from 'react'
import { CustomMultiSelect } from '../Selects/MultiSelect'
import { SelectedDishCard, Skeletons } from './components'
import { getContent, getSelectedDishesFromDB, updateDishes } from './services'
import {
  CMAndNDLayoutProps,
  Field,
  FieldDishes,
  OptionGroup,
  SelectedDishes,
} from './types'
import {
  buildFields,
  mapSelectedFromDB,
  normalizeForSubmit,
} from './utils/adapters'
import { initialState } from './utils/constants'
import { findDishById } from './utils/funcs'

const CMAndNDLayout = ({ title, variant }: CMAndNDLayoutProps) => {
  const [selectedDishes, setSelectedDishes] =
    useState<SelectedDishes[]>(initialState)
  const [fields, setFields] = useState<Field[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const isLandscape = useIsLandscape()

  useEffect(() => {
    Promise.all([getSelectedDishesFromDB(variant), getContent(variant)])
      .then(([selectedDishesData, fieldsData]) => {
        if (fieldsData) setFields(buildFields(fieldsData, variant))
        if (selectedDishesData)
          setSelectedDishes(
            mapSelectedFromDB(
              selectedDishes,
              selectedDishesData as FieldDishes[],
            ),
          )
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const handleOnChange = (field: Field, selectedIds: number[]) => {
    if (field.isGrouped) {
      const updated = [...selectedDishes]

      field.groups.forEach((group: OptionGroup) => {
        const groupIds = group.options.map((o) => o.id)

        const selectedForGroup = selectedIds.filter((id) =>
          groupIds.includes(id),
        )

        const index = updated.findIndex((s) => s.name === group.label)

        if (index !== -1) {
          updated[index] = {
            ...updated[index],
            dishes: selectedForGroup,
          }
        }
      })

      setSelectedDishes(updated)
      return
    }

    // ✅ normal behavior
    const updatedSelectedDishes = selectedDishes.map((s) => {
      if (s.name === field.name) {
        return {
          ...s,
          dishes: [...selectedIds],
        }
      }
      return s
    })

    setSelectedDishes(updatedSelectedDishes)
  }

  const onSubmit = (dishesParam?: SelectedDishes[]) => {
    const normalized = normalizeForSubmit(dishesParam ?? selectedDishes, fields)

    const filteredDishes = normalized.filter((s) => s.dishes.length > 0)

    if (filteredDishes.length === 0) {
      updateDishes([{}], variant)
    } else {
      updateDishes(filteredDishes, variant)
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

  const textColorClass =
    variant === 'check-meeting'
      ? 'text-checkmeeting-main'
      : 'text-not-available-main'

  const bgColorClass =
    variant === 'check-meeting'
      ? 'bg-checkmeeting-main'
      : 'bg-not-available-main'
  return (
    <div className="w-full flex flex-col">
      <div className="flex relative px-10 ">
        <div className="w-[60%] flex flex-col items-center">
          <span
            className={`uppercase ${textColorClass} font-bold text-xl text-center`}
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
              className={`cursor-pointer ${bgColorClass} rounded-full size-8 flex justify-center items-center`}
            >
              <TrashIcon />
            </div>
            <div
              onClick={() => onSubmit(selectedDishes)}
              className={`cursor-pointer ${bgColorClass} rounded-full size-8 flex justify-center items-center`}
            >
              <SaveIcon />
            </div>
          </div>
          <div
            className={`flex flex-col mt-2 ${
              isLandscape ? 'h-[30rem]' : 'h-[45rem]'
            } pb-20 overflow-y-auto  w-full mb-2`}
          >
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
                <div key={i} className="flex flex-col items-center gap-3 px-2">
                  {s.dishes.length > 0 && (
                    <h2
                      className={`text-center uppercase font-bold  text-lg ${textColorClass}`}
                    >
                      {s.name}
                    </h2>
                  )}
                  <div
                    className={`${
                      s.name.toLowerCase() === 'guarniciones' ||
                      s.name.toLowerCase() === 'vinagretas'
                        ? 'bg-black/10 shadow-lg rounded-xl '
                        : null
                    } flex flex-col w-full `}
                  >
                    {s.dishes.map((d, index) => {
                      const dish = findDishById(d, s.name, fields)
                      return (
                        <SelectedDishCard
                          key={d}
                          removeDish={removeDishesFromSelected}
                          category={s.name}
                          variant={variant}
                          id={dish?.id || 0}
                          name={dish?.name || ''}
                        />
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div
          className={`border-r border-checkmeeting-main  ${
            isLandscape ? 'h-[30rem]' : 'h-[45rem]'
          }`}
        />
        <div
          className={`w-full flex flex-col ${
            isLandscape ? 'gap-3' : 'gap-6'
          } items-center`}
        >
          {fields.length > 0 ? (
            fields.map((field, i) => (
              <CustomMultiSelect
                label={field.name}
                options={
                  field.isGrouped
                    ? field.groups
                    : field.dishes.map((d) => ({
                        id: d.id,
                        name: d.name,
                      }))
                }
                key={i}
                variant={variant}
                selectedIndices={
                  field.isGrouped
                    ? field.groups.flatMap((group: OptionGroup) => {
                        const found = selectedDishes.find(
                          (s) => s.name === group.label,
                        )
                        return found?.dishes || []
                      })
                    : selectedDishes.find((s) => s.name === field.name)
                        ?.dishes || []
                }
                onChange={(selectedOptions) => {
                  handleOnChange(field, selectedOptions)
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
