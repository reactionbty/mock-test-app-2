"use client"

import { BookOpen, ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SubjectCardProps {
  title: string
  subtitle: string
  badge?: string
  onClick: () => void
  icon?: "book" | "chapter" | "section"
}

export function SubjectCard({
  title,
  subtitle,
  badge = "New",
  onClick,
  icon = "book",
}: SubjectCardProps) {
  return (
    <Card
      className="flex cursor-pointer items-center justify-between border-border/50 bg-card/80 p-4 transition-all hover:scale-[0.98] hover:bg-primary/10 active:scale-[0.96]"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
          <BookOpen className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-medium text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="bg-primary/20 text-primary">
          {badge}
        </Badge>
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </div>
    </Card>
  )
}
