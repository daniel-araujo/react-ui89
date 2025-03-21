import { useState, useEffect, useRef, RefObject } from "react";

export const useScrollYPosition = (ref: RefObject<HTMLElement>): number => {
  const [scrollY, setScrollY] = useState(0);
  const ticking = useRef(false);
  const observer = useRef<MutationObserver | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setScrollY(element.scrollTop);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    element.addEventListener("scroll", handleScroll, { passive: true });

    observer.current = new MutationObserver(() => {
      if (ref.current !== element) {
        element.removeEventListener("scroll", handleScroll);
        ref.current?.addEventListener("scroll", handleScroll, { passive: true });
      }
    });

    observer.current.observe(document.body, { childList: true, subtree: true });

    return () => {
      element.removeEventListener("scroll", handleScroll);
      observer.current?.disconnect();
    };
  }, [ref]);

  return scrollY;
};
