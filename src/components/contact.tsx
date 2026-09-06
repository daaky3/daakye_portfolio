import { EMAIL, SOCIAL, WHATSAPP } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { Cta } from "@/components/cta";
import { CVButton } from "@/components/cv-button";
import { SOCIAL_ICONS } from "@/components/social-icons";

export function SocialSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-[1280px] gap-12 px-5 md:grid-cols-[0.9fr_1.1fr] md:px-8">
        <Reveal>
          <p className="text-micro font-medium uppercase tracking-[0.28em] text-fg-subtle">
            05 — Online
          </p>
          <h2 className="mt-5 text-display font-semibold tracking-[-0.04em]">
            Find me online.
          </h2>
        </Reveal>
        <ul>
          {SOCIAL.map((item, i) => {
            const Icon = SOCIAL_ICONS[item.id as keyof typeof SOCIAL_ICONS];
            return (
              <li key={item.id}>
                <Reveal delay={i * 60}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    data-cursor="hover"
                  >
                    {Icon ? <Icon className="social-icon size-5" /> : null}
                    <span className="text-lg font-medium tracking-tight">
                      {item.label}
                    </span>
                    <span className="social-meta ml-auto text-xs tracking-[0.16em] uppercase text-fg-subtle">
                      Follow
                    </span>
                  </a>
                </Reveal>
              </li>
            );
          })}
          {WHATSAPP.map((item) => (
            <li key={item.href}>
              <Reveal>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  data-cursor="hover"
                >
                  <SOCIAL_ICONS.whatsapp className="social-icon size-5" />
                  <span className="text-lg font-medium tracking-tight">
                    WhatsApp
                  </span>
                  <span className="social-meta ml-auto text-xs tracking-[0.08em] text-fg-subtle">
                    {item.label}
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
          <li>
            <Reveal>
              <a href={`mailto:${EMAIL}`} className="social-link" data-cursor="hover">
                <SOCIAL_ICONS.email className="social-icon size-5" />
                <span className="text-lg font-medium tracking-tight">Email</span>
                <span className="social-meta ml-auto text-xs text-fg-subtle">
                  {EMAIL}
                </span>
              </a>
            </Reveal>
          </li>
        </ul>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="py-28 md:py-40">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <Reveal>
          <p className="text-micro font-medium uppercase tracking-[0.28em] text-fg-subtle">
            06 — Contact
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-5 max-w-[12ch] text-display font-semibold tracking-[-0.045em]">
            Let’s build something.
          </h2>
        </Reveal>
        <Reveal delay={140} as="p" className="mt-5 text-lead text-fg-muted">
          Have an idea, project or opportunity?
        </Reveal>

        <Reveal delay={200} className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Cta href={WHATSAPP[0].href} external>
            Start a Conversation
          </Cta>
          <Cta href={`mailto:${EMAIL}`} variant="ghost">
            Email Me
          </Cta>
        </Reveal>

        <div className="mt-10 flex flex-col gap-4 text-sm text-fg-muted">
          <a
            href={`mailto:${EMAIL}`}
            className="w-fit underline-offset-4 hover:text-fg hover:underline"
          >
            {EMAIL}
          </a>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
            {WHATSAPP.map((w) => (
              <a
                key={w.href}
                href={w.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit underline-offset-4 hover:text-fg hover:underline"
              >
                WhatsApp {w.label}
              </a>
            ))}
          </div>
          <div className="pt-2">
            <CVButton variant="text" />
          </div>
        </div>
      </div>
    </section>
  );
}
