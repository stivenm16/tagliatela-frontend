import { FamilyType } from "@/types/global"

export type Option = {
    id: number
    name: string
  }
  
  export type OptionGroup = {
    label: string
    options: Option[]
  }
  
  export type BaseField = {
    name: FamilyType
    dishes: Dish[]
    isGrouped?: false
  }
  
  export type GroupedField = {
    name: FamilyType
    isGrouped: true
    groups: OptionGroup[]
  }
  
  // ✅ Union
  export type Field = BaseField | GroupedField

  export interface CMAndNDLayoutProps {
    variant: 'check-meeting' | 'no-disponibles'
    title?: string
  }
  
  export interface Dish {
    id: number
    name: string
    thumbnailUrl: string
  }
  export interface FieldDishes {
    name: FamilyType
    dishes: Dish[]
  }

  export interface SelectedDishes {
    name: FamilyType
    dishes: number[]
  }