'use client'

import { ImageComponent } from '@/components/ImageComponent'
import { FamilyType } from '@/types/global'
import { getDishImage } from '@/utils/getImage'
import Link from 'next/link'
import { HOME_WIDGET_LINKS } from './constants'

export interface CheckMeetingWidgetDish {
  id: number
  name: string
  category: FamilyType
  quantity: number
}

interface CheckMeetingWidgetProps {
  dishes: CheckMeetingWidgetDish[]
}

export const CheckMeetingWidget = ({ dishes }: CheckMeetingWidgetProps) => {
  return (
    <Link
      href={HOME_WIDGET_LINKS.checkMeeting}
      className="flex-1 min-w-[18rem] max-w-md bg-checkmeeting-main rounded-xl p-4 shadow-lg flex flex-col gap-3 text-white hover:brightness-105 transition-transform"
    >
      <h3 className="uppercase font-bold text-xl text-center">CHECKMEETING</h3>

      {dishes.length === 0 ? (
        <p className="text-center uppercase text-sm opacity-90">
          No hay platos seleccionados
        </p>
      ) : (
        <ul className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
          {dishes.map((dish) => {
            const isSauce = dish.category.toLowerCase() === 'salsas'
            const imgSrc = getDishImage({
              dishName: dish.name,
              category: dish.category,
              family: isSauce ? 'sauces' : 'dishes',
              variant: '96x96',
            })

            return (
              <li
                key={`${dish.category}-${dish.id}`}
                className="flex items-center gap-3 bg-white/10 rounded-lg p-2"
              >
                <ImageComponent
                  src={imgSrc}
                  alt={dish.name}
                  width={48}
                  height={48}
                  className="object-cover rounded-md shrink-0"
                />
                <span className="flex-1 uppercase text-sm font-semibold truncate">
                  {dish.name}
                </span>
                <span className="bg-white text-checkmeeting-main font-bold rounded-full size-7 flex items-center justify-center text-sm shrink-0">
                  {dish.quantity}
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </Link>
  )
}
