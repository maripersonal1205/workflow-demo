"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { CaseStudy } from "@/data/case-studies";

type CaseStudyModalProps = {
  caseStudy: CaseStudy;
  onClose: () => void;
  previousCaseStudy?: CaseStudy;
  nextCaseStudy?: CaseStudy;
  onNavigate?: (caseStudy: CaseStudy) => void;
};

function CloseIcon() {
  return (
    <svg
      width="10"
      height="10"
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

function PauseIcon() {
  return (
    <svg width="7" height="10" viewBox="13 8 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 9V16M14 9V16" stroke="#D2D2D2" strokeLinecap="round" strokeWidth="1" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="10" height="10" viewBox="12 8 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 15V9L19 12L13 15Z" fill="none" stroke="#D2D2D2" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowCircleIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={direction === "left" ? "-scale-x-100" : undefined}
    >
      <circle cx="18" cy="18" r="18" fill="white" fillOpacity="0.1" />
      <path
        d="M13.334 18H22.334M18.8122 21.5L22.334 18L18.8122 14.5"
        stroke="#E8E8E8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function CaseStudyModal({
  caseStudy,
  onClose,
  previousCaseStudy,
  nextCaseStudy,
  onNavigate,
}: CaseStudyModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [displayedCaseStudy, setDisplayedCaseStudy] = useState(caseStudy);
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft" && previousCaseStudy && onNavigate) {
        onNavigate(previousCaseStudy);
      } else if (event.key === "ArrowRight" && nextCaseStudy && onNavigate) {
        onNavigate(nextCaseStudy);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, previousCaseStudy, nextCaseStudy, onNavigate]);

  // Fade the whole modal in on first mount (i.e. when a card is clicked)
  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Crossfade the content when navigating to a different case study
  useEffect(() => {
    if (caseStudy.id === displayedCaseStudy.id) return;
    setIsContentVisible(false);
    const timeout = setTimeout(() => {
      setDisplayedCaseStudy(caseStudy);
      setIsPlaying(true);
      setIsContentVisible(true);
    }, 250);
    return () => clearTimeout(timeout);
  }, [caseStudy, displayedCaseStudy.id]);

  function togglePlayPause() {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  }

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex bg-[rgba(0,0,0,0.75)] transition-opacity duration-300 md:items-center md:justify-center md:gap-20 md:p-6 ${
        isMounted ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div className="relative hidden size-11 shrink-0 md:block">
        {previousCaseStudy && onNavigate && (
          <>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onNavigate(previousCaseStudy);
              }}
              aria-label={`Previous case study: ${previousCaseStudy.title}`}
              className="flex size-11 cursor-pointer items-center justify-center overflow-hidden rounded-full outline-none [-webkit-tap-highlight-color:transparent]"
            >
              <ArrowCircleIcon direction="left" />
            </button>
            <p className="absolute top-[52px] left-1/2 w-[125px] -translate-x-1/2 text-center text-sm leading-[1.5] text-[#D0D0D0]">
              {previousCaseStudy.title}
            </p>
          </>
        )}
      </div>
      <div
        className="scrollbar-hide relative flex h-full w-full flex-col overflow-y-auto overscroll-none will-change-scroll bg-background md:h-auto md:max-h-[90vh] md:w-[720px] md:rounded-lg md:bg-[rgba(255,255,255,0.9)] md:shadow-card md:backdrop-blur-[50px]"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Zero-height sticky bar keeps the close button pinned while scrolling */}
        <div className="sticky top-0 z-10 h-0">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 flex size-6 cursor-pointer items-center justify-center rounded-[4px] bg-[rgba(87,87,87,0.8)] text-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)] backdrop-blur-[2px]"
          >
            <CloseIcon />
          </button>
        </div>

        <div
          className={`flex flex-1 flex-col transition-opacity duration-500 ${
            isContentVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Full-width cover media (placeholder image until the looping video is ready) */}
          <div className="relative h-[280px] w-full shrink-0 md:h-[376px]">
            {displayedCaseStudy.coverVideo ? (
              <>
                <video
                  ref={videoRef}
                  className="size-full object-cover"
                  src={displayedCaseStudy.coverVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <button
                  type="button"
                  onClick={togglePlayPause}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                  className="absolute bottom-3 right-3 flex size-8 cursor-pointer items-center justify-center rounded-full bg-[rgba(34,34,34,0.45)] backdrop-blur-sm outline-none [-webkit-tap-highlight-color:transparent]"
                >
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
              </>
            ) : (
              <Image
                src={displayedCaseStudy.coverImage}
                alt=""
                fill
                className="object-cover"
                sizes="640px"
                priority
              />
            )}
          </div>

          <div className="flex shrink-0 flex-col gap-6 px-4 pt-6 pb-8 md:px-8">
            <div className="flex w-full flex-col gap-0.5">
              <p className="text-base font-semibold leading-[1.5] text-default-text">
                {displayedCaseStudy.title}
              </p>
              <p className="text-sm leading-[1.6] text-secondary-text">
                {displayedCaseStudy.description}
              </p>
            </div>
            <div className="flex flex-col gap-4 text-base text-default-text">
              {displayedCaseStudy.body.map((paragraph, index) => (
                <p key={index} className="leading-[1.6]">
                  {paragraph}
                </p>
              ))}
            </div>
            {displayedCaseStudy.launchDetails &&
              displayedCaseStudy.launchDetails.length > 0 && (
                <div className="flex w-full flex-col gap-2 text-sm md:flex-row md:flex-wrap md:items-center">
                  <p className="font-bold text-default-text">
                    {displayedCaseStudy.launchLabel ?? "To learn more, visit:"}
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    {displayedCaseStudy.launchDetails.map((detail) => (
                      <Fragment key={detail.label}>
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
      </div>
      <div className="relative hidden size-11 shrink-0 md:block">
        {nextCaseStudy && onNavigate && (
          <>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onNavigate(nextCaseStudy);
              }}
              aria-label={`Next case study: ${nextCaseStudy.title}`}
              className="flex size-11 cursor-pointer items-center justify-center overflow-hidden rounded-full outline-none [-webkit-tap-highlight-color:transparent]"
            >
              <ArrowCircleIcon direction="right" />
            </button>
            <p className="absolute top-[52px] left-1/2 w-[125px] -translate-x-1/2 text-center text-sm leading-[1.5] text-[#D0D0D0]">
              {nextCaseStudy.title}
            </p>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
