"use client"

import { Spinner } from "@/components/ui/spinner"

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-background/90 backdrop-blur-sm">
      <Spinner size="lg" className="text-primary" />
    </div>
  )
}
