import { LinkImgContainer } from '@/components/LinkImgContainer'
import { HOME_HERO_CARDS } from './constants'

export const HomeHeroCards = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {HOME_HERO_CARDS.map((card) => (
        <LinkImgContainer
          key={card.href}
          title={card.label}
          href={card.href}
          img={card.image}
          style={{ minWidth: '16rem', minHeight: '18rem' }}
        />
      ))}
    </div>
  )
}
