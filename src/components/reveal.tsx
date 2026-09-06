import type { ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "p" | "h2" | "h3" | "li";
}) {
  const { ref, inView } = useInView();
  return (
    <Tag
      ref={ref as never}
      className={cn("reveal", inView && "is-in", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
