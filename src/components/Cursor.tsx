import { useEffect, useRef } from "react";
import { isFinePointer, lerp } from "../lib/motion";

/**
 * Two-part cursor: a precise dot plus a lagging ring that swells and shows a
 * label over anything with `data-cursor="label"`. Also drives magnetic
 * elements (`data-magnetic`).
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isFinePointer()) return;
    document.documentElement.classList.add("has-cursor");
    const m = { x: innerWidth / 2, y: innerHeight / 2 };
    const r = { x: m.x, y: m.y, s: 1 };
    let target = 1;
    let id = 0;
    let magnet: HTMLElement | null = null;

    const onMove = (e: PointerEvent) => {
      m.x = e.clientX;
      m.y = e.clientY;
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor],a,button,input");
      const text = el?.dataset.cursor ?? "";
      target = el ? (text ? 2.7 : 1.7) : 1;
      if (label.current && label.current.textContent !== text) label.current.textContent = text;
      ring.current?.classList.toggle("is-label", !!text);
      ring.current?.classList.toggle("is-hover", !!el);

      const mag = (e.target as HTMLElement).closest<HTMLElement>("[data-magnetic]");
      if (magnet && magnet !== mag) magnet.style.transform = "";
      magnet = mag;
      if (mag) {
        const b = mag.getBoundingClientRect();
        const dx = e.clientX - (b.left + b.width / 2);
        const dy = e.clientY - (b.top + b.height / 2);
        const k = Number(mag.dataset.magnetic) || 0.35;
        mag.style.transform = `translate(${dx * k}px, ${dy * k}px)`;
      }
    };
    const onDown = () => ring.current?.classList.add("is-down");
    const onUp = () => ring.current?.classList.remove("is-down");
    const onLeave = () => {
      if (dot.current) dot.current.style.opacity = "0";
      if (ring.current) ring.current.style.opacity = "0";
    };
    const onEnter = () => {
      if (dot.current) dot.current.style.opacity = "";
      if (ring.current) ring.current.style.opacity = "";
    };

    const loop = () => {
      r.x = lerp(r.x, m.x, 0.16);
      r.y = lerp(r.y, m.y, 0.16);
      r.s = lerp(r.s, target, 0.14);
      if (dot.current) dot.current.style.transform = `translate3d(${m.x}px, ${m.y}px, 0)`;
      if (ring.current) {
        const size = 34 * r.s;
        ring.current.style.width = ring.current.style.height = `${size}px`;
        ring.current.style.transform = `translate3d(${r.x - size / 2}px, ${r.y - size / 2}px, 0)`;
      }
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);
    return () => {
      cancelAnimationFrame(id);
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden>
        <span ref={label} />
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}
