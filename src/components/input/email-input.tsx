import { useId } from "react"
import { MailIcon } from "lucide-react"

import { Input } from "@/components/ui/input"

interface EmailInputProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function EmailInput({ value = '', onChange }: EmailInputProps) {
  const id = useId()
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className="*:not-first:mt-2">
      <div className="relative">
        <Input 
          id={id} 
          className="peer pe-9 bg-white" 
          placeholder="Email" 
          type="email" 
          value={value}
          onChange={handleChange}
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
          <MailIcon size={16} aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
