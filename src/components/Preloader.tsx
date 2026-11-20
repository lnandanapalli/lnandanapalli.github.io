import { useEffect, useRef, useState } from "react";
import { getLenis, prefersReducedMotion } from "../lib/motion";

const LOG = ["loading fonts", "loading assets", "building scene", "ready"];

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const doneRef = useRef(onDone);

  useEffect(() => {
    doneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const duration = reduced ? 1 : 1900;
    const start = performance.now();
    let id = 0;
    let t1 = 0;
    let t2 = 0;
    getLenis()?.stop();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      // ease-in-out with a little hesitation near the end
      const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      setCount(Math.round(e * 100));
      if (p < 1) id = requestAnimationFrame(tick);
      else {
        t1 = window.setTimeout(() => {
          setLeaving(true);
          doneRef.current();
          getLenis()?.start();
        }, reduced ? 0 : 250);
        t2 = window.setTimeout(() => setGone(true), reduced ? 0 : 1400);
      }
    };
    id = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(id);
      clearTimeout(t1);
      clearTimeout(t2);
      getLenis()?.start();
    };
  }, []);

  if (gone) return null;
  const line = Math.min(LOG.length - 1, Math.floor((count / 100) * LOG.length));

  return (
    <div className={`preloader ${leaving ? "leave" : ""}`} aria-hidden>
      <div className="pre-log">
        {LOG.slice(0, line + 1).map((l, i) => (
          <div key={l} className={i === line ? "cur" : ""}>
            <span>{i === line && count < 100 ? "◌" : "✓"}</span> {l}
          </div>
        ))}
      </div>
      <div className="pre-count">
        {String(count).padStart(3, "0")}
        <sup>%</sup>
      </div>
      <div className="pre-bar" style={{ transform: `scaleX(${count / 100})` }} />
    </div>
  );
}
