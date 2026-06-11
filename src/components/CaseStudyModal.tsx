"use client";

import { useEffect } from "react";
import Image from "next/image";
import type { CaseStudy } from "@/data/case-studies";

type CaseStudyModalProps = {
  caseStudy: CaseStudy;
  onClose: () => void;
};

function ArrowUpRight() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block"
    >
      <path
        d="M5 13L13 5M13 5H6M13 5V12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CaseStudyModal({
  caseStudy,
  onClose,
}: CaseStudyModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6"
      onClick={onClose}
    >
      <div
        className="flex max-h-[85vh] w-full max-w-[720px] flex-col overflow-hidden rounded bg-background"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 flex-col gap-4 border-b border-border">
          <div className="relative aspect-[720/212] w-full">
            <Image
              src={caseStudy.modalImage}
              alt={caseStudy.title}
              fill
              className="object-cover"
              sizes="720px"
            />
          </div>
          <div className="flex flex-col gap-4 px-6 pb-4">
            <p className="font-serif text-base font-semibold text-default-text">
              {caseStudy.title}
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <p className="text-secondary-text">My role:</p>
                <p className="text-default-text">{caseStudy.role}</p>
              </div>
              <div className="flex items-center gap-1">
                <p className="text-secondary-text">Company:</p>
                <p className="text-default-text">{caseStudy.company}</p>
              </div>
              <div className="flex items-center gap-1">
                <p className="text-secondary-text">Timeframe:</p>
                <p className="text-default-text">{caseStudy.timeframe}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 overflow-y-auto px-6 pt-4 pb-6">
          <div className="flex flex-col gap-4 text-sm text-default-text">
            {caseStudy.body.map((paragraph, index) => (
              <p key={index} className="leading-[1.5]">
                {paragraph}
              </p>
            ))}
          </div>
          {caseStudy.launchDetails && caseStudy.launchDetails.length > 0 && (
            <>
              <hr className="border-border" />
              <div className="flex flex-col gap-1">
                <p className="text-sm text-secondary-text">Launch details:</p>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  {caseStudy.launchDetails.map((detail, index) => (
                    <span key={detail.label} className="flex items-center gap-2">
                      {index > 0 && <span className="text-border">|</span>}
                      <a
                        href={detail.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-default-text"
                      >
                        {detail.label}
                        <ArrowUpRight />
                      </a>
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
