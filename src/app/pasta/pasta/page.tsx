'use client'
import PastaImg from '@/assets/images/pasta-image-reference.png'
import Alert from '@/components/Alert'
import Image from 'next/image'
import Link from 'next/link'
import NewDishFloatingButton from '../components/NewDishFloatingButton'

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
    <div className="px-[30px]  ">
      <Alert
        text="POR FAVOR NO OLVIDES PREGUNTAR SI TIENE ALGUNA RESTRICCIÓN
            ALIMENTARIA"
      />
      <h1 className="text-center font-bold text-xl mt-4 uppercase">
        Tipo de pastas
      </h1>

      <div className="flex flex-col gap-5">
        <div className="h-full">
          <h3 className="text-left font-bold my-4 uppercase">
            Pasta tradizionale
          </h3>
          <div className="flex gap-5 flex-wrap gap-y-4">
            {fakeData.map((item) => (
              <Link href={`/pasta/pasta/${item.id}`} key={item.id}>
                <div className="flex flex-col w-full h-full gap-3 relative">
                  {item.isNew && <NewDishFloatingButton />}
                  <Image
                    src={PastaImg}
                    alt={item.title}
                    className="w-full h-40 rounded-xl shadow-lg"
                  />
                  <h2 className="text-center uppercase">{item.title}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-left font-bold my-6 uppercase">Pasta Ripiena</h3>
          <div className="flex gap-5 gap-y-4 flex-wrap ">
            {fakeData2.map((item) => (
              <Link href={`/pasta/pasta/${item.id}`} key={item.id}>
                <div className="flex flex-col w-full h-full gap-3 relative">
                  {item.isNew && <NewDishFloatingButton />}
                  <Image
                    src={PastaImg}
                    alt={item.title}
                    className="w-full h-40 rounded-xl shadow-lg"
                  />
                  <h2 className="text-center uppercase">{item.title}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
