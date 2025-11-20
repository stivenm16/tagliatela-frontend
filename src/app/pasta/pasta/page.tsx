'use client'
import PastaImg from '@/assets/images/pasta-image-reference.png'
import {
  PastaT,
  PastaType,
  useFilters,
} from '@/components/Layout/context/FilterContext'
import { Skeleton } from '@/components/ui/skeleton'
import axiosInstance from '@/lib/axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import AlertSauces from '../components/AlertSauces'
import NewDishFloatingButton from '../components/NewDishFloatingButton'

export interface PastaResponse {
  type: PastaType
  pastas: Pasta[]
}

export interface Pasta {
  id: number
  name: string
  description: string
  isNew: boolean
  imageUrl: string
  thumbnailUrl: string
  pairing_sauces: PairingSauce[]
  filter: PastaFilter
}

export interface PairingSauce {
  id: number
  name: string
}

export interface PastaFilter {
  ingredients: FilterItem[]
  diets: FilterItem[]
  allergens: FilterItem[]
}

export interface FilterItem {
  id: number
  name: string
}

const Page = () => {
  const [pastas, setPastas] = useState<PastaResponse[]>()
  const router = useRouter()
  const { filters, updateFilter, setPasta } = useFilters()

  const navigateToDetails = (pasta: PastaT) => {
    setPasta(pasta)
    router.push('/pasta/pasta/tipos-de-pasta')
  }
  const getContent = async () => {
    try {
      const response = await axiosInstance.get(`/pasta`, {
        withCredentials: true,
      })
      setPastas(response.data)
      const allFilters = response.data.flatMap((res: any) =>
        res.pastas.map((p: any) => p.filter),
      )

      const unique = <T extends FilterItem>(items: T[]): T[] => {
        const map = new Map<number, T>()
        items.forEach((item) => {
          if (!map.has(item.id)) map.set(item.id, item)
        })
        return Array.from(map.values())
      }

      const allAllergens = allFilters.flatMap((f: any) => f.allergens)
      const allDiets = allFilters.flatMap((f: any) => f.diets)

      const filtersFormatted = {
        allergens: unique(allAllergens).map((a) => a.name),
        diets: unique(allDiets).map((d) => d.name),
      }
      updateFilter('filtersAvaible', filtersFormatted)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getContent()
  }, [])

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

  const pastasTradizionale = useMemo(() => {
    return (
      pastas &&
      pastas[0].pastas.filter((pasta) => {
        const { filter } = pasta
        return (
          matchesFilter(filter.diets, filters.diet) &&
          matchesFilter(filter.allergens, filters.allergen)
        )
      })
    )
  }, [pastas, filters])
  const pastasRipiena = useMemo(() => {
    return (
      pastas &&
      pastas[1].pastas.filter((pasta) => {
        const { filter } = pasta
        return (
          matchesFilter(filter.diets, filters.diet) &&
          matchesFilter(filter.allergens, filters.allergen)
        )
      })
    )
  }, [pastas, filters])

  return (
    <div className="px-[30px]">
      <AlertSauces />

      <>
        {pastas && pastas.length > 1 ? (
          <>
            <h1 className="text-center font-bold text-xl uppercase">
              Tipo de pastas
            </h1>

            <div className="flex flex-col gap-5">
              <div className="h-full">
                <h3 className="text-left text-xl text-suggested-main font-bold my-4 uppercase">
                  {pastas[0].type}
                </h3>
                <div className="flex gap-5 flex-wrap gap-y-4">
                  {pastasTradizionale &&
                    pastasTradizionale.map(
                      ({
                        id,
                        description,
                        name,
                        isNew,
                        pairing_sauces,
                        filter,
                      }) => (
                        <div
                          onClick={() => {
                            navigateToDetails({
                              id,
                              description,
                              name,
                              type: pastas[0].type,
                              sauces: pairing_sauces.map((s: any) => {
                                return {
                                  id: s.id,
                                  name: s.name,
                                  isNew: s.is_new,
                                  filters: s.filter,
                                  isRecommended: s.isSuggested,
                                }
                              }),
                              ingredients: filter.ingredients.map(
                                (i) => i.name,
                              ),
                            })
                          }}
                          key={id}
                        >
                          <div className="flex flex-col w-full h-full gap-3 relative">
                            {isNew && <NewDishFloatingButton />}
                            <Image
                              src={PastaImg}
                              alt={description}
                              className="w-full h-40 rounded-xl shadow-lg"
                            />
                            <h2 className="text-center uppercase max-w-40">
                              {name}
                            </h2>
                          </div>
                        </div>
                      ),
                    )}
                </div>
              </div>
              <div>
                <h3 className="text-left text-xl text-beverages-main font-bold my-6 uppercase">
                  {pastas[1].type}
                </h3>
                <div
                  className={`flex gap-5 gap-y-4 flex-wrap ${
                    pastasRipiena && pastasRipiena.length > 4
                      ? 'mb-32'
                      : 'mb-28'
                  }`}
                >
                  {pastasRipiena &&
                    pastasRipiena.map(
                      ({
                        id,
                        description,
                        name,
                        isNew,
                        pairing_sauces,
                        filter,
                      }) => (
                        <div
                          onClick={() => {
                            navigateToDetails({
                              id,
                              description,
                              name,
                              type: pastas[1].type,
                              sauces: pairing_sauces.map((s: any) => {
                                return {
                                  id: s.id,
                                  name: s.name,
                                  isNew: false,
                                  filters: s.filter,
                                  isRecommended: s.isSuggested,
                                }
                              }),

                              ingredients: filter.ingredients.map(
                                (i) => i.name,
                              ),
                            })
                          }}
                          key={id}
                        >
                          <div className="flex flex-col w-full h-full gap-3 relative">
                            {isNew && <NewDishFloatingButton />}
                            <Image
                              src={PastaImg}
                              alt={description}
                              className="w-full h-40 rounded-xl shadow-lg"
                            />
                            <h2 className="text-center uppercase max-w-40">
                              {name}
                            </h2>
                          </div>
                        </div>
                      ),
                    )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(14.5rem,1fr))] gap-y-4 gap-x-1 py-10 pt-6">
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
        )}
      </>
    </div>
  )
}

export default Page
