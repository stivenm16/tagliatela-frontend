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
  { Icon: SojaRestrictionIcon, alt: 'Soja Restriction Icon' },
  { Icon: MilkRestrictionIcon, alt: 'Milk Restriction Icon' },
  { Icon: EggsRestrictionIcon, alt: 'Eggs Restriction Icon' },
  { Icon: GlutenRestrictionIcon, alt: 'Gluten Restriction Icon' },
  { Icon: CeleryRestrictionIcon, alt: 'Celery Restriction Icon' },
  { Icon: SulphiteRestrictionIcon, alt: 'Sulphite Restriction Icon' },
]

const AlertSauces = () => {
  const [open, setOpen] = useState(true)
  const onCloseDialog = () => {
    setOpen(false)
  }
  return (
    <OverlayPopup open={open} onClose={onCloseDialog}>
      <div className="h-full w-full justify-center items-center flex  ">
        <div
          className={`p-5  bg-white/80 backdrop-blur-sm uppercase  md:w-[26rem] w-[23rem] px-10 ${'border-2 border-red-600'} rounded-2xl text-center shadow-lg relative`}
        >
          <div>
            <span>
              No se recomienda consumir pasta si el cliente tiene alergia a:
            </span>
            <div className="flex gap-4 mx-auto items-center justify-center my-4">
              {iconsToMap.map(({ Icon, alt }, index) => (
                <Icon key={index} />
              ))}
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
