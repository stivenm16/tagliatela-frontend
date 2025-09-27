'use client'
import CardReferenceImage from '@/assets/images/card-reference-image.png'
import Card from '@/components/Cards/Card'
import { ClickableItem } from '@/components/Dialog/ClickableItem'
import { default as GeneralDialogContent } from '@/components/Dialog/GeneralDialog'
import Layout from '@/components/Layout/Layout'
import Image from 'next/image'

const Page = () => {
  const fakeData = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Queso Taleggio DOP ${i + 1}`,
    description: `Queso de vaca, semiblando, cremoso y untuoso al untar. ${
      i + 1
    }`,
  }))

  const fakeIngredients = Array.from({ length: 3 }, (_, i) => ({
    id: i + 1,
    name: `Ingrediente ${i + 1}`,
    description: `Descripción del ${i + 1}`,
  }))
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center px-5 py-10 gap-10">
        <div className="grid grid-cols-2 gap-10">
          {fakeData.map((item, i) => (
            <Card
              key={item.id}
              modalContent={
                <GeneralDialogContent
                  title={item.title}
                  description={item.description}
                  img={CardReferenceImage}
                />
              }
              height="33rem"
              width="18rem"
              backgroundCard="bg-neutral-50"
              flipContent={
                <div className="flex flex-col items-center gap-2 h-full w-full text-white">
                  <h2 className="capitalize font-bold text-2xl mt-6">
                    {item.title}
                  </h2>
                  <Image
                    src={CardReferenceImage}
                    alt={item.title}
                    width={240}
                    height={50}
                    className="overflow-hidden"
                  />
                  <h2 className="capitalize font-medium">Ingredientes</h2>

                  <ul className="list-none  flex flex-col gap-2 w-full px-6 mt-4">
                    {fakeIngredients.map((ingrediente) => (
                      <ClickableItem
                        key={ingrediente.id}
                        title={ingrediente.name}
                        description={ingrediente.description}
                        isFlipped={true}
                      />
                    ))}
                  </ul>
                </div>
              }
              isSuggested={i == 0}
            >
              <div className="flex flex-col items-center gap-2 h-full w-full ">
                <h2 className="capitalize font-bold text-2xl mt-6">
                  {item.title}
                </h2>
                <Image
                  src={CardReferenceImage}
                  alt={item.title}
                  width={240}
                  height={50}
                  className="overflow-hidden"
                />
                <h2 className="capitalize font-medium">Ingredientes</h2>

                <ul className="list-none  flex flex-col gap-2 w-full px-6 mt-4">
                  {fakeIngredients.map((ingrediente) => (
                    <ClickableItem
                      key={ingrediente.id}
                      title={ingrediente.name}
                      description={ingrediente.description}
                      isFlipped={false}
                    />
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Page
