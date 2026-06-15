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
  const [menuMounted, setMenuMounted] = useState(false);
  const [menuShown, setMenuShown] = useState(false);
  const [toastMounted, setToastMounted] = useState(false);
  const [toastShown, setToastShown] = useState(false);
  const [toastPosition, setToastPosition] = useState({ x: 0, y: 0 });
  const toastRef = useRef<HTMLDivElement>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const unmountTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const menuCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const openMenu = () => {
    if (menuCloseTimeoutRef.current) clearTimeout(menuCloseTimeoutRef.current);
    setMenuMounted(true);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setMenuShown(true)),
    );
  };

  const closeMenu = () => {
    setMenuShown(false);
    menuCloseTimeoutRef.current = setTimeout(() => setMenuMounted(false), 300);
  };

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
    if (!menuMounted) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [menuMounted]);

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
    <header className="sticky top-0 z-10 border-b border-border bg-background pt-4 pb-6 md:py-6">
      <div className="mx-auto flex w-full max-w-[1000px] flex-row items-center justify-between pl-4 pr-6 text-base md:px-6">
        <a
          href="https://marihirano.com"
          className="flex flex-col gap-0.5 font-serif leading-none text-default-text md:flex-row md:flex-wrap md:items-center md:gap-2 md:leading-normal"
        >
          <p className="whitespace-nowrap font-medium">Mari Hirano</p>
          <p className="whitespace-nowrap font-normal">Senior Product Designer</p>
        </a>
        <button
          type="button"
          onClick={openMenu}
          aria-label="Open menu"
          aria-expanded={menuMounted}
          className="flex h-4 w-6 shrink-0 items-center justify-center text-default-text md:hidden"
        >
          <svg
            width="24"
            height="16"
            viewBox="0 0 24 16"
            fill="none"
            aria-hidden="true"
          >
            <line x1="1" y1="1" x2="23" y2="1" stroke="currentColor" strokeWidth="1.5" />
            <line x1="1" y1="8" x2="23" y2="8" stroke="currentColor" strokeWidth="1.5" />
            <line x1="1" y1="15" x2="23" y2="15" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
        <nav className="hidden flex-wrap items-center gap-4 whitespace-nowrap font-serif font-normal text-default-text md:flex">
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
      {menuMounted && (
        <div
          className={`fixed inset-0 z-40 flex flex-col gap-9 border-b border-border bg-background pt-4 pb-6 shadow-card transition-transform duration-300 ease-out md:hidden ${
            menuShown ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between pl-4 pr-6">
            <span
              aria-hidden="true"
              className="invisible flex flex-col gap-0.5 font-serif text-base leading-none"
            >
              <span className="font-medium">Mari Hirano</span>
              <span className="font-normal">Senior Product Designer</span>
            </span>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="flex h-4 w-6 shrink-0 items-center justify-center text-default-text"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <line x1="1.5" y1="1.5" x2="14.5" y2="14.5" stroke="currentColor" strokeWidth="1.5" />
                <line x1="14.5" y1="1.5" x2="1.5" y2="14.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
          <nav className="flex w-full flex-col items-center gap-8 px-4 font-serif text-[24px] font-normal">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="text-default-text"
              >
                {link.label}
              </a>
            ))}
            <span className="h-px w-full bg-border" />
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="text-secondary-text"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={(e) => {
                handleEmailClick(e);
                closeMenu();
              }}
              className="text-secondary-text"
            >
              Email
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
