import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Flow from "./Flow";
import type { FlowDef } from "../data";
import { getLenis } from "../lib/motion";

export interface CaseData {
  eyebrow: string;
  title: string;
  subtitle: string;
  flows: FlowDef[];
  points: string[];
  tags: string[];
}

export default function CaseModal({ data, onClose }: { data: CaseData | null; onClose: () => void }) {
  const closeBtn = useRef<HTMLButtonElement>(null);
  const open = !!data;

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    getLenis()?.stop();
    document.documentElement.classList.add("modal-open");
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("modal-open");
      getLenis()?.start();
      prev?.focus();
    };
  }, [open, onClose]);

  if (!data) return null;
  return createPortal(
    <div className="modal" role="dialog" aria-modal="true" aria-label={`${data.title} details`} onClick={onClose}>
      <div className="modal-panel" data-lenis-prevent onClick={(e) => e.stopPropagation()}>
        <button ref={closeBtn} className="modal-close" onClick={onClose} aria-label="Close" data-cursor="close">
          ✕
        </button>
        <div className="mono muted modal-eyebrow">{data.eyebrow}</div>
        <h3 className="modal-title">{data.title}</h3>
        <div className="modal-sub serif">{data.subtitle}</div>
        <div className="modal-flows">
          {data.flows.map((f) => (
            <Flow key={f.title} flow={f} />
          ))}
        </div>
        <ul className="job-pts modal-pts">
          {data.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <div className="tags">
          {data.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}
