import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "solid" | "ghost";
  external?: boolean;
  className?: string;
  download?: boolean | string;
  "aria-label"?: string;
};

export function Cta({
  href,
  onClick,
  children,
  variant = "solid",
  external,
  className,
  download,
  "aria-label": ariaLabel,
}: Props) {
  const classes = cn(
    "cta",
    variant === "solid" ? "cta-solid" : "cta-ghost",
    className,
  );
  const inner = (
    <>
      <span>{children}</span>
      {external ? (
        <ArrowUpRight className="cta-arrow size-4" strokeWidth={1.75} />
      ) : (
        <ArrowRight className="cta-arrow size-4" strokeWidth={1.75} />
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        aria-label={ariaLabel}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...(download
          ? { download: download === true ? undefined : download }
          : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick} aria-label={ariaLabel}>
      {inner}
    </button>
  );
}
