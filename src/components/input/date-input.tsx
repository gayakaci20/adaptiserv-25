"use client"

import { useId } from "react"
import { CalendarIcon } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DateInputProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function DateInputComponent({ value = '', onChange }: DateInputProps) {
  const id = useId()
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id} className="text-foreground text-sm font-medium">Date souhaitée</Label>
      <div className="relative">
        <Input
          id={id}
          type="date"
          className="bg-white pe-9"
          value={value}
          onChange={handleChange}
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3">
          <CalendarIcon size={16} aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
