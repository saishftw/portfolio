'use client'

import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import RotatingLinesGrid from "./rotating-lines-grid"

const skills = [
  "Generative AI",
  "RAG",
  "Python",
  "FastAPI",
  "SQLAlchemy",
  "System Architecture",
  "Design",
  "Full-Stack Development",
  "Database Systems",
  "SQL",
  "Vector Databases",
  "Real-Time Systems",
  "WebRTC",
  "SignalR",
]

export function Skills() {
  const { theme } = useTheme()
  return (
    <section className="py-16 relative z-10 w-full px-4">
      <div className="absolute inset-0 z-0 mx-4">
        <RotatingLinesGrid  />
      </div>
      <div className="relative z-20">
        <h2 className={`text-3xl font-bold mb-8 text-center font-mono ${theme === 'dark' ? 'glow-text' : ''}`}>Skills</h2>
      </div>
      <div className="relative z-10">
        <div className="marquee marquee-fade">
          <div className="marquee-content">
            {[...skills, ...skills].map((skill, index) => (
              <Badge key={index} variant="secondary" className={`text-sm py-1 px-2 mx-4 whitespace-nowrap ${theme === 'dark' ? 'glassmorphism': ''}`}>
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

