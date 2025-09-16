"use client"

import { useId } from "react"

import { useCharacterLimit } from "@/hooks/use-character-limit"
import { Input } from "@/components/ui/input"

export default function SiretInputComponent() {
  const id = useId()
  const maxLength = 14
  const {
    value,
    characterCount,
    handleChange,
    maxLength: limit,
  } = useCharacterLimit({ maxLength })

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
          {characterCount}/{limit}
        </div>
      </div>
    </div>
  )
}
