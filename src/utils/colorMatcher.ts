const colorMap: Record<string, string> = {
  'pasta': '#5C052E',
  'recomendados': 'var(--color-suggested-main)',
  'bebidas': 'var(--color-beverages-main)',
  'productos-italianos': 'var(--color-italian-main)',  
  'checkmeeting': 'var(--color-checkmeeting-main)',
  'novedades': 'var(--color-news-main)',
  'no-disponibles': 'var(--color-not-available-main)'
};
const colorMatcher = (route: string): string => {
  const color = colorMap[route.toLowerCase()];  
  return color;
}

export default colorMatcher;