'use client'
import SecretTaste from '@/assets/images/secret-taste.png'
import Card from '@/components/Cards/Card'
import GeneralDialogContent from '@/components/Dialog/GeneralDialog'
import { Skeleton } from '@/components/ui/skeleton'
import useIsLandscape from '@/hooks/useIsLandscape'
import axiosInstance from '@/lib/axios'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import CardDOPComponent from '../components/CardDOPComponent'

const fakeCheeseData = [
  {
    id: 1,
    title: 'Dolce Parmesano',
    description: 'Dolce italiano',
    isNew: true,
    highlightedContent: 'Excelente para ensaladas y pastas.',
    isSuggested: true,
  },
  {
    id: 2,
    title: 'Dolce Cheddar',
    description: 'Dolce italiano',
    isNew: true,
    highlightedContent: 'Excelente para ensaladas y pastas.',
    isSuggested: true,
  },
  {
    id: 3,
    title: 'Dolce Azul',
    description: 'Dolce italiano',
    isNew: true,
    highlightedContent: 'Excelente para ensaladas y pastas.',
    isSuggested: true,
  },
  {
    id: 4,
    title: 'Dolce Azul',
    description: 'Dolce italiano',
    isNew: true,
    highlightedContent: 'Excelente para ensaladas y pastas.',
    isSuggested: true,
  },
  {
    id: 5,
    title: 'Dolce Azul',
    description: 'Dolce italiano',
    isNew: true,
    highlightedContent: 'Excelente para ensaladas y pastas.',
    isSuggested: true,
  },
  {
    id: 6,
    title: 'Dolce Azul',
    description: 'Dolce italiano',
    isNew: true,
    highlightedContent: 'Excelente para ensaladas y pastas.',
    isSuggested: true,
  },
]

const mapToFetch: any = {
  ['gusto-secreto']: 'other',
  embutidos: 'sausage',
  quesos: 'cheese',
}
const Page = () => {
  const [dataToRender, setDataToRender] = useState<any>([])
  const path = usePathname()
  const arrayPath = path.split('/').filter(Boolean)[1]
  const isLandscape = useIsLandscape()
  const getContent = async () => {
    const response = await axiosInstance.get(
      `/productDrop/${mapToFetch[arrayPath]}`,
      {
        withCredentials: true,
      },
    )
    console.log(response.data, 'response.data')
    setDataToRender(response.data)
  }

  useEffect(() => {
    getContent()
  }, [])
  return (
    <div className="w-full h-screen overflow-y-auto pb-[18rem]">
      <div className="flex flex-wrap gap-x-3 px-10 gap-y-28 mt-5">
        {dataToRender && !!dataToRender.length ? (
          <>
            {dataToRender.map((item) => (
              <div key={item.id}>
                <Card
                  isFlippable={false}
                  backgroundCard=""
                  height="10rem"
                  width="13.5rem"
                  isModalAvailable={true}
                  modalContent={
                    <GeneralDialogContent
                      title={item.name}
                      description={item.description}
                      img={{
                        name: 'SecretTaste',
                        type: 'png',
                      }}
                      origin="Italiano"
                    />
                  }
                >
                  <CardDOPComponent img={SecretTaste} title={item.name} />
                </Card>
              </div>
            ))}
          </>
        ) : (
          <div
            className={`grid ${
              isLandscape ? 'grid-cols-4' : 'grid-cols-3'
            } gap-x-4 px-4 gap-y-2 py-5`}
          >
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
      </div>
    </div>
  )
}

export default Page
