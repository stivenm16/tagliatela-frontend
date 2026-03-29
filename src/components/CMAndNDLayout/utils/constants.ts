import { FamilyType } from "@/types/global";
import { SelectedDishes } from "../types";

export const initialState: SelectedDishes[] = [
    {
      name: FamilyType.APERITIVI,
      dishes: [],
    },
    {
      name: FamilyType.INSALATE,
      dishes: [],
    },
    {
      name: FamilyType.ANTIPASTI,
      dishes: [],
    },
    {
      name: FamilyType.PIATTI_PRINCIPALI,
      dishes: [],
    },
    {
      name: FamilyType.GUARNICIONES,
      dishes: [],
    },
    {
      name: FamilyType.SALSAS,
      dishes: [],
    },
    {
      name: FamilyType.LE_PIZZE,
      dishes: [],
    },
    {
      name: FamilyType.POSTRES,
      dishes: [],
    },
    {
      name: FamilyType.CUORE_FELICE,
      dishes: [],
    },
    { name: FamilyType.VINAGRETAS, dishes: [] },
  ]