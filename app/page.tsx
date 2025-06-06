import { ModeToggle } from "@/components/mode-toggle"
import { Hero } from "@/components/hero"
import { Skills } from "@/components/skills"
import { Experience } from "@/components/experience"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import RotatingLinesGrid from "@/components/rotating-lines-grid"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground glow-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-8">
          <ModeToggle />
        </div>
        <Hero />
        <div className="relative my-16">
          <div className="absolute inset-0 z-0">
            <RotatingLinesGrid />
          </div>
          <div className="relative z-10">
            <Skills />
          </div>
        </div>
        <Projects />
        <Experience />
        <Contact />
      </div>
    </main>
  )
}

