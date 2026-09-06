import { STATS } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { useInView } from "@/hooks/use-in-view";
import { useEffect, useState } from "react";

function StatValue({ value, active }: { value: string; active: boolean }) {
  const numeric = /^\d+$/.test(value);
  const [n, setN] = useState(numeric ? "00" : value);

  useEffect(() => {
    if (!active || !numeric) {
      if (active) setN(value);
      return;
    }
    const target = Number(value);
    const start = performance.now();
    const dur = 900;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(String(Math.round(target * eased)).padStart(2, "0"));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, numeric, value]);

  return <span className="stat-value">{n}</span>;
}

export function Stats() {
  const { ref, inView } = useInView({ threshold: 0.35 });

  return (
    <section className="border-y border-border py-16 md:py-20">
      <div
        ref={ref}
        className="mx-auto grid w-full max-w-[1280px] grid-cols-2 gap-y-10 px-5 md:grid-cols-4 md:px-8"
      >
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 80} className="text-center md:text-left">
            <StatValue value={stat.value} active={inView} />
            <p className="mt-3 text-sm tracking-[0.12em] uppercase text-fg-subtle">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
