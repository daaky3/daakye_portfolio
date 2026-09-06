import { useEffect } from "react";
import { PROCESS } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

export function Process() {
  const { ref, inView } = useInView({ threshold: 0.2, once: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = -rect.height * 0.15;
      const p = (start - rect.top) / (start - end);
      el.style.setProperty("--progress", String(Math.min(1, Math.max(0, p))));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref]);

  return (
    <section id="process" className="py-28 md:py-36">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <Reveal>
          <p className="text-micro font-medium uppercase tracking-[0.28em] text-fg-subtle">
            04 — Approach
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-5 max-w-[18ch] text-display font-semibold tracking-[-0.04em]">
            How I turn ideas into products.
          </h2>
        </Reveal>

        <div ref={ref} className="timeline mt-16 md:mt-20">
          <ol className="relative hidden grid-cols-4 gap-8 md:grid">
            <span
              className="absolute top-[18px] right-8 left-8 h-px bg-border"
              aria-hidden="true"
            />
            <span
              className="timeline-line absolute top-[18px] right-8 left-8 h-px bg-fg"
              aria-hidden="true"
            />
            {PROCESS.map((step, i) => (
              <li
                key={step.number}
                className={cn("reveal relative pt-10", inView && "is-in")}
                style={{ transitionDelay: `${180 + i * 140}ms` }}
              >
                <span className="absolute top-0 font-medium tracking-[0.14em] text-fg">
                  {step.number}
                </span>
                <h3 className="text-2xl font-semibold tracking-[-0.03em]">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[22ch] text-sm leading-relaxed text-fg-muted">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>

          <ol className="relative space-y-10 pl-8 md:hidden">
            <span
              className="absolute top-1 bottom-1 left-[7px] w-px bg-border"
              aria-hidden="true"
            />
            <span
              className="timeline-line-v absolute top-1 bottom-1 left-[7px] w-px bg-fg"
              aria-hidden="true"
            />
            {PROCESS.map((step, i) => (
              <li
                key={step.number}
                className={cn("reveal relative", inView && "is-in")}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="absolute top-1.5 -left-[29px] size-2 rounded-full bg-fg" />
                <p className="text-micro tracking-[0.2em] text-fg-subtle">
                  {step.number}
                </p>
                <h3 className="mt-1 text-2xl font-semibold tracking-[-0.03em]">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[36ch] text-fg-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
