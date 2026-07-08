"use client";

import { Fragment, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { CaseStudy, CaseStudyImage } from "@/data/case-studies";

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
  const imageGroups = caseStudy.imageGroups ?? [];
  const images =
    caseStudy.images ?? imageGroups.flatMap((group) => group.images);

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

  const renderZoomButton = (image: CaseStudyImage, index: number) => (
    <button
      type="button"
      onClick={() => setExpandedIndex(index)}
      aria-label="Expand image"
      className="group relative w-full flex-1 cursor-zoom-in overflow-hidden rounded"
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
  );

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex bg-background md:items-center md:justify-center md:bg-black/60 md:p-6"
      onClick={onClose}
    >
      <div
        className="flex h-full w-full flex-col overflow-hidden bg-background md:h-auto md:max-h-[85vh] md:max-w-[640px] md:rounded-lg md:pt-6 md:pb-8 md:shadow-card"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 flex-col gap-6 px-4 pt-6 md:gap-3 md:px-8 md:pt-0">
          <div className="flex w-full flex-col items-end gap-0.5">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="-m-2 flex size-11 cursor-pointer items-center justify-center text-secondary-text"
            >
              <CloseIcon />
            </button>
            <div className="flex w-full flex-col items-start gap-0.5">
              <p className="text-base font-semibold leading-[1.5] text-default-text">
                {caseStudy.title}
              </p>
              <p className="text-sm leading-[1.5] text-secondary-text">
                {caseStudy.description}
              </p>
            </div>
          </div>
          <div className="h-px w-full bg-border" />
        </div>
        <div className="flex min-h-0 flex-col gap-6 overflow-y-auto px-4 pt-6 pb-12 md:px-8 md:pb-0">
          <div className="flex w-full flex-col gap-2 text-sm md:flex-row">
            <div className="flex flex-col gap-2 md:w-[220px] md:shrink-0 md:gap-1">
              <div className="flex items-center gap-1">
                <p className="w-20 shrink-0 text-secondary-text md:w-[69px]">My role:</p>
                <p className="whitespace-nowrap text-default-text">{caseStudy.role}</p>
              </div>
              <div className="flex items-center gap-1">
                <p className="w-20 shrink-0 text-secondary-text md:w-[69px]">Company:</p>
                <p className="whitespace-nowrap text-default-text">{caseStudy.company}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 md:flex-1 md:gap-1">
              <div className="flex items-center gap-1">
                <p className="w-20 shrink-0 text-secondary-text md:w-[51px]">Status:</p>
                <p className="whitespace-nowrap text-default-text">{caseStudy.status}</p>
              </div>
              {caseStudy.impact && (
                <div className="flex items-center gap-1">
                  <p className="w-20 shrink-0 text-secondary-text md:w-auto">Impact:</p>
                  <p className="whitespace-nowrap text-default-text">{caseStudy.impact}</p>
                </div>
              )}
            </div>
          </div>
          {imageGroups.length > 0 && (
            <div className="flex w-full flex-col gap-3 rounded bg-[#2d303d] p-2">
              {(() => {
                let cursor = 0;
                return imageGroups.map((group, groupIndex) => (
                  <div key={groupIndex} className="flex w-full flex-col gap-1.5">
                    <p className="text-[11px] leading-[1.34] text-white">
                      {group.label}
                    </p>
                    <div className="flex h-40 w-full gap-3">
                      {group.images.map((image) => {
                        const index = cursor++;
                        return (
                          <div key={image.src} className="flex h-full flex-1">
                            {renderZoomButton(image, index)}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ));
              })()}
            </div>
          )}
          {imageGroups.length === 0 && images.length > 0 && (
            <div className="flex w-full flex-col gap-2">
              {chunkPairs(images.map((image, index) => ({ ...image, index }))).map((row, rowIndex) => {
                const rowHasLabel = row.some((image) => image.label);
                return (
                  <div
                    key={rowIndex}
                    className={`flex w-full gap-2 ${rowHasLabel ? "h-48" : "h-40"}`}
                  >
                    {row.map((image) =>
                      image.label ? (
                        <div
                          key={image.src}
                          className="flex h-full flex-1 flex-col gap-1 rounded bg-[#e1e5f5] p-2"
                        >
                          <span className="text-xs font-medium text-default-text">
                            {image.label}
                          </span>
                          {renderZoomButton(image, image.index)}
                        </div>
                      ) : (
                        <div key={image.src} className="flex h-full flex-1">
                          {renderZoomButton(image, image.index)}
                        </div>
                      ),
                    )}
                  </div>
                );
              })}
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
            <div className="flex w-full flex-col gap-2 text-sm md:flex-row md:flex-wrap md:items-center">
              <p className="font-bold text-default-text">
                {caseStudy.launchLabel ?? "To learn more, visit:"}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {caseStudy.launchDetails.map((detail, index) => (
                  <Fragment key={detail.label}>
                    {index > 0 && (
                      <span className="text-border-content">|</span>
                    )}
                    <a
                      href={detail.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-default-text"
                    >
                      {detail.label}
                      <ArrowUpRight />
                    </a>
                  </Fragment>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {expandedIndex !== null && images.length > 0 && (
        <div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4 bg-black/80 px-4 py-6"
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
            className="absolute top-3 right-3 flex size-11 cursor-pointer items-center justify-center text-white"
          >
            <CloseIcon size={16} />
          </button>
          <div className="flex h-[70vh] w-full items-center justify-center">
            <div className="pointer-events-none relative h-full w-full">
              <Image
                src={images[expandedIndex].lightboxSrc ?? images[expandedIndex].src}
                alt=""
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
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
    </div>,
    document.body,
  );
}
