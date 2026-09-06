import { ABOUT } from "@/lib/data";
import { BRAND, cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";
import { CVButton } from "@/components/cv-button";
import { useInView } from "@/hooks/use-in-view";

export function About() {
  const { ref, inView } = useInView({ threshold: 0.25 });

  return (
    <section id="about" className="relative py-28 md:py-36">
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
            className="group relative overflow-hidden rounded-xl shadow-[var(--shadow-image)]"
            data-cursor="media"
          >
            <picture>
              <source srcSet="/images/portrait-about.webp" type="image/webp" />
              <img
                src="/images/portrait-about.jpg"
                alt={`${BRAND} portrait`}
                width={858}
                height={1100}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover object-[50%_18%] transition-[transform,filter] duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04] group-hover:brightness-[1.04] outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
              />
            </picture>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
