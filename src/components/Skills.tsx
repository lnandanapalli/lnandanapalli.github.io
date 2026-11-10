import type { PointerEvent } from "react";
import { SKILLS } from "../data";

/** Bento grid with a pointer-tracked spotlight bleeding through the borders. */
export default function Skills() {
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const grid = e.currentTarget;
    grid.querySelectorAll<HTMLElement>(".skill").forEach((c) => {
      const r = c.getBoundingClientRect();
      c.style.setProperty("--mx", `${e.clientX - r.left}px`);
      c.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  };

  return (
    <section id="skills" className="skills">
      <div className="section-label mono">
        <span>(04)</span> Toolbox
      </div>
      <h2 className="display" data-reveal>
        The <em className="serif">stack</em>.
      </h2>
      <div className="skill-grid" onPointerMove={onMove}>
        {SKILLS.map((g, i) => (
          <div key={g.group} className={`skill skill-${i}`} data-reveal style={{ transitionDelay: `${i * 0.06}s` }}>
            <div className="skill-inner">
              <div className="skill-head">
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                <h3>{g.group}</h3>
              </div>
              <ul>
                {g.items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
