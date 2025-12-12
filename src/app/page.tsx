'use client'
import BeveragesIcon from '@/assets/svgs/beverages-home-icon.svg'
import Checckmeeting from '@/assets/svgs/checkmeeting-home-icon.svg'
import ItalianIcon from '@/assets/svgs/italian-home-icon.svg'
import NotAvailable from '@/assets/svgs/not-available-home-icon.svg'
import PastaIcon from '@/assets/svgs/pasta-home-icon.svg'
import SuggestedIcon from '@/assets/svgs/suggested-home-icon.svg'
import Logo from '@/components/Icons/LOGO.svg'
import axiosInstance from '@/lib/axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const fakeData2 = [
  {
    title: 'Recomendar',
    color: 'bg-suggested-main',
    icon: SuggestedIcon,
    items: [
      { title: 'familia', href: '/recomendados' },
      { title: 'Dietas', href: 'dietas/recomendados' },
      { title: 'Ingredientes', href: 'ingredientes/recomendados' },
      { title: 'Sabores', href: 'sabores/recomendados' },
    ],
  },
  {
    title: 'Pastas',
    color: 'bg-pasta-main',
    icon: PastaIcon,
    items: [
      { title: 'Salsa', href: '/pasta/' },
      { title: 'Tipo de Pastas', href: '/pasta/tipo-de-pastas' },
    ],
  },
  {
    title: 'Producto Italiano',
    color: 'bg-italian-main',
    icon: ItalianIcon,
    items: [
      { title: 'Quesos', href: '/productos-italianos' },
      { title: 'Embutidos', href: '/productos-italianos/embutidos' },
      { title: 'Gusto Secreto', href: '/productos-italianos/gusto-secreto' },
    ],
  },
  {
    title: 'Bebidas',
    color: 'bg-beverages-main',
    icon: BeveragesIcon,
    items: [
      { title: 'Vinos', href: '/bebidas' },
      { title: 'Cocteles', href: '/bebidas/cocteles' },
      { title: 'Sangría', href: '/bebidas/sangria' },
    ],
  },
]

export default function Home() {
  const [suggestedDishes, setSuggestedDishes] = useState<number | null>(null)
  const [notAvailableDishes, setNotAvailableDishes] = useState<number | null>(
    null,
  )
  const [isLoadingSuggestedDishes, setIsLoadingSuggestedDishes] =
    useState<boolean>(true)
  const [isLoadingNotAvailableDishes, setIsLoadingNotAvailableDishes] =
    useState<boolean>(true)

  const getNotAvailableDishes = async () => {
    const response = await axiosInstance.get(`unavailable`, {
      withCredentials: true,
    })

    if (response.status !== 200) {
      throw new Error('Error fetching dishes')
    }

    return response.data
  }
  const getSuggestedDishes = async () => {
    const response = await axiosInstance.get(`checkmeeting/recommended`, {
      withCredentials: true,
    })

    if (response.status !== 200) {
      throw new Error('Error fetching dishes')
    }

    return response.data
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [notAvailable, suggested] = await Promise.all([
          getNotAvailableDishes(),
          getSuggestedDishes(),
        ])

        // Count dishes in "not available"
        const notAvailableCount = notAvailable.reduce(
          (count: number, dish: { name: string; dishes: any[] }) =>
            count + dish.dishes.length,
          0,
        )

        // Count dishes in "suggested"
        const suggestedCount = suggested.reduce(
          (count: number, dish: { name: string; dishes: any[] }) =>
            count + dish.dishes.length,
          0,
        )

        setNotAvailableDishes(notAvailableCount)
        setSuggestedDishes(suggestedCount)
      } catch (error) {
        console.error('Error fetching dishes:', error)
      } finally {
        setIsLoadingSuggestedDishes(false)
        setIsLoadingNotAvailableDishes(false)
      }
    }

    fetchData()
  }, [])

  const shouldShowSuggestedBubble =
    isLoadingSuggestedDishes || (suggestedDishes ?? 0) > 0
  const shouldShowNotAvailableBubble =
    isLoadingSuggestedDishes || (notAvailableDishes ?? 0) > 0
  return (
    <div className="flex flex-col bg-surface-2 items-center justify-center h-screen gap-10 text-white">
      <Logo />

      <div>
        <div className="grid grid-cols-2 gap-16 ">
          {fakeData2.map((column, index) => (
            <Link
              href={column.items[0].href}
              className={`flex flex-col shadow-xl size-[11rem]  justify-center text-wrap gap-2 font-bold items-center uppercase rounded-full  ${column.color} p-3`}
              key={index}
            >
              <>
                <column.icon />
                <span className="text-center  w-40">{column.title}</span>
              </>
            </Link>
          ))}
        </div>
        <div className="flex gap-28 justify-center mx-auto ml-2">
          <Link
            href={'/check-meeting'}
            className={`flex shadow-xl  size-32 mt-8 justify-center text-wrap font-bold flex-row items-center uppercase rounded-full bg-checkmeeting-main relative`}
          >
            <span
              className="mr-2 size-12 -right-4 -top-4 rounded-full bg-checkmeeting-main text-white drop-shadow-2xl text-center font-bold text-xl flex justify-center items-center absolute"
              style={{
                display: shouldShowSuggestedBubble ? 'flex' : 'none',
              }}
            >
              {isLoadingSuggestedDishes ? (
                <div
                  role="status"
                  aria-live="polite"
                  aria-busy="true"
                  className="flex items-center gap-2"
                >
                  <svg
                    className={`animate-spin size-6`}
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                </div>
              ) : (
                suggestedDishes
              )}
            </span>

            <Checckmeeting />
          </Link>
          <Link
            href={'/platos-no-disponibles'}
            className={`flex shadow-xl size-32 mt-8 justify-center text-wrap font-bold flex-row items-center uppercase rounded-full bg-not-available-main relative`}
          >
            <span
              className="mr-2 size-12 -right-4 -top-4 rounded-full bg-not-available-main text-white drop-shadow-2xl text-center font-bold text-xl flex justify-center items-center absolute"
              style={{
                display: shouldShowNotAvailableBubble ? 'flex' : 'none',
              }}
            >
              {isLoadingNotAvailableDishes ? (
                <div
                  role="status"
                  aria-live="polite"
                  aria-busy="true"
                  className="flex items-center gap-2"
                >
                  <svg
                    className={`animate-spin size-6`}
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                </div>
              ) : (
                notAvailableDishes
              )}
            </span>
            <NotAvailable />
          </Link>
        </div>
      </div>
    </div>
  )
}
