import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { SplitBrand } from "@/components/brand";
import { Cta } from "@/components/cta";
import { HERO } from "@/lib/data";
import { cn, scrollToId } from "@/lib/utils";
import { useSite } from "@/lib/site-context";
import { useIsFinePointer, usePrefersReducedMotion } from "@/hooks/use-media";

export function Hero() {
  const { introDone } = useSite();
  const reduced = usePrefersReducedMotion();
  const fine = useIsFinePointer();
  const stageRef = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const shown = (ready && introDone) || reduced;

  useEffect(() => {
    const el = stageRef.current;
    if (!el || !fine || reduced) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const my = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      el.style.setProperty("--mx", mx.toFixed(3));
      el.style.setProperty("--my", my.toFixed(3));
    };
    const onLeave = () => {
      el.style.setProperty("--mx", "0");
      el.style.setProperty("--my", "0");
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [fine, reduced]);

  const delay = (ms: number) => ({
    transitionDelay: shown ? `${ms}ms` : "0ms",
  });

  return (
    <section
      id="home"
      ref={stageRef}
      className="hero-stage relative flex min-h-[100svh] flex-col pt-24 pb-10 md:pt-28 md:pb-12"
    >
      <div className="hero-backdrop" aria-hidden="true">
        <picture>
          <source srcSet="/images/portrait.webp" type="image/webp" />
          <img
            src="/images/portrait.jpg"
            alt=""
            width={1152}
            height={1440}
            fetchPriority="high"
          />
        </picture>
        <div className="hero-backdrop-overlay" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 overflow-clip"
        aria-hidden="true"
      >
        <div className="hero-orb hero-orb-a" />
        <div className="hero-orb hero-orb-b" />
        <div className="hero-orb hero-orb-c" />
        <div className="hero-noise" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1280px] flex-1 grid-cols-1 items-center gap-6 px-5 md:grid-cols-12 md:grid-rows-[auto_1fr] md:items-stretch md:gap-x-8 md:px-8">
        <div className="md:col-span-7 md:row-start-1">
          <p
            className={cn(
              "hero-fade text-micro font-medium uppercase tracking-[0.28em] text-fg-subtle",
              shown && "is-in",
            )}
            style={delay(80)}
          >
            DIGITAL BRAND
          </p>
          <h1 className="text-hero relative z-[1] mt-4 font-semibold tracking-[-0.055em] text-fg md:mt-3 md:max-w-[110%]">
            <SplitBrand
              inView={shown}
              className="block leading-[0.86] tracking-[0.05em] sm:tracking-[0.08em] md:tracking-[0.1em]"
            />
          </h1>
        </div>

        <div className="relative z-[3] md:col-span-7 md:row-start-2 md:self-end md:pb-2">
          <p
            className={cn(
              "hero-fade text-sm font-medium tracking-[0.02em] text-fg-muted md:text-base",
              shown && "is-in",
            )}
            style={delay(520)}
          >
            {HERO.roles.join("  ·  ")}
          </p>
          <p
            className={cn(
              "hero-fade mt-4 max-w-[34rem] text-lead text-fg-muted",
              shown && "is-in",
            )}
            style={delay(680)}
          >
            {HERO.description}
          </p>
          <div
            className={cn(
              "hero-fade mt-7 flex flex-col gap-3 sm:flex-row sm:items-center",
              shown && "is-in",
            )}
            style={delay(840)}
          >
            <Cta onClick={() => scrollToId("work", reduced)}>
              Explore My Work
            </Cta>
            <Cta variant="ghost" onClick={() => scrollToId("contact", reduced)}>
              Let’s Talk
            </Cta>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-8 flex justify-center md:mt-6">
        <button
          type="button"
          className={cn("scroll-hint hero-fade", shown && "is-in")}
          style={delay(1100)}
          onClick={() => scrollToId("about", reduced)}
        >
          Scroll to explore
          <ArrowDown
            className="scroll-hint-arrow size-4"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </button>
      </div>
    </section>
  );
}
