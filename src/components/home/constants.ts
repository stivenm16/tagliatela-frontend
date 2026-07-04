export interface HomeHeroCard {
  label: string
  href: string
  image: string
  alt: string
}

export const HOME_HERO_CARDS: HomeHeroCard[] = [
  {
    label: 'RECOMENDAR',
    href: '/recomendados',
    image: '/images/card-reference-image.png',
    alt: 'Ir a recomendados',
  },
  {
    label: 'PASTAS',
    href: '/pasta/',
    image: '/images/pasta-background.png',
    alt: 'Ir a pastas',
  },
  {
    label: 'SALSAS',
    href: '/pasta/salsa',
    image: '/images/salsa-background.png',
    alt: 'Ir a salsas',
  },
]

export interface HomeCategoryGroup {
  title: string
  colorClass: string
  items: {
    label: string
    href: string
  }[]
}

export const HOME_CATEGORY_GROUPS: HomeCategoryGroup[] = [
  {
    title: 'PRODUCTO ITALIANO',
    colorClass: 'bg-italian-main',
    items: [
      { label: 'EMBUTIDOS', href: '/productos-italianos/embutidos' },
      { label: 'QUESOS', href: '/productos-italianos/quesos' },
      { label: 'OTROS', href: '/productos-italianos/otros' },
    ],
  },
  {
    title: 'BEBIDAS',
    colorClass: 'bg-beverages-main',
    items: [
      { label: 'VINOS', href: '/bebidas/vinos' },
      { label: 'COCKTAILS', href: '/bebidas/cocktails' },
      { label: 'SANGRÍA', href: '/bebidas/sangria' },
    ],
  },
]

export const HOME_WIDGET_LINKS = {
  checkMeeting: '/check-meeting',
  noDisponibles: '/platos-no-disponibles',
} as const
