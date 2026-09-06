import { useEffect, useRef, useState } from "react";

type Options = {
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
};

export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: Options = {},
) {
  const { once = true, rootMargin = "0px 0px -12% 0px", threshold = 0.15 } =
    options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, inView };
}
