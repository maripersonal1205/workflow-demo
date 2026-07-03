"use client";

import { useEffect, useState, type ReactNode } from "react";

const SCROLL_TRIGGER = 80;

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function RevealOnScroll({
  children,
  className = "",
  delay = 0,
}: RevealOnScrollProps) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      if (window.scrollY >= SCROLL_TRIGGER) {
        window.removeEventListener("scroll", onScroll);
        timeout = setTimeout(() => setRevealed(true), delay);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timeout);
    };
  }, [delay]);

  return (
    <div
      className={`${className} transition-[opacity,translate] duration-2000 ease-out ${
        revealed
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-8 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
