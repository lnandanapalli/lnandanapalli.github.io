import { useCallback, useRef } from "react";
import { useScrollProgress } from "../lib/motion";

const MANIFESTO: [string, string?][] = [
  ["I'm"], ["Lokeshwar,", "hl"], ["an"], ["AI"], ["software"], ["engineer"], ["in"], ["Houston."],
  ["I"], ["build"], ["RAG", "serif"], ["chatbots,", "serif"], ["agentic", "serif"], ["workflows", "serif"],
  ["and"], ["secure,"], ["multi-tenant"], ["platforms"], ["with"], ["Python,", "hl"], ["FastAPI,", "hl"],
  ["React", "hl"], ["and"], ["the"], ["cloud."],
];

const FLOW = [
  { t: "Query", s: "patient message" },
  { t: "Guard model", s: "filters deceptive input" },
  { t: "Retriever", s: "clinic knowledge base" },
  { t: "LLM", s: "grounded generation" },
  { t: "Answer", s: "safe response" },
];

/** Animated diagram of the RAG chatbot request flow: packets travel node to node. */
function Flow() {
  return (
    <div className="flow-wrap" data-reveal>
      <div className="flow-cap mono">
        <span className="accent">●</span> RAG chatbot · request flow
      </div>
      <div className="flow">
        {FLOW.map((n, i) => (
          <div key={n.t} className="flow-step" style={{ ["--i" as string]: i }}>
            <div className={`flow-node ${i === 1 ? "guard" : ""}`}>
              <span className="mono flow-idx">{String(i + 1).padStart(2, "0")}</span>
              <span className="flow-t">{n.t}</span>
              <span className="flow-s">{n.s}</span>
              {i === 1 && (
                <span className="flow-block" aria-hidden>
                  <i />
                  <b className="mono">✕ blocked</b>
                </span>
              )}
            </div>
            {i < FLOW.length - 1 && (
              <div className="flow-link" aria-hidden>
                <i />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  const pin = useRef<HTMLDivElement>(null);
  const onProgress = useCallback((p: number, el: HTMLElement) => {
    const words = el.querySelectorAll<HTMLElement>(".mf-word");
    const lit = p * 1.15 * words.length;
    words.forEach((w, i) => {
      w.style.setProperty("--lit", String(Math.max(0, Math.min(1, lit - i))));
    });
  }, []);
  useScrollProgress(pin, onProgress);

  return (
    <section id="about" className="about">
      <div className="about-pin" ref={pin}>
        <div className="about-sticky">
          <div className="section-label mono">
            <span>(01)</span> About
          </div>
          <p className="manifesto">
            {MANIFESTO.map(([w, kind], i) => (
              <span key={i} className={`mf-word ${kind ?? ""}`}>
                {w}{" "}
              </span>
            ))}
          </p>
        </div>
      </div>
      <Flow />
    </section>
  );
}
