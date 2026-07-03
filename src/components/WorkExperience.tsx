"use client";

import { useEffect, useRef, useState } from "react";
import { workExperience } from "@/data/work-experience";

const LABEL = "// work experience";

export default function WorkExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  // Fade the heading and content in once the section scrolls into view.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="work-experience" className="scroll-mt-24">
      <div
        className={`flex flex-col gap-10 transition-[opacity,translate] duration-2000 ease-out ${
          revealed ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <h2 className="font-mono text-sm lowercase text-secondary-text">
          {LABEL}
        </h2>
        <div className="flex flex-col">
          {workExperience.map((entry, index) => (
          <div key={entry.company} className="flex gap-4">
            <div className="flex w-3 flex-col items-center">
              <span className="mt-1.5 size-2 shrink-0 rounded-full bg-previous-signal" />
              {index < workExperience.length - 1 && (
                <span className="mt-2 w-px flex-1 bg-border" />
              )}
            </div>
            <div className="flex flex-1 flex-col gap-2 pb-15 sm:flex-row sm:gap-1">
              <p className="shrink-0 font-mono text-sm lowercase text-secondary-text sm:w-[207px]">
                {entry.dates}
              </p>
              <div className="flex flex-1 flex-col justify-center gap-2">
                <div className="flex flex-col">
                  <p className="text-base font-semibold text-default-text">
                    {entry.company}
                  </p>
                  <p className="text-base text-secondary-text">{entry.role}</p>
                </div>
                <p className="text-base leading-[1.6] text-default-text">
                  {entry.description}
                </p>
              </div>
            </div>
          </div>
          ))}
        </div>
      </div>
    </section>
  );
}
