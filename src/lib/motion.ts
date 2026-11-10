import Lenis from "lenis";
import { useEffect, type RefObject } from "react";

let lenis: Lenis | null = null;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function getLenis() {
  return lenis;
}

/** Boots buttery smooth scrolling for the whole page. */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const instance = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    lenis = instance;
    let id = 0;
    const raf = (t: number) => {
      instance.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      instance.destroy();
      lenis = null;
    };
  }, []);
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { duration: 1.6 });
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

/** Velocity of the page scroll in px/frame (positive = down). */
export function scrollVelocity() {
  return lenis ? lenis.velocity : 0;
}

/**
 * Calls `cb` with the element's scroll progress through the viewport:
 * 0 when its top hits the top of the viewport, 1 when its bottom hits the bottom.
 * Mutate the DOM directly inside `cb` — no React re-renders.
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>, cb: (p: number, el: HTMLElement) => void) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? clamp(-r.top / total) : clamp(1 - r.top / window.innerHeight);
      cb(p, el);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, cb]);
}

/** Adds `.in` to every `[data-reveal]` element once it scrolls into view. */
export function useRevealAll() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    const observe = () =>
      document.querySelectorAll("[data-reveal]:not(.in)").forEach((el) => io.observe(el));
    observe();
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
