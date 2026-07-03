"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const EMAIL = "mhirano1205@gmail.com";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#work-experience" },
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
    <>
      <header className="sticky top-0 z-10 bg-white/20 backdrop-blur pt-4 pb-6 md:py-6">
      <div className="mx-auto flex w-full max-w-[1100px] flex-row items-center justify-between pl-4 pr-6 text-base md:px-6">
        <a
          href="https://marihirano.com"
          aria-label="Mari Hirano — home"
          className="shrink-0"
        >
          <Image
            src="/images/logo.png"
            alt="Mari Hirano"
            width={84}
            height={33}
            priority
            className="h-[33px] w-auto"
          />
        </a>
        <nav className="hidden flex-wrap items-center gap-4 whitespace-nowrap font-mono text-sm lowercase font-normal text-default-text md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="group relative">
              {link.label}
              <span className={underlineClass} />
            </a>
          ))}
          <span className="text-border-content">/</span>
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
            className="group relative cursor-pointer lowercase text-secondary-text"
          >
            Email
            <span className={underlineClass} />
          </button>
        </nav>
      </div>
      </header>
      <button
        type="button"
        onClick={menuMounted ? closeMenu : openMenu}
        aria-label={menuMounted ? "Close menu" : "Open menu"}
        aria-expanded={menuMounted}
        className="fixed right-6 top-4 z-50 flex h-[33px] w-6 items-center justify-center text-default-text md:hidden"
      >
        <span className="relative block h-4 w-6">
          <span
            className="absolute left-1/2 top-1/2 h-[1.5px] w-6 bg-current transition-transform duration-300 ease-out"
            style={{
              transform: menuShown
                ? "translate(-50%, -50%) rotate(-45deg)"
                : "translate(-50%, -50%) translateY(-5px)",
            }}
          />
          <span
            className="absolute left-1/2 top-1/2 h-[1.5px] w-6 bg-current transition-transform duration-300 ease-out"
            style={{
              transform: menuShown
                ? "translate(-50%, -50%) rotate(45deg)"
                : "translate(-50%, -50%) translateY(5px)",
            }}
          />
        </span>
      </button>
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
          style={{
            background:
              "linear-gradient(331deg, rgba(255,255,255,0.9) -4.03%, rgba(226,226,255,0.9) 333.9%)",
          }}
          className={`fixed inset-0 z-40 flex flex-col gap-9 border-b border-border pt-4 pb-6 shadow-card backdrop-blur-md transition-transform duration-300 ease-out md:hidden ${
            menuShown ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div aria-hidden="true" className="h-[33px] shrink-0" />
          <nav className="flex w-full flex-col items-center gap-8 px-4 font-mono text-[14px] lowercase font-normal">
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
            <a
              href={`mailto:${EMAIL}`}
              onClick={closeMenu}
              className="lowercase text-secondary-text"
            >
              Email
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
