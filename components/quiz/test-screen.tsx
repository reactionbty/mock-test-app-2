"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, XCircle, ArrowLeft, ArrowRight, LogOut } from "lucide-react"
import type { Question } from "@/lib/quiz-types"
import { cn } from "@/lib/utils"

interface TestScreenProps {
  questions: Question[]
  onExit: () => void
}

export function TestScreen({ questions, onExit }: TestScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, "A" | "B" | "C" | "D">>({})
  const [correctCount, setCorrectCount] = useState(0)
  const [wrongCount, setWrongCount] = useState(0)

  const currentQuestion = questions[currentIndex]
  const hasAnswered = answers[currentIndex] !== undefined
  const progressValue = ((currentIndex + 1) / questions.length) * 100

  const options: ("A" | "B" | "C" | "D")[] = ["A", "B", "C", "D"]

  function handleSelect(option: "A" | "B" | "C" | "D") {
    if (hasAnswered) return

    const isCorrect = option === currentQuestion.Answer

    setAnswers((prev) => ({ ...prev, [currentIndex]: option }))
    if (isCorrect) {
      setCorrectCount((c) => c + 1)
    } else {
      setWrongCount((c) => c + 1)
    }
  }

  function getOptionClass(option: "A" | "B" | "C" | "D") {
    if (!hasAnswered) {
      return "bg-secondary hover:bg-secondary/80 cursor-pointer"
    }

    const isCorrectAnswer = option === currentQuestion.Answer
    const isSelectedAnswer = answers[currentIndex] === option

    if (isCorrectAnswer) {
      return "bg-success text-success-foreground"
    }
    if (isSelectedAnswer && !isCorrectAnswer) {
      return "bg-destructive text-destructive-foreground"
    }
    return "bg-secondary opacity-50"
  }

  return (
    <div className="flex min-h-screen flex-col pb-20">
      {/* Progress Section */}
      <div className="border-b border-border/50 p-4">
        <Progress value={progressValue} className="h-1.5" />
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-destructive">
              <XCircle className="h-4 w-4" />
              {wrongCount}
            </span>
            <span className="flex items-center gap-1.5 text-success">
              <CheckCircle2 className="h-4 w-4" />
              {correctCount}
            </span>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="px-4 py-6">
        <h2 className="text-lg font-medium leading-relaxed text-foreground">
          {currentIndex + 1}. {currentQuestion.Question}
        </h2>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3 px-4">
        {options.map((option) => (
          <Card
            key={option}
            className={cn(
              "cursor-pointer border-none p-4 transition-all",
              getOptionClass(option)
            )}
            onClick={() => handleSelect(option)}
          >
            <span className="font-medium">
              {option}. {currentQuestion[option]}
            </span>
          </Card>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-lg border-t border-border/50 bg-background/95 p-3 backdrop-blur-sm">
        <div className="flex gap-2">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={onExit}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Exit
          </Button>
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            disabled={currentIndex === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
            disabled={currentIndex === questions.length - 1}
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
