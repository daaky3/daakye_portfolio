import { useEffect } from "react";
import { BRAND } from "@/lib/utils";
import { useSite } from "@/lib/site-context";
import { usePrefersReducedMotion } from "@/hooks/use-media";

const DURATION = 1680;

export function PageLoader() {
  const { introDone, completeIntro } = useSite();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (introDone) return;
    if (reduced) {
      completeIntro();
      return;
    }
    const t = window.setTimeout(completeIntro, DURATION);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        completeIntro();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [introDone, completeIntro, reduced]);

  if (introDone) return null;

  return (
    <div
      className="intro-overlay"
      role="dialog"
      aria-label="Loading"
      onClick={completeIntro}
    >
      <div className="flex flex-col items-center gap-8">
        <p className="intro-mark brand-mark text-[clamp(1.8rem,6vw,3.4rem)]">
          {Array.from(BRAND).map((ch, i) => (
            <span
              key={`${ch}-${i}`}
              className="intro-char"
              style={{ animationDelay: `${90 + i * 85}ms` }}
            >
              {ch}
            </span>
          ))}
        </p>
        <div className="intro-bar" aria-hidden="true" />
        <button
          type="button"
          className="mt-2 inline-flex min-h-11 items-center justify-center px-4 text-micro tracking-[0.22em] uppercase text-fg-subtle"
          onClick={(e) => {
            e.stopPropagation();
            completeIntro();
          }}
        >
          Skip
        </button>
      </div>
    </div>
  );
}
