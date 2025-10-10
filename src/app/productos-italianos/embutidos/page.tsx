'use client'
import SausagesImg from '@/assets/images/sausages.png'
import Card from '@/components/Cards/Card'
import GeneralDialogContent from '@/components/Dialog/GeneralDialog'
import CardDOPComponent from '../components/CardDOPComponent'

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
  {
    id: 7,
    title: 'Queso Azul',
    description: 'Queso italiano',
    isNew: true,
    highlightedContent: 'Excelente para ensaladas y pastas.',
    isSuggested: true,
  },
  {
    id: 8,
    title: 'Queso Azul',
    description: 'Queso italiano',
    isNew: true,
    highlightedContent: 'Excelente para ensaladas y pastas.',
    isSuggested: true,
  },
  {
    id: 9,
    title: 'Queso Azul',
    description: 'Queso italiano',
    isNew: true,
    highlightedContent: 'Excelente para ensaladas y pastas.',
    isSuggested: true,
  },
  // {
  //   id: 10,
  //   title: 'Queso Azul',
  //   description: 'Queso italiano',
  //   isNew: true,
  //   highlightedContent: 'Excelente para ensaladas y pastas.',
  //   isSuggested: true,
  // },
  // {
  //   id: 11,
  //   title: 'Queso Azul',
  //   description: 'Queso italiano',
  //   isNew: true,
  //   highlightedContent: 'Excelente para ensaladas y pastas.',
  //   isSuggested: true,
  // },
  // {
  //   id: 12,
  //   title: 'Queso Azul',
  //   description: 'Queso italiano',
  //   isNew: true,
  //   highlightedContent: 'Excelente para ensaladas y pastas.',
  //   isSuggested: true,
  // },
]
const Page = () => {
  return (
    <div className="w-full  pb-56">
      <div className="flex flex-wrap gap-x-3 justify-center ">
        {fakeCheeseData.map((cheese) => (
          <div key={cheese.id} className="my-16">
            <Card
              isFlippable={false}
              backgroundCard=""
              height="10rem"
              width="13.5rem"
              isModalAvailable={true}
              modalContent={
                <GeneralDialogContent
                  title={cheese.title}
                  description={cheese.description}
                  img={SausagesImg}
                  origin="Italiano"
                />
              }
            >
              <CardDOPComponent img={SausagesImg} title={cheese.title} />
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page
