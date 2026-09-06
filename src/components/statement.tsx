import { useEffect, useRef } from "react";

export function Statement() {
  const wrapRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    if (!el || !line1 || !line2) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      line1.style.opacity = "1";
      line2.style.opacity = "1";
      line1.style.filter = "none";
      line2.style.filter = "none";
      line1.style.transform = "none";
      line2.style.transform = "none";
      return;
    }

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = Math.max(el.offsetHeight - window.innerHeight, 1);
      const scrolled = Math.min(Math.max(0, -rect.top), total);
      const p = scrolled / total;
      const a = Math.max(0, 1 - p * 1.15);
      const b = Math.min(1, Math.max(0, (p - 0.12) / 0.52));
      line1.style.opacity = String(a);
      line1.style.filter = `blur(${(1 - a) * 8}px)`;
      line1.style.transform = `translate3d(${p * -10}px, ${p * -8}px, 0) scale(${1 + p * 0.05})`;
      line1.style.letterSpacing = `${-0.045 + p * 0.035}em`;
      line2.style.opacity = String(b);
      line2.style.filter = `blur(${(1 - b) * 8}px)`;
      line2.style.transform = `translate3d(${(1 - b) * 12}px, ${(1 - b) * 14}px, 0)`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={wrapRef}
      className="relative h-[160vh]"
      aria-label="Cinematic statement"
    >
      <div className="sticky top-0 flex h-[100svh] items-center">
        <div className="mx-auto w-full max-w-[1100px] px-5 md:px-8">
          <p
            ref={line1Ref}
            data-line="1"
            className="statement-line text-display font-semibold tracking-[-0.045em]"
          >
            I don’t just build websites.
          </p>
          <p
            ref={line2Ref}
            data-line="2"
            className="statement-line mt-4 text-display font-semibold tracking-[-0.045em] text-fg-muted md:mt-6"
          >
            I build digital experiences.
          </p>
        </div>
      </div>
    </section>
  );
}
