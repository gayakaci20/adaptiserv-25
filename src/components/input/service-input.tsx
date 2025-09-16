import { useId } from "react"

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ServiceInputComponent() {
  const id = useId()
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>Service</Label>
      <Select>
        <SelectTrigger id={id} className="bg-white">
          <SelectValue placeholder="Sélectionner un service" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Service 1</SelectItem>
          <SelectItem value="2">Service 2</SelectItem>
          <SelectItem value="3">Service 3</SelectItem>
          <SelectItem value="4">Service 4</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
