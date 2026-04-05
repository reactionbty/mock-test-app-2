"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, XCircle, Trophy, LogOut, RotateCcw } from "lucide-react"

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
  const unanswered = totalQuestions - correctCount - wrongCount

  function getGrade() {
    if (percentage >= 90) return { label: "Excellent!", color: "text-success" }
    if (percentage >= 75) return { label: "Great Job!", color: "text-primary" }
    if (percentage >= 50) return { label: "Good Effort", color: "text-yellow-500" }
    return { label: "Keep Practicing", color: "text-destructive" }
  }

  const grade = getGrade()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Trophy Icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/15">
            <Trophy className="h-10 w-10 text-primary" />
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-2 text-center text-2xl font-bold text-foreground">
          Test Complete!
        </h1>
        <p className={`mb-8 text-center text-lg font-medium ${grade.color}`}>
          {grade.label}
        </p>

        {/* Score Circle */}
        <div className="mb-8 flex justify-center">
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-primary/30">
            <div className="text-center">
              <span className="text-4xl font-bold text-foreground">{percentage}%</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-3 gap-3">
          <Card className="flex flex-col items-center border-none bg-success/15 p-4">
            <CheckCircle2 className="mb-2 h-6 w-6 text-success" />
            <span className="text-2xl font-bold text-success">{correctCount}</span>
            <span className="text-xs text-muted-foreground">Correct</span>
          </Card>
          <Card className="flex flex-col items-center border-none bg-destructive/15 p-4">
            <XCircle className="mb-2 h-6 w-6 text-destructive" />
            <span className="text-2xl font-bold text-destructive">{wrongCount}</span>
            <span className="text-xs text-muted-foreground">Wrong</span>
          </Card>
          <Card className="flex flex-col items-center border-none bg-muted p-4">
            <div className="mb-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-muted-foreground">
              <span className="text-xs text-muted-foreground">?</span>
            </div>
            <span className="text-2xl font-bold text-muted-foreground">{unanswered}</span>
            <span className="text-xs text-muted-foreground">Skipped</span>
          </Card>
        </div>

        {/* Summary */}
        <Card className="mb-6 border-none bg-secondary p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total Questions</span>
            <span className="font-medium text-foreground">{totalQuestions}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Your Score</span>
            <span className="font-medium text-foreground">
              {correctCount} / {totalQuestions}
            </span>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          {onRetry && (
            <Button
              variant="secondary"
              className="w-full"
              onClick={onRetry}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Retry Test
            </Button>
          )}
          <Button
            variant="default"
            className="w-full"
            onClick={onExit}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Exit to Sections
          </Button>
        </div>
      </div>
    </div>
  )
}
