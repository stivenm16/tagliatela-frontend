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

  const flatQuantities = selectedDishes.reduce<Record<number, number>>(
    (acc, category) => {
      Object.entries(category.quantities).forEach(([id, qty]) => {
        acc[Number(id)] = qty
      })
      return acc
    },
    {},
  )

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

  const syncQuantities = (
    prev: SelectedDishes,
    newIds: number[],
  ): SelectedDishes => {
    const quantities = { ...prev.quantities }
    // Initialize quantity=1 for new selections, clean up removed ones
    newIds.forEach((id) => {
      if (!(id in quantities)) quantities[id] = 1
    })
    Object.keys(quantities).forEach((key) => {
      if (!newIds.includes(Number(key))) delete quantities[Number(key)]
    })
    return { ...prev, dishes: newIds, quantities }
  }

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
          updated[index] = syncQuantities(updated[index], selectedForGroup)
        }
      })

      setSelectedDishes(updated)
      return
    }

    // ✅ normal behavior
    const updatedSelectedDishes = selectedDishes.map((s) => {
      if (s.name === field.name) {
        return syncQuantities(s, selectedIds)
      }
      return s
    })

    setSelectedDishes(updatedSelectedDishes)
  }

  const handleQuantityChange = (
    category: FamilyType,
    dishId: number,
    delta: number,
  ) => {
    setSelectedDishes((prev) =>
      prev.map((s) => {
        if (s.name !== category) return s
        const current = s.quantities[dishId] ?? 0
        const newQty = Math.max(0, current + delta)
        if (newQty === 0) {
          // Remove dish if quantity reaches 0
          const newDishes = s.dishes.filter((id) => id !== dishId)
          const newQuantities = { ...s.quantities }
          delete newQuantities[dishId]
          return { ...s, dishes: newDishes, quantities: newQuantities }
        }
        // Add dish to selected list when increasing from 0
        const newDishes = s.dishes.includes(dishId)
          ? s.dishes
          : [...s.dishes, dishId]
        return {
          ...s,
          dishes: newDishes,
          quantities: { ...s.quantities, [dishId]: newQty },
        }
      }),
    )
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
        const quantities = { ...s.quantities }
        delete quantities[dishId]
        return {
          ...s,
          dishes: s.dishes.filter((d) => d !== dishId),
          quantities,
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
    <div className="flex-1 flex flex-col">
        <div className="flex-1 flex relative px-10 pt-4">
        {/* Left column: selected dishes */}
        <div className="w-1/3 flex flex-col items-center">
          <span
            className={`uppercase ${textColorClass} font-bold text-xl text-center shrink-0`}
          >
            Seleccionados
          </span>

          <div className="flex gap-24 mt-4 shrink-0">
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

          {/* Scrollable dishes list */}
          <div className="flex flex-col mt-2 w-full max-h-[calc(100vh-14rem)] overflow-y-auto pb-4">
            {isLoading ? (
              <div className="">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse size-48 rounded-md mx-auto my-2 mb-4 bg-white/40"
                  />
                ))}
              </div>
            ) : null}

            {selectedDishes.map((s, i) => {
              return (
                <div key={i} className="flex flex-col items-center gap-3 px-2">
                  {s.dishes.length > 0 && (
                    <h2
                      className={`text-center uppercase font-bold text-lg ${textColorClass}`}
                    >
                      {s.name}
                    </h2>
                  )}
                  <div className="flex flex-col w-full">
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
                          quantity={s.quantities[d] ?? 1}
                        />
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Vertical divider — capped to match scroll area max height */}
        <div className="border-r border-checkmeeting-main shrink-0 max-h-[calc(100vh-8rem)]" />

        {/* Right column: selectors */}
        <div className="flex-1 pl-4 overflow-y-visible">
          {fields.length > 0 ? (
            <div className={`flex flex-col ${isLandscape ? 'gap-3' : 'gap-6'} items-center`}>
              {fields.map((field, i) => (
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
                  quantities={flatQuantities}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
            </div>
          ) : (
            <Skeletons variant={variant} />
          )}
        </div>
      </div>
    </div>
  )
}

export default CMAndNDLayout
