import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../lib/motion";

interface Props {
  text: string;
  /** set to true to make the particles fly in */
  ready: boolean;
}

/**
 * Renders `text` as a field of a few thousand particles. They spring back to
 * their letter shapes, light up under the pointer.
 */
export default function ParticleName({ text, ready }: Props) {
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
    let tone = new Uint8Array(0);
    let size = 2;
    let fontSize = 100;
    const mouse = { x: -9999, y: -9999, active: false };
    let visible = true;
    let id = 0;
    let t = 0;
    let disposed = false;
    let accentColor = "";

    const accent = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#c8ff2e";

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
      const font = (fs: number) => `800 ${fs}px Syne, "Arial Black", sans-serif`;
      o.font = font(100);
      const per100 = o.measureText(text).width / 100;
      fontSize = Math.min((w * 0.96) / per100, h * 0.82);
      o.fillStyle = "#fff";
      o.font = font(fontSize);
      o.textAlign = "center";
      o.textBaseline = "middle";
      o.fillText(text, w / 2, h / 2);

      const gap = Math.max(3, Math.round(fontSize / 34));
      size = Math.max(1.4, gap * 0.62);
      const data = o.getImageData(0, 0, off.width, off.height).data;
      const px: number[] = [];
      const py: number[] = [];
      for (let yy = 0; yy < off.height; yy += gap) {
        for (let xx = 0; xx < off.width; xx += gap) {
          if (data[(yy * off.width + xx) * 4 + 3] > 140) {
            px.push(xx);
            py.push(yy);
          }
        }
      }
      const prevN = n;
      const prevX = x;
      const prevY = y;
      n = px.length;
      hx = Float32Array.from(px);
      hy = Float32Array.from(py);
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
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      if (t % 30 === 1 || !accentColor) accentColor = accent();
      // particles near the pointer light up in the accent colour instead of moving away
      const R = Math.max(60, fontSize * 0.6);
      const R2 = R * R;
      const lit = (i: number) => {
        if (tone[i]) return true;
        if (!mouse.active) return false;
        const dx = x[i] - mouse.x;
        const dy = y[i] - mouse.y;
        return dx * dx + dy * dy < R2;
      };
      ctx.fillStyle = "#ecebe6";
      for (let i = 0; i < n; i++) if (!lit(i)) ctx.fillRect(x[i], y[i], size, size);
      ctx.fillStyle = accentColor;
      for (let i = 0; i < n; i++) if (lit(i)) ctx.fillRect(x[i], y[i], size, size);
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
  }, [text]);

  return <canvas ref={canvasRef} className="particle-name" role="img" aria-label={text} />;
}
