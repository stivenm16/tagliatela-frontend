'use client'
import { Skeleton } from '@/components/ui/skeleton'
import useIsLandscape from '@/hooks/useIsLandscape'
import axiosInstance from '@/lib/axios'
import { FilterSaucesOption, Sauce } from '@/types/global'
import { fakeFilters } from '@/utils/data/fakeFilters'
import { useEffect, useState } from 'react'
import AlertSauces from '../components/AlertSauces'
import SaucesComponent from '../components/SaucesComponent'

const Page = () => {
  const [filters, setFilters] = useState<FilterSaucesOption[]>(fakeFilters)
  const [isLoading, setIsLoading] = useState(true)
  const [sauces, setSauces] = useState<Sauce[] | null>(null)
  const [selectedSauceId, setSelectedSauceId] = useState<number | null>(null)
  const isLandscape = useIsLandscape()
  const handleSelectChange = (
    selectedIndex: number | null,
    placeHolder: string,
  ) => {
    setFilters((prev) =>
      prev.map((filter) =>
        filter.placeHolder === placeHolder
          ? {
              ...filter,
              selectedValue: selectedIndex !== null ? [selectedIndex] : [],
            }
          : filter,
      ),
    )
  }

  const getSauces = async () => {
    const response = await axiosInstance.get(`/sauce`, {
      withCredentials: true,
    })

    return response.data
  }

  useEffect(() => {
    getSauces()
      .then((data) => {
        setSauces(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching sauces:', error)
      })
  }, [])

  const toggleSauceSelection = (id: number) => {
    setSelectedSauceId(id)
  }

  return (
    <div
      className={`overflow-y-scroll pb-56 pt-3 flex flex-col ${
        sauces && sauces.length > 5 ? 'h-screen' : ''
      }`}
    >
      <AlertSauces />
      {isLoading && !sauces ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(14.5rem,1fr))] gap-x-2 px-4 gap-y-5 py-10 pt-6">
          <Skeleton className="h-72 w-[220px] bg-white/50" />
          <Skeleton className="h-72 w-[220px] bg-white/50" />
          <Skeleton className="h-72 w-[220px] bg-white/50" />
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
        <SaucesComponent
          sauces={
            sauces
              ? sauces.map((sauce) => ({
                  ...sauce,
                  filters: sauce.filter,
                  description: sauce.description,
                  title: sauce.name,
                  highlightedContent: '',
                  isSuggested: sauce.isSuggested,
                  isNew: sauce.isNew,
                }))
              : []
          }
          toggleSauceSelection={toggleSauceSelection}
          selectedSauceId={selectedSauceId}
          selectedPasta=""
        />
      )}
    </div>
  )
}

export default Page
