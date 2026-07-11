import { FamilyType } from "@/types/global";
import { SelectedDishes } from "../types";

export const initialState: SelectedDishes[] = [
    {
      name: FamilyType.APERITIVI,
      dishes: [],
      quantities: {},
    },
    {
      name: FamilyType.INSALATE,
      dishes: [],
      quantities: {},
    },
    {
      name: FamilyType.ANTIPASTI,
      dishes: [],
      quantities: {},
    },
    {
      name: FamilyType.PIATTI_PRINCIPALI,
      dishes: [],
      quantities: {},
    },
    {
      name: FamilyType.GUARNICIONES,
      dishes: [],
      quantities: {},
    },
    {
      name: FamilyType.SALSAS,
      dishes: [],
      quantities: {},
    },
    {
      name: FamilyType.LE_PIZZE,
      dishes: [],
      quantities: {},
    },
    {
      name: FamilyType.POSTRES,
      dishes: [],
      quantities: {},
    },
    {
      name: FamilyType.CUORE_FELICE,
      dishes: [],
      quantities: {},
    },
    { name: FamilyType.VINAGRETAS, dishes: [], quantities: {} },
    { name: FamilyType.BAMBINI, dishes: [], quantities: {} },
  ]