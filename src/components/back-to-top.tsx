import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn, scrollToId } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-media";

export function BackToTop() {
  const [on, setOn] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => setOn(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => scrollToId("home", reduced)}
      className={cn(
        "back-top fixed right-5 bottom-5 z-40 grid size-12 place-items-center rounded-full bg-invert text-invert-fg shadow-[var(--shadow-border)] md:right-7 md:bottom-7",
        on && "is-on",
      )}
    >
      <ArrowUp className="size-4" strokeWidth={1.7} />
    </button>
  );
}
