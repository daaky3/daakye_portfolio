import { useEffect, useState } from "react";
import { BadgeCheck, Menu, X } from "lucide-react";
import { BrandMark } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { CVButton } from "@/components/cv-button";
import { NAV_LINKS } from "@/lib/data";
import { cn, scrollToId } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-media";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const ids = NAV_LINKS.map((l) => l.id);
      let current = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 120) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("modal-open", open);
    return () => document.documentElement.classList.remove("modal-open");
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id, reduced);
  };

  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[90] focus:rounded-md focus:bg-bg-elevated focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <header className={cn("site-nav", scrolled && "is-scrolled")}>
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-5 md:px-8">
          <button
            type="button"
            onClick={() => go("home")}
            className="nav-brand flex shrink-0 items-center gap-2 text-fg"
            aria-label="DΛΛKYΣ home"
          >
            <img
              src="/images/avi.jpg"
              alt=""
              className="nav-avatar"
              onError={(event) => {
                event.currentTarget.src = "/images/profile-full.jpg";
              }}
            />
            <BrandMark />
            <BadgeCheck
              className="nav-verified"
              aria-label="Verified brand"
              role="img"
              strokeWidth={2.2}
            />
          </button>

          <nav
            className="hidden items-center gap-7 lg:flex"
            aria-label="Primary"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                className={cn("nav-link", active === link.id && "is-active")}
                onClick={() => go(link.id)}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <div className="hidden md:block">
              <CVButton variant="text" className="px-3" />
            </div>
            <a href="/terminal" className="terminal-nav-link hidden items-center gap-2 sm:inline-flex">
              <span className="terminal-nav-prompt">$</span>
              Open Terminal
            </a>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => go("contact")}
              className="cta cta-solid hidden h-10 min-h-10 px-4 text-xs tracking-wide sm:inline-flex"
            >
              Contact
            </button>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <X className="size-5" strokeWidth={1.6} />
              ) : (
                <Menu className="size-5" strokeWidth={1.6} />
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-50 flex flex-col justify-end bg-bg px-6 pb-10 pt-24 lg:hidden",
          "transition-[opacity,transform] duration-300 ease-[var(--ease-out)]",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <nav className="flex flex-col gap-2" aria-label="Mobile">
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.id}
              type="button"
              onClick={() => go(link.id)}
              className="py-3 text-left text-3xl font-medium tracking-tight text-fg"
              style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
            >
              {link.label}
            </button>
          ))}
        </nav>
        <div className="mt-8 flex flex-col gap-3">
          <a href="/terminal" className="cta cta-solid justify-center" onClick={() => setOpen(false)}>
            Open Terminal
          </a>
          <CVButton variant="ghost" />
        </div>
      </div>
    </>
  );
}
