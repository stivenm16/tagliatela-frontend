import { fiambre, meats } from "@/components/Header/Filters/constants"

export const matchesFilter = (
  dishValues: { name: string }[] | undefined,
  filterValue: string | undefined | null,
) => {
  if (filterValue && dishValues) {
    return dishValues.some(
      (value) => value.name.toLowerCase() === filterValue.toLowerCase() || 
      (filterValue.toLowerCase() === 'carne' && meats.includes(value.name) 
    ) || 
    (filterValue.toLowerCase() === 'fiambre' && fiambre.includes(value.name)),
    )
  }
  return true
}

export const excludesAllergen = (
  dishAllergens?: { name: string }[] | undefined,
  selectedAllergen?: string | null,
) => {
  if (!selectedAllergen) return true
  if (!Array.isArray(dishAllergens)) return true

  const normalized = selectedAllergen.toLowerCase()

  return !dishAllergens.some(
    (a) => a.name.toLowerCase() === normalized,
  )
}

export function extractUniqueFilterData(dishes: any): any {
    const result = {
      allergens: new Set<string>(),
      diets: new Set<string>(),
      flavors: new Set<string>(),
      ingredients: new Set<string>(),
    }
  
    for (const dish of dishes) {
      const { filter, ingredients } = dish
  
      filter?.allergens?.forEach((a: any) => result.allergens.add(a.name))
      filter?.diets?.forEach((d: any) => result.diets.add(d.name))
  
      if (filter?.flavors)
        Object.values(filter.flavors).forEach((f: any) => {
          if (typeof f?.name === 'string') result.flavors.add(f.name)
        })
  
      ingredients?.forEach((i: any) => result.ingredients.add(i.name))
    }
  
    return {
      allergens: [...result.allergens],
      diets: [...result.diets],
      flavors: [...result.flavors],
      ingredients: [...result.ingredients],
    }
  }