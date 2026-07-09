"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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

function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 2L10 6L3 10V2Z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="2" width="2" height="8" rx="0.5" fill="currentColor" />
      <rect x="7" y="2" width="2" height="8" rx="0.5" fill="currentColor" />
    </svg>
  );
}

export default function CaseStudyModal({
  caseStudy,
  onClose,
}: CaseStudyModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const hasVideo = Boolean(caseStudy.coverVideo);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex bg-background md:items-center md:justify-center md:bg-black/60 md:p-6"
      onClick={onClose}
    >
      <div
        className="flex h-full w-full flex-col overflow-hidden bg-background md:h-auto md:max-h-[85vh] md:max-w-[640px] md:rounded-lg md:bg-background/90 md:pb-8 md:shadow-card md:backdrop-blur-sm"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Cover media — looping video (or a static cover image as fallback) */}
        <div className="relative aspect-[640/376] w-full shrink-0 overflow-hidden bg-black md:rounded-t-lg">
          {hasVideo ? (
            <video
              ref={videoRef}
              src={caseStudy.coverVideo}
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              poster={caseStudy.coverImage}
            />
          ) : (
            <Image
              src={caseStudy.coverImage}
              alt=""
              fill
              className="object-cover"
              sizes="640px"
              priority
            />
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 flex size-6 cursor-pointer items-center justify-center rounded bg-[rgba(49,49,49,0.65)] text-white shadow-[0_4px_4px_0_rgba(0,0,0,0.1)] backdrop-blur-[2px]"
          >
            <CloseIcon />
          </button>
          {hasVideo && (
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause video" : "Play video"}
              className="absolute bottom-3 right-3 flex size-7 cursor-pointer items-center justify-center rounded-full bg-[rgba(49,49,49,0.65)] text-white shadow-[0_4px_4px_0_rgba(0,0,0,0.1)] backdrop-blur-[2px]"
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-4 pt-6 pb-12 md:px-8 md:pb-0">
          <div className="flex w-full flex-col gap-0.5">
            <p className="text-base font-semibold leading-[1.7] text-default-text">
              {caseStudy.title}
            </p>
            <p className="text-sm leading-[1.7] text-secondary-text">
              {caseStudy.description}
            </p>
          </div>
          <div className="h-px w-full bg-border" />
          <div className="flex flex-col gap-4 text-base text-default-text">
            {caseStudy.body.map((paragraph, index) => (
              <p key={index} className="leading-[1.7]">
                {paragraph}
              </p>
            ))}
          </div>
          {caseStudy.launchDetails && caseStudy.launchDetails.length > 0 && (
            <div className="flex w-full flex-col gap-2 text-sm md:flex-row md:flex-wrap md:items-center md:gap-x-4">
              <p className="font-bold text-default-text">
                {caseStudy.launchLabel ?? "To learn more, visit:"}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                {caseStudy.launchDetails.map((detail) => (
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
    </div>,
    document.body,
  );
}
