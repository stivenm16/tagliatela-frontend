import { getDishImage } from '@/utils/getImage'
import { HOME_HERO_CARDS } from './constants'
import { HomeButtonGroupCard } from './HomeButtonGroupCard'
import { HomeImageCard } from './HomeImageCard'

const RECOMENDAR_IMAGE = getDishImage({
  dishName: 'Trio di bruschette',
  category: 'CUORE FELICE',
  family: 'dishes',
  variant: '200x200',
})

const PASTAS_IMAGE = '/images/pastas/ripiena/tortellini/RIPIENA_Tortellini_148x148.png'

const getCardImage = (label: string, defaultImage: string): string => {
  if (label === 'RECOMENDAR') return RECOMENDAR_IMAGE
  if (label === 'PASTAS') return PASTAS_IMAGE
  return defaultImage
}

export const HomeHeroCards = () => {
  return (
    <div className="flex flex-wrap justify-center gap-3 lg:flex-nowrap">
      {HOME_HERO_CARDS.map((card) =>
        card.type === 'image' ? (
          <HomeImageCard
            key={card.href}
            label={card.label}
            href={card.href}
            image={getCardImage(card.label, card.image)}
            alt={card.alt}
            colorClass={card.colorClass}
          />
        ) : (
          <HomeButtonGroupCard
            key={card.label}
            label={card.label}
            colorClass={card.colorClass}
            buttonColorClass={card.buttonColorClass}
            items={card.items}
          />
        ),
      )}
    </div>
  )
}
