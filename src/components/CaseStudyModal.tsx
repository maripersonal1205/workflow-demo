"use client";

import { useEffect } from "react";
import type { CaseStudy } from "@/data/case-studies";

type CaseStudyModalProps = {
  caseStudy: CaseStudy;
  onClose: () => void;
};

function CloseIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.01855 0.5L11.5 10.9814"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M0.5 10.9814L10.9814 0.499999"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6"
      onClick={onClose}
    >
      <div
        className="flex max-h-[85vh] w-full max-w-[640px] flex-col overflow-hidden rounded-lg bg-background shadow-card"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 flex-col items-end gap-6 px-8 pt-6 pb-6">
          <div className="flex w-full flex-col items-end gap-0.5">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="cursor-pointer text-secondary-text"
            >
              <CloseIcon />
            </button>
            <p className="w-full font-serif text-[40px] leading-[1.1] text-default-text">
              {caseStudy.title}
            </p>
          </div>
          <div className="flex w-full flex-col items-start gap-2 text-sm">
            <div className="flex items-center gap-1">
              <p className="w-22 shrink-0 text-secondary-text">My role:</p>
              <p className="whitespace-nowrap text-default-text">{caseStudy.role}</p>
            </div>
            <div className="flex items-center gap-1">
              <p className="w-22 shrink-0 text-secondary-text">Company:</p>
              <p className="whitespace-nowrap text-default-text">{caseStudy.company}</p>
            </div>
            <div className="flex items-center gap-1">
              <p className="w-22 shrink-0 text-secondary-text">Timeframe:</p>
              <p className="whitespace-nowrap text-default-text">{caseStudy.timeframe}</p>
            </div>
            {caseStudy.impact && (
              <div className="flex items-center gap-1">
                <p className="w-22 shrink-0 text-secondary-text">Impact:</p>
                <p className="whitespace-nowrap text-default-text">{caseStudy.impact}</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex min-h-0 flex-col gap-6 overflow-y-auto px-8 py-6">
          <div className="flex flex-col gap-4 text-base text-default-text">
            {caseStudy.body.map((paragraph, index) => (
              <p key={index} className="leading-[1.5]">
                {paragraph}
              </p>
            ))}
          </div>
          {caseStudy.launchDetails && caseStudy.launchDetails.length > 0 && (
            <div className="flex w-full flex-col gap-1">
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
          )}
        </div>
      </div>
    </div>
  );
}
