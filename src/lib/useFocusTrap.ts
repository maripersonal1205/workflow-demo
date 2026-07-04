"use client";

import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Traps Tab focus within the given containers while `active`, moves focus
 * inside on activation (unless it is already there), and restores focus to
 * the previously focused element on deactivation.
 */
export function useFocusTrap(
  refs: Array<RefObject<HTMLElement | null>>,
  active: boolean,
  initialFocusRef?: RefObject<HTMLElement | null>,
) {
  const refsRef = useRef(refs);
  refsRef.current = refs;
  const initialFocusRefRef = useRef(initialFocusRef);
  initialFocusRefRef.current = initialFocusRef;

  useEffect(() => {
    if (!active) return;
    const containers = refsRef.current
      .map((ref) => ref.current)
      .filter((el): el is HTMLElement => el !== null);
    if (containers.length === 0) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const getFocusable = () =>
      containers
        .flatMap((container) => {
          const inside = Array.from(
            container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
          );
          return container.matches(FOCUSABLE_SELECTOR)
            ? [container, ...inside]
            : inside;
        })
        // Skip elements that are display:none (e.g. desktop-only controls on mobile).
        .filter((el) => el.getClientRects().length > 0);

    const isInside = (el: Element | null) =>
      containers.some((container) => el !== null && container.contains(el));

    if (!isInside(document.activeElement)) {
      (initialFocusRefRef.current?.current ?? getFocusable()[0])?.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = getFocusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;
      if (event.shiftKey && (current === first || !isInside(current))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (current === last || !isInside(current))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      previouslyFocused?.focus();
    };
  }, [active]);
}
