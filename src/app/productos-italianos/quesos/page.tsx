'use client'
import CheeseImg from '@/assets/images/cheese.png'
import { Card } from '@/components/Cards/FlippingCard'
import Image from 'next/image'

const fakeCheeseData = [
  {
    id: 1,
    title: 'Queso Parmesano',
    description: 'Queso italiano',
    isNew: true,
    highlightedContent: 'Excelente para ensaladas y pastas.',
    isSuggested: true,
  },
  {
    id: 2,
    title: 'Queso Cheddar',
    description: 'Queso italiano',
    isNew: true,
    highlightedContent: 'Excelente para ensaladas y pastas.',
    isSuggested: true,
  },
  {
    id: 3,
    title: 'Queso Azul',
    description: 'Queso italiano',
    isNew: true,
    highlightedContent: 'Excelente para ensaladas y pastas.',
    isSuggested: true,
  },
  {
    id: 4,
    title: 'Queso Azul',
    description: 'Queso italiano',
    isNew: true,
    highlightedContent: 'Excelente para ensaladas y pastas.',
    isSuggested: true,
  },
  {
    id: 5,
    title: 'Queso Azul',
    description: 'Queso italiano',
    isNew: true,
    highlightedContent: 'Excelente para ensaladas y pastas.',
    isSuggested: true,
  },
  {
    id: 6,
    title: 'Queso Azul',
    description: 'Queso italiano',
    isNew: true,
    highlightedContent: 'Excelente para ensaladas y pastas.',
    isSuggested: true,
  },
]
const page = () => {
  return (
    <div className="w-full">
      <h1>Quesos</h1>
      <div className="flex flex-wrap gap-x-10 justify-center ">
        {fakeCheeseData.map((cheese) => (
          <div key={cheese.id} className="my-18">
            <Card
              isFlippable={false}
              backgroundCard=""
              height="10rem"
              width="15rem"
              isModalAvailable={true}
            >
              <div className="flex flex-col w-full h-full gap-3 relative">
                {/* {item.isNew && <NewDishFloatingButton />} */}
                <Image src={CheeseImg} alt={'tem.title'} />
                <h2 className="text-center uppercase">{cheese.title}</h2>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

export default page
