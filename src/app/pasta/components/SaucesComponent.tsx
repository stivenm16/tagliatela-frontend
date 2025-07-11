import PastaImg from '@/assets/images/pasta-image-reference.png'
import SauceImg from '@/assets/images/salsa.png'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/Dialog/Dialog'
import { Sauce } from '@/types/global'
import React from 'react'
import SauceDialog from './SauceDialog'

const NewDishFloatingButton = ({ styles }: { styles: React.CSSProperties }) => {
  return (
    <span
      style={styles}
      className="text-xs bg-red-500 text-white font-light h-6 items-center justify-center px-2 py-1 rotate-10 uppercase"
    >
      Nuevo
    </span>
  )
}

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
    <div className="flex flex-col items-center justify-center mt-10">
      {showTitle && (
        <h2 className="font-bold text-2xl uppercase text-pasta-main mb-6">
          Salsa disponibles
        </h2>
      )}

      <div className="flex flex-wrap px-12 w-full gap-2">
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
                className="p-1 mb-4 w-[20rem] text-left relative flex gap-2 cursor-pointer select-none"
              >
                <div className="w-5">
                  <input
                    type="checkbox"
                    onChange={() => toggleSauceSelection(sauce.id)}
                    checked={sauce.id === selectedSauceId}
                    className="hidden w-10"
                  />
                  <span
                    className={`w-5 h-5 flex items-center justify-center border-2 rounded-sm mt-1
                    ${
                      selectedSauceId == sauce.id
                        ? 'bg-red-600 border-red-600'
                        : 'border-red-600 bg-transparent'
                    }`}
                  >
                    {selectedSauceId == sauce.id && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </span>
                </div>
                <div>
                  <h3 className="font-semi text-lg uppercase flex gap-2 mb-1">
                    {sauce.title}
                    {sauce.isNew && <NewDishFloatingButton styles={{}} />}
                  </h3>
                  <p className="leading-[20px] font-light ">
                    {sauce.description}
                  </p>
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
