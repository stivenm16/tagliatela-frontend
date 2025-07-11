'use client'
import SecretTaste from '@/assets/images/secret-taste.png'
import Card from '@/components/Cards/Card'
import GeneralDialogContent from '@/components/Dialog/GeneralDialog'
import Image from 'next/image'

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
                  img={SecretTaste}
                  origin="Italiano"
                />
              }
            >
              <div className="flex flex-col w-full h-full gap-3 relative">
                {/* {item.isNew && <NewDishFloatingButton />} */}
                <Image src={SecretTaste} alt={'tem.title'} />
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
