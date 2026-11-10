import { useEffect, useRef, useState } from "react";
import Scramble from "./Scramble";
import { scrollToId } from "../lib/motion";

const ITEMS = [
  ["about", "About"],
  ["experience", "Experience"],
  ["work", "Work"],
  ["skills", "Skills"],
  ["contact", "Contact"],
] as const;

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["hero", ...ITEMS.map((i) => i[0]), "education"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <div className="progress" ref={bar} />
      <header className="nav">
        <button className="logo" onClick={() => go("hero")} aria-label="Back to top" data-magnetic="0.3">
          <span>L</span>
          <span>R</span>
          <span>N</span>
          <sup>©26</sup>
        </button>
        <nav className="nav-links" aria-label="Sections">
          {ITEMS.map(([id, label], i) => (
            <button key={id} className={active === id ? "active" : ""} onClick={() => go(id)}>
              <span className="nav-idx">0{i + 1}</span>
              <Scramble text={label} />
            </button>
          ))}
        </nav>
        <button
          className={`burger ${open ? "x" : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <i />
          <i />
        </button>
      </header>
      <div className={`menu ${open ? "open" : ""}`} aria-hidden={!open}>
        {ITEMS.map(([id, label], i) => (
          <button key={id} onClick={() => go(id)} style={{ transitionDelay: `${open ? 0.08 * i + 0.15 : 0}s` }} tabIndex={open ? 0 : -1}>
            <span className="nav-idx">0{i + 1}</span>
            {label}
          </button>
        ))}
      </div>
    </>
  );
}
