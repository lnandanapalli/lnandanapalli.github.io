import { useCallback, useRef } from "react";
import { useScrollProgress } from "../lib/motion";

const MANIFESTO: [string, string?][] = [
  ["I'm"], ["Lokeshwar,", "hl"], ["an"], ["AI"], ["software"], ["engineer"], ["in"], ["Houston."],
  ["I"], ["build"], ["RAG", "serif"], ["chatbots,", "serif"], ["agentic", "serif"], ["workflows", "serif"],
  ["and"], ["secure,"], ["multi-tenant"], ["platforms"], ["with"], ["Python,", "hl"], ["FastAPI,", "hl"],
  ["React", "hl"], ["and"], ["the"], ["cloud."],
];

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
    </section>
  );
}
