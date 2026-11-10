import { prefersReducedMotion } from "./motion";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#ABCDEFXYZ01";

/** Run a decode/scramble animation on a DOM node, ending on `text`. */
export function scrambleInto(el: HTMLElement, text: string, duration = 600) {
  if (prefersReducedMotion()) {
    el.textContent = text;
    return () => {};
  }
  const start = performance.now();
  let id = 0;
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    let out = "";
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === " " || i / text.length < t) out += ch;
      else out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
    }
    el.textContent = out;
    if (t < 1) id = requestAnimationFrame(tick);
  };
  id = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(id);
}
