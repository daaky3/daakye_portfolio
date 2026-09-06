import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

export function CVButton({
  variant = "ghost",
  className,
}: {
  variant?: "ghost" | "text" | "solid";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 min-h-11 transition-[transform,color,background-color,box-shadow] duration-200 ease-[var(--ease-out)] active:scale-[0.96]";

  const styles = {
    ghost:
      "rounded-full px-4 text-sm font-medium shadow-[inset_0_0_0_1px_var(--border-strong)] hover:bg-bg-elevated",
    text: "text-sm font-medium text-fg-muted hover:text-fg",
    solid: "cta cta-solid px-5",
  }[variant];

  return (
    <a href="/cv" className={cn(base, styles, className)}>
      <Download className="size-3.5" strokeWidth={1.75} />
      Download CV
    </a>
  );
}
