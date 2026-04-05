"use client"

import { Button } from "@/components/ui/button"

interface BottomNavProps {
  onBack?: () => void
  onNext?: () => void
  onExit?: () => void
  showBack?: boolean
  showNext?: boolean
  showExit?: boolean
  backLabel?: string
}

export function BottomNav({
  onBack,
  onNext,
  onExit,
  showBack = true,
  showNext = false,
  showExit = false,
  backLabel = "Back",
}: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-lg border-t border-border/50 bg-background/95 p-3 backdrop-blur-sm">
      <div className="flex gap-2">
        {showExit && (
          <Button
            variant="secondary"
            className="flex-1"
            onClick={onExit}
          >
            Exit
          </Button>
        )}
        {showBack && (
          <Button
            variant="secondary"
            className="flex-1"
            onClick={onBack}
          >
            {backLabel}
          </Button>
        )}
        {showNext && (
          <Button
            variant="secondary"
            className="flex-1"
            onClick={onNext}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  )
}
