import { BRAND, cn } from "@/lib/utils";

export function BrandMark({
  className,
  as: Tag = "span",
}: {
  className?: string;
  as?: "span" | "p" | "div";
}) {
  return (
    <Tag
      className={cn(
        "brand-mark tracking-[0.28em] mr-[-0.28em]",
        className,
      )}
      aria-label={BRAND}
    >
      {BRAND}
    </Tag>
  );
}

export function SplitBrand({
  className,
  inView,
  stagger = 70,
}: {
  className?: string;
  inView: boolean;
  stagger?: number;
}) {
  return (
    <span className={cn("brand-mark", className)} aria-label={BRAND}>
      {Array.from(BRAND).map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          className={cn("hero-char", inView && "is-in")}
          style={{ transitionDelay: `${i * stagger}ms` }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}
