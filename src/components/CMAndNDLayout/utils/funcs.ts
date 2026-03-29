import { FamilyType } from "@/types/global"
import { Dish, Field, GroupedField, Option } from "../types"

export const findDishById = (
    dishId: number,
    category: FamilyType,
    fields: Field[]
  ): Option | Dish | null => {
    const field = fields.find((f) => f.name === category)

    // ✅ normal field
    if (field && !field.isGrouped) {
      return field.dishes.find((d) => d.id === dishId) || null
    }

    // 🔥 grouped field
    const groupedField = fields.find(
      (f): f is GroupedField => f.isGrouped === true,
    )

    if (groupedField) {
      for (const group of groupedField.groups) {
        if (group.label === category) {
          return group.options.find((o) => o.id === dishId) || null
        }
      }
    }

    return null
  }

