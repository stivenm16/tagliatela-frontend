const colorMap: Record<string, string> = {
  'pasta': 'var(--color-pasta-main)',
  'recomendados': 'var(--color-suggested-main)',
  'bebidas': 'var(--color-beverages-main)',
  'productos-italianos': 'var(--color-italian-main)',  
  'check-meeting': 'var(--color-checkmeeting-main)',
  'novedades': 'var(--color-news-main)',
  'platos-no-disponibles': 'var(--color-not-available-main)'
};
const colorMatcher = (route: string): string => {
  const color = colorMap[route.toLowerCase()];  
  return color;
}

export default colorMatcher;