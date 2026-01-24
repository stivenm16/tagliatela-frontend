import CeleryRestrictionIcon from '@/assets/svgs/sauces/celery-restriction-icon.svg'
import EggsRestrictionIcon from '@/assets/svgs/sauces/eggs-restriction-icon.svg'
import GlutenRestrictionIcon from '@/assets/svgs/sauces/gluten-restriction-icon.svg'
import MilkRestrictionIcon from '@/assets/svgs/sauces/milk-restriction-icon.svg'
import SojaRestrictionIcon from '@/assets/svgs/sauces/soja-restriction-icon.svg'
import SulphiteRestrictionIcon from '@/assets/svgs/sauces/sulphite-restriction-icon.svg'
import CloseButton from '@/components/buttons/AlertCloseButton'
import OverlayPopup from '@/components/Dialog/OverlayPopup'
import { useState } from 'react'

const iconsToMap = [
  { Icon: SojaRestrictionIcon, alt: 'Soja Restriction Icon', name: 'Soja' },
  {
    Icon: GlutenRestrictionIcon,
    alt: 'Gluten Restriction Icon',
    name: 'Gluten',
  },
  { Icon: MilkRestrictionIcon, alt: 'Milk Restriction Icon', name: 'Lacteos' },
  { Icon: CeleryRestrictionIcon, alt: 'Celery Restriction Icon', name: 'Apio' },
  { Icon: EggsRestrictionIcon, alt: 'Eggs Restriction Icon', name: 'Huevo' },
  {
    Icon: SulphiteRestrictionIcon,
    alt: 'Sulphite Restriction Icon',
    name: 'Sulfitos',
  },
]

interface AlertSaucesProps {
  onClose?: () => void
}
const AlertSauces = ({ onClose }: AlertSaucesProps) => {
  const [open, setOpen] = useState(true)
  const onCloseDialog = () => {
    setOpen(false)
    onClose?.()
  }
  return (
    <OverlayPopup open={open} onClose={onCloseDialog}>
      <div className="h-full w-full justify-center items-center flex">
        <div
          className={`p-5  bg-white/80 backdrop-blur-sm uppercase  md:w-[30rem] w-[24rem] px-10 ${'border-2 border-red-600'} rounded-2xl text-center shadow-lg relative`}
        >
          <div>
            <span>
              No se recomienda consumir pasta si el cliente tiene alergia a:
            </span>
            <div className=" gap-4 grid grid-cols-2 items-center justify-center my-4 w-56 mx-auto">
              {iconsToMap.map(({ Icon, name }, index) => (
                <div key={index} className="flex gap-4 text-checkmeeting-main">
                  <Icon />
                  <span className="">{name}</span>
                </div>
              ))}
            </div>
            <div className="text-checkmeeting-main italic mb-6">
              *Estos ingredientes pueden no estar presentes en todas las salsas,
              pero si en las pastas
            </div>
            <span className="font-bold">
              Por favor pregunta si existe alguna restriccion alimentaria.
            </span>
          </div>

          <CloseButton onClick={onCloseDialog} />
        </div>
      </div>
    </OverlayPopup>
  )
}

export default AlertSauces
