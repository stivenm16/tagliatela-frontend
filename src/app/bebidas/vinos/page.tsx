'use client'
import WineThumbnail from '@/assets/images/vini-reference-image.png'
import { Button } from '@/components/buttons/Button'
import CardBeverages from '@/components/Cards/CardBeverages'
import BeveragesDialogContent from '@/components/Dialog/BeveragesDialog'
import { CustomSelect } from '@/components/Select'
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
            <BeveragesDialogContent
              qualities={wine.qualities}
              pairing={wine.pairing}
              title={wine.title}
              origin={wine.origin}
              img={wine.full_img}
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
    <div className="flex flex-col justify-center px-20 mt-20 gap-10">
      <div className="flex gap-5 ">
        <Button
          label="I vini"
          mainColor="bg-beverages-main"
          activedColor="bg-pasta-main"
          style={{ width: '100%' }}
          isSelected={selectedTab === 0}
          onClick={() => setSelectedTab(0)}
        />
        <Button
          label="Vini D' Italia"
          mainColor="bg-beverages-main"
          activedColor="bg-pasta-main"
          style={{ width: '100%' }}
          isSelected={selectedTab === 1}
          onClick={() => setSelectedTab(1)}
        />
      </div>
      <CustomSelect
        label={wineType ? wineTypes[wineType].label : ''}
        placeHolder="vini"
        options={wineTypes}
        selectedIndex={wineType ?? null}
        onChange={handleChange}
        customStyles={{ width: '100%', marginRight: '10px' }}
        mainColor="bg-beverages-main"
        activedColor="bg-pasta-main"
        allowClear={true}
        handleClear={() => setWineType(null)}
      />

      <div>
        {selectedTab === 0 ? (
          <WinesWrapper wines={spanishWines} />
        ) : (
          <WinesWrapper wines={italianWines} />
        )}
      </div>
    </div>
  )
}

export default Page
