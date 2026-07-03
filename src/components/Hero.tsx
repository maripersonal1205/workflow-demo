"use client";

import { useEffect, useState } from "react";
import { TypingLabel, useTypewriter } from "./typewriter";

const ABOUT_LABEL = "// about";
const RECENT_LABEL = "// recent work";
const TYPING_START_DELAY = 200;
const HEADLINE_DELAY = 500;
const CUE_DELAY = 1000;
const SCROLL_TRIGGER = 80;

export default function Hero() {
  const [showHeadline, setShowHeadline] = useState(false);
  const [showCue, setShowCue] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [recentVisible, setRecentVisible] = useState(false);

  const aboutLength = useTypewriter(ABOUT_LABEL, true, TYPING_START_DELAY);
  const aboutDone = aboutLength >= ABOUT_LABEL.length;

  // Fade the "// recent work" label in once it swaps in on scroll.
  useEffect(() => {
    if (!scrolled) return;
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setRecentVisible(true)),
    );
    return () => cancelAnimationFrame(id);
  }, [scrolled]);

  // Fade the headline in once the "// about" label finishes typing.
  useEffect(() => {
    if (!aboutDone) return;
    const timeout = setTimeout(() => setShowHeadline(true), HEADLINE_DELAY);
    return () => clearTimeout(timeout);
  }, [aboutDone]);

  // Reveal the scroll cue (arrow + text) 1000ms after the headline appears.
  useEffect(() => {
    if (!showHeadline) return;
    const timeout = setTimeout(() => setShowCue(true), CUE_DELAY);
    return () => clearTimeout(timeout);
  }, [showHeadline]);

  // Swap the scroll cue for the "// recent work" label after scrolling 80px.
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY >= SCROLL_TRIGGER) setScrolled(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="flex flex-col gap-10">
      <TypingLabel text={ABOUT_LABEL} length={aboutLength} />
      <div
        className={`transition-[opacity,translate] duration-[3000ms] ease-out ${
          showHeadline ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}
      >
        <div className="flex max-w-[830px] flex-col gap-4 font-display text-default-text">
          <p className="text-[20px] font-light leading-[1.6] sm:text-[24px]">
            Hi there, I&apos;m Mari.{" "}
            <strong className="font-semibold">Senior product designer</strong>{" "}
            based in LA.
          </p>
          <p className="text-[20px] font-light leading-[1.6] sm:text-[24px]">
            I enjoy working with complex systems, where I get to design
            simplified experiences without losing what makes the systems
            powerful.
          </p>
          <p className="text-[20px] font-light leading-[1.6] sm:text-[24px]">
            Previously at <strong className="font-semibold">Webflow</strong>,{" "}
            <strong className="font-semibold">Optimizely</strong>, and{" "}
            <strong className="font-semibold">IBM</strong>, I untangled intricate
            challenges for developers, designers, and marketers.
          </p>
        </div>
      </div>
      <div className="mt-10">
        {scrolled ? (
          <p
            className={`font-mono text-sm lowercase text-secondary-text transition-opacity duration-2000 ease-out ${
              recentVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {RECENT_LABEL}
          </p>
        ) : (
          <div
            className="flex items-center gap-2 font-mono text-sm text-secondary-text"
            style={{
              clipPath: showCue ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
              transition: "clip-path 1200ms ease-out",
            }}
          >
            <svg
              width="7"
              height="16"
              viewBox="0 0 7 16"
              fill="none"
              aria-hidden="true"
              className="shrink-0"
            >
              <path
                d="M3.5 0.5V5.57568V14.5752M0.5 11.3252L3.5 14.5752L6.5 11.3252"
                stroke="currentColor"
                strokeLinecap="round"
              />
            </svg>
            <p>scroll to learn more</p>
          </div>
        )}
      </div>
    </section>
  );
}
