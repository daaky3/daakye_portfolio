import { ArrowRight } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { useInView } from "@/hooks/use-in-view";
import { useSite } from "@/lib/site-context";
import { cn } from "@/lib/utils";

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.22 });
  const { openProject } = useSite();
  const reverse = index % 2 === 1;

  return (
    <article
      ref={ref}
      className={cn(
        "project-row group grid items-center gap-8 py-10 md:grid-cols-2 md:gap-14 md:py-16",
        inView && "is-in",
      )}
    >
      <button
        type="button"
        data-cursor="view"
        onClick={() => openProject(project)}
        className={cn(
          "project-media relative aspect-[16/10] w-full text-left",
          reverse && "md:order-2",
        )}
        aria-label={`View ${project.name}`}
      >
        <img
          src={project.image}
          alt={`${project.name} website preview`}
          width={1600}
          height={1000}
          loading="lazy"
          className="h-full w-full object-cover object-top outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
      </button>

      <div className={cn("project-copy", reverse && "md:order-1")}>
        <p className="project-num text-micro font-medium tracking-[0.28em] text-fg-subtle">
          {project.number}
        </p>
        <h3 className="mt-3 text-section font-semibold tracking-[-0.035em]">
          {project.name}
        </h3>
        <p className="mt-4 max-w-[34rem] text-[0.98rem] leading-relaxed text-fg-muted">
          {project.description}
        </p>
        <button
          type="button"
          data-cursor="view"
          onClick={() => openProject(project)}
          className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium"
        >
          View Project
          <ArrowRight className="project-arrow size-4" strokeWidth={1.7} />
        </button>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="work" className="py-28 md:py-36">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <Reveal>
          <p className="text-micro font-medium uppercase tracking-[0.28em] text-fg-subtle">
            02 — Work
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-5 text-display font-semibold tracking-[-0.04em]">
            Selected Work
          </h2>
        </Reveal>
        <Reveal delay={140} as="p" className="mt-4 text-lead text-fg-muted">
          A few things I’ve built.
        </Reveal>

        <div className="mt-10 divide-y divide-border md:mt-6">
          {PROJECTS.map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
