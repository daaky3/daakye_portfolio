import { BrandMark } from "@/components/brand";
import { SITE, SOCIAL, WHATSAPP } from "@/lib/data";
import { scrollToId } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-media";

export function Footer() {
  const reduced = usePrefersReducedMotion();
  const year = 2026;

  return (
    <footer className="border-t border-border py-16 md:py-20">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-5 md:px-8">
        <BrandMark
          as="p"
          className="text-[clamp(2.4rem,8vw,6.5rem)] leading-none tracking-[0.14em] text-fg"
        />
        <p className="max-w-[28rem] text-fg-muted">{SITE.footerLine}</p>

        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-fg-muted">
          {SOCIAL.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fg"
            >
              {s.label}
            </a>
          ))}
          {WHATSAPP.map((w) => (
            <a
              key={w.href}
              href={w.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fg"
            >
              WhatsApp
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-border pt-8 text-sm text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.brand}. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => scrollToId("home", reduced)}
            className="w-fit text-fg-muted hover:text-fg"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
