import { useEffect, useMemo, useState } from "react";
import { Code2 } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { usePrefersReducedMotion } from "@/hooks/use-media";

const SNIPPETS = [
  { language: "HTML", code: '<section class="future">\n  <h1>Build something useful.</h1>\n</section>' },
  { language: "CSS", code: ".future {\n  display: grid;\n  color: #74d49a;\n}" },
  { language: "JavaScript", code: "const idea = await build({\n  impact: true,\n  delightful: true,\n});" },
  { language: "React", code: "function App() {\n  return <Experience />;\n}" },
  { language: "Python", code: 'def solve(problem):\n    return "keep building"' },
  { language: "Node.js", code: "app.listen(3000, () => {\n  console.log(\"Ready\");\n});" },
  { language: "Java", code: "public class Product {\n  void launch() {\n    ship();\n  }\n}" },
  { language: "C", code: "int main(void) {\n  printf(\"Hello, world!\");\n  return 0;\n}" },
  { language: "C#", code: "var result = await\n    BuildAsync(idea);" },
  { language: "C++", code: "std::cout << \"Build boldly\";\nreturn 0;" },
] as const;

const TOKEN_PATTERN = new RegExp(
  "(\\/\\/.*|#.*|<[^>]+>|\\\"[^\\\"]*\\\"|'[^']*'|\\b\\d+(?:\\.\\d+)?\\b|\\b(?:const|let|var|function|return|class|public|void|int|new|async|await|def|import|from|printf|true|false)\\b|\\b[A-Za-z_$][\\w$]*(?=\\s*\\())",
  "g",
);

function colorize(code: string) {
  const parts: Array<{ value: string; type: string }> = [];
  let lastIndex = 0;
  for (const match of code.matchAll(TOKEN_PATTERN)) {
    const index = match.index ?? 0;
    if (index > lastIndex) parts.push({ value: code.slice(lastIndex, index), type: "plain" });
    const value = match[0];
    const type = value.startsWith("//") || value.startsWith("#") ? "comment" : value.startsWith("\"") || value.startsWith("'") ? "string" : value.startsWith("<") ? "tag" : /^\d/.test(value) ? "number" : /^(const|let|var|function|return|class|public|void|int|new|async|await|def|import|from|printf|true|false)$/.test(value) ? "keyword" : "function";
    parts.push({ value, type });
    lastIndex = index + value.length;
  }
  if (lastIndex < code.length) parts.push({ value: code.slice(lastIndex), type: "plain" });
  return parts;
}

export function CodeShowcase() {
  const reduced = usePrefersReducedMotion();
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [visibleLength, setVisibleLength] = useState(reduced ? SNIPPETS[0].code.length : 0);
  const [deleting, setDeleting] = useState(false);
  const snippet = SNIPPETS[snippetIndex];
  const visibleCode = snippet.code.slice(0, visibleLength);
  const tokens = useMemo(() => colorize(visibleCode), [visibleCode]);

  useEffect(() => {
    if (reduced) return;
    const pause = deleting ? 28 : visibleLength >= snippet.code.length ? 1500 : 48;
    const timer = window.setTimeout(() => {
      if (!deleting && visibleLength >= snippet.code.length) {
        setDeleting(true);
      } else if (deleting && visibleLength === 0) {
        setDeleting(false);
        setSnippetIndex((current) => (current + 1) % SNIPPETS.length);
      } else {
        setVisibleLength((current) => current + (deleting ? -1 : 1));
      }
    }, pause);
    return () => window.clearTimeout(timer);
  }, [deleting, reduced, snippet.code.length, visibleLength]);

  useEffect(() => {
    setVisibleLength(reduced ? snippet.code.length : 0);
    setDeleting(false);
  }, [reduced, snippetIndex, snippet.code.length]);

  return (
    <section className="code-showcase border-y border-border bg-bg-muted py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-5 md:grid-cols-[0.8fr_1.2fr] md:items-center md:px-8">
        <Reveal>
          <p className="text-micro font-medium uppercase tracking-[0.28em] text-fg-subtle">08 — Code in motion</p>
          <h2 className="mt-5 max-w-[9ch] text-display font-semibold tracking-[-0.045em]">Different languages. One purpose.</h2>
          <p className="mt-5 max-w-md text-lead text-fg-muted">A small glimpse of the tools I use to turn ideas into useful digital experiences.</p>
        </Reveal>

        <Reveal delay={100}>
          <div className="code-window" aria-label={`Animated ${snippet.language} code example`}>
            <div className="code-window-bar">
              <div className="flex items-center gap-2">
                <span className="code-dot bg-[#ff5f57]" />
                <span className="code-dot bg-[#febc2e]" />
                <span className="code-dot bg-[#28c840]" />
              </div>
              <div className="code-language"><Code2 className="size-3.5" strokeWidth={1.8} />{snippet.language}</div>
            </div>
            <div className="code-body">
              <div className="code-lines" aria-hidden="true">{visibleCode.split("\n").map((_, index) => <span key={index}>{String(index + 1).padStart(2, "0")}</span>)}</div>
              <pre className="code-content"><code>{tokens.map((token, index) => <span className={`code-token-${token.type}`} key={`${token.value}-${index}`}>{token.value}</span>)}<span className="code-caret" /></code></pre>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
