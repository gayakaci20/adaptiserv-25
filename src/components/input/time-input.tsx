"use client"

import { useId } from "react"
import { ClockIcon } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface TimeInputProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function TimeInputComponent({ value = '', onChange }: TimeInputProps) {
  const id = useId()
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id} className="text-foreground text-sm font-medium">
        Heure souhaitée
      </Label>
      <div className="relative">
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 z-10 flex items-center justify-center ps-3">
          <ClockIcon size={16} aria-hidden="true" />
        </div>
        <Input
          id={id}
          type="time"
          className="bg-white ps-9"
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}
