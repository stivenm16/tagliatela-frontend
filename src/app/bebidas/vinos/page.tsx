'use client'
import WineThumbnail from '@/assets/images/vini-reference-image.png'
import CardBeverages from '@/components/Cards/CardBeverages'
import { WineDialogContent } from '@/components/Dialog/BeveragesDialog'
import Link from 'next/link'
import { useState } from 'react'

interface WineProps {
  thumbnail: string
  title: string
  origin: string
  qualities: string[]
  pairing: string[]
  full_img: string
}

const fakeSpanishWines: WineProps[] = [
  {
    thumbnail:
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Vino Bianco',
    origin: 'España',
    qualities: ['Refrescante', 'Afrutado', 'Ligero toque amargo'],
    pairing: ['Entrantes frescos', ' Ensaladas', 'Quesos suaves'],
    full_img:
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    thumbnail:
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Vino Bianco',
    origin: 'España',
    qualities: ['Refrescante', 'Afrutado', 'Ligero toque amargo'],
    pairing: ['Entrantes frescos', ' Ensaladas', 'Quesos suaves'],
    full_img:
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    thumbnail:
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Vino Bianco',
    origin: 'España',
    qualities: ['Refrescante', 'Afrutado', 'Ligero toque amargo'],
    pairing: ['Entrantes frescos', ' Ensaladas', 'Quesos suaves'],
    full_img:
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
]

const fakeItalianWines: WineProps[] = [
  {
    thumbnail:
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Vino Bianco',
    origin: 'Italiano',
    qualities: ['Refrescante', 'Afrutado', 'Ligero toque amargo'],
    pairing: ['Entrantes frescos', ' Ensaladas', 'Quesos suaves'],
    full_img:
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    thumbnail:
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Vino Bianco',
    origin: 'Italiano',
    qualities: ['Refrescante', 'Afrutado', 'Ligero toque amargo'],
    pairing: ['Entrantes frescos', ' Ensaladas', 'Quesos suaves'],
    full_img:
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    thumbnail:
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Vino Bianco',
    origin: 'Italiano',
    qualities: ['Refrescante', 'Afrutado', 'Ligero toque amargo'],
    pairing: ['Entrantes frescos', ' Ensaladas', 'Quesos suaves'],
    full_img:
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
]

const WinesWrapper = ({ wines }: { wines: WineProps[] }) => {
  return (
    <div className="grid grid-cols-3 gap-5">
      {wines.map((wine, index) => (
        <CardBeverages
          key={index}
          title={wine.title}
          origin={wine.origin}
          modalContent={
            <WineDialogContent
              qualities={wine.qualities}
              pairing={wine.pairing}
              title={wine.title}
              origin={wine.origin}
              img={WineThumbnail}
              description="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
          }
          img={WineThumbnail}
        />
      ))}
    </div>
  )
}
const Page = () => {
  const [wineType, setWineType] = useState<number | null>(null)
  const [selectedTab, setSelectedTab] = useState(0)
  const [spanishWines, setSpanishWines] = useState(fakeSpanishWines)
  const [italianWines, setItalianWines] = useState(fakeItalianWines)
  const wineTypes = [
    {
      value: '0',
      label: 'Vini bianchi',
    },
    {
      value: '1',
      label: 'Vini rosati',
    },
    {
      value: '2',
      label: 'Vini rossi',
    },
    {
      value: '3',
      label: 'Spumanti',
    },
  ]
  const handleChange = (value: number | null) => {
    setWineType(value)
  }
  return (
    <div>
      <span className="uppercase text-pasta-main font-bold text-lg mx-auto w-full flex justify-center mt-20">
        Por favor selecciona una categoría:
      </span>

      <div className="flex gap-10 justify-center mt-10 mb-20">
        <Link
          href={'/bebidas/vinos/vinos-de-españa'}
          className="bg-beverages-main text-white w-[18rem] text-center rounded-3xl uppercase text-md p-2"
        >
          Vinos de España
        </Link>
        <Link
          href={'/bebidas/vinos/vinos-de-italia'}
          className="bg-beverages-main text-white text-center w-[18rem] rounded-3xl uppercase text-md p-2"
        >
          Vinos de Italia
        </Link>
      </div>
    </div>
  )
}

export default Page
