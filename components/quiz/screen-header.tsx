import { BookOpen, Brain, Layout } from "lucide-react"

interface ScreenHeaderProps {
  title: string
  subtitle: string
  icon?: "welcome" | "chapters" | "sections"
}

const iconMap = {
  welcome: "👋",
  chapters: "📖",
  sections: "🧠",
}

export function ScreenHeader({
  title,
  subtitle,
  icon = "welcome",
}: ScreenHeaderProps) {
  return (
    <div className="px-4 pb-2 pt-5">
      <h2 className="text-2xl font-semibold text-foreground">
        {iconMap[icon]} {title}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
    </div>
  )
}
