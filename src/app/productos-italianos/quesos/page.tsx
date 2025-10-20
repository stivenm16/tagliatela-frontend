'use client'
import CheeseImg from '@/assets/images/cheese.png'
import Card from '@/components/Cards/Card'
import GeneralDialogContent from '@/components/Dialog/GeneralDialog'
import CardDOPComponent from '../components/CardDOPComponent'

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
const Page = () => {
  return (
    <div className="w-full h-screen overflow-y-auto pb-56">
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
                  img={CheeseImg}
                  origin="Italiano"
                />
              }
            >
              <CardDOPComponent img={CheeseImg} title={cheese.title} />
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page
