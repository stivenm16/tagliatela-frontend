'use client'
import CheeseImg from '@/assets/images/cheese.png'
import { Card } from '@/components/Cards/Card'
import GeneralDialogContent from '@/components/Dialog/GeneralDialog'
import Image from 'next/image'

const fakeCheeseData = [
  {
    id: 1,
    title: 'Parmesano',
    description: 'Fresco, cremoso, de sabor intenso y ligeramente picante.',
    isNew: true,
    highlightedContent: 'Excelente para ensaladas y pastas.',
    isSuggested: true,
  },
  {
    id: 2,
    title: 'Cheddar',
    description: 'Fresco, cremoso, de sabor intenso y ligeramente picante.',
    isNew: true,
    highlightedContent: 'Excelente para ensaladas y pastas.',
    isSuggested: true,
  },
  {
    id: 3,
    title: 'Azul',
    description: 'Fresco, cremoso, de sabor intenso y ligeramente picante.',
    isNew: true,
    highlightedContent: 'Excelente para ensaladas y pastas.',
    isSuggested: true,
  },
  {
    id: 4,
    title: 'Azul',
    description: 'Fresco, cremoso, de sabor intenso y ligeramente picante.',
    isNew: true,
    highlightedContent: 'Excelente para ensaladas y pastas.',
    isSuggested: true,
  },
  {
    id: 5,
    title: 'Azul',
    description: 'Fresco, cremoso, de sabor intenso y ligeramente picante.',
    isNew: true,
    highlightedContent: 'Excelente para ensaladas y pastas.',
    isSuggested: true,
  },
  {
    id: 6,
    title: 'Azul',
    description: 'Fresco, cremoso, de sabor intenso y ligeramente picante.',
    isNew: true,
    highlightedContent: 'Excelente para ensaladas y pastas.',
    isSuggested: true,
  },
]
const page = () => {
  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-x-10 justify-center ">
        {fakeCheeseData.map((cheese) => (
          <div key={cheese.id} className="my-18">
            <Card
              isFlippable={false}
              backgroundCard=""
              height="10rem"
              width="15rem"
              isModalAvailable={true}
              modalContent={
                <GeneralDialogContent
                  title={cheese.title}
                  description={cheese.description}
                  img={CheeseImg}
                  origin="Italiano"
                />
              }
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
