'use client'

import { Badge } from "@/components/ui/badge"
import { Github, Linkedin } from 'lucide-react'
import { useTheme } from "next-themes"

export function Hero() {
  const { theme } = useTheme()
  return (
    <section className="py-20 text-center">
      <h1 className={`text-4xl font-bold mb-4 font-mono ${theme === 'dark' ? 'glow-text' : ''}`}>Saish Kakodkar</h1>
      <h2 className="text-2xl mb-6 text-muted-foreground">Generative AI & Full-Stack Engineer</h2>
      <div className="flex justify-center space-x-4 mb-8">
        <Badge variant="outline" className="py-2 px-4 glassmorphism glow-element hover:border-primary/40 transition-colors">
          <Linkedin className="mr-2 h-4 w-4" />
          <a href="https://www.linkedin.com/in/saish-kakodkar-932028181/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </Badge>
        <Badge variant="outline" className="py-2 px-4 glassmorphism glow-element hover:border-primary/40 transition-colors">
          <Github className="mr-2 h-4 w-4" />
          <a href="https://github.com/saishftw" target="_blank" rel="noopener noreferrer">GitHub</a>
        </Badge>
      </div>
      <p className="max-w-2xl mx-auto text-muted-foreground">
        Software Engineer with 5 years of experience in enterprise-scale systems development, 
        focusing on Generative AI applications and complex full-stack solutions.
      </p>
    </section>
  )
}

