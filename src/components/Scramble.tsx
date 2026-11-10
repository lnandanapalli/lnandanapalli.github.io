import { useCallback, useEffect, useRef, type ElementType } from "react";
import { scrambleInto } from "../lib/scramble";

interface Props {
  text: string;
  as?: ElementType;
  className?: string;
  /** scramble when the pointer enters the closest hover target */
  onHover?: boolean;
  /** scramble once when it first enters the viewport */
  onView?: boolean;
  duration?: number;
}

export default function Scramble({ text, as: Tag = "span", className, onHover = true, onView = false, duration }: Props) {
  const ref = useRef<HTMLElement>(null);
  const cancel = useRef<() => void>(() => {});

  const run = useCallback(() => {
    if (!ref.current) return;
    cancel.current();
    cancel.current = scrambleInto(ref.current, text, duration);
  }, [text, duration]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.textContent = text;
    const host = (el.closest("a,button,[data-scramble-host]") as HTMLElement) || el;
    if (onHover) host.addEventListener("pointerenter", run);
    let io: IntersectionObserver | undefined;
    if (onView) {
      io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          run();
          io?.disconnect();
        }
      });
      io.observe(el);
    }
    return () => {
      host.removeEventListener("pointerenter", run);
      io?.disconnect();
      cancel.current();
    };
  }, [text, onHover, onView, run]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text}
    </Tag>
  );
}
