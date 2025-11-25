import { FilterAvaible } from "@/components/Layout/context/FilterContext"

export const matchesFilter = (
  dishValues: { name: string }[] | undefined,
  filterValue: string | undefined | null,
) => {
  if (filterValue && dishValues) {
    return dishValues.some(
      (value) => value.name.toLowerCase() === filterValue.toLowerCase(),
    )
  }
  return true
}

export function extractUniqueFilterData(dishes: any): FilterAvaible {
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