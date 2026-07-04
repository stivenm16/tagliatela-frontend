'use client'

import { Button } from '@/components/buttons/Button'
import { useRouter } from 'next/navigation'
import { HOME_CATEGORY_GROUPS } from './constants'

export const HomeCategoryColumns = () => {
  const router = useRouter()

  return (
    <div className="flex flex-col sm:flex-row gap-6">
      {HOME_CATEGORY_GROUPS.map((group) => (
        <div
          key={group.title}
          className="flex flex-col gap-3 min-w-[12rem]"
        >
          <h3 className="text-center uppercase font-bold text-white text-lg">
            {group.title}
          </h3>
          <div className="flex flex-col gap-2">
            {group.items.map((item) => (
              <Button
                key={item.href}
                label={item.label}
                mainColor={group.colorClass}
                className="w-full font-bold"
                onClick={() => router.push(item.href)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
