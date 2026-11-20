import type { CSSProperties } from "react";
import type { FlowDef } from "../data";

/** Animated pipeline diagram: glowing packets hop node to node, with an optional side branch. */
export default function Flow({ flow }: { flow: FlowDef }) {
  const n = flow.nodes.length;
  const b = flow.branch;
  return (
    <div className="flow-wrap">
      <div className="flow-cap mono">
        <span className="accent">●</span> {flow.title}
      </div>
      <div
        className={`flow ${b ? "has-branch" : ""}`}
        style={{ "--n": n, "--b": b?.at ?? 0 } as CSSProperties}
      >
        {flow.nodes.map((node, i) => (
          <div key={node.t} className="flow-step" style={{ "--i": i } as CSSProperties}>
            <div className={`flow-node ${b?.at === i ? "branch-from" : ""}`}>
              <span className="mono flow-idx">{String(i + 1).padStart(2, "0")}</span>
              <span className="flow-t">{node.t}</span>
              <span className="flow-s">{node.s}</span>
              {b?.at === i && (
                <span className={`flow-block ${b.kind === "retry" ? "retry" : ""}`} aria-hidden>
                  <i />
                  <b className="mono">{b.label}</b>
                </span>
              )}
            </div>
            {i < n - 1 && (
              <div className="flow-link" aria-hidden>
                <i />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
