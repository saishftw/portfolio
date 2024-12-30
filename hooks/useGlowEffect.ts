'use client'

import { useEffect, useRef } from 'react';

export function useGlowEffect() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent, element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      element.style.setProperty('--x', `${(x / rect.width) * 100}%`);
      element.style.setProperty('--y', `${(y / rect.height) * 100}%`);
    };

    const elements = ref.current?.querySelectorAll('.animated-border-trail');
    elements?.forEach(element => {
      element.addEventListener('mousemove', (e) => handleMouseMove(e as MouseEvent, element as HTMLElement));
    });

    return () => {
      elements?.forEach(element => {
        element.removeEventListener('mousemove', (e) => handleMouseMove(e as MouseEvent, element as HTMLElement));
      });
    };
  }, []);

  return ref;
}

