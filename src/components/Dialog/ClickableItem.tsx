'use client'
import CardReferenceImage from '@/assets/images/card-reference-image.png'

import InfoDark from '@/assets/svgs/help-circle-dark.svg'
import InfoLight from '@/assets/svgs/help-circle-light.svg'
import GeneralDialogContent from '@/components/Dialog/GeneralDialog'
import Image from 'next/image'
import { JSX } from 'react'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from './Dialog'

interface ItemProps {
  isFlipped?: boolean
  title: string
  description: string
  href?: string
  origin?: string
  lightIcon?: boolean
  customDialog?: JSX.Element
}
export const ClickableItem = ({
  title,
  description,
  lightIcon,
  origin,
  customDialog,
}: ItemProps) => {
  return (
    <li>
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="flex mr-auto gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {lightIcon ? (
              <Image src={InfoLight} alt={title} />
            ) : (
              <Image src={InfoDark} alt={title} />
            )}
            <span className='text-sm"'>{title}</span>
          </div>
        </DialogTrigger>
        <DialogContent className="Dialog rounded-lg relative ">
          <div className="absolute -top-4 -right-4">
            <DialogClose />
          </div>
          {customDialog ? (
            customDialog
          ) : (
            <GeneralDialogContent
              title={title}
              description={description}
              img={CardReferenceImage}
              origin={origin}
            />
          )}
        </DialogContent>
      </Dialog>
    </li>
  )
}
