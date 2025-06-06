'use client'

import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import RotatingLinesGrid from "./rotating-lines-grid"
import { useRef, useState, useEffect } from 'react'

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
  const marqueeRef = useRef<HTMLDivElement>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsScrolling(true)
    setStartX(e.touches[0].pageX - (marqueeRef.current?.offsetLeft || 0))
    setScrollLeft(marqueeRef.current?.scrollLeft || 0)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isScrolling) return
    e.preventDefault()
    const x = e.touches[0].pageX - (marqueeRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2
    if (marqueeRef.current) {
      marqueeRef.current.scrollLeft = scrollLeft - walk
    }
  }

  const handleTouchEnd = () => {
    setIsScrolling(false)
  }

  useEffect(() => {
    const marquee = marqueeRef.current
    if (marquee) {
      const handleScroll = () => {
        if (marquee.scrollLeft >= marquee.scrollWidth / 2) {
          marquee.scrollLeft = 0
        }
      }
      marquee.addEventListener('scroll', handleScroll)
      return () => marquee.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section className="py-16 relative z-10 w-full px-4">
      <div className="absolute inset-0 z-0 mx-4">
        <RotatingLinesGrid />
      </div>
      <div className="relative z-20">
        <h2 className={`text-3xl font-bold mb-8 text-center font-mono ${theme === 'dark' ? 'glow-text' : ''}`}>Skills</h2>
      </div>
      <div className="relative z-10 overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
        <div
          ref={marqueeRef}
          className="flex overflow-x-scroll no-scrollbar"
          style={{
            width: '100%',
            whiteSpace: 'nowrap',
            willChange: 'transform',
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex animate-marquee">
            {[...skills, ...skills, ...skills].map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className={`text-sm py-1 px-2 mx-4 whitespace-nowrap ${theme === 'dark' ? 'glassmorphism' : ''}`}
              >
                {skill}
              </Badge>
            ))}
          </div>
          <div className="flex animate-marquee" aria-hidden="true">
            {[...skills, ...skills, ...skills].map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className={`text-sm py-1 px-2 mx-4 whitespace-nowrap ${theme === 'dark' ? 'glassmorphism' : ''}`}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
      `}</style>
    </section>
  )
}

