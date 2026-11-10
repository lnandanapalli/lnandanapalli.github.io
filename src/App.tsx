import { useState } from "react";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Experience from "./components/Experience";
import Work from "./components/Work";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Contact from "./components/Contact";
import { MARQUEE } from "./data";
import { useRevealAll, useSmoothScroll } from "./lib/motion";

export default function App() {
  const [ready, setReady] = useState(false);
  useSmoothScroll();
  useRevealAll();

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <div className="grain" aria-hidden />
      <Nav />
      <main>
        <Hero ready={ready} />
        <div className="mq-band">
          <Marquee items={MARQUEE} />
          <Marquee items={MARQUEE.slice().reverse()} reverse outline />
        </div>
        <About />
        <Experience />
        <Work />
        <Skills />
        <Education />
        <Contact />
      </main>
    </>
  );
}
