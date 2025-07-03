'use client'
import CardReferenceImage from '@/assets/images/card-reference-image.png'
import InfoDark from '@/assets/svgs/help-circle-dark.svg'
import InfoLight from '@/assets/svgs/help-circle-light.svg'
import { Card } from '@/components/Cards/FlippingCard'
import { CardDialog } from '@/components/Dialog'
import Layout from '@/components/Layout'
import Image from 'next/image'
import { useState } from 'react'

interface ItemProps {
  title: string
  description: string
  href?: string
  origin?: string
  isFlipped?: boolean
}
const ClickableItem = ({ title, description, isFlipped }: ItemProps) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setIsOpenDialog(true)
  }

  return (
    <li>
      <CardDialog
        open={isOpenDialog}
        onChangeOpen={setIsOpenDialog}
        className="w-[40rem] h-1/2"
      >
        <div className="flex flex-col justify-center items-center gap-4 mt-5">
          <Image
            src={CardReferenceImage}
            alt={title}
            width={350}
            height={100}
            className="rounded-lg mb-4 overflow-hidden"
          />
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </CardDialog>
      <div className="flex mr-auto gap-3" onClick={handleClick}>
        {!isFlipped ? (
          <Image src={InfoLight} alt={title} />
        ) : (
          <Image src={InfoDark} alt={title} />
        )}
        <span>{title}</span>
      </div>
    </li>
  )
}

const Page = () => {
  const fakeData = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Plato ${i + 1}`,
    description: `Descripción del plato ${i + 1}`,
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
          {fakeData.map((item) => (
            <Card
              key={item.id}
              modalContent={
                <>
                  <Image
                    src={CardReferenceImage}
                    alt={item.title}
                    width={350}
                    height={200}
                    className="rounded-lg mb-4 overflow-hidden"
                  />
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </>
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
            >
              {/* <ExpandableSection maxHeight={400} initiallyExpanded={false}> */}
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
              {/* </ExpandableSection> */}
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Page
