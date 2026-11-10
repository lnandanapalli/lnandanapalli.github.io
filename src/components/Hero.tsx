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
  // e.g. "23:25:44 CST" (switches to CDT automatically during daylight saving)
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
    timeZoneName: "short",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return (
    <span className="mono">
      {get("hour")}:{get("minute")}:{get("second")} {get("timeZoneName")}
    </span>
  );
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
        <span className="pill hide-sm">
          <i className="dot-live" /> AI Software Engineer
        </span>
        <span className="hero-loc">
          <span className="mono hide-sm">29.76° N, 95.37° W</span>
          <a
            className="locate mono"
            href="https://www.google.com/maps/search/?api=1&query=Houston%2C%20TX"
            target="_blank"
            rel="noreferrer"
            data-cursor="map"
            aria-label="Show Houston, TX on Google Maps"
          >
            <i aria-hidden /> Locate
          </a>
        </span>
        <HoustonClock />
      </div>

      <div className="hero-stage">
        <ParticleName text="LOKESHWAR" sub="REDDY NANDANAPALLI" ready={ready} />
        <div className="hero-sub">
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
