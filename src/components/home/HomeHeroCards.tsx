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

export const HomeHeroCards = () => {
  return (
    <div className="flex flex-wrap justify-center gap-3 lg:flex-nowrap">
      {HOME_HERO_CARDS.map((card) =>
        card.type === 'image' ? (
          <HomeImageCard
            key={card.href}
            label={card.label}
            href={card.href}
            image={card.label === 'RECOMENDAR' ? RECOMENDAR_IMAGE : card.image}
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
