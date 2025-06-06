"use client";

import { useEffect, useState } from "react";

export function ScrollIndicator() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function checkScroll() {
      const scrollable = window.innerHeight < document.body.scrollHeight;
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
      setShow(scrollable && !atBottom);
    }

    checkScroll();
    window.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed left-1/2 bottom-6 -translate-x-1/2 z-50 rounded-full shadow-lg bg-background/80 backdrop-blur flex items-center justify-center w-8 h-8 transition-opacity animate-bounce duration-1000"
      aria-hidden="true"
    >
      <svg
        className="w-4 h-4 text-foreground"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  );
}
