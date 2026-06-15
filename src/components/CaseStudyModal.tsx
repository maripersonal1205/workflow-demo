"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { CaseStudy } from "@/data/case-studies";

type CaseStudyModalProps = {
  caseStudy: CaseStudy;
  onClose: () => void;
};

function CloseIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
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

function ZoomIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 8.25V13.75M8.25 11H13.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 16L20.5 20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function chunkPairs<T>(items: T[]): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2));
  }
  return rows;
}

export default function CaseStudyModal({
  caseStudy,
  onClose,
}: CaseStudyModalProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const images = caseStudy.images ?? [];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (expandedIndex !== null) {
          setExpandedIndex(null);
        } else {
          onClose();
        }
        return;
      }
      if (expandedIndex === null || images.length === 0) return;
      if (event.key === "ArrowLeft") {
        setExpandedIndex((index) => (index === null ? null : (index - 1 + images.length) % images.length));
      } else if (event.key === "ArrowRight") {
        setExpandedIndex((index) => (index === null ? null : (index + 1) % images.length));
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, expandedIndex, images.length]);

  const goToPrevImage = () => {
    setExpandedIndex((index) => (index === null ? null : (index - 1 + images.length) % images.length));
  };

  const goToNextImage = () => {
    setExpandedIndex((index) => (index === null ? null : (index + 1) % images.length));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6"
      onClick={onClose}
    >
      <div
        className="flex max-h-[85vh] w-full max-w-[640px] flex-col overflow-hidden rounded-lg bg-background pt-6 pb-8 shadow-card"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 flex-col gap-3 px-8">
          <div className="flex w-full flex-col items-end gap-0.5">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="cursor-pointer text-secondary-text"
            >
              <CloseIcon />
            </button>
            <div className="flex w-full flex-col items-start gap-0.5">
              <p className="font-serif text-lg font-semibold leading-[1.5] text-default-text">
                {caseStudy.title}
              </p>
              <p className="text-sm leading-[1.5] text-secondary-text">
                {caseStudy.description}
              </p>
            </div>
          </div>
          <div className="h-px w-full bg-border" />
        </div>
        <div className="flex min-h-0 flex-col gap-6 overflow-y-auto px-8 pt-6">
          <div className="flex w-full gap-2 text-sm">
            <div className="flex w-[220px] shrink-0 flex-col gap-1">
              <div className="flex items-center gap-1">
                <p className="w-[69px] shrink-0 text-secondary-text">My role:</p>
                <p className="whitespace-nowrap text-default-text">{caseStudy.role}</p>
              </div>
              <div className="flex items-center gap-1">
                <p className="w-[69px] shrink-0 text-secondary-text">Company:</p>
                <p className="whitespace-nowrap text-default-text">{caseStudy.company}</p>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <div className="flex items-center gap-1">
                <p className="w-[51px] shrink-0 text-secondary-text">Status:</p>
                <p className="whitespace-nowrap text-default-text">{caseStudy.status}</p>
              </div>
              {caseStudy.impact && (
                <div className="flex items-center gap-1">
                  <p className="shrink-0 text-secondary-text">Impact:</p>
                  <p className="whitespace-nowrap text-default-text">{caseStudy.impact}</p>
                </div>
              )}
            </div>
          </div>
          {images.length > 0 && (
            <div className="flex w-full flex-col gap-2">
              {chunkPairs(images.map((image, index) => ({ ...image, index }))).map((row, rowIndex) => (
                <div key={rowIndex} className="flex h-40 w-full gap-2">
                  {row.map((image) => (
                    <button
                      key={image.src}
                      type="button"
                      onClick={() => setExpandedIndex(image.index)}
                      aria-label="Expand image"
                      className="group relative h-full flex-1 cursor-zoom-in overflow-hidden rounded"
                    >
                      <Image
                        src={image.src}
                        alt=""
                        fill
                        className="object-cover"
                        style={{ objectPosition: image.objectPosition }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
                        <span className="text-white opacity-0 transition-opacity group-hover:opacity-100">
                          <ZoomIcon />
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}
          <div className="flex flex-col gap-4 text-base text-default-text">
            {caseStudy.body.map((paragraph, index) => (
              <p key={index} className="leading-[1.5]">
                {paragraph}
              </p>
            ))}
          </div>
          {caseStudy.launchDetails && caseStudy.launchDetails.length > 0 && (
            <div className="flex w-full flex-wrap items-center gap-2 text-sm">
              <p className="font-bold text-default-text">To learn more, visit:</p>
              {caseStudy.launchDetails.map((detail) => (
                <a
                  key={detail.label}
                  href={detail.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-default-text"
                >
                  {detail.label}
                  <ArrowUpRight />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      {expandedIndex !== null && images.length > 0 && (
        <div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4 bg-black/80 p-6"
          onClick={(event) => {
            event.stopPropagation();
            setExpandedIndex(null);
          }}
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setExpandedIndex(null);
            }}
            aria-label="Close"
            className="absolute top-6 right-6 cursor-pointer text-white"
          >
            <CloseIcon size={16} />
          </button>
          <div className="flex h-[70vh] w-full max-w-5xl items-center justify-center gap-[30px]">
            {images.length > 1 && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goToPrevImage();
                }}
                aria-label="Previous image"
                className="z-10 shrink-0 cursor-pointer text-white"
              >
                <ChevronLeftIcon />
              </button>
            )}
            <div
              className="relative h-full min-w-0 flex-1"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={images[expandedIndex].lightboxSrc ?? images[expandedIndex].src}
                alt=""
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
            {images.length > 1 && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goToNextImage();
                }}
                aria-label="Next image"
                className="z-10 shrink-0 cursor-pointer text-white"
              >
                <ChevronRightIcon />
              </button>
            )}
          </div>
          {images.length > 1 && (
            <div
              className="flex shrink-0 gap-2"
              onClick={(event) => event.stopPropagation()}
            >
              {images.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setExpandedIndex(index)}
                  aria-label={`Show image ${index + 1}`}
                  className={`relative h-14 w-20 shrink-0 cursor-pointer overflow-hidden rounded transition-opacity ${
                    index === expandedIndex
                      ? "ring-2 ring-white"
                      : "opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    className="object-cover"
                    style={{ objectPosition: image.objectPosition }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
