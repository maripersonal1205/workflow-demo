"use client";

import { useEffect, useRef, useState } from "react";

const EMAIL = "mhirano1205@gmail.com";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Resume", href: "#work-experience" },
];

const SOCIAL_LINKS = [
  { label: "Linkedin", href: "https://www.linkedin.com/in/marihiranouw/" },
];

const underlineClass =
  "absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-current transition-none group-hover:scale-x-100 group-hover:transition-transform group-hover:duration-300 group-hover:delay-150 group-hover:ease-out";

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M13.5 4.5L6.5 11.5L2.5 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const TOAST_MARGIN = 16;

export default function Header() {
  const [toastMounted, setToastMounted] = useState(false);
  const [toastShown, setToastShown] = useState(false);
  const [toastPosition, setToastPosition] = useState({ x: 0, y: 0 });
  const toastRef = useRef<HTMLDivElement>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const unmountTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const closeToast = () => {
    setToastShown(false);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    unmountTimeoutRef.current = setTimeout(() => setToastMounted(false), 300);
  };

  const handleEmailClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      return;
    }
    setToastPosition({ x: rect.right, y: rect.bottom });
    if (unmountTimeoutRef.current) clearTimeout(unmountTimeoutRef.current);
    setToastMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = toastRef.current;
        if (el) {
          const maxX = window.innerWidth - el.offsetWidth - TOAST_MARGIN;
          const maxY = window.innerHeight - el.offsetHeight - TOAST_MARGIN;
          setToastPosition((pos) => ({
            x: Math.min(pos.x - el.offsetWidth, Math.max(TOAST_MARGIN, maxX)),
            y: Math.min(pos.y, Math.max(TOAST_MARGIN, maxY)),
          }));
        }
        setToastShown(true);
      });
    });
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(closeToast, 2000);
  };

  useEffect(() => {
    if (!toastShown) return;
    const handleClick = () => closeToast();
    const id = setTimeout(() => document.addEventListener("click", handleClick), 0);
    return () => {
      clearTimeout(id);
      document.removeEventListener("click", handleClick);
    };
  }, [toastShown]);

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background py-6">
      <div className="mx-auto flex w-full max-w-[1000px] flex-col items-start gap-4 px-6 text-base md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2 font-serif text-default-text">
          <p className="whitespace-nowrap font-medium">Mari Hirano</p>
          <p className="whitespace-nowrap font-normal">Senior Product Designer</p>
        </div>
        <nav className="flex flex-wrap items-center gap-4 whitespace-nowrap font-serif font-normal text-default-text">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="group relative">
              {link.label}
              <span className={underlineClass} />
            </a>
          ))}
          <span className="text-[18px] text-border-content">|</span>
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-secondary-text"
            >
              {link.label}
              <span className={underlineClass} />
            </a>
          ))}
          <button
            type="button"
            onClick={handleEmailClick}
            className="group relative cursor-pointer text-secondary-text"
          >
            Email
            <span className={underlineClass} />
          </button>
        </nav>
      </div>
      {toastMounted && (
        <div
          ref={toastRef}
          role="status"
          onClick={closeToast}
          style={{ left: toastPosition.x, top: toastPosition.y + 12 }}
          className={`fixed z-50 flex cursor-pointer items-center gap-2 rounded-sm bg-[rgba(21,21,21,0.8)] px-3 py-2 text-[12px] text-[#e6e6e6] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.05)] transition-opacity duration-300 ease-out ${
            toastShown ? "opacity-100" : "opacity-0"
          }`}
        >
          <CheckIcon />
          <p className="whitespace-nowrap">Copied to your clipboard</p>
        </div>
      )}
    </header>
  );
}
