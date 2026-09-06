import { MARQUEE, SKILLS } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

export function Skills() {
  const { ref, inView } = useInView({ threshold: 0.12 });

  return (
    <section id="skills" className="py-28 md:py-36">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <Reveal>
          <p className="text-micro font-medium uppercase tracking-[0.28em] text-fg-subtle">
            03 — Tools
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-5 text-display font-semibold tracking-[-0.04em]">
            Tools behind the work.
          </h2>
        </Reveal>

        <div
          ref={ref}
          className="mt-12 flex flex-wrap gap-2.5 md:gap-3"
        >
          {SKILLS.map((skill, i) => (
            <span
              key={skill}
              className={cn(
                "skill-chip reveal",
                inView && "is-in",
              )}
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="marquee mt-20 border-y border-border py-6">
        <div className="marquee-track" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center">
              {MARQUEE.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="px-6 text-sm font-medium tracking-[0.18em] uppercase text-fg-muted"
                >
                  {item}
                  <span className="ml-6 text-fg-subtle">•</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
