import Image, { StaticImageData } from 'next/image'

const CardDOPComponent = ({
  img,
  title,
}: {
  img: StaticImageData | string
  title: string
}) => {
  return (
    <div className="flex flex-col w-full h-full gap-3 relative">
      {/* {item.isNew && <NewDishFloatingButton />} */}
      <Image
        src={img}
        alt={'tem.title'}
        className="w-full  rounded-3xl shadow-xl"
      />
      <h2 className="text-center uppercase">{title}</h2>
    </div>
  )
}

export default CardDOPComponent
