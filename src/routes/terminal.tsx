import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, Terminal as TerminalIcon } from "lucide-react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { EMAIL, PROJECTS, SKILLS, SOCIAL, WHATSAPP } from "@/lib/data";
import { BRAND } from "@/lib/utils";

export const Route = createFileRoute("/terminal")({
  head: () => ({
    meta: [{ title: `${BRAND} Terminal` }],
  }),
  component: TerminalPage,
});

type OutputLine = {
  id: number;
  command?: string;
  content: string;
  tone?: "muted" | "accent" | "error";
};

const COMMANDS = ["help", "about", "projects", "skills", "github", "contact", "social", "clear", "plan project"];
const INITIAL_OUTPUT: OutputLine[] = [
  { id: 1, content: "Loading...", tone: "muted" },
  { id: 2, content: "DΛΛKYΣ Terminal", tone: "accent" },
  { id: 3, content: "────────────────────", tone: "muted" },
  { id: 4, content: "Type help to explore the available commands.", tone: "muted" },
];

function TerminalPage() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<OutputLine[]>(INITIAL_OUTPUT);
  const [isTyping, setIsTyping] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [hidden, setHidden] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const nextLineId = useRef(5);
  const typingTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (typingTimer.current !== null) window.clearInterval(typingTimer.current);
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight, behavior: "smooth" });
  }, [output]);

  const runCommand = (rawCommand: string) => {
    const command = rawCommand.trim().toLowerCase().replace(/\s+/g, " ");
    if (!command || isTyping) return;
    if (command === "clear") {
      setOutput([]);
      setInput("");
      return;
    }

    const next = resolveCommand(command);
    const lineId = nextLineId.current++;
    setOutput((current) => [...current, { id: lineId, command: rawCommand.trim(), content: "", tone: next.tone }]);
    setInput("");
    setIsTyping(true);

    let position = 0;
    typingTimer.current = window.setInterval(() => {
      position = Math.min(position + 2, next.content.length);
      setOutput((current) => current.map((line) => line.id === lineId ? { ...line, content: next.content.slice(0, position) } : line));
      if (position >= next.content.length) {
        if (typingTimer.current !== null) window.clearInterval(typingTimer.current);
        typingTimer.current = null;
        setIsTyping(false);
        if (command === "github") window.open("https://github.com/daaky3", "_blank", "noopener,noreferrer");
        if (command === "plan project") window.setTimeout(() => navigate({ to: "/", hash: "planner" }), 250);
      }
    }, 24);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runCommand(input);
  };

  return (
    <main className="terminal-page min-h-screen bg-[#050505] px-4 py-5 text-[#f5f5f7] sm:px-8 sm:py-8">
      <div className="mx-auto flex min-h-[calc(100svh-2.5rem)] w-full max-w-[1120px] flex-col">
        <header className="terminal-topbar flex items-center justify-between gap-4 pb-6">
          <Link to="/" className="terminal-back inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white">
            <ArrowLeft className="size-4" strokeWidth={1.7} />
            Back to portfolio
          </Link>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/45">
            <TerminalIcon className="size-4" strokeWidth={1.6} />
            Interactive profile
          </div>
        </header>

        {hidden ? (
          <button type="button" className="terminal-show-button" onClick={() => setHidden(false)}>
            <TerminalIcon className="size-4" strokeWidth={1.7} />
            Show terminal
          </button>
        ) : (
        <section className={`ios-terminal flex flex-1 flex-col overflow-hidden ${minimized ? "ios-terminal-minimized" : "min-h-[620px]"}`} aria-label="DΛΛKYΣ interactive developer terminal">
          <div className="ios-terminal-bar flex items-center gap-3 px-5 py-4 sm:px-6">
            <button type="button" className="ios-dot ios-dot-exit bg-[#ff5f57]" aria-label="Exit terminal" title="Exit terminal" onClick={() => navigate({ to: "/" })} />
            <button type="button" className="ios-dot ios-dot-minimize bg-[#febc2e]" aria-label={minimized ? "Restore terminal" : "Minimize terminal"} title={minimized ? "Restore terminal" : "Minimize terminal"} onClick={() => setMinimized((current) => !current)} />
            <button type="button" className="ios-dot ios-dot-hide bg-[#28c840]" aria-label="Hide terminal" title="Hide terminal" onClick={() => setHidden(true)} />
            <div className="ml-3 flex min-w-0 items-center gap-2 text-xs text-white/45">
              <TerminalIcon className="size-3.5" strokeWidth={1.8} />
              <span className="truncate">daakye — terminal</span>
            </div>
          </div>

          {!minimized ? <>
          <div ref={outputRef} className="terminal-output flex-1 overflow-y-auto px-5 py-7 font-mono text-sm leading-7 sm:px-10 sm:py-10 sm:text-[0.95rem]">
            {output.map((line, index) => (
              <div key={`${line.command ?? "system"}-${index}`} className="mb-5">
                {line.command ? <p className="text-white/90"><span className="text-[#74d49a]">$</span> {line.command}</p> : null}
                <p className={line.tone === "accent" ? "text-[#74d49a]" : line.tone === "error" ? "text-[#ff8b86]" : "text-white/70"}>
                  {line.content}
                </p>
              </div>
            ))}
            <form onSubmit={submit} className="flex items-center gap-2">
              <span className="text-[#74d49a]">$</span>
                <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                  disabled={isTyping}
                className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-white/30"
                aria-label="Terminal command"
                autoComplete="off"
                spellCheck={false}
                placeholder="type a command..."
              />
              <span className="terminal-caret" aria-hidden="true" />
            </form>
          </div>

          <div className="border-t border-white/10 px-5 py-4 sm:px-10">
            <p className="mb-3 text-[0.65rem] uppercase tracking-[0.2em] text-white/35">Quick commands</p>
            <div className="flex flex-wrap gap-2">
              {COMMANDS.map((command) => (
                <button key={command} type="button" className="terminal-command" disabled={isTyping} onClick={() => runCommand(command)}>
                  {command}
                </button>
              ))}
            </div>
          </div>
          </> : null}
        </section>
        )}
      </div>
    </main>
  );
}

function resolveCommand(command: string): Pick<OutputLine, "content" | "tone"> {
  switch (command) {
    case "help":
      return { content: `Available commands:\n${COMMANDS.map((item) => `  ${item}`).join("\n")}`, tone: "accent" };
    case "about":
      return { content: "Albert Quainoo\nSoftware Developer • ICT Professional\nI build practical digital experiences, systems, and tools that help ideas move forward." };
    case "projects":
      return { content: PROJECTS.map((project) => project.name).join("\n") };
    case "skills":
      return { content: SKILLS.slice(0, 12).join("\n") };
    case "github":
      return { content: "Opening github.com/daaky3...", tone: "accent" };
    case "contact":
      return { content: `${EMAIL}\nWhatsApp: ${WHATSAPP[0].label}\nWhatsApp: ${WHATSAPP[1].label}`, tone: "accent" };
    case "social":
      return { content: SOCIAL.map((item) => `${item.label}: ${item.href}`).join("\n") };
    case "plan project":
      return { content: "Opening the project planner...", tone: "accent" };
    default:
      return { content: `Command not found: ${command}\nType help to see available commands.`, tone: "error" };
  }
}
