"use client"

import { Zap } from "lucide-react"

export function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex items-center gap-2.5 animate-pulse">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
          <Zap className="h-7 w-7 text-primary" />
        </div>
        <span className="text-4xl font-bold tracking-tight text-foreground">
          Test<span className="text-primary">bank</span>
        </span>
      </div>
    </div>
  )
}
