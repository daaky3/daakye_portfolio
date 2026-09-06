import { ArrowLeft, Download, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { EMAIL, WHATSAPP } from "@/lib/data";
import { BRAND } from "@/lib/utils";

export const Route = createFileRoute("/cv")({
  head: () => ({
    meta: [{ title: `${BRAND} — CV` }],
  }),
  component: CvPage,
});

function CvPage() {
  return (
    <main className="cv-shell min-h-screen bg-bg px-4 py-6 text-fg sm:px-8 md:py-10">
      <div className="cv-actions mx-auto flex w-full max-w-[1000px] items-center justify-between pb-5">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="size-4" strokeWidth={1.7} />
          Back to portfolio
        </Link>
        <button
          type="button"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-4 text-sm font-medium text-accent-fg transition-transform active:scale-[0.97]"
          onClick={() => window.print()}
        >
          <Download className="size-4" strokeWidth={1.7} />
          Save as PDF
        </button>
      </div>

      <article className="cv-paper mx-auto grid w-full max-w-[1000px] overflow-hidden bg-bg-elevated shadow-[var(--shadow-image)] md:grid-cols-[270px_1fr]">
        <aside className="cv-sidebar bg-invert px-6 py-8 text-invert-fg sm:px-9 md:py-10">
          <div className="cv-monogram">DΛΛKYΣ</div>
          <p className="mt-8 text-xs font-medium uppercase tracking-[0.22em] text-invert-fg/60">
            Contact
          </p>
          <div className="mt-4 space-y-4 text-sm text-invert-fg/80">
            <a className="flex items-start gap-3" href={`mailto:${EMAIL}`}>
              <Mail className="mt-0.5 size-4 shrink-0" strokeWidth={1.6} />
              <span className="break-all">{EMAIL}</span>
            </a>
            {WHATSAPP.map((item) => (
              <a className="flex items-start gap-3" href={item.href} key={item.href}>
                <Phone className="mt-0.5 size-4 shrink-0" strokeWidth={1.6} />
                <span>{item.label}</span>
              </a>
            ))}
            <a className="flex items-start gap-3" href="https://daakye.online/">
              <ExternalLink className="mt-0.5 size-4 shrink-0" strokeWidth={1.6} />
              <span>daakye.online</span>
            </a>
            <a className="flex items-start gap-3" href="https://github.com/daaky3">
              <ExternalLink className="mt-0.5 size-4 shrink-0" strokeWidth={1.6} />
              <span>github.com/daaky3</span>
            </a>
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0" strokeWidth={1.6} />
              <span>Ghana</span>
            </p>
          </div>

          <CvSidebarSection title="Core competencies">
            <ul className="space-y-2 text-sm text-invert-fg/80">
              <li>Web application development</li>
              <li>Responsive interface design</li>
              <li>Digital systems development</li>
              <li>Workflow automation</li>
              <li>ICT support and problem-solving</li>
              <li>Technical project delivery</li>
            </ul>
          </CvSidebarSection>

          <CvSidebarSection title="Technical toolkit">
            <p className="text-sm leading-7 text-invert-fg/80">
              HTML · CSS · JavaScript · React · Vite · Tailwind CSS · Node.js ·
              Supabase · Git · GitHub · APIs · UI/UX
            </p>
          </CvSidebarSection>

          <CvSidebarSection title="Language">
            <p className="text-sm text-invert-fg/80">English</p>
          </CvSidebarSection>
        </aside>

        <div className="cv-content px-6 py-8 sm:px-10 md:px-12 md:py-10">
          <header className="border-b border-border pb-8">
            <p className="text-micro font-medium uppercase tracking-[0.28em] text-fg-subtle">
              Curriculum Vitae
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
              Albert Quainoo
            </h1>
            <p className="mt-3 text-lg text-fg-muted">
              Software Developer <span className="px-2 text-fg-subtle">|</span> ICT Professional
            </p>
            <p className="mt-6 max-w-2xl text-[0.98rem] leading-7 text-fg-muted">
              Software developer and ICT professional focused on building practical,
              user-friendly digital products and systems. I combine technical delivery,
              thoughtful interface design, and workflow automation to help organizations
              communicate better, work more efficiently, and serve their users online.
            </p>
          </header>

          <CvSection title="Selected experience">
            <CvEntry
              title="Web Developer — AJI Group Ghana Ltd"
              body="Designed and deployed the company’s official website to present its corporate identity, agricultural ventures, services, and digital presence with clarity."
            />
            <CvEntry
              title="Digital Systems Developer — Serwaa Nyarko Girls’ Senior High School"
              body="Developed digital systems that automate student report generation and deliver reports to parents via SMS, improving the speed and reliability of school communication."
            />
            <CvEntry
              title="Independent Software Developer"
              body="Developed and implemented practical technology solutions for organizational workflows, including responsive websites, web applications, and tailored digital platforms."
            />
          </CvSection>

          <CvSection title="Education">
            <CvEntry title="BSc Information Technology" body="University of Skills Training and Entrepreneurial Development (USTED)" />
            <CvEntry title="Secondary Education" body="T.I. Ahmadiyya Senior High School" />
            <CvEntry title="Basic Education" body="St. Mary’s Catholic School" />
          </CvSection>

          <div className="grid gap-8 border-t border-border pt-7 sm:grid-cols-2">
            <section>
              <h2 className="cv-section-title">Certifications</h2>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-fg-muted">
                <li>BSc Information Technology</li>
                <li>West African Senior School Certificate Examination (WASSCE)</li>
              </ul>
            </section>
            <section>
              <h2 className="cv-section-title">Professional strengths</h2>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-fg-muted">
                <li>Clear communication</li>
                <li>Practical problem-solving</li>
                <li>Attention to user experience</li>
                <li>Reliable project execution</li>
              </ul>
            </section>
          </div>

          <footer className="mt-10 border-t border-border pt-5 text-xs text-fg-subtle">
            References available upon request.
          </footer>
        </div>
      </article>
    </main>
  );
}

function CvSidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-9 border-t border-invert-fg/15 pt-5">
      <h2 className="text-xs font-medium uppercase tracking-[0.22em] text-invert-fg/60">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function CvSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-border py-7">
      <h2 className="cv-section-title">{title}</h2>
      <div className="mt-5 space-y-6">{children}</div>
    </section>
  );
}

function CvEntry({ title, body }: { title: string; body: string }) {
  return (
    <article>
      <h3 className="text-[0.98rem] font-semibold tracking-[-0.01em]">{title}</h3>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-fg-muted">{body}</p>
    </article>
  );
}