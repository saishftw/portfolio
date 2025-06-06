'use client'

import { useTheme } from "next-themes"
import { useGlowEffect } from '@/hooks/useGlowEffect';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight } from 'lucide-react'
import Link from "next/link";

const projects = [
  {
    title: "Wandr AI",
    description: "A conversational way to explore — with AI-powered, location-based guidance and immersive tours.",
    link: "https://devfolio.co/projects/wandrai-3996",
    tags: ["LLM", "Agents", "Mobile App"],
    year: 2025,
    logo: "/projects/wandrai.png",
  },
  {
    title: "Tweetwise",
    description: "AI-powered assistant for Twitter, without the API costs.",
    link: "https://devfolio.co/projects/tweetwise-378f",
    tags: ["Browser Extension", "Twitter/X", "LLM"],
    year: 2024,
    logo: "/projects/tweetwise.svg",
  },
  {
    title: "Sidekick",
    description: "The First AI-centric Life Companion that remembers, learns, and adapts to you.",
    link: "https://devfolio.co/projects/sidekick-ai-life-companion-83b9",
    tags: ["LLM", "Agents", "Mobile App"],
    year: 2024,
    logo: "/projects/sidekick.jpeg",
  },
  {
    title: "Meetsight",
    description: "Real-time meeting analysis with Speech-to-Text and LLM extraction.",
    link: "https://devfolio.co/projects/ai-meeting-insights-79a2",
    tags: ["Speech-to-Text", "LLM-extraction", "Real-time"],
    year: 2023,
    logo: "/projects/meetsight.png",
  },
  {
    title: "Project Pulse",
    description: "An AI-powered heatmap that visualizes project risks, progress, and resources from emails, documentation, and meeting transcripts.",
    link: "",
    tags: ["Document Processing", "Visualization", "Dashboard"],
    year: 2023,
    logo: "/projects/projectpulse.png",
  }
]

export function Projects() {
  const { theme } = useTheme()
  const glowRef = useGlowEffect()

  return (
    <section className="py-16" ref={glowRef}>
      <h2 className={`text-3xl font-bold mb-8 text-center font-mono ${theme === "dark" ? "glow-text" : ""}`}>
        Projects
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Link
            href={project.link}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            className="block group transition-all duration-300 transform hover:-translate-y-1"
          >
            <Card className="h-full glassmorphism animated-border-trail overflow-hidden relative group-hover:shadow-lg transition-all duration-300">
              <div className="absolute top-0 right-0 p-3 opacity-50 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="h-5 w-5 text-primary" />
              </div>

              <CardHeader className="flex flex-row items-center gap-4 pb-4">
                <div className="w-12 h-12 rounded-xl bg-transparent overflow-hidden flex-shrink-0">
                  <img
                    src={project.logo || "/placeholder.svg"}
                    alt={`${project.title} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <CardTitle
                    className={`${theme === "dark" ? "glow-text" : ""} group-hover:text-primary transition-colors pb-1`}
                  >
                    {project.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-1">{project.year}</CardDescription>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 pb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="glassmorphism text-xs text-white/80 py-2 px-3">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
