"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, Trophy, RotateCcw, ArrowRight } from "lucide-react"

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
    <div className="flex min-h-screen flex-col p-5 pb-10">
      {/* Header */}
      <div className="py-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/15">
          <Trophy className="h-8 w-8 text-primary" />
        </div>
        <h1 className="mb-1 text-2xl font-bold tracking-tight text-foreground">
          Test Complete!
        </h1>
        <p className={`text-sm font-semibold ${grade.color}`}>
          {grade.label}
        </p>
      </div>

      {/* Score Card */}
      <Card className="mb-4 border-border bg-card p-6">
        <div className="mb-6 text-center">
          <div className="text-6xl font-bold tracking-tight text-primary">
            {percentage}%
          </div>
          <div className="mt-1 text-sm text-muted-foreground">Your Score</div>
          <Progress value={percentage} className="mt-4 h-2" />
        </div>

        <div className="my-5 h-px bg-border" />

        <div className="flex justify-around">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/20">
              <CheckCircle2 className="h-4 w-4 text-success" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">{correctCount}</span>
              <span className="text-xs text-muted-foreground">Correct</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/20">
              <XCircle className="h-4 w-4 text-destructive" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">{wrongCount}</span>
              <span className="text-xs text-muted-foreground">Wrong</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted-foreground/20">
              <span className="text-xs font-medium text-muted-foreground">?</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">{skipped}</span>
              <span className="text-xs text-muted-foreground">Skipped</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Summary Card */}
      <Card className="mb-6 border-border bg-card px-5 py-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Total Questions</span>
          <span className="font-semibold text-foreground">{totalQuestions}</span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-sm">
          <span className="text-muted-foreground">Answered</span>
          <span className="font-semibold text-foreground">
            {answered} / {totalQuestions}
          </span>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="mt-auto flex flex-col gap-3">
        {onRetry && (
          <Button
            variant="secondary"
            className="w-full gap-2"
            onClick={onRetry}
          >
            <RotateCcw className="h-4 w-4" />
            Retry Test
          </Button>
        )}
        <Button
          variant="default"
          className="w-full gap-2"
          onClick={onExit}
        >
          <ArrowRight className="h-4 w-4" />
          Back to Sections
        </Button>
      </div>
    </div>
  )
}
