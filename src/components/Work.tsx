import { useCallback, useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react";
import CaseModal from "./CaseModal";
import { NLPDF, PROJECTS, type Project } from "../data";
import type { CaseData } from "./CaseModal";
import { prefersReducedMotion } from "../lib/motion";

const DEMOS = [
  {
    cmd: "compress report.pdf then split out pages 1-3",
    ops: [
      { op: "compress", file: "report.pdf" },
      { op: "split", file: "$prev", pages: "1-3" },
    ],
  },
  {
    cmd: "merge all invoices and rotate the last page 90",
    ops: [
      { op: "merge", files: ["inv_01.pdf", "inv_02.pdf", "inv_03.pdf"] },
      { op: "rotate", file: "$prev", pages: "-1", deg: 90 },
    ],
  },
  {
    cmd: "compress every file I uploaded",
    ops: [{ op: "compress", files: ["a.pdf", "b.pdf", "c.pdf", "d.pdf"] }],
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
        <span className="mono">nlpdf · llama 3.1</span>
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

const toCase = (p: Project): CaseData => ({
  eyebrow: `Solo project · ${p.live.replace("https://", "")}`,
  title: p.title,
  subtitle: p.subtitle,
  flows: p.flows,
  points: p.points.map(([k, v]) => `${k}: ${v}`),
  tags: p.stack,
});

/** Lineboard in miniature: drag the line, write above it, the area below stays locked. */
function LineboardDemo() {
  const box = useRef<HTMLDivElement>(null);
  const [split, setSplit] = useState(62);
  const drag = (e: PointerEvent<HTMLDivElement>) => {
    const el = box.current;
    if (!el || !(e.buttons & 1)) return;
    const r = el.getBoundingClientRect();
    setSplit(Math.max(30, Math.min(82, ((e.clientY - r.top) / r.height) * 100)));
  };
  return (
    <div className="lb" ref={box} aria-hidden>
      <div className="lb-write" style={{ height: `${split}%` }}>
        <svg viewBox="0 0 300 120" preserveAspectRatio="xMinYMin meet">
          <path className="lb-ink" d="M14 52c10-26 22-30 26-8s-6 30 4 18 16-30 24-12-4 24 8 10 12-20 22-10 0 20 10 12M120 40c-6 20 0 26 8 8m8 6c4-10 14-10 12 2s-12 10-4-2M172 30v36m-8-20h18M196 58c6-16 18-18 16-2" />
          <path className="lb-ink lb-ink2" d="M14 92h110M140 92c20-12 40 12 60 0s30-8 44 0" />
        </svg>
        <span className="lb-label mono">write here</span>
      </div>
      <div
        className="lb-line"
        style={{ top: `${split}%` }}
        onPointerDown={(e) => e.currentTarget.setPointerCapture(e.pointerId)}
        onPointerMove={drag}
        data-cursor="drag"
      >
        <i />
      </div>
      <div className="lb-palm" style={{ top: `${split}%` }}>
        <span className="mono">locked · rest your palm</span>
      </div>
    </div>
  );
}

function P2PDemo() {
  return (
    <div className="p2p" aria-hidden>
      <div className="p2p-peer mono">peer A</div>
      <div className="p2p-wire">
        <i />
        <i />
        <i />
        <span className="mono">SPAKE2 · encrypted · UDP</span>
      </div>
      <div className="p2p-peer mono">peer B</div>
      <div className="p2p-relay mono">Go relay fallback</div>
    </div>
  );
}

function ProjectCard({ p, onOpen }: { p: Project; onOpen: () => void }) {
  return (
    <article
      className="proj"
      data-reveal
      data-cursor="expand"
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a,button,.lb-line")) return;
        onOpen();
      }}
    >
      <div className="proj-visual">{p.key === "lineboard" ? <LineboardDemo /> : <P2PDemo />}</div>
      <div className="proj-body">
        <div className="mono muted">Solo project</div>
        <h3 className="proj-title">{p.title}</h3>
        <div className="proj-sub serif">{p.subtitle}</div>
        <p className="proj-blurb">{p.blurb}</p>
        <dl className="work-pts proj-pts">
          {p.points.map(([k, v]) => (
            <div key={k}>
              <dt className="mono">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <div className="work-cta">
          <a className="btn btn-solid" href={p.live} target="_blank" rel="noreferrer" data-cursor="visit">
            Live site <span>↗</span>
          </a>
          <a className="btn" href={p.github} target="_blank" rel="noreferrer" data-cursor="code">
            Source <span>↗</span>
          </a>
          <button className="btn" onClick={onOpen} data-cursor="expand">
            How it works <span>+</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const card = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<CaseData | null>(null);
  const close = useCallback(() => setActive(null), []);
  const openNlpdf = () => setActive(toCase(NLPDF));
  const onCardClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a,button")) return;
    openNlpdf();
  };

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
          <span>(03)</span> Projects
        </div>
        <h2 className="giant" data-reveal>
          <span className="outline-text">NL</span>PDF
        </h2>
        <p className="work-sub serif" data-reveal>
          {NLPDF.subtitle}. Solo, from scratch.
        </p>
      </div>

      <div
        className="work-card"
        ref={card}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        onClick={onCardClick}
        data-cursor="expand"
      >
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
              <button className="btn" onClick={openNlpdf} data-cursor="expand" data-magnetic="0.25">
                How it works <span>+</span>
              </button>
            </div>
          </div>
          <Terminal />
        </div>
      </div>
      <div className="more-head">
        <div className="section-label mono">
          <span>+</span> More projects
        </div>
      </div>
      <div className="proj-grid">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.key} p={p} onOpen={() => setActive(toCase(p))} />
        ))}
      </div>
      <CaseModal data={active} onClose={close} />
    </section>
  );
}
