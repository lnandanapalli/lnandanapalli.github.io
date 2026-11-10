import { useEffect, useRef, useState } from "react";
import ParticleName from "./ParticleName";
import CommandBar from "./CommandBar";
import { ROLES } from "../data";
import { scrambleInto } from "../lib/scramble";

function HoustonClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const time = now.toLocaleTimeString("en-US", {
    timeZone: "America/Chicago",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  return <span className="mono">HTX {time}</span>;
}

function RotatingRole() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let i = 0;
    let cancel = () => {};
    const id = setInterval(() => {
      i = (i + 1) % ROLES.length;
      if (ref.current) {
        cancel();
        cancel = scrambleInto(ref.current, ROLES[i], 700);
      }
    }, 2800);
    return () => {
      clearInterval(id);
      cancel();
    };
  }, []);
  return (
    <span ref={ref} className="role">
      {ROLES[0]}
    </span>
  );
}

export default function Hero({ ready }: { ready: boolean }) {
  return (
    <section id="hero" className={`hero ${ready ? "ready" : ""}`}>
      <div className="hero-meta">
        <span className="pill">
          <i className="dot-live" /> AI Software Engineer
        </span>
        <span className="mono hide-sm">29.76° N, 95.37° W</span>
        <HoustonClock />
      </div>

      <div className="hero-stage">
        <ParticleName text="LOKESHWAR" ready={ready} />
        <div className="hero-sub">
          <span className="serif">Reddy Nandanapalli</span>
          <span className="mono hide-sm">— hover to light it up ↑</span>
        </div>
      </div>

      <div className="hero-bottom">
        <p className="hero-lede">
          I build <RotatingRole />
          <br />
          AI software engineer · Houston, TX
        </p>
        <CommandBar />
      </div>

      <div className="hero-scroll mono" aria-hidden>
        <span>scroll</span>
        <i />
      </div>
    </section>
  );
}
