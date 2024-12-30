'use client'

import { Button } from "@/components/ui/button"
import { Mail } from 'lucide-react'
import { useTheme } from "next-themes"

export function Contact() {
  const { theme } = useTheme()
  return (
    <section className="py-16 text-center">
      <h2 className={`text-3xl font-bold mb-8  font-mono ${theme === 'dark' ? 'glow-text' : ''}`}>Contact</h2>
      <Button variant="outline" asChild className="glassmorphism glow-element">
        <a href="mailto:ksaish1998@gmail.com">
          <Mail className="mr-2 h-5 w-5" />
          ksaish1998@gmail.com
        </a>
      </Button>
    </section>
  )
}

