"use client"

import { LoaderCircleIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

interface LoadingButtonProps {
  isLoading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

export default function LoadingButton({ 
  isLoading = false, 
  onClick, 
  disabled = false, 
  children = "Envoyer",
  type = "submit"
}: LoadingButtonProps) {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={isLoading || disabled}
      data-loading={isLoading || undefined}
      className="group relative disabled:opacity-100 w-full h-10 px-3 py-2 text-sm"
    >
      <span className="group-data-loading:text-transparent">{children}</span>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoaderCircleIcon
            className="animate-spin"
            size={16}
            aria-hidden="true"
          />
        </div>
      )}
    </Button>
  )
}
