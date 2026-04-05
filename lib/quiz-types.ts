export interface Question {
  Question: string
  A: string
  B: string
  C: string
  D: string
  Answer: "A" | "B" | "C" | "D"
}

export interface SubjectData {
  [chapter: string]: string
}

export interface Subjects {
  [subject: string]: SubjectData
}

export type Screen = "subjects" | "chapters" | "sections" | "test"

export interface TestState {
  questions: Question[]
  currentIndex: number
  answers: Record<number, "A" | "B" | "C" | "D">
  correctCount: number
  wrongCount: number
}

export const subjects: Subjects = {
  "General Science": {
    Physics: "https://opensheet.elk.sh/1tEG2kuga3HyZRIjSjqJ4A0zqZ9yJPEk8ePly6ct_-TY/1",
  },
}

export const QUESTIONS_PER_SECTION = 100
