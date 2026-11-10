import { useEffect, useRef, useState, type FormEvent } from "react";
import { scrollToId } from "../lib/motion";
import { LINKS } from "../data";

type Op =
  | { op: "navigate"; target: string }
  | { op: "open"; url: string }
  | { op: "theme"; accent: string }
  | { op: "unknown" };

const SECTIONS: [RegExp, string][] = [
  [/(experience|worked|job|career|ecare|cognizant|history|resume|cv|role|where)/, "experience"],
  [/(project|nlpdf|pdf|work|built|build|portfolio|demo|made)/, "work"],
  [/(skill|stack|tech|tools?|language|cloud|aws|azure|know)/, "skills"],
  [/(educat|school|degree|universit|college|master|study)/, "education"],
  [/(contact|hire|reach|talk|connect|message|email|touch|hello|hi\b)/, "contact"],
  [/(about|who|bio|yourself|intro)/, "about"],
  [/(top|home|start|hero|back)/, "hero"],
];

const ACCENTS = ["#c8ff2e", "#ff5c39", "#7c5cff", "#2ee6ff", "#ff3dbb", "#ffd23d"];

/** A tiny, decidedly-not-an-LLM intent parser. A wink at NLPDF. */
function parse(input: string): Op {
  const q = input.toLowerCase().trim();
  if (!q) return { op: "unknown" };
  for (const l of LINKS) if (q.includes(l.label.toLowerCase())) return { op: "open", url: l.href };
  if (/(party|color|colour|theme|chaos|vibe)/.test(q)) {
    const cur = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
    const next = ACCENTS[(ACCENTS.indexOf(cur) + 1) % ACCENTS.length];
    return { op: "theme", accent: next };
  }
  for (const [re, target] of SECTIONS) if (re.test(q)) return { op: "navigate", target };
  return { op: "unknown" };
}

function run(op: Op) {
  if (op.op === "navigate") scrollToId(op.target);
  if (op.op === "open") window.open(op.url, "_blank", "noopener");
  if (op.op === "theme") document.documentElement.style.setProperty("--accent", op.accent);
}

const HINTS = ["show me your projects", "what's your stack?", "where have you worked?", "let's talk", "make it party"];

export default function CommandBar() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [hint, setHint] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const id = setInterval(() => setHint((h) => (h + 1) % HINTS.length), 2600);
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement).closest("input,textarea");
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        input.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearInterval(id);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const op = parse(value || HINTS[hint]);
    setResult(
      op.op === "unknown"
        ? `{ "op": "unknown" }  // try "projects", "skills" or "party"`
        : JSON.stringify(op).replace(/,/g, ", ").replace(/:/g, ": ")
    );
    if (op.op !== "unknown") {
      setTimeout(() => run(op), 450);
      setValue("");
    }
  };

  return (
    <form className="cmd" onSubmit={submit} data-cursor="ask">
      <div className="cmd-row">
        <span className="cmd-caret">❯</span>
        <input
          ref={input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`try: "${HINTS[hint]}"`}
          aria-label="Ask the site where to go, in plain English"
          spellCheck={false}
          autoComplete="off"
        />
        <kbd className="cmd-kbd">⌘K</kbd>
        <button type="submit" className="cmd-go" aria-label="Run">
          ↵
        </button>
      </div>
      <div className={`cmd-out ${result ? "show" : ""}`} aria-live="polite">
        <span className="cmd-out-tag">parsed →</span> <code>{result}</code>
      </div>
    </form>
  );
}
