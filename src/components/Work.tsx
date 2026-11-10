import { useEffect, useRef, useState, type PointerEvent } from "react";
import { NLPDF } from "../data";
import { prefersReducedMotion } from "../lib/motion";

const DEMOS = [
  {
    cmd: "compress report.pdf then split out pages 1-3",
    ops: [
      { op: "compress", file: "report.pdf", level: "high" },
      { op: "split", file: "$prev", pages: "1-3" },
    ],
  },
  {
    cmd: "merge all invoices and rotate the last page 90°",
    ops: [
      { op: "merge", files: ["inv_01.pdf", "inv_02.pdf", "inv_03.pdf"] },
      { op: "rotate", file: "$prev", pages: "-1", deg: 90 },
    ],
  },
  {
    cmd: "turn slides.pdf into images, then zip it",
    ops: [
      { op: "convert", file: "slides.pdf", to: "png" },
      { op: "archive", files: "$prev", format: "zip" },
    ],
  },
];

const STAGES = ["parse", "validate", "execute", "done"];

function Json({ value }: { value: unknown }) {
  // tiny syntax highlighter: odd indices of the split are tokens
  const parts = JSON.stringify(value, null, 2).split(/("(?:[^"\\]|\\.)*"|-?\b\d+\b)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (i % 2 === 0) return <span key={i}>{p}</span>;
        const cls = p.startsWith('"') ? (parts[i + 1]?.startsWith(":") ? "j-key" : "j-str") : "j-num";
        return (
          <span key={i} className={cls}>
            {p}
          </span>
        );
      })}
    </>
  );
}

function Terminal() {
  const box = useRef<HTMLDivElement>(null);
  const [demo, setDemo] = useState(0);
  const [typed, setTyped] = useState("");
  const [stage, setStage] = useState(-1);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const reduced = prefersReducedMotion();
    let timers: number[] = [];
    let running = false;
    const clear = () => {
      timers.forEach(clearTimeout);
      timers = [];
    };
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));

    const play = (d: number) => {
      const cmd = DEMOS[d].cmd;
      setDemo(d);
      setStage(-1);
      setTyped("");
      let t = 300;
      if (reduced) {
        later(() => {
          setTyped(cmd);
          setStage(3);
        }, 0);
      } else {
        for (let i = 1; i <= cmd.length; i++) {
          t += 28 + Math.random() * 40;
          const s = cmd.slice(0, i);
          later(() => setTyped(s), t);
        }
        STAGES.forEach((_, si) => later(() => setStage(si), t + 400 + si * 650));
        t += 400 + STAGES.length * 650;
      }
      later(() => play((d + 1) % DEMOS.length), t + 3200);
    };

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) {
        running = true;
        play(0);
      } else if (!e.isIntersecting && running) {
        running = false;
        clear();
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => {
      io.disconnect();
      clear();
    };
  }, []);

  return (
    <div className="term" ref={box}>
      <div className="term-bar">
        <i />
        <i />
        <i />
        <span className="mono">nlpdf — llama-3.1</span>
      </div>
      <div className="term-body mono">
        <div className="term-line">
          <span className="accent">❯</span> {typed}
          <span className="term-caret" />
        </div>
        <div className={`term-json ${stage >= 0 ? "show" : ""}`}>
          <Json value={{ ops: DEMOS[demo].ops }} />
        </div>
        <div className="pipeline">
          {STAGES.map((s, i) => (
            <div key={s} className={`node ${stage >= i ? "on" : ""} ${stage === i ? "now" : ""}`}>
              <span>{stage > i || (s === "done" && stage === i) ? "✓" : String(i + 1).padStart(2, "0")}</span>
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  const card = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = card.current;
    if (!el || prefersReducedMotion() || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - py) * 6}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * 8}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };
  const onLeave = () => {
    const el = card.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <section id="work" className="work">
      <div className="work-head">
        <div className="section-label mono">
          <span>(03)</span> Selected work
        </div>
        <h2 className="giant" data-reveal>
          <span className="outline-text">NL</span>PDF
        </h2>
        <p className="work-sub serif" data-reveal>
          “Just tell the PDF what to do.”
        </p>
      </div>

      <div className="work-card" ref={card} onPointerMove={onMove} onPointerLeave={onLeave}>
        <div className="work-glare" />
        <div className="work-grid">
          <div className="work-info">
            <p className="work-blurb">{NLPDF.blurb}</p>
            <dl className="work-pts">
              {NLPDF.points.map(([k, v]) => (
                <div key={k} data-reveal>
                  <dt className="mono">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <div className="tags">
              {NLPDF.stack.map((s) => (
                <span key={s} className="tag">
                  {s}
                </span>
              ))}
            </div>
            <div className="work-cta">
              <a className="btn btn-solid" href={NLPDF.live} target="_blank" rel="noreferrer" data-cursor="visit" data-magnetic="0.25">
                Live site <span>↗</span>
              </a>
              <a className="btn" href={NLPDF.github} target="_blank" rel="noreferrer" data-cursor="code" data-magnetic="0.25">
                Source <span>↗</span>
              </a>
            </div>
          </div>
          <Terminal />
        </div>
      </div>
    </section>
  );
}
