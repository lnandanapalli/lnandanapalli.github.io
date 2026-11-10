import { useCallback, useEffect, useRef, useState } from "react";
import { useScrollProgress } from "../lib/motion";

const MANIFESTO: [string, string?][] = [
  ["I'm"], ["Lokeshwar", "hl"], ["—"], ["an"], ["AI"], ["software"], ["engineer"], ["who"], ["turns"],
  ["natural", "serif"], ["language", "serif"], ["into"], ["things"], ["that"], ["actually"], ["run.", "hl"],
  ["RAG"], ["chatbots"], ["that"], ["put"], ["patient", "serif"], ["safety", "serif"], ["first."],
  ["LLM"], ["pipelines"], ["that"], ["validate"], ["before"], ["they"], ["execute."],
  ["Platforms"], ["locked"], ["down"], ["with"], ["RBAC,"], ["tested"], ["until"], ["they're"], ["boring.", "hl"],
  ["From"], ["Bangalore", "serif"], ["to"], ["Houston.", "serif"],
];

const STATS = [
  { n: 3, suffix: "+", label: "years shipping software" },
  { n: 150, suffix: "+", label: "tests guarding NLPDF" },
  { n: 99, suffix: "%", label: "CRM reliability at Cognizant" },
  { n: 2, suffix: "", label: "continents, one keyboard" },
];

function Counter({ n, suffix }: { n: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let id = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / 1400);
        setV(Math.round(n * (1 - Math.pow(1 - p, 4))));
        if (p < 1) id = requestAnimationFrame(tick);
      };
      id = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(id);
    };
  }, [n]);
  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  );
}

export default function About() {
  const pin = useRef<HTMLDivElement>(null);
  const onProgress = useCallback((p: number, el: HTMLElement) => {
    const words = el.querySelectorAll<HTMLElement>(".mf-word");
    const lit = p * 1.15 * words.length;
    words.forEach((w, i) => {
      const o = Math.max(0, Math.min(1, lit - i));
      w.style.setProperty("--lit", String(o));
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
      <div className="stats">
        {STATS.map((s) => (
          <div key={s.label} className="stat" data-reveal>
            <div className="stat-n">
              <Counter n={s.n} suffix={s.suffix} />
            </div>
            <div className="stat-l mono">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
