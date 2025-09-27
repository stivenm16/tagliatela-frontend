import PastaImg from '@/assets/images/pasta-image-reference.png'
import SauceImg from '@/assets/images/salsa.png'
import SauceThumbnail from '@/assets/images/sauce-thumbnail.png'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/Dialog/Dialog'
import { Sauce } from '@/types/global'
import Image from 'next/image'
import NewDishFloatingButton from './NewDishFloatingButton'
import SauceDialog from './SauceDialog'

interface SaucesComponentProps {
  sauces: Sauce[]
  toggleSauceSelection: (id: number) => void
  selectedSauceId: number | null
  showTitle?: boolean
}
const SaucesComponent = ({
  sauces,
  toggleSauceSelection,
  selectedSauceId,
  showTitle = true,
}: SaucesComponentProps) => {
  return (
    <div className="flex flex-col items-center justify-center mt-10 px-[30px]">
      {showTitle && (
        <h2 className="font-bold text-2xl uppercase text-pasta-main mb-6">
          Salsa disponibles
        </h2>
      )}
      {/* <Alert /> */}
      <div className="flex gap-5 gap-y-4 flex-wrap">
        {sauces.map((sauce) => (
          <Dialog key={sauce.id}>
            <DialogContent>
              <div className="bg-white p-5 rounded-md">
                <SauceDialog
                  selectedSauceId={selectedSauceId}
                  sauces={sauces}
                  SauceImg={SauceImg}
                  PastaImg={PastaImg}
                />
              </div>
            </DialogContent>
            <DialogTrigger>
              <div
                key={sauce.id}
                onClick={() => toggleSauceSelection(sauce.id)}
              >
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
