import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../lib/motion";

interface Props {
  text: string;
  /** smaller second line, rendered in dots right under `text` */
  sub?: string;
  /** set to true to make the particles fly in */
  ready: boolean;
}

const DOT = "#ecebe6";

/**
 * Renders `text` (and an optional `sub` line) as a field of particles that
 * spring into their letter shapes and light up under the pointer, over a
 * dotted "matrix rain" background.
 */
export default function ParticleName({ text, sub, ready }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readyRef = useRef(ready);

  useEffect(() => {
    readyRef.current = ready;
  }, [ready]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = prefersReducedMotion();

    let w = 0;
    let h = 0;
    let n = 0;
    let hx = new Float32Array(0);
    let hy = new Float32Array(0);
    let x = new Float32Array(0);
    let y = new Float32Array(0);
    let vx = new Float32Array(0);
    let vy = new Float32Array(0);
    let sz = new Float32Array(0);
    let tone = new Uint8Array(0);
    let fontSize = 100;

    // matrix rain: one falling trail of dots per column
    let cell = 8;
    let rainDot = 2;
    let cols = 0;
    let rows = 0;
    let rY = new Float32Array(0);
    let rV = new Float32Array(0);
    let rL = new Uint8Array(0);

    const mouse = { x: -9999, y: -9999, active: false };
    let visible = true;
    let id = 0;
    let t = 0;
    let disposed = false;
    let accentColor = "";

    const accent = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#c8ff2e";

    const resetDrop = (c: number, anywhere: boolean) => {
      rL[c] = 6 + Math.floor(Math.random() * 18);
      rY[c] = anywhere ? Math.random() * (rows + rL[c]) : -Math.random() * rows * 0.8;
      rV[c] = 0.12 + Math.random() * 0.32;
    };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const off = document.createElement("canvas");
      off.width = Math.ceil(w);
      off.height = Math.ceil(h);
      const o = off.getContext("2d", { willReadFrequently: true });
      if (!o) return;
      const font = (weight: number, fs: number) => `${weight} ${fs}px Syne, "Arial Black", sans-serif`;
      o.textAlign = "center";
      o.textBaseline = "middle";
      o.fillStyle = "#fff";

      // size the two lines: the name fills the width, the sub line sits close under it
      o.font = font(800, 100);
      const per1 = o.measureText(text).width / 100;
      fontSize = Math.min((w * 0.92) / per1, h * 0.6);
      const mainW = per1 * fontSize;
      let fs2 = 0;
      if (sub) {
        o.font = font(700, 100);
        const per2 = o.measureText(sub).width / 100;
        // on narrow screens the sub line gets relatively bigger so its dots stay legible
        const narrow = w < 700;
        fs2 = Math.min(((narrow ? w * 0.9 : mainW * 0.78) / per2), fontSize * (narrow ? 0.55 : 0.36));
      }
      const capH1 = fontSize * 0.72;
      const capH2 = fs2 * 0.72;
      const spacing = sub ? fontSize * 0.2 : 0;
      const top = (h - (capH1 + spacing + capH2)) / 2;
      const y1 = top + capH1 / 2;
      const y2 = top + capH1 + spacing + capH2 / 2;

      const px: number[] = [];
      const py: number[] = [];
      const ps: number[] = [];
      const sample = (gap: number, dot: number) => {
        const data = o.getImageData(0, 0, off.width, off.height).data;
        for (let yy = 0; yy < off.height; yy += gap) {
          for (let xx = 0; xx < off.width; xx += gap) {
            if (data[(yy * off.width + xx) * 4 + 3] > 140) {
              px.push(xx);
              py.push(yy);
              ps.push(dot);
            }
          }
        }
        o.clearRect(0, 0, off.width, off.height);
      };

      const gap1 = Math.max(3, Math.round(fontSize / 34));
      const dot1 = Math.max(1.4, gap1 * 0.62);
      o.font = font(800, fontSize);
      o.fillText(text, w / 2, y1);
      sample(gap1, dot1);
      if (sub) {
        const gap2 = Math.max(2, Math.round(fs2 / 13));
        o.font = font(700, fs2);
        o.fillText(sub, w / 2, y2);
        sample(gap2, Math.max(1.2, gap2 * 0.66));
      }

      const prevN = n;
      const prevX = x;
      const prevY = y;
      n = px.length;
      hx = Float32Array.from(px);
      hy = Float32Array.from(py);
      sz = Float32Array.from(ps);
      x = new Float32Array(n);
      y = new Float32Array(n);
      vx = new Float32Array(n);
      vy = new Float32Array(n);
      tone = new Uint8Array(n);
      for (let i = 0; i < n; i++) {
        if (i < prevN) {
          x[i] = prevX[i];
          y[i] = prevY[i];
        } else if (reduced) {
          x[i] = hx[i];
          y[i] = hy[i];
        } else {
          // start scattered in a wide ring around the word
          const a = Math.random() * Math.PI * 2;
          const d = Math.max(w, h) * (0.6 + Math.random() * 0.6);
          x[i] = w / 2 + Math.cos(a) * d;
          y[i] = h / 2 + Math.sin(a) * d;
        }
        tone[i] = Math.random() < 0.09 ? 1 : 0;
      }

      cell = gap1 * 2.4;
      rainDot = Math.max(1.2, dot1 * 0.8);
      cols = Math.ceil(w / cell);
      rows = Math.ceil(h / cell);
      rY = new Float32Array(cols);
      rV = new Float32Array(cols);
      rL = new Uint8Array(cols);
      for (let c = 0; c < cols; c++) resetDrop(c, true);
    };

    const step = () => {
      t += 1;
      const go = readyRef.current;
      for (let i = 0; i < n; i++) {
        if (go) {
          // gentle idle drift so the word "breathes"
          const ox = Math.sin(t * 0.012 + hy[i] * 0.03) * 0.6;
          const oy = Math.cos(t * 0.01 + hx[i] * 0.02) * 0.6;
          vx[i] += (hx[i] + ox - x[i]) * 0.045;
          vy[i] += (hy[i] + oy - y[i]) * 0.045;
        }
        vx[i] *= 0.84;
        vy[i] *= 0.84;
        x[i] += vx[i];
        y[i] += vy[i];
      }
      for (let c = 0; c < cols; c++) {
        rY[c] += rV[c];
        if (rY[c] - rL[c] > rows) resetDrop(c, false);
      }
    };

    const drawRain = () => {
      for (let c = 0; c < cols; c++) {
        const head = Math.floor(rY[c]);
        const len = rL[c];
        const cx = c * cell + (cell - rainDot) / 2;
        for (let k = 0; k < len; k++) {
          const r = head - k;
          if (r < 0 || r > rows) continue;
          if (k === 0) {
            ctx.globalAlpha = 0.55;
            ctx.fillStyle = accentColor;
          } else {
            ctx.globalAlpha = 0.22 * (1 - k / len);
            ctx.fillStyle = DOT;
          }
          ctx.fillRect(cx, r * cell, rainDot, rainDot);
        }
      }
      ctx.globalAlpha = 1;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      if (t % 30 === 1 || !accentColor) accentColor = accent();
      if (!reduced) drawRain();
      // particles near the pointer light up in the accent colour
      const R = Math.max(60, fontSize * 0.6);
      const R2 = R * R;
      const lit = (i: number) => {
        if (tone[i]) return true;
        if (!mouse.active) return false;
        const dx = x[i] - mouse.x;
        const dy = y[i] - mouse.y;
        return dx * dx + dy * dy < R2;
      };
      ctx.fillStyle = DOT;
      for (let i = 0; i < n; i++) if (!lit(i)) ctx.fillRect(x[i], y[i], sz[i], sz[i]);
      ctx.fillStyle = accentColor;
      for (let i = 0; i < n; i++) if (lit(i)) ctx.fillRect(x[i], y[i], sz[i], sz[i]);
    };

    const loop = () => {
      if (disposed) return;
      if (visible) {
        step();
        draw();
      }
      id = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.active = mouse.y > -100 && mouse.y < r.height + 100;
    };
    const onLeave = () => (mouse.active = false);
    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        build();
        if (reduced) draw();
      }, 150);
    };

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    document.fonts.ready.then(() => {
      if (disposed) return;
      build();
      if (reduced) draw();
      else id = requestAnimationFrame(loop);
    });

    if (!reduced) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
    }
    window.addEventListener("resize", onResize);
    return () => {
      disposed = true;
      cancelAnimationFrame(id);
      clearTimeout(resizeTimer);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [text, sub]);

  return <canvas ref={canvasRef} className="particle-name" role="img" aria-label={sub ? `${text} ${sub}` : text} />;
}
