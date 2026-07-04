"use client";

import { useEffect, useState, type ElementType } from "react";

export const TYPING_SPEED = 500 / 8; // ~63ms per character

// Reveals `text` one character at a time once `active` is true.
export function useTypewriter(
  text: string,
  active: boolean,
  startDelay = 0,
  speed = TYPING_SPEED,
) {
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (!active) return;
    // Skip the character-by-character animation for reduced-motion users.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLength(text.length);
      return;
    }
    let intervalId: ReturnType<typeof setInterval>;
    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        setLength((prev) => {
          const next = prev + 1;
          if (next >= text.length) clearInterval(intervalId);
          return next;
        });
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(intervalId);
    };
  }, [text, active, startDelay, speed]);

  return length;
}

type TypingLabelProps = {
  text: string;
  length: number;
  as?: ElementType;
  className?: string;
};

export function TypingLabel({
  text,
  length,
  as: Tag = "p",
  className = "font-mono text-sm lowercase text-secondary-text",
}: TypingLabelProps) {
  const isTyping = length < text.length;
  return (
    <Tag className={className}>
      <span>{text.slice(0, length)}</span>
      <span
        aria-hidden="true"
        className={`inline-block w-[0.5ch] ${
          isTyping ? "animate-pulse" : "opacity-0"
        }`}
      >
        _
      </span>
    </Tag>
  );
}
