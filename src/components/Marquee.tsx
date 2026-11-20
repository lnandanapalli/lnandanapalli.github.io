import { useEffect, useRef } from "react";
import { prefersReducedMotion, scrollVelocity } from "../lib/motion";

/** Infinite marquee whose speed and skew react to scroll velocity. */
export default function Marquee({ items, reverse = false, outline = false }: { items: string[]; reverse?: boolean; outline?: boolean }) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const reduced = prefersReducedMotion();
    let x = 0;
    let skew = 0;
    let id = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);
    const loop = () => {
      if (visible) {
        const v = scrollVelocity();
        const half = el.scrollWidth / 2;
        const dir = reverse ? 1 : -1;
        x += dir * ((reduced ? 0.15 : 0.8) + Math.abs(v) * 0.35) * (v < 0 ? -1 : 1);
        if (x <= -half) x += half;
        if (x > 0) x -= half;
        skew += ((reduced ? 0 : Math.max(-12, Math.min(12, v * 0.5))) - skew) * 0.1;
        el.style.transform = `translate3d(${x}px,0,0) skewX(${-skew}deg)`;
      }
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(id);
      io.disconnect();
    };
  }, [reverse]);

  const row = items.map((t, i) => (
    <span key={i} className="mq-item">
      {t}
      <i>✦</i>
    </span>
  ));

  return (
    <div className={`marquee ${outline ? "outline" : ""}`} aria-hidden>
      <div ref={track} className="mq-track">
        {row}
        {row}
      </div>
    </div>
  );
}
