'use client'
import SecretTaste from '@/assets/images/secret-taste.png'
import Card from '@/components/Cards/Card'
import GeneralDialogContent from '@/components/Dialog/GeneralDialog'
import CardDOPComponent from '../components/CardDOPComponent'

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
                  img={{
                    name: 'SecretTaste',
                    type: 'png',
                  }}
                  origin="Italiano"
                />
              }
            >
              <CardDOPComponent img={SecretTaste} title={cheese.title} />
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page
