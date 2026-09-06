import { useMemo, useState } from "react";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { EMAIL, WHATSAPP } from "@/lib/data";

type Service = "website" | "web-app" | "automation" | "support";
type Scope = "starter" | "growth" | "custom";
type Timeline = "flexible" | "standard" | "urgent";

type Option<T extends string> = {
  value: T;
  label: string;
  detail: string;
};

const services: Option<Service>[] = [
  { value: "website", label: "Business website", detail: "A clear, conversion-focused web presence" },
  { value: "web-app", label: "Web application", detail: "A tailored platform for users or teams" },
  { value: "automation", label: "Digital automation", detail: "Systems that remove repetitive work" },
  { value: "support", label: "Ongoing support", detail: "Updates, improvements, and technical care" },
];

const scopes: Option<Scope>[] = [
  { value: "starter", label: "Focused", detail: "A lean first version with the essentials" },
  { value: "growth", label: "Growth-ready", detail: "A stronger experience with room to scale" },
  { value: "custom", label: "Custom scope", detail: "A more complex or unusual requirement" },
];

const timelines: Option<Timeline>[] = [
  { value: "flexible", label: "Flexible", detail: "I am open to the best delivery plan" },
  { value: "standard", label: "Within 2–4 weeks", detail: "A focused delivery window" },
  { value: "urgent", label: "As soon as possible", detail: "I have a near-term deadline" },
];

const servicePrices: Record<Service, Record<Timeline, Record<Scope, number>>> = {
  website: {
    flexible: { starter: 3500, growth: 3800, custom: 3550 },
    standard: { starter: 3500, growth: 3800, custom: 3550 },
    urgent: { starter: 4500, growth: 4800, custom: 4550 },
  },
  "web-app": {
    flexible: { starter: 3500, growth: 3800, custom: 3550 },
    standard: { starter: 3500, growth: 3800, custom: 3550 },
    urgent: { starter: 4500, growth: 4800, custom: 4550 },
  },
  automation: {
    flexible: { starter: 3500, growth: 3800, custom: 3550 },
    standard: { starter: 3500, growth: 3800, custom: 3550 },
    urgent: { starter: 4500, growth: 4800, custom: 4550 },
  },
  support: {
    flexible: { starter: 3500, growth: 3800, custom: 3550 },
    standard: { starter: 3500, growth: 3800, custom: 3550 },
    urgent: { starter: 4500, growth: 4800, custom: 4550 },
  },
};
const formatMoney = (amount: number) => `GH₵${amount.toLocaleString("en-GH")}`;

export function ProjectPlanner() {
  const [service, setService] = useState<Service>("website");
  const [scope, setScope] = useState<Scope>("growth");
  const [timeline, setTimeline] = useState<Timeline>("flexible");
  const [name, setName] = useState("");
  const [project, setProject] = useState("");

  const selected = useMemo(() => {
    const estimate = servicePrices[service][timeline][scope];
    const serviceLabel = services.find((item) => item.value === service)?.label ?? "Project";
    const scopeLabel = scopes.find((item) => item.value === scope)?.label ?? "Custom scope";
    const timelineLabel = timelines.find((item) => item.value === timeline)?.label ?? "Flexible";
    return { estimate, serviceLabel, scopeLabel, timelineLabel };
  }, [service, scope, timeline]);

  const brief = `Hello Albert,\n\nI would like to discuss a project.\n\nName: ${name || "Not provided"}\nService: ${selected.serviceLabel}\nScope: ${selected.scopeLabel}\nTimeline: ${selected.timelineLabel}\nEstimated price: ${formatMoney(selected.estimate)}\nProject details: ${project || "I would like to discuss my requirements."}\n\nThank you.`;
  const emailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(`Project enquiry: ${selected.serviceLabel}`)}&body=${encodeURIComponent(brief)}`;
  const whatsappHref = `${WHATSAPP[0].href}?text=${encodeURIComponent(brief)}`;

  return (
    <section id="planner" className="planner-section border-y border-border bg-bg-muted py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-[1280px] gap-12 px-5 md:grid-cols-[0.8fr_1.2fr] md:px-8">
        <Reveal>
          <p className="text-micro font-medium uppercase tracking-[0.28em] text-fg-subtle">06 — Plan a project</p>
          <h2 className="mt-5 max-w-[10ch] text-display font-semibold tracking-[-0.045em]">Bring an idea into focus.</h2>
          <p className="mt-5 max-w-md text-lead text-fg-muted">Answer a few questions for a useful starting range. Every project is scoped properly before work begins.</p>
          <div className="mt-8 border-l border-border-strong pl-4 text-sm leading-6 text-fg-muted">
            <p>Estimated project price</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-fg">{formatMoney(selected.estimate)}</p>
            <p className="mt-1 text-xs">Final pricing is confirmed after the requirements are reviewed.</p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="planner-panel bg-bg-elevated p-5 shadow-[var(--shadow-border)] sm:p-8">
            <PlannerField label="What do you need?" options={services} value={service} onChange={setService} />
            <PlannerField label="How much do you want to build?" options={scopes} value={scope} onChange={setScope} />
            <PlannerField label="When would you like to start?" options={timelines} value={timeline} onChange={setTimeline} />

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <label className="planner-input-label">
                Your name
                <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Albert Quainoo" />
              </label>
              <label className="planner-input-label">
                Tell me about it
                <textarea value={project} onChange={(event) => setProject(event.target.value)} placeholder="What should this project help you achieve?" rows={3} />
              </label>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a className="cta cta-solid" href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4" strokeWidth={1.7} />
                Send on WhatsApp
                <ArrowUpRight className="cta-arrow size-4" strokeWidth={1.75} />
              </a>
              <a className="cta cta-ghost" href={emailHref}>
                <Mail className="size-4" strokeWidth={1.7} />
                Send by email
                <ArrowUpRight className="cta-arrow size-4" strokeWidth={1.75} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PlannerField<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="planner-fieldset">
      <legend>{label}</legend>
      <div className="grid gap-2 sm:grid-cols-3">
        {options.map((option) => (
          <label className="planner-option" key={option.value}>
            <input type="radio" name={label} value={option.value} checked={value === option.value} onChange={() => onChange(option.value)} />
            <span>
              <strong>{option.label}</strong>
              <small>{option.detail}</small>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
