import { useCallback, useEffect, useRef, useState } from "react";
import CaseModal, { type CaseData } from "./CaseModal";
import { JOBS, type Job } from "../data";

const toCase = (j: Job): CaseData => ({
  eyebrow: `${j.period} · ${j.place}`,
  title: j.company,
  subtitle: j.role,
  flows: j.flows,
  points: j.points,
  tags: j.stack,
});
import { useScrollProgress } from "../lib/motion";

/**
 * Vertical scroll drives a horizontal track of roles while the section is pinned.
 * On narrow screens it degrades to a plain stacked list.
 */
/** How far the track must travel so its last panel ends fully on screen. */
function travel(t: HTMLElement) {
  const last = t.lastElementChild as HTMLElement | null;
  const end = last ? last.offsetLeft + last.offsetWidth : t.scrollWidth;
  const pad = parseFloat(getComputedStyle(t).paddingLeft) || 0;
  return Math.max(0, end + pad - window.innerWidth);
}

export default function Experience() {
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<CaseData | null>(null);
  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    const p = pin.current;
    const t = track.current;
    if (!p || !t) return;
    const mq = window.matchMedia("(min-width: 900px)");
    const size = () => {
      if (mq.matches) {
        const dist = travel(t);
        p.style.height = `${dist + window.innerHeight}px`;
      } else {
        p.style.height = "";
        t.style.transform = "";
      }
      window.dispatchEvent(new Event("scroll"));
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(t);
    mq.addEventListener("change", size);
    window.addEventListener("resize", size);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", size);
      window.removeEventListener("resize", size);
    };
  }, []);

  const onProgress = useCallback((prog: number) => {
    const t = track.current;
    if (!t || !window.matchMedia("(min-width: 900px)").matches) return;
    const dist = travel(t);
    t.style.transform = `translate3d(${-prog * dist}px,0,0)`;
    if (line.current) line.current.style.transform = `scaleX(${prog})`;
    t.querySelectorAll<HTMLElement>(".job").forEach((card) => {
      const r = card.getBoundingClientRect();
      const c = (r.left + r.width / 2) / window.innerWidth; // 0..1 across the viewport
      const off = Math.max(-1, Math.min(1, (c - 0.5) * 2));
      card.style.setProperty("--off", off.toFixed(3));
    });
  }, []);
  useScrollProgress(pin, onProgress);

  return (
    <section id="experience" className="exp">
      <div className="exp-pin" ref={pin}>
        <div className="exp-sticky">
          <div className="exp-track" ref={track}>
            <div className="exp-intro">
              <div className="section-label mono">
                <span>(02)</span> Experience
              </div>
              <h2 className="display">
                Experience<span className="accent">.</span>
              </h2>
              <p className="mono muted">2022 — present</p>
            </div>
            {JOBS.map((j, i) => (
              <article
                key={j.role + j.period}
                className="job"
                data-cursor="expand"
                role="button"
                tabIndex={0}
                aria-label={`${j.company}, ${j.role}: open details`}
                onClick={() => setActive(toCase(j))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(toCase(j));
                  }
                }}
              >
                <div className="job-top mono">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span>{j.period}</span>
                </div>
                <h3 className="job-co">{j.company}</h3>
                <div className="job-role">
                  <span className="serif">{j.role}</span> <span className="mono muted">/ {j.place}</span>
                </div>
                <ul className="job-pts">
                  {j.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                <div className="tags">
                  {j.stack.map((s) => (
                    <span key={s} className="tag">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="job-num" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </div>
              </article>
            ))}
          </div>
          <div className="exp-line">
            <div ref={line} />
          </div>
        </div>
      </div>
      <CaseModal data={active} onClose={close} />
    </section>
  );
}
