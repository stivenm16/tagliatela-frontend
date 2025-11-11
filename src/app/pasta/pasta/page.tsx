'use client'
import PastaImg from '@/assets/images/pasta-image-reference.png'
import axiosInstance from '@/lib/axios'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import AlertSauces from '../components/AlertSauces'
import NewDishFloatingButton from '../components/NewDishFloatingButton'

export interface PastaResponse {
  type: string
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

  const getContent = async () => {
    try {
      const response = await axiosInstance.get(`/pasta`, {
        withCredentials: true,
      })
      setPastas(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getContent()
  }, [])

  const fakeData = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: `Pasta ${i + 1}`,
    description: `Descripción del tipo de pasta ${i + 1}`,
    img: `https://picsum.photos/100/200?random=${i + 1}`,
    isNew: i == 0,
  }))
  const fakeData2 = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: `Pasta ${i + 1}`,
    description: `Descripción del tipo de pasta ${i + 1}`,
    img: `https://picsum.photos/200/300?random=${i + 1}`,
    isNew: i % 2 === 0,
  }))
  return (
    <div className="px-[30px]  ">
      <AlertSauces />
      <>
        {pastas && pastas.length > 1 ? (
          <>
            <h1 className="text-center font-bold text-xl mt-4 uppercase">
              Tipo de pastas
            </h1>

            <div className="flex flex-col gap-5">
              <div className="h-full">
                <h3 className="text-left text-xl text-suggested-main font-bold my-4 uppercase">
                  {pastas[0].type}
                </h3>
                <div className="flex gap-5 flex-wrap gap-y-4">
                  {pastas[0].pastas.map((item) => (
                    <Link href={`/pasta/pasta/tipos-de-pasta`} key={item.id}>
                      <div className="flex flex-col w-full h-full gap-3 relative">
                        {item.isNew && <NewDishFloatingButton />}
                        <Image
                          src={PastaImg}
                          alt={item.description}
                          className="w-full h-40 rounded-xl shadow-lg"
                        />
                        <h2 className="text-center uppercase max-w-40">
                          {item.name}
                        </h2>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-left text-xl text-beverages-main font-bold my-6 uppercase">
                  {pastas[1].type}
                </h3>
                <div className="flex gap-5 gap-y-4 flex-wrap">
                  {pastas[1].pastas.map((item) => (
                    <Link href={`/pasta/pasta/tipos-de-pasta`} key={item.id}>
                      <div className="flex flex-col w-full h-full gap-3 relative">
                        {item.isNew && <NewDishFloatingButton />}
                        <Image
                          src={PastaImg}
                          alt={item.description}
                          className="w-full h-40 rounded-xl shadow-lg"
                        />
                        <h2 className="text-center uppercase ">{item.name}</h2>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </>
    </div>
  )
}

export default Page
