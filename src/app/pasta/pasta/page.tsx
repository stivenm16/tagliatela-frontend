'use client'
import { Card } from '@/components/Cards/FlippingCard'
import Image from 'next/image'

const NewDishFloatingButton = () => {
  return (
    <span className="text-xs bg-red-500 text-white font-semibold px-2 py-1 absolute -right-2 rotate-10 uppercase">
      Nuevo
    </span>
  )
}
const Page = () => {
  const fakeData = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: `Pasta ${i + 1}`,
    description: `Descripción del tipo de pasta ${i + 1}`,
    img: `https://picsum.photos/100/200?random=${i + 1}`,
    isNew: i == 0, // Just for demonstration, every even index is new
  }))
  const fakeData2 = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: `Pasta ${i + 1}`,
    description: `Descripción del tipo de pasta ${i + 1}`,
    img: `https://picsum.photos/200/300?random=${i + 1}`,
    isNew: i % 2 === 0, // Just for demonstration, every even index is new
  }))
  return (
    <div className="px-[54px]">
      <h1 className="text-center font-bold text-xl mt-4 uppercase">
        Tipo de pastas
      </h1>

      <div className="">
        <h3 className="text-left font-semibold my-4 uppercase">
          Pasta tradizionale
        </h3>
        <div className="flex gap-5 flex-wrap">
          {fakeData.map((item) => (
            <Card
              key={item.id}
              isFlippable={false}
              backgroundCard="bg-transparent"
              height="12rem"
              width="9rem"
              isModalAvailable={false}
            >
              <div className="flex flex-col w-full h-full gap-5 relative">
                {item.isNew && <NewDishFloatingButton />}
                <Image
                  src={item.img}
                  alt={item.title}
                  className="overflow-hidden"
                  width={170}
                  height={100}
                />
                <h2 className="text-center uppercase">{item.title}</h2>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-left font-semibold my-4 uppercase">
          Pasta Ripiena
        </h3>
        <div className="flex gap-5 flex-wrap ">
          {fakeData2.map((item) => (
            <Card
              key={item.id}
              isFlippable={false}
              backgroundCard="bg-transparent"
              height="12rem"
              width="9rem"
              isModalAvailable={false}
            >
              <div className="flex flex-col w-full h-full">
                {item.isNew && <NewDishFloatingButton />}
                <Image
                  src={item.img}
                  alt={item.title}
                  className="overflow-hidden"
                  width={170}
                  height={100}
                />
                <h2 className="text-center uppercase">{item.title}</h2>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page
