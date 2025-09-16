import { useId } from "react"
import { Textarea } from "@/components/ui/textarea"

export default function MessageInputComponent() {
  const id = useId()
  return (
    <div className="*:not-first:mt-2 bg-white">
      <Textarea id={id} placeholder="Laisser un message" />
    </div>
  )
}
