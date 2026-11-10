import { EDUCATION } from "../data";

export default function Education() {
  return (
    <section id="education" className="edu">
      <div className="section-label mono">
        <span>(05)</span> Education
      </div>
      <div className="edu-list">
        {EDUCATION.map((e) => (
          <div key={e.school} className="edu-row" data-reveal data-cursor="🎓">
            <span className="edu-period mono">{e.period}</span>
            <span className="edu-school">{e.school}</span>
            <span className="edu-degree serif">{e.degree}</span>
            <span className="edu-place mono">{e.place}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
