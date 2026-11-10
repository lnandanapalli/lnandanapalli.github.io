import { LINKS } from "../data";
import Scramble from "./Scramble";
import Marquee from "./Marquee";
import { scrollToId } from "../lib/motion";

export default function Contact() {
  const linkedin = LINKS.find((l) => l.label === "LinkedIn")!;
  return (
    <section id="contact" className="contact">
      <Marquee items={["Contact", "Contact", "Contact"]} outline />
      <div className="contact-inner">
        <div className="section-label mono">
          <span>(06)</span> Contact
        </div>
        <h2 className="display" data-reveal>
          Get in <em className="serif">touch</em>
        </h2>
        <div className="contact-row">
          <a className="blob" href={linkedin.href} target="_blank" rel="noreferrer" data-magnetic="0.4" data-cursor="open">
            <span>
              Connect
              <br />
              on LinkedIn
            </span>
          </a>
          <ul className="links">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noreferrer">
                  <Scramble text={l.label} className="links-label" />
                  <span className="mono muted">{l.handle}</span>
                  <span className="links-arrow">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <footer className="footer mono">
        <span>© 2026 Lokeshwar Reddy Nandanapalli</span>
        <button onClick={() => scrollToId("hero")} data-magnetic="0.3">
          Back to top ↑
        </button>
      </footer>
    </section>
  );
}
