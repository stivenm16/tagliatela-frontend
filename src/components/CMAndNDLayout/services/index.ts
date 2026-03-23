import axiosInstance from "@/lib/axios"
import { toast } from "sonner"
import { CMAndNDLayoutProps, SelectedDishes } from "../types"


const baseUrl = (variant: CMAndNDLayoutProps['variant']) =>
  variant === 'check-meeting' ? 'checkmeeting/recommended' : 'unavailable/disable'
    
  export const getContent = async (variant: CMAndNDLayoutProps['variant']) => {
    const response = await axiosInstance.get(
      `checkmeeting?is_checkmeeting=${variant === 'check-meeting'}`,
      {
        withCredentials: true,
      },
    )

    if (response.status !== 200) {
      throw new Error('Error fetching dishes')
    }

    return response.data
  }

export const getSelectedDishesFromDB = async (
    variant: CMAndNDLayoutProps['variant'],
) => {
    try {
    const response = await axiosInstance.get(
        variant === 'check-meeting' ? baseUrl(variant) : '/unavailable',
        {
        withCredentials: true,
        },
    )
    return response.data
    } catch (error) {
    console.error('Error fetching selected dishes:', error)
    }
}

export const updateDishes = async (dishes: SelectedDishes[] | any[], variant: CMAndNDLayoutProps['variant']) => {
    try {
        const response = await axiosInstance.post(baseUrl(variant), dishes)
        if (response.status !== 200 && response.status !== 201) {
        throw new Error('Error updating dishes')
        }
        toast('Actualizado con éxito', {
        description: 'Los platos fueron actualizados correctamente',
        action: {
            label: 'Cerrar',
            onClick: () => toast.dismiss(),
        },
        })
        return response.data
    } catch (error) {
        console.error('Error updating dishes:', error)
    }
    }