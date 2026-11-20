import { useCallback, useRef } from "react";
import { useScrollProgress } from "../lib/motion";
import { ABOUT_POINTS, FACTS, STATUS, SUMMARY } from "../data";

// Words of the summary that get the accent treatment while it lights up on scroll.
const HL = new Set(["RAG", "agent", "NLPDF,", "Python,", "LangChain,", "FastAPI,"]);
const SERIF = new Set(["clinical", "chatbot", "LLM-to-action"]);

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
            {SUMMARY.split(" ").map((w, i) => (
              <span key={i} className={`mf-word ${HL.has(w) ? "hl" : SERIF.has(w) ? "serif" : ""}`}>
                {w}{" "}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="about-more">
        <p className="about-status" data-reveal>
          <i className="dot-live" /> {STATUS}
        </p>
        <div className="about-cols">
          <dl className="about-pts">
            {ABOUT_POINTS.map(([k, v]) => (
              <div key={k} data-reveal>
                <dt className="mono">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <dl className="facts">
            {FACTS.map(([k, v]) => (
              <div key={k} data-reveal>
                <dt className="mono">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
