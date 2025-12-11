// Family Icons
import AntipastiIcon from '@/assets/svgs/filters/family/antipasti-icon.svg'
import AperitiviIcon from '@/assets/svgs/filters/family/aperitivi-icon.svg'
import HeartIcon from '@/assets/svgs/filters/family/cuore-felici-icon.svg'
import DessertsIcon from '@/assets/svgs/filters/family/desserts-icon.svg'
import MainDishesIcon from '@/assets/svgs/filters/family/main-dishes-icon.svg'
import PizzaIcon from '@/assets/svgs/filters/family/pizza-icon.svg'
import SaladsIcon from '@/assets/svgs/filters/family/salads-icon.svg'

// Alergens Icons
import CeleryIcon from '@/assets/svgs/filters/alergens/celery-icon.svg'
import CrustaceansIcon from '@/assets/svgs/filters/alergens/crustaceans-icon.svg'
import EggsIcon from '@/assets/svgs/filters/alergens/egg-icon.svg'
import FishIcon from '@/assets/svgs/filters/alergens/fish-icon.svg'
import GlutenIcon from '@/assets/svgs/filters/alergens/gluten-icon.svg'
import MilkIcon from '@/assets/svgs/filters/alergens/milk-icon.svg'
import MollusksIcon from '@/assets/svgs/filters/alergens/mollusks-icon.svg'
import MustardIcon from '@/assets/svgs/filters/alergens/mustard-icon.svg'
import NutsIcon from '@/assets/svgs/filters/alergens/nuts-icon.svg'
import SesameIcon from '@/assets/svgs/filters/alergens/sesame-icon.svg'
import SulphitesIcon from '@/assets/svgs/filters/alergens/sulphite-icon.svg'
import SojaIcon from '@/assets/svgs/sauces/soja-restriction-icon.svg'
// Diet Icons
import PregnantIcon from '@/assets/svgs/filters/diet/pregnant-icon.svg'
import VegetarianIcon from '@/assets/svgs/filters/diet/vegetarian-icon.svg'

// Ingredients Icons
import CheeseIcon from '@/assets/svgs/filters/ingredients/cheese-icon.svg'
import MassIcon from '@/assets/svgs/filters/ingredients/mass-icon.svg'
import MeatIcon from '@/assets/svgs/filters/ingredients/meat-icon.svg'
import SeafoodIcon from '@/assets/svgs/filters/ingredients/seafood-icon.svg'
import StiffIcon from '@/assets/svgs/filters/ingredients/stiff-icon.svg'
import TomatoIcon from '@/assets/svgs/filters/ingredients/tomato-icon.svg'
import VegetablesIcon from '@/assets/svgs/filters/ingredients/vegetables-icon.svg'

//Flavours Icons
import CrunchyIcon from '@/assets/svgs/filters/flavours/crunchy-icon.svg'
import FreshIcon from '@/assets/svgs/filters/flavours/fresh-icon.svg'
import IntenseIcon from '@/assets/svgs/filters/flavours/intense-icon.svg'
import SoftIcon from '@/assets/svgs/filters/flavours/soft-icon.svg'
import SpicyIcon from '@/assets/svgs/filters/flavours/spicy-icon.svg'
import SweetIcon from '@/assets/svgs/filters/flavours/sweet-icon.svg'

// Base pasta Icons
import CreamyIcon from '@/assets/svgs/filters/base-pasta/creamy-icon.svg'
import OilIcon from '@/assets/svgs/filters/base-pasta/oil-icon.svg'
import { FilterItem } from './VerticalFilterMenu'


export const ingredientsFilters: FilterItem[] = [
    {
      id: 'queso',
      label: 'Queso',
      icon: CheeseIcon,
      selectedColorIcon: '#FEE67B',
    },
    { id: 'carne', label: 'Carne', icon: MeatIcon, selectedColorIcon: '#E59A61' },
    {
      id: 'productos del mar',
      label: 'Productos del mar',
      icon: SeafoodIcon,
      selectedColorIcon: '#E7A5AD',
    },
    {
      id: 'stiff',
      label: 'Fiambre',
      icon: StiffIcon,
      selectedColorIcon: '#734A84',
    },
    { id: 'masa de pizza', label: 'Masa de pizza', icon: MassIcon, selectedColorIcon: '#C5A468' },
    {
      id: 'vegetales',
      label: 'Vegetales',
      icon: VegetablesIcon,
      selectedColorIcon: '#78B591',
    },
    {
      id: 'tomate',
      label: 'Tomate',
      icon: TomatoIcon,
      selectedColorIcon: '#B74A35',
    },
  ]
  
 export const basePastaFilters: FilterItem[] = [
    {
      id: 'crema',
      label: 'Crema',
      icon: CreamyIcon,
      selectedColorIcon: '#93CBDC',
    },
    {
      id: 'aceite',
      label: 'Aceite',
      icon: OilIcon,
      selectedColorIcon: '#FFA92D',
    },
    {
      id: 'tomate',
      label: 'Tomate',
      icon: TomatoIcon,
      selectedColorIcon: '#B74A35',
    },
  ]
  
export const flavoursFilters: FilterItem[] = [
    {
      id: 'crujiente',
      label: 'Crujiente',
      icon: CrunchyIcon,
      selectedColorIcon: '#A55D56',
    },
    {
      id: 'picante',
      label: 'Picante',
      icon: SpicyIcon,
      selectedColorIcon: '#9B3944',
    },
    {
      id: 'dulce',
      label: 'Dulce',
      icon: SweetIcon,
      selectedColorIcon: '#DDB1ED',
    },
    {
      id: 'intenso',
      label: 'Intenso',
      icon: IntenseIcon,
      selectedColorIcon: '#30709D',
    },
    {
      id: 'fresco',
      label: 'Fresco',
      icon: FreshIcon,
      selectedColorIcon: '#84C2A5',
    },
    { id: 'suave', label: 'Suave', icon: SoftIcon, selectedColorIcon: '#FFCFDC' },
  ]
  
export const dietFilters: FilterItem[] = [
    {
      id: 'vegetariano',
      label: 'Vegetariana',
      icon: VegetarianIcon,
      selectedColorIcon: '#648E31',
    },
    {
      id: 'embarazadas',
      label: 'Embarazada',
      icon: PregnantIcon,
      selectedColorIcon: '#FB8FEF',
    },
  ]
  
export const allergensFilters: FilterItem[] = [
    {
      id: 'gluten',
      label: 'Gluten',
      icon: GlutenIcon,
      selectedColorIcon: '#F9AD73',
    },
    {
      id: 'lacteos',
      label: 'Lacteos',
      icon: MilkIcon,
      selectedColorIcon: '#93CBDC',
    },
    {
      id: 'soja',
      label: 'Soja',
      icon: SojaIcon,
      selectedColorIcon: '#93CBDC',
    },
    {
      id: 'frutos con cascara',
      label: 'Frutos con cascara',
      icon: NutsIcon,
      selectedColorIcon: '#81582F',
    },
    {
      id: 'pescado',
      label: 'Pescado',
      icon: FishIcon,
      selectedColorIcon: '#4591C7',
    },
    { id: 'huevo', label: 'Huevo', icon: EggsIcon, selectedColorIcon: '#D8C3AC' },
    {
      id: 'sulfitos',
      label: 'Sulfitos',
      icon: SulphitesIcon,
      selectedColorIcon: '#969D9E',
    },
    {
      id: 'apio',
      label: 'Apio',
      icon: CeleryIcon,
      selectedColorIcon: '#A5C295',
    },
    {
      id: 'moluscos',
      label: 'Moluscos',
      icon: MollusksIcon,
      selectedColorIcon: '#162847',
    },
    {
      id: 'crustaceos',
      label: 'Crustaceos',
      icon: CrustaceansIcon,
      selectedColorIcon: '#E1664F',
    },
    {
      id: 'mostaza',
      label: 'Mostaza',
      icon: MustardIcon,
      selectedColorIcon: '#E2BD17',
    },
    {
      id: 'sesamo',
      label: 'Sesamo',
      icon: SesameIcon,
      selectedColorIcon: '#CAABD5',
    },
  ]
  
  export const familyFilters: FilterItem[] = [
    {
      id: 'aperitivi',
      label: 'Aperitivi',
      icon: AperitiviIcon,
      selectedColorIcon: '#E7CAA1',
    },
    {
      id: 'antipasti',
      label: 'Antipasti',
      icon: AntipastiIcon,
      selectedColorIcon: '#5D5F34',
    },
    {
      id: 'insalate',
      label: 'Ensaladas',
      icon: SaladsIcon,
      selectedColorIcon: '#9E9E26',
    },
    {
      id: 'cuore-felice',
      label: 'Cuore Felici',
      icon: HeartIcon,
      selectedColorIcon: '#960313',
    },
    {
      id: 'piatti-principali',
      label: 'Platos Principales',
      icon: MainDishesIcon,
      selectedColorIcon: '#8D3984',
    },
    {
      id: 'le-pizze',
      label: 'Pizza',
      icon: PizzaIcon,
      selectedColorIcon: '#E7B864',
    },
    {
      id: 'postres',
      label: 'Postres',
      icon: DessertsIcon,
      selectedColorIcon: '#E75E83',
    },
  ]