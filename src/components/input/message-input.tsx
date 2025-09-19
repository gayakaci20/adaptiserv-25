import { useId } from "react"
import { Textarea } from "@/components/ui/textarea"

interface MessageInputProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function MessageInputComponent({ value = '', onChange }: MessageInputProps) {
  const id = useId()
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className="*:not-first:mt-2 bg-white">
      <Textarea 
        id={id} 
        placeholder="Laisser un message" 
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}
