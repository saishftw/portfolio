'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTheme } from "next-themes"
import { useGlowEffect } from '@/hooks/useGlowEffect';

const experiences = [
  {
    title: "Generative AI Engineer Lead",
    company: "ClaySys Technologies",
    date: "November 2023 - Current",
    description: [
      "Leading an 8-engineer team building enterprise-grade GenAI applications, delivering 90% RAG accuracy through proven retrieval strategies and evaluation pipelines.",
      "Acting as the primary technical liaison for US-based enterprise clients — driving requirement gathering, defining implementation strategies, and influencing technical decisions as part of the Senior Leadership Team.",
    ],
  },
  {
    title: "Senior Software Engineer",
    company: "ClaySys Technologies",
    date: "September 2021 - November 2023",
    description: [
      "Developed and delivered an enterprise Video Banking platform (WebRTC, Twilio) supporting multi-participant sessions, screen sharing, and co-browsing for multiple credit unions.",
      "Independently built a Text Messaging platform featuring opt management, multi-factor authentication, automated escalation workflows, and video/audio call integration.",
      "Fast-tracked to Senior Software Engineer with a 4-level promotion in 8 months.",
    ],
  },
  {
    title: "Software Engineer",
    company: "ClaySys Technologies",
    date: "June 2020 - September 2021",
    description: [
      "Developed and maintained a scalable URL Shortener service, integrated across enterprise applications.",
      "Mentored and trained 2 junior engineers, enabling skill growth and improving team productivity.",
    ],
  },
]

export function Experience() {
  const { theme } = useTheme()
  const glowRef = useGlowEffect();
  return (
    <section className="py-16" ref={glowRef}>
      <h2 className={`text-3xl font-bold mb-8 text-center font-mono ${theme === 'dark' ? 'glow-text' : ''}`}>Experience</h2>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 w-0.5 h-full bg-primary opacity-50" />
        
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-8">
              {/* Timeline dot */}
              <div className="absolute left-0 w-3 h-3 bg-primary rounded-full -translate-x-1/3 glow-element" />
              
              <Card className="glassmorphism animated-border-trail">
                <CardHeader>
                  <CardTitle className={theme === 'dark' ? 'glow-text' : ''}>{exp.title}</CardTitle>
                  <CardDescription className="pt-1 text-xs">{exp.company} | {exp.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

