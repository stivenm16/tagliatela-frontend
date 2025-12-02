'use client'
import SecretTaste from '@/assets/images/secret-taste.png'
import Card from '@/components/Cards/Card'
import GeneralDialogContent from '@/components/Dialog/GeneralDialog'
import { Skeleton } from '@/components/ui/skeleton'
import useIsLandscape from '@/hooks/useIsLandscape'
import axiosInstance from '@/lib/axios'
import { getDishImage } from '@/utils/getImage'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import CardDOPComponent from '../components/CardDOPComponent'

const mapToFetch: any = {
  ['gusto-secreto']: 'other',
  embutidos: 'sausage',
  quesos: 'cheese',
}

const ProductToRender = ({ item }: any) => {
  const [imgSrc, setImgSrc] = useState<string>('')
  const [fullImgSrc, setFullImgSrc] = useState<string>('')

  useEffect(() => {
    let isMounted = true
    getDishImage({
      dishName: item.name,
      category: item.type === 'gusto-secreto' ? 'otros' : item.type,
      family: 'DOP',
      variant: '188x188',
    }).then((src) => {
      if (isMounted) setImgSrc(src as any)
    })

    getDishImage({
      dishName: item.name,
      category: item.type === 'gusto-secreto' ? 'otros' : item.type,
      family: 'DOP',
      variant: '424x400',
    }).then((src) => {
      if (isMounted) setFullImgSrc(src as any)
    })
    return () => {
      isMounted = false
    }
  }, [item.name])
  return (
    <div>
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
            img={fullImgSrc || SecretTaste}
            origin="Italiano"
          />
        }
      >
        <CardDOPComponent img={imgSrc || SecretTaste} title={item.name} />
      </Card>
    </div>
  )
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
    setDataToRender(response.data)
  }

  useEffect(() => {
    getContent()
  }, [])
  return (
    <div className="w-full h-screen overflow-y-auto pb-[20rem]">
      <div className="flex flex-wrap gap-x-2 px-10 gap-y-28 mt-5">
        {dataToRender && !!dataToRender.length ? (
          <>
            {dataToRender.map((item: any) => (
              <ProductToRender
                key={item.id}
                item={{
                  ...item,
                  type: arrayPath,
                }}
              />
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
