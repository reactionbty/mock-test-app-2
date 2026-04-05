"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, Trophy, RotateCcw, LogOut } from "lucide-react"

interface ScorecardProps {
  totalQuestions: number
  correctCount: number
  wrongCount: number
  onExit: () => void
  onRetry?: () => void
}

export function Scorecard({
  totalQuestions,
  correctCount,
  wrongCount,
  onExit,
  onRetry,
}: ScorecardProps) {
  const percentage = Math.round((correctCount / totalQuestions) * 100)
  const skipped = totalQuestions - correctCount - wrongCount
  const answered = correctCount + wrongCount

  function getGrade() {
    if (percentage >= 90) return { label: "Excellent!", color: "text-success" }
    if (percentage >= 75) return { label: "Great Job!", color: "text-primary" }
    if (percentage >= 50) return { label: "Good Effort", color: "text-yellow-500" }
    return { label: "Keep Practicing", color: "text-destructive" }
  }

  const grade = getGrade()

  return (
    <div className="flex min-h-screen items-center justify-center p-5">
      <Card className="w-full max-w-[340px] border-border bg-card px-6 py-7">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3.5 flex h-13 w-13 items-center justify-center rounded-[14px] bg-primary/15">
            <Trophy className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Test Complete!
          </h1>
          <p className={`text-sm font-semibold ${grade.color}`}>
            {grade.label}
          </p>
        </div>

        {/* Score Display */}
        <div className="mb-5 border-b border-border pb-5 text-center">
          <div className="text-5xl font-bold tracking-tighter text-primary">
            {percentage}%
          </div>
          <p className="mt-1.5 text-[13px] text-muted-foreground">Your Score</p>
          <Progress value={percentage} className="mt-4 h-1.5" />
        </div>

        {/* Stats */}
        <div className="mb-5 flex justify-center gap-6">
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-success/15">
              <CheckCircle2 className="h-3.5 w-3.5 text-success" />
            </div>
            <span className="text-xl font-bold text-foreground">{correctCount}</span>
            <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
              Correct
            </span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-destructive/15">
              <XCircle className="h-3.5 w-3.5 text-destructive" />
            </div>
            <span className="text-xl font-bold text-foreground">{wrongCount}</span>
            <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
              Wrong
            </span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted/50">
              <span className="text-xs font-medium text-muted-foreground">?</span>
            </div>
            <span className="text-xl font-bold text-foreground">{skipped}</span>
            <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
              Skipped
            </span>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-5 rounded-xl bg-secondary/50 px-4 py-3.5">
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-muted-foreground">Total Questions</span>
            <span className="font-semibold text-foreground">{totalQuestions}</span>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-[13px]">
            <span className="text-muted-foreground">Answered</span>
            <span className="font-semibold text-foreground">
              {answered} / {totalQuestions}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2.5">
          {onRetry && (
            <Button
              variant="secondary"
              className="flex-1 gap-2 py-3"
              onClick={onRetry}
            >
              <RotateCcw className="h-4 w-4" />
              Retry
            </Button>
          )}
          <Button
            variant="default"
            className="flex-1 gap-2 py-3"
            onClick={onExit}
          >
            <LogOut className="h-4 w-4" />
            Exit
          </Button>
        </div>
      </Card>
    </div>
  )
}
