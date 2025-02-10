import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

interface Option {
  value: string;
  label: string;
}

interface Props {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  options: Option[];
}

export const SelectDropdown = ({ value, onValueChange, placeholder, options }: Props) => {
  return (<Select value={value} onValueChange={onValueChange}>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      {options.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>)
}