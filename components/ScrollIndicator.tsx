"use client";

import { ChevronDown } from "lucide-react";
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
    <div className="fixed bottom-6 left-0 w-full flex justify-center pointer-events-none z-10">
      <div className="bg-background/60 backdrop-blur rounded-full p-1 animate-bounce text-gray-400 shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
        <ChevronDown size={22} />
      </div>
    </div>
  );
}
