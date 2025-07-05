import { CustomSelect } from '@/components/Select'
import { FilterSaucesOption } from '@/types/global'

interface FiltersSaucesProps {
  filters: FilterSaucesOption[]
  handleSelectChange: (
    selectedIndex: number | null,
    placeHolder: string,
  ) => void
}
export const FiltersSauces = ({
  filters,
  handleSelectChange,
}: FiltersSaucesProps) => {
  return (
    <>
      {filters.map((filter) => (
        <CustomSelect
          key={filter.placeHolder}
          label={filter.options[filter.selectedValue[0]]?.label ?? 'None'}
          options={filter.options}
          selectedIndex={filter.selectedValue[0] ?? null}
          onChange={(index) => handleSelectChange(index, filter.placeHolder)}
          customStyles={{ width: '200px', marginRight: '10px' }}
        />
      ))}
    </>
  )
}
