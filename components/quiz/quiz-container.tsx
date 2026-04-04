"use client"

import { useState, useEffect } from "react"
import { subjects, QUESTIONS_PER_SECTION } from "@/lib/quiz-types"
import type { Question, Screen } from "@/lib/quiz-types"
import { PageLoader } from "./page-loader"
import { LoadingSpinner } from "./loading-spinner"
import { ScreenHeader } from "./screen-header"
import { SubjectCard } from "./subject-card"
import { BottomNav } from "./bottom-nav"
import { TestScreen } from "./test-screen"

export function QuizContainer() {
  const [loading, setLoading] = useState(true)
  const [fetching, setFetching] = useState(false)
  const [screen, setScreen] = useState<Screen>("subjects")
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null)
  const [allQuestions, setAllQuestions] = useState<Question[]>([])
  const [testQuestions, setTestQuestions] = useState<Question[]>([])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  async function loadChapterData(subject: string, chapter: string) {
    setFetching(true)
    try {
      const response = await fetch(subjects[subject][chapter])
      const data = await response.json()
      setAllQuestions(data)
      setScreen("sections")
    } catch (error) {
      console.error("Failed to fetch questions:", error)
    } finally {
      setFetching(false)
    }
  }

  function handleSubjectClick(subject: string) {
    setSelectedSubject(subject)
    setScreen("chapters")
  }

  function handleChapterClick(chapter: string) {
    if (!selectedSubject) return
    setSelectedChapter(chapter)
    loadChapterData(selectedSubject, chapter)
  }

  function handleSectionClick(sectionIndex: number) {
    const start = sectionIndex * QUESTIONS_PER_SECTION
    const sectionQuestions = allQuestions.slice(start, start + QUESTIONS_PER_SECTION)
    setTestQuestions(sectionQuestions)
    setScreen("test")
  }

  function goBackToSubjects() {
    setScreen("subjects")
    setSelectedSubject(null)
    setSelectedChapter(null)
  }

  function goBackToChapters() {
    setScreen("chapters")
    setSelectedChapter(null)
    setAllQuestions([])
  }

  function goBackToSections() {
    setScreen("sections")
    setTestQuestions([])
  }

  if (loading) {
    return <PageLoader />
  }

  const totalSections = Math.ceil(allQuestions.length / QUESTIONS_PER_SECTION)

  return (
    <div className="mx-auto min-h-screen max-w-lg">
      {fetching && <LoadingSpinner />}

      {/* Subjects Screen */}
      {screen === "subjects" && (
        <div className="pb-6">
          <ScreenHeader
            title="Welcome"
            subtitle="Select a subject to begin"
            icon="welcome"
          />
          <div className="flex flex-col gap-3 p-4">
            {Object.keys(subjects).map((subject) => (
              <SubjectCard
                key={subject}
                title={subject}
                subtitle="Practice MCQs"
                badge="New"
                onClick={() => handleSubjectClick(subject)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Chapters Screen */}
      {screen === "chapters" && selectedSubject && (
        <div className="pb-20">
          <ScreenHeader
            title="Chapters"
            subtitle="Choose a chapter"
            icon="chapters"
          />
          <div className="flex flex-col gap-3 p-4">
            {Object.keys(subjects[selectedSubject]).map((chapter) => (
              <SubjectCard
                key={chapter}
                title={chapter}
                subtitle="Start Practice"
                badge="Start"
                onClick={() => handleChapterClick(chapter)}
              />
            ))}
          </div>
          <BottomNav onBack={goBackToSubjects} />
        </div>
      )}

      {/* Sections Screen */}
      {screen === "sections" && (
        <div className="pb-20">
          <ScreenHeader
            title="Sections"
            subtitle="Select a section"
            icon="sections"
          />
          <div className="flex flex-col gap-3 p-4">
            {Array.from({ length: totalSections }, (_, i) => (
              <SubjectCard
                key={i}
                title={`Section ${i + 1}`}
                subtitle="Practice Set"
                badge="Start Test"
                onClick={() => handleSectionClick(i)}
              />
            ))}
          </div>
          <BottomNav onBack={goBackToChapters} />
        </div>
      )}

      {/* Test Screen */}
      {screen === "test" && testQuestions.length > 0 && (
        <TestScreen questions={testQuestions} onExit={goBackToSections} />
      )}
    </div>
  )
}
