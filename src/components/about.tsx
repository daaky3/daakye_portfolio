import { useEffect, useRef, useState } from "react";
import { ABOUT } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";
import { CVButton } from "@/components/cv-button";
import { useInView } from "@/hooks/use-in-view";
import { useIsFinePointer, usePrefersReducedMotion } from "@/hooks/use-media";

export function About() {
  const { ref, inView } = useInView({ threshold: 0.25 });
  const portraitRef = useRef<HTMLDivElement>(null);
  const [portraitReady, setPortraitReady] = useState(false);
  const fine = useIsFinePointer();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    setPortraitReady(true);
  }, []);

  useEffect(() => {
    const stage = portraitRef.current;
    if (!stage || !fine || reduced) return;

    const onMove = (event: PointerEvent) => {
      const bounds = stage.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
      stage.style.setProperty("--portrait-x", x.toFixed(3));
      stage.style.setProperty("--portrait-y", y.toFixed(3));
      stage.style.setProperty("--portrait-tilt-x", `${(y * -4).toFixed(2)}deg`);
      stage.style.setProperty("--portrait-tilt-y", `${(x * 6).toFixed(2)}deg`);
      stage.style.setProperty("--portrait-shift-x", `${(x * 8).toFixed(2)}px`);
      stage.style.setProperty("--portrait-shift-y", `${(y * 6).toFixed(2)}px`);
      stage.style.setProperty("--orbit-back-x", `${(x * -12).toFixed(2)}px`);
      stage.style.setProperty("--orbit-back-y", `${(y * -8).toFixed(2)}px`);
      stage.style.setProperty("--orbit-mid-x", `${(x * 12).toFixed(2)}px`);
      stage.style.setProperty("--orbit-mid-y", `${(y * 8).toFixed(2)}px`);
    };
    const reset = () => {
      stage.style.setProperty("--portrait-x", "0");
      stage.style.setProperty("--portrait-y", "0");
      stage.style.setProperty("--portrait-tilt-x", "0deg");
      stage.style.setProperty("--portrait-tilt-y", "0deg");
      stage.style.setProperty("--portrait-shift-x", "0px");
      stage.style.setProperty("--portrait-shift-y", "0px");
      stage.style.setProperty("--orbit-back-x", "0px");
      stage.style.setProperty("--orbit-back-y", "0px");
      stage.style.setProperty("--orbit-mid-x", "0px");
      stage.style.setProperty("--orbit-mid-y", "0px");
    };

    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", reset);
    return () => {
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", reset);
    };
  }, [fine, reduced]);

  return (
    <section id="about" className="about-section relative overflow-hidden py-28 md:py-36">
      <div className="about-video-backdrop" aria-hidden="true">
        <video
          autoPlay={!reduced}
          loop
          muted
          playsInline
          poster="/images/rotation.jpg"
          preload="metadata"
        >
          <source src="/videos/animated_keyboard.mp4" type="video/mp4" />
        </video>
        <div className="about-video-overlay" />
      </div>
      <div className="mx-auto grid w-full max-w-[1280px] gap-16 px-5 md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-20 md:px-8">
        <div>
          <Reveal>
            <p className="text-micro font-medium uppercase tracking-[0.28em] text-fg-subtle">
              01 — About
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-display font-semibold tracking-[-0.04em]">
              {ABOUT.heading}
            </h2>
          </Reveal>
          <Reveal delay={140} as="p" className="mt-6 max-w-[38rem] text-lead text-fg-muted">
            {ABOUT.body}
          </Reveal>

          <div
            ref={ref}
            className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4 md:gap-x-8"
          >
            {ABOUT.sequence.map((word, i) => (
              <div
                key={word}
                className={cn("seq-word", inView && "is-in")}
                style={{ transitionDelay: `${i * 140}ms` }}
              >
                <p className="text-micro font-medium tracking-[0.22em] text-fg-subtle">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-1 text-[clamp(1.45rem,3.2vw,2.15rem)] font-medium tracking-[-0.04em]">
                  {word}
                </p>
              </div>
            ))}
          </div>

          <Reveal delay={200} className="mt-10">
            <CVButton variant="ghost" />
          </Reveal>
        </div>

        <Reveal delay={120} className="mx-auto w-full max-w-[380px] md:max-w-none">
          <div
            ref={portraitRef}
            className={cn(
              "about-portrait-stage group relative",
              portraitReady && "is-ready",
              reduced && "is-reduced",
            )}
            data-cursor="media"
          >
            <div className="about-portrait-shadow" aria-hidden="true" />
            <div className="about-rotation-orbit about-rotation-orbit-back" aria-hidden="true">
              <img src="/images/rotation.jpg" alt="" />
            </div>
            <div className="about-rotation-orbit about-rotation-orbit-mid" aria-hidden="true">
              <img src="/images/rotation.jpg" alt="" />
            </div>
            <div className="about-portrait-card">
              <img
                src="/images/rotation.jpg"
                alt="Layered digital experiences displayed in 3D"
                width={1024}
                height={1024}
                loading="lazy"
              />
              <div className="about-portrait-sheen" aria-hidden="true" />
            </div>
            <div className="about-portrait-ring" aria-hidden="true" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
