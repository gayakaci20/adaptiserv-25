import { useId } from "react"

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ServiceInputProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function ServiceInputComponent({ value = '', onChange }: ServiceInputProps) {
  const id = useId()
  
  const handleValueChange = (selectedValue: string) => {
    onChange?.(selectedValue);
  };

  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>Service</Label>
      <Select value={value} onValueChange={handleValueChange}>
        <SelectTrigger id={id} className="bg-white">
          <SelectValue placeholder="Sélectionner un service" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Développement Web">Développement Web</SelectItem>
          <SelectItem value="Application Mobile">Application Mobile</SelectItem>
          <SelectItem value="E-commerce">E-commerce</SelectItem>
          <SelectItem value="Consultation">Consultation</SelectItem>
          <SelectItem value="Maintenance">Maintenance</SelectItem>
          <SelectItem value="Autre">Autre</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
