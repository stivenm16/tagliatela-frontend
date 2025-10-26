import PastaImgMedium from '@/assets/images/pasta-image-reference-medium.png'
import SauceThumbnail from '@/assets/images/sauce-thumbnail.png'
import BeveragesIcon from '@/assets/svgs/beverages-card-icon.svg'
import IngredientsIcon from '@/assets/svgs/filters/ingredients/ingredients-icon.svg'
import Card from '@/components/Cards/Card'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/Dialog/Dialog'
import { Sauce } from '@/types/global'
import Image from 'next/image'
import NewDishFloatingButton from './NewDishFloatingButton'

interface SaucesComponentProps {
  sauces: Sauce[]
  toggleSauceSelection: (id: number) => void
  selectedSauceId: number | null
}
const SaucesComponent = ({ sauces }: SaucesComponentProps) => {
  return (
    <div className="flex flex-col items-center justify-center mt-10 px-[30px]">
      <div className="flex gap-5 gap-y-4 flex-wrap">
        {sauces.map((sauce) => (
          <Dialog key={sauce.id}>
            <DialogContent>
              <Card
                key={sauce.id}
                height="50rem"
                width="35.5rem"
                backgroundCard="bg-neutral-50"
                flipContentOptions={[
                  {
                    content: (
                      <>
                        {/* <div className="p-4 text-white  w-[12rem] flex flex-col mx-auto ">
                        <h2 className="text-xl font-semibold my-4 text-center">
                          {sauce.id}
                        </h2>
                        <ul className="flex flex-col gap-1 w-44 overflow-y-auto pr-2 mx-auto justify-center">
                          {sauce.ingredients.length > 0
            ? sauce.ingredients.map((ingredient) => (
                <div key={ingredient.id}>
                  {ingredient.imageUrl ? (
                    <ClickableItem
                      title={ingredient.name}
                      description={ingredient.description!}
                      origin="Italiano"
                      lightIcon={false}
                    />
                  ) : (
                    <div className="flex gap-2 items-center">
                      <div className="size-2 rounded-full bg-white ml-[5px] text-sm" />
                      <span className="ml-3">
                        {ingredient.name}
                      </span>
                    </div>
                  )}
                </div>
              ))
            : null}
                        </ul>
                      </div> */}
                        <div
                          key={sauce.id}
                          onClick={(e) => e.stopPropagation()}
                          className="flex flex-col justify-center text-white items-center text-center gap-4"
                        >
                          <h2 className="text-center uppercase text-2xl pt-10 font-bold">
                            {sauce.title}
                          </h2>
                          <span className="font-light w-4/5">
                            {sauce.description}
                          </span>
                          <div className="flex flex-col w-full h-full gap-3 relative p-10 pt-4">
                            <Image
                              src={SauceThumbnail}
                              alt={sauce.title}
                              className=" rounded-xl shadow-lg"
                            />
                          </div>
                        </div>
                      </>
                    ),
                    icon: BeveragesIcon,
                    label: 'Bebidas',
                    color: 'bg-pasta-main',
                    iconWidth: 15,
                  },
                  {
                    content: (
                      <>
                        {/* <div className="p-4 text-white  w-[12rem] flex flex-col mx-auto ">
                        <h2 className="text-xl font-semibold my-4 text-center">
                          {sauce.id}
                        </h2>
                        <ul className="flex flex-col gap-1 w-44 overflow-y-auto pr-2 mx-auto justify-center">
                          {sauce.ingredients.length > 0
            ? sauce.ingredients.map((ingredient) => (
                <div key={ingredient.id}>
                  {ingredient.imageUrl ? (
                    <ClickableItem
                      title={ingredient.name}
                      description={ingredient.description!}
                      origin="Italiano"
                      lightIcon={false}
                    />
                  ) : (
                    <div className="flex gap-2 items-center">
                      <div className="size-2 rounded-full bg-white ml-[5px] text-sm" />
                      <span className="ml-3">
                        {ingredient.name}
                      </span>
                    </div>
                  )}
                </div>
              ))
            : null}
                        </ul>
                      </div> */}
                        <div
                          key={sauce.id}
                          onClick={(e) => e.stopPropagation()}
                          className="flex flex-col justify-center text-white items-center text-center gap-4"
                        >
                          <h2 className="text-center uppercase text-2xl pt-10 font-bold">
                            {sauce.title}
                          </h2>
                          <span className="font-light w-4/5">
                            {sauce.description}
                          </span>
                          <div className="flex flex-col w-full h-full gap-3 relative p-10 pt-4">
                            <Image
                              src={SauceThumbnail}
                              alt={sauce.title}
                              className=" rounded-xl shadow-lg"
                            />
                          </div>
                        </div>
                      </>
                    ),
                    icon: IngredientsIcon,
                    label: 'Ingredientes',
                    color: 'bg-italian-main',
                    iconWidth: 24,
                  },
                ]}
                // isSuggested
              >
                <div
                  key={sauce.id}
                  onClick={(e) => e.stopPropagation()}
                  className="flex flex-col justify-center items-center text-center gap-4"
                >
                  <h2 className="text-center uppercase text-2xl pt-10 font-bold">
                    {sauce.title}
                  </h2>
                  <span className="font-light w-4/5">{sauce.description}</span>
                  <div className="flex flex-col w-full h-full gap-3 relative p-10 pt-4 pb-4">
                    <Image
                      src={SauceThumbnail}
                      alt={sauce.title}
                      className=" rounded-xl shadow-lg"
                    />
                  </div>
                  <div className="flex gap-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div
                        key={index}
                        className="inline-flex flex-col items-center w-28"
                      >
                        <div className="relative w-full mt-10">
                          <div className="absolute top-0 left-0 w-full h-24 -translate-y-1/2 pointer-events-none">
                            <div className="w-full h-full bg-[#F3D1D1]  rounded-t-full" />
                          </div>
                          <div className="pt-1  bg-[#F3D1D1] rounded-b-xl flex flex-col items-center p-3 shadow-xl">
                            <div className=" -mt-10 size-24 rounded-full border-4 border-[#CC7C7A] overflow-hidden shadow-xl  z-1">
                              <Image
                                src={PastaImgMedium}
                                alt="pasta"
                                className="object-cover w-full h-full "
                              />
                            </div>

                            <span className="text-sm my-3 font-semibold text-pasta-main ">
                              Pasta
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </DialogContent>
            <DialogTrigger>
              <div key={sauce.id}>
                <div className="flex flex-col w-full h-full gap-3 relative">
                  {sauce.isNew && <NewDishFloatingButton />}
                  <Image
                    src={SauceThumbnail}
                    alt={sauce.title}
                    className="size-40 rounded-xl shadow-lg"
                  />
                  <h2 className="text-center uppercase">{sauce.title}</h2>
                </div>
              </div>
            </DialogTrigger>
          </Dialog>
        ))}
      </div>
    </div>
  )
}

export default SaucesComponent
