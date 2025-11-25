'use client'
import WineImageRerence from '@/assets/images/vini-reference-image.png'
import { WineDialogContent } from '@/components/Dialog/BeveragesDialog'
import { Dropdown } from '@/components/Selects/Dropdown'
import { Skeleton } from '@/components/ui/skeleton'
import useIsLandscape from '@/hooks/useIsLandscape'
import axiosInstance from '@/lib/axios'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
interface SelectedWine {
  id: number
  type: string
}
const Page = () => {
  const [wines, setWines] = useState([])
  const [selectedWine, setSelectedWine] = useState<SelectedWine>({
    id: 0,
    type: '',
  })
  const isLandscape = useIsLandscape()
  const path = usePathname()
  const arrayPath = path
    .split('/')
    .filter(Boolean)[2]
    .replace('%C3%B1', 'ñ')
    .split('-')[2]

  const getWines = async () => {
    try {
      const response = await axiosInstance.get(`/drinks/wine`, {
        withCredentials: true,
      })

      setWines(
        response.data.filter(
          (wine: any) => wine.origin.toLowerCase() === arrayPath.toLowerCase(),
        )[0].wines,
      )
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getWines()
  }, [])

  const roseWine: any = wines.filter(
    (wine: any) => wine.type.toLowerCase() === 'rosado',
  )

  const whiteWine: any = wines.filter(
    (wine: any) => wine.type.toLowerCase() === 'blanco',
  )

  const redWine: any = wines.filter(
    (wine: any) => wine.type.toLowerCase() === 'tinto',
  )

  const sparklingWine: any = wines.filter(
    (wine: any) => wine.type.toLowerCase() === 'espumoso',
  )

  const foundWine = () => {
    if (selectedWine.type.toLowerCase() === 'rosado') {
      return roseWine.find((wine: any) => wine.id === selectedWine.id)
    }
    if (selectedWine.type.toLowerCase() === 'blanco') {
      return whiteWine.find((wine: any) => wine.id === selectedWine.id)
    }
    if (selectedWine.type.toLowerCase() === 'tinto') {
      return redWine.find((wine: any) => wine.id === selectedWine.id)
    }
    if (selectedWine.type.toLowerCase() === 'espumoso') {
      return sparklingWine.find((wine: any) => wine.id === selectedWine.id)
    }
    return null
  }
  return (
    <div>
      <span className="uppercase text-pasta-main font-bold text-lg mx-auto w-full flex justify-center mt-5">
        Por favor selecciona una categoría:
      </span>
      <div
        className={`w-full grid ${
          isLandscape ? 'grid-cols-2 px-16' : 'grid-cols-1 px-40'
        } justify-center items-center gap-4 mx-auto mt-6`}
      >
        <div className="w-full">
          {roseWine.length > 0 ? (
            <Dropdown
              options={roseWine.map((wine: any) => ({
                label: wine.name,
                value: wine.id,
              }))}
              placeholder="Seleccione Vino Rosado"
              value={
                selectedWine.type.toLowerCase() === 'rosado'
                  ? selectedWine.id
                  : null
              }
              onChange={(id: string | number | null) =>
                setSelectedWine({ id: Number(id), type: 'rosado' })
              }
            />
          ) : (
            <Skeleton className="h-10 w-full bg-white/60" />
          )}
        </div>
        <div className="w-full">
          {whiteWine.length > 0 ? (
            <Dropdown
              options={whiteWine.map((wine: any) => ({
                label: wine.name,
                value: wine.id,
              }))}
              placeholder="Seleccione Vino Blanco"
              value={
                selectedWine.type.toLowerCase() === 'blanco'
                  ? selectedWine.id
                  : null
              }
              onChange={(id: string | number | null) =>
                setSelectedWine({ id: Number(id), type: 'blanco' })
              }
            />
          ) : (
            <Skeleton className="h-10 w-full bg-white/60" />
          )}
        </div>
        <div className="w-full">
          {redWine.length > 0 ? (
            <Dropdown
              options={redWine.map((wine: any) => ({
                label: wine.name,
                value: wine.id,
              }))}
              placeholder="Seleccione Vino Tinto"
              value={
                selectedWine.type.toLowerCase() === 'tinto'
                  ? selectedWine.id
                  : null
              }
              onChange={(id: string | number | null) =>
                setSelectedWine({ id: Number(id), type: 'tinto' })
              }
            />
          ) : (
            <Skeleton className="h-10 w-full bg-white/60" />
          )}
        </div>

        <div className="w-full">
          {sparklingWine.length > 0 ? (
            <Dropdown
              options={sparklingWine.map((wine: any) => ({
                label: wine.name,
                value: wine.id,
              }))}
              placeholder="Seleccione Vino Espumoso"
              value={
                selectedWine.type.toLowerCase() === 'espumoso'
                  ? selectedWine.id
                  : null
              }
              onChange={(id: string | number | null) =>
                setSelectedWine({ id: Number(id), type: 'espumoso' })
              }
            />
          ) : (
            <Skeleton className="h-10 w-full bg-white/60" />
          )}
        </div>
      </div>
      {foundWine() && (
        <div className="mt-5 bg-white rounded-lg p-4 w-fit flex flex-col self-center mx-auto">
          <WineDialogContent
            title={foundWine().name}
            img={WineImageRerence}
            origin={arrayPath}
            description={foundWine().description}
            pairing={foundWine().dishes.map((d) => d.name)}
          />
        </div>
      )}
    </div>
  )
}

export default Page
