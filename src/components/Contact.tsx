import { EMAIL, LINKS, TELUGU_NAME } from "../data";
import Scramble from "./Scramble";
import Marquee from "./Marquee";
import { scrollToId } from "../lib/motion";

export default function Contact() {
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
        <p className="contact-note" data-reveal>
          Open to software engineering roles: full-stack and backend, junior to mid level, in the US and India.
        </p>
        <div className="contact-row">
          <a className="blob" href={`mailto:${EMAIL}`} data-magnetic="0.4" data-cursor="write">
            <span>
              Send
              <br />
              an email
            </span>
          </a>
          <ul className="links">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
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
        <span>
          © 2026 Lokeshwar Reddy Nandanapalli · <span lang="te">{TELUGU_NAME}</span>
        </span>
        <button onClick={() => scrollToId("hero")} data-magnetic="0.3">
          Back to top ↑
        </button>
      </footer>
    </section>
  );
}
