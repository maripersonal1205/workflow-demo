"use client";

import { useEffect, useLayoutEffect, useState, type ReactNode } from "react";

const SCROLL_TRIGGER = 80;
const DESKTOP_DELTA = 80; // md:pt-40 (160px) -> md:pt-20 (80px)
const DESKTOP_QUERY = "(min-width: 768px)";

// Desktop top padding starts at 160px and collapses to 80px once the user
// scrolls down past the hero, then stays there. Mobile stays at 80px always.
export default function MainContainer({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY >= SCROLL_TRIGGER) setCollapsed(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll anchoring is disabled globally, so compensate the desktop padding
  // collapse ourselves (before paint) to keep the content from jumping.
  useLayoutEffect(() => {
    if (!collapsed) return;
    if (window.matchMedia(DESKTOP_QUERY).matches) {
      // Force instant so the site-wide `scroll-smooth` doesn't animate the fix.
      window.scrollBy({ top: -DESKTOP_DELTA, behavior: "instant" as ScrollBehavior });
    }
  }, [collapsed]);

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={`mx-auto flex w-full max-w-[1100px] flex-1 flex-col gap-10 px-4 pb-20 pt-20 outline-none md:px-6 md:pb-20 ${
        collapsed ? "md:pt-20" : "md:pt-40"
      }`}
    >
      {children}
    </main>
  );
}
