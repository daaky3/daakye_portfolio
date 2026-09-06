import { useEffect } from "react";
import { X } from "lucide-react";
import { useSite } from "@/lib/site-context";
import { Cta } from "@/components/cta";

export function ProjectModal() {
  const { activeProject, closeProject } = useSite();

  useEffect(() => {
    if (!activeProject) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProject();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [activeProject, closeProject]);

  if (!activeProject) return null;
  const p = activeProject;

  return (
    <div
      className="fixed inset-0 z-[75] flex items-start justify-center overflow-y-auto bg-overlay px-4 py-8 backdrop-blur-xl md:px-8 md:py-12"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-title"
      onClick={closeProject}
    >
      <div
        className="project-modal relative my-auto w-full max-w-4xl rounded-2xl bg-bg-elevated p-4 shadow-[var(--shadow-image)] md:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeProject}
          className="absolute top-3 right-3 z-10 grid size-11 place-items-center rounded-full bg-bg/80 text-fg backdrop-blur-sm"
          aria-label="Close project"
        >
          <X className="size-5" strokeWidth={1.6} />
        </button>

        <div className="overflow-hidden rounded-xl">
          <img
            src={p.image}
            alt={`${p.name} screenshot`}
            className="aspect-[16/10] w-full object-cover object-top outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
          />
        </div>

        <div className="px-2 pb-4 pt-6 md:px-3 md:pt-8">
          <p className="text-micro tracking-[0.28em] uppercase text-fg-subtle">
            {p.number} — Project
          </p>
          <h3
            id="project-title"
            className="mt-2 text-section font-semibold tracking-[-0.035em]"
          >
            {p.name}
          </h3>
          <p className="mt-4 max-w-2xl text-fg-muted">{p.description}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {p.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full px-3 py-1.5 text-xs text-fg-muted shadow-[inset_0_0_0_1px_var(--border)]"
              >
                {tag}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Cta href={p.url} external>
              Visit {p.name}
              <span className="sr-only"> (opens in a new tab)</span>
            </Cta>
          </div>
        </div>
      </div>
    </div>
  );
}
