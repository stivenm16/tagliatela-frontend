import { FamilyType } from "@/types/global"
import { CMAndNDLayoutProps, Field, FieldDishes, OptionGroup, SelectedDishes } from "../types"

export const mapCategoryToGroup = (category: FieldDishes): OptionGroup => ({
    label: category.name,
    options: category.dishes.map((dish: any) => ({
      id: dish.id,
      name: dish.name,
    })),
  })

  export const normalizeForSubmit = (
    selected: SelectedDishes[],
    fields: Field[],
  ): SelectedDishes[] => {
    const result: SelectedDishes[] = []
  
    fields.forEach((field) => {
      if (!field.isGrouped) {
        const found = selected.find((s) => s.name === field.name)
  
        result.push({
          name: field.name,
          dishes: found?.dishes || [],
        })
        return
      }

      field.groups.forEach((group) => {
        const groupIds = group.options.map((o) => o.id)
  
        const selectedIds =
          selected
            .find((s) => s.name === group.label)
            ?.dishes || []
  
        // Ensure only valid IDs for that group
        const filtered = selectedIds.filter((id) =>
          groupIds.includes(id),
        )
  
        result.push({
          name: group.label as FamilyType,
          dishes: filtered,
        })
      })
    })
  
    return result
  }

  // utils/adapters.ts
export const buildFields = (
  fieldsData: Field[],
  variant: CMAndNDLayoutProps['variant'],
): Field[] => {
  const filtered =
    variant === 'no-disponibles'
      ? fieldsData.filter((f) => f.name !== FamilyType.GUARNICIONES)
      : fieldsData

  const insalateIndex = filtered.findIndex(
    (c) => c.name === FamilyType.INSALATE,
  )
  const vinagretasIndex = filtered.findIndex(
    (c) => c.name === FamilyType.VINAGRETAS,
  )

  let result = [...filtered]

  if (insalateIndex !== -1) {
    const insalate = filtered[insalateIndex]
    const vinagretas =
      vinagretasIndex !== -1 ? filtered[vinagretasIndex] : null

    const groupedSalads: Field = {
      name: FamilyType.INSALATE,
      isGrouped: true,
      groups: [
        mapCategoryToGroup(insalate as FieldDishes),
        ...(vinagretas ? [mapCategoryToGroup(vinagretas as FieldDishes)] : []),
      ],
    }

    result[insalateIndex] = groupedSalads

    if (vinagretasIndex !== -1) {
      result = result.filter((_, idx) => idx !== vinagretasIndex)
    }
  }

  return result
}

// utils/adapters.ts
export const mapSelectedFromDB = (
  initial: SelectedDishes[],
  dbData: FieldDishes[],
): SelectedDishes[] => {
  return initial.map((s) => {
    const fieldFromDB = dbData.find((f) => f.name === s.name)

    return {
      name: s.name,
      dishes: fieldFromDB ? fieldFromDB.dishes.map((d) => d.id) : [],
    }
  })
}