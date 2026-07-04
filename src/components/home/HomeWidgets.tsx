'use client'

import { getSelectedDishesFromDB } from '@/components/CMAndNDLayout/services'
import { FieldDishes } from '@/components/CMAndNDLayout/types'
import { FamilyType } from '@/types/global'
import { useEffect, useState } from 'react'
import { CheckMeetingWidget, CheckMeetingWidgetDish } from './CheckMeetingWidget'
import { NoDisponiblesWidget, NoDisponiblesWidgetDish } from './NoDisponiblesWidget'

interface HomeWidgetsData {
  checkMeeting: CheckMeetingWidgetDish[]
  noDisponibles: NoDisponiblesWidgetDish[]
}

const flatFieldDishesToCheckMeeting = (
  data?: FieldDishes[],
): CheckMeetingWidgetDish[] => {
  if (!Array.isArray(data)) return []

  return data.flatMap((category) => {
    const categoryName = category.name as FamilyType
    return (category.dishes ?? []).map((dish) => ({
      id: dish.id,
      name: dish.name,
      category: categoryName,
      quantity: (dish as unknown as { quantity?: number }).quantity ?? 1,
    }))
  })
}

const flatFieldDishesToNoDisponibles = (
  data?: FieldDishes[],
): NoDisponiblesWidgetDish[] => {
  if (!Array.isArray(data)) return []

  return data.flatMap((category) => {
    const categoryName = category.name as FamilyType
    return (category.dishes ?? []).map((dish) => ({
      id: dish.id,
      name: dish.name,
      category: categoryName,
    }))
  })
}

export const HomeWidgets = () => {
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
        const [checkMeetingData, noDisponiblesData] = await Promise.all([
          getSelectedDishesFromDB('check-meeting'),
          getSelectedDishesFromDB('no-disponibles'),
        ])

        if (cancelled) return

        setData({
          checkMeeting: flatFieldDishesToCheckMeeting(checkMeetingData),
          noDisponibles: flatFieldDishesToNoDisponibles(noDisponiblesData),
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

  if (isLoading) {
    return (
      <div className="flex flex-col md:flex-row gap-6 justify-center w-full">
        <div className="flex-1 min-w-[18rem] max-w-md h-48 animate-pulse bg-white/30 rounded-xl" />
        <div className="flex-1 min-w-[18rem] max-w-md h-48 animate-pulse bg-white/30 rounded-xl" />
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center w-full">
      <CheckMeetingWidget dishes={data.checkMeeting} />
      <NoDisponiblesWidget dishes={data.noDisponibles} />
      {error && (
        <p className="sr-only" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
