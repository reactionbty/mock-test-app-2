"use client"

import { Zap } from "lucide-react"

export function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex items-center gap-2 animate-pulse">
        <Zap className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold text-primary">MockTest</h1>
      </div>
    </div>
  )
}
