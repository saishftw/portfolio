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
import { Button } from "@/components/ui/button"
import { Github } from 'lucide-react'

const projects = [
  {
    title: "Sidekick",
    description: "The First AI-centric Life Companion that remembers, learns, and adapts to you.",
    link: "https://github.com/MLNB-Tech/sidekick-backend",
    tags: ["LLM", "Agents", "Mobile App"]
  },
   {
    title: "TweetWise",
    description: "AI-powered insights for Twitter threads, without the API costs.",
    link: "https://github.com/saishftw/tweetwise",
    tags: ["Browser Extension", "Twitter/X", "LLM"],
  },
  {
    title: "WandrAI",
    description: "Building the best conversational way to explore with AI-powered, location-based guidance and immersive tours.",
    link: "",
    tags: ["LLM", "Agents", "Mobile App"],
  },
  {
    title: "AI Meeting Insights",
    description: "Real-time meeting analysis system with Speech-to-Text and LLM extraction.",
    link: "",
    tags: ["Speech-to-Text", "LLM-extraction", "Real-time"],
  },
  {
    title: "ProjectPulse",
    description: "An AI-powered heatmap that visualizes project risks, progress, and resources from emails, documentation, and meeting transcripts.",
    link: "",
    tags: ["Document Processing", "Visualization", "Dashboard"],
  }
]

export function Projects() {
  const { theme } = useTheme()
  const glowRef = useGlowEffect();
  return (
    <section className="py-16" ref={glowRef}>
      <h2 className={`text-3xl font-bold mb-8 text-center font-mono ${theme === 'dark' ? 'glow-text' : ''}`}>Projects</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Card key={index} className="glassmorphism animated-border-trail">
            <CardHeader>
              <CardTitle className={theme === 'dark' ? 'glow-text' : ''}>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="glassmorphism glow-element">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="glassmorphism glow-element">
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        { project.link ? "View on GitHub" : "No repo" }
                      </a>
                  </Button>
                </CardFooter>        
          </Card>
        ))}
      </div>
    </section>
  )
}

