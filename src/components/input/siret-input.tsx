"use client"

import { useId } from "react"

import { Input } from "@/components/ui/input"

interface SiretInputProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function SiretInputComponent({ value = '', onChange }: SiretInputProps) {
  const id = useId()
  const maxLength = 14
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className="*:not-first:mt-2 bg-white">
      <div className="relative">
        <Input
          id={id}
          className="peer pe-14"
          type="text"
          placeholder="Siret"
          value={value}
          maxLength={maxLength}
          onChange={handleChange}
          aria-describedby={`${id}-description`}
        />
        <div
          id={`${id}-description`}
          className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-xs tabular-nums peer-disabled:opacity-50"
          aria-live="polite"
          role="status"
        >
          {value.length}/{maxLength}
        </div>
      </div>
    </div>
  )
}
