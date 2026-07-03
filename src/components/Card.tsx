"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CaseStudy } from "@/data/case-studies";

type CardProps = {
  caseStudy: CaseStudy;
  onClick: () => void;
};

function ArrowUpRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 12L12 4M12 4H6M12 4V10"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Card({ caseStudy, onClick }: CardProps) {
  const hoverTag = caseStudy.tag.replace(" - ", " / ");
  const cardRef = useRef<HTMLButtonElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.intersectionRatio >= 0.99),
      { threshold: [0.99] },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={onClick}
      className="group flex cursor-pointer flex-col items-start overflow-hidden rounded-[8px] text-left border border-border shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_8px_16px_0px_rgba(0,0,0,0.2)]"
    >
      <div className="relative h-[360px] w-full overflow-hidden">
        <Image
          src={caseStudy.cardImage}
          alt={caseStudy.title}
          fill
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
        <div
          className={`absolute inset-0 z-10 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-start justify-between p-3">
            <span className="flex h-8 items-center rounded-[4px] bg-[rgba(49,49,49,0.75)] px-2.5 font-mono text-xs lowercase leading-[1.5] text-white backdrop-blur-[2px]">
              {hoverTag}
            </span>
            <span className="flex size-8 items-center justify-center rounded-[4px] bg-[rgba(87,87,87,0.8)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)] backdrop-blur-[2px]">
              <ArrowUpRight />
            </span>
          </div>
          <p className="absolute inset-x-3 bottom-3 rounded-[4px] bg-[rgba(0,0,0,0.45)] p-4 font-mono text-sm lowercase leading-[1.5] text-white backdrop-blur-[2px]">
            {caseStudy.description}
          </p>
        </div>
      </div>
    </button>
  );
}
