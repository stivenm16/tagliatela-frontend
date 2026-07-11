'use client'

import {
  getContent,
  getSelectedDishesFromDB,
  updateDishes,
} from '@/components/CMAndNDLayout/services'
import { Field, FieldDishes, SelectedDishes } from '@/components/CMAndNDLayout/types'
import {
  buildFields,
  mapSelectedFromDB,
  normalizeForSubmit,
} from '@/components/CMAndNDLayout/utils/adapters'
import { initialState } from '@/components/CMAndNDLayout/utils/constants'
import { FamilyType } from '@/types/global'
import { useEffect, useRef, useState } from 'react'
import { CheckMeetingWidget, CheckMeetingWidgetDish } from './CheckMeetingWidget'
import { NoDisponiblesWidget, NoDisponiblesWidgetDish } from './NoDisponiblesWidget'

interface HomeWidgetsData {
  checkMeeting: CheckMeetingWidgetDish[]
  noDisponibles: NoDisponiblesWidgetDish[]
}

const buildCheckMeetingDishes = (
  fieldDishes?: FieldDishes[],
  selected?: SelectedDishes[],
): CheckMeetingWidgetDish[] => {
  if (!Array.isArray(fieldDishes)) return []

  return fieldDishes.flatMap((category) => {
    const categorySelected = selected?.find((s) => s.name === category.name)
    return (category.dishes ?? [])
      .filter((dish) => {
        // Only show dishes still present in the selected state (quantity > 0)
        const qty = categorySelected?.quantities[dish.id]
        return qty !== undefined && qty > 0
      })
      .map((dish) => ({
        id: dish.id,
        name: dish.name,
        category: category.name,
        quantity: categorySelected!.quantities[dish.id],
      }))
  })
}

const flatFieldDishesToNoDisponibles = (
  data?: FieldDishes[],
): NoDisponiblesWidgetDish[] => {
  if (!Array.isArray(data)) return []

  const dishes = data.flatMap((category) =>
    (category.dishes ?? []).map((dish) => ({
      id: dish.id,
      name: dish.name,
    })),
  )

  // Deduplicate by dish id — keep first occurrence
  const seen = new Set<number>()
  return dishes.filter((d) => {
    if (seen.has(d.id)) return false
    seen.add(d.id)
    return true
  })
}

export const HomeWidgets = () => {
  const [checkMeetingFieldDishes, setCheckMeetingFieldDishes] = useState<FieldDishes[]>([])
  const [checkMeetingSelected, setCheckMeetingSelected] =
    useState<SelectedDishes[]>(initialState)
  const [checkMeetingFields, setCheckMeetingFields] = useState<Field[]>([])
  /**
   * Refs that always hold the freshest values so the click handler can persist
   * without reading a stale closure (and without firing inside a setState updater,
   * which in React Strict Mode would run twice and double-fire the POST).
   */
  const fieldsRef = useRef<Field[]>([])
  const selectedRef = useRef<SelectedDishes[]>(initialState)
  const [data, setData] = useState<HomeWidgetsData>({
    checkMeeting: [],
    noDisponibles: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const fetchWidgets = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const [checkMeetingData, checkMeetingContent, noDisponiblesData] =
          await Promise.all([
            getSelectedDishesFromDB('check-meeting'),
            getContent('check-meeting'),
            getSelectedDishesFromDB('no-disponibles'),
          ])

        if (cancelled) return

        const fields = buildFields(checkMeetingContent as Field[], 'check-meeting')
        const selected = mapSelectedFromDB(
          initialState,
          checkMeetingData as FieldDishes[],
        )

        setCheckMeetingFields(fields)
        fieldsRef.current = fields
        setCheckMeetingFieldDishes(checkMeetingData as FieldDishes[])
        setCheckMeetingSelected(selected)
        selectedRef.current = selected

        setData({
          checkMeeting: buildCheckMeetingDishes(
            checkMeetingData as FieldDishes[],
            selected,
          ),
          noDisponibles: flatFieldDishesToNoDisponibles(
            noDisponiblesData as FieldDishes[],
          ),
        })
      } catch (err) {
        if (!cancelled) {
          console.error('Error fetching home widgets:', err)
          setError('No se pudieron cargar los widgets')
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    fetchWidgets()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      checkMeeting: buildCheckMeetingDishes(
        checkMeetingFieldDishes,
        checkMeetingSelected,
      ),
    }))
  }, [checkMeetingFieldDishes, checkMeetingSelected])

  const persistCheckMeeting = (nextSelected: SelectedDishes[]) => {
    const normalized = normalizeForSubmit(nextSelected, fieldsRef.current)
    const filtered = normalized.filter((s) => s.dishes.length > 0)
    updateDishes(filtered.length > 0 ? filtered : [{}], 'check-meeting')
  }

  const handleQuantityChange = (
    category: FamilyType,
    dishId: number,
    delta: number,
  ) => {
    // Compute next state OUTSIDE the updater so the POST fires exactly once
    // (not twice like it did inside the updater under Strict Mode).
    const prev = selectedRef.current
    const next = prev.map((s) => {
      if (s.name !== category) return s
      const current = s.quantities[dishId] ?? 1
      const newQty = Math.max(0, current + delta)

      if (newQty === 0) {
        const newDishes = s.dishes.filter((id) => id !== dishId)
        const newQuantities = { ...s.quantities }
        delete newQuantities[dishId]
        return { ...s, dishes: newDishes, quantities: newQuantities }
      }

      return {
        ...s,
        quantities: { ...s.quantities, [dishId]: newQty },
      }
    })

    selectedRef.current = next
    setCheckMeetingSelected(next)
    persistCheckMeeting(next)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col md:flex-row gap-6 justify-center w-full">
        <div className="w-[30rem] h-60 animate-pulse bg-white/30 rounded-2xl" />
        <div className="w-[30rem] h-60 animate-pulse bg-white/30 rounded-2xl" />
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center w-full">
      <CheckMeetingWidget
        dishes={data.checkMeeting}
        onQuantityChange={handleQuantityChange}
      />
      <NoDisponiblesWidget dishes={data.noDisponibles} />
      {error && (
        <p className="sr-only" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
