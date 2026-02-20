import { useState } from "react";

interface Irreducibility {
  id: string;
  number: string;
  name: string;
  shortName: string;
  color: string;
  description: string;
  consequence: string;
  icon: string;
}

const items: Irreducibility[] = [
  {
    id: "lossy",
    number: "5.1",
    name: "The Lossiness of Intent",
    shortName: "Lossy Intent",
    color: "#B87333",
    icon: "📡",
    description:
      "Intent, when communicated from one agent to another or encoded in a representational system, is always compressed. No representation captures the full dimensionality of an agent's intent. This is not a limitation of current technology. It is a property of representation itself.",
    consequence:
      "Every command, every prompt, every request is a lossy encoding. The gap between what was meant and what was transmitted is irreducible. Systems must be designed to operate within this gap, not to pretend it doesn't exist.",
  },
  {
    id: "concurrent",
    number: "5.2",
    name: "The Concurrency of Legitimate Interests",
    shortName: "Concurrent Interests",
    color: "#2563EB",
    icon: "⚖️",
    description:
      "Multiple agents with legitimate but incompatible interests coexist in every non-trivial system. Resolution requires prioritization, sequencing, or compromise — all of which move the system away from perfect consent for at least one party.",
    consequence:
      "There is no arrangement in which all legitimate interests are simultaneously, fully satisfied. Trade-offs are structural, not failures of design. The best a system can do is make these trade-offs transparent and contestable.",
  },
  {
    id: "temporal",
    number: "5.3",
    name: "The Temporal Cost of Validation",
    shortName: "Validation Cost",
    color: "#059669",
    icon: "⏱️",
    description:
      "Validation — the process by which a proposed action is checked against conditions for legitimate execution — takes time. Every check introduces latency between intent and action. Perfect consent requires instantaneous, lossless alignment. Time makes this impossible.",
    consequence:
      "Security and speed are in structural tension. Every validation step increases legitimacy but decreases responsiveness. The architecture must balance these, not eliminate the tension.",
  },
  {
    id: "opacity",
    number: "5.4",
    name: "The Opacity of Self-Knowledge",
    shortName: "Opaque Self-Knowledge",
    color: "#7C3AED",
    icon: "🪞",
    description:
      "Perfect consent requires that every agent know fully what it wants. Neither humans nor any plausible artificial agent satisfy this condition. Self-knowledge is always partial, always evolving, always subject to revision.",
    consequence:
      "An agent cannot give perfect consent to something it doesn't fully understand about itself. This is distinct from lossy intent (which is representational) — this is pre-representational. The agent doesn't know what it wants even before trying to encode it.",
  },
];

export function IrreducibilityExplorer() {
  const [active, setActive] = useState<string | null>(null);
  const current = items.find((i) => i.id === active);

  return (
    <div className="my-12">
      <h3 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100 mb-2 text-center">
        The Four Irreducibilities
      </h3>
      <p className="text-stone-500 dark:text-stone-400 text-sm text-center mb-6">
        Why perfect consent is structurally unreachable — not practically difficult
      </p>

      {/* Four cards */}
      <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto mb-6">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActive(isActive ? null : item.id)}
              className={`text-left p-5 rounded-xl border transition-all duration-200 ${
                isActive
                  ? "scale-[1.02] shadow-lg"
                  : "hover:scale-[1.01] bg-white dark:bg-stone-900/50 border-stone-200 dark:border-stone-700"
              }`}
              style={{
                borderColor: isActive ? item.color + "50" : undefined,
                backgroundColor: isActive ? item.color + "08" : undefined,
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <span
                    className="text-xs font-mono block"
                    style={{ color: item.color }}
                  >
                    §{item.number}
                  </span>
                  <span className="font-display font-bold text-stone-900 dark:text-stone-100 text-sm">
                    {item.shortName}
                  </span>
                </div>
              </div>
              {isActive && (
                <div className="mt-3 space-y-3">
                  <p className="text-stone-600 dark:text-stone-300 text-xs leading-relaxed">
                    {item.description}
                  </p>
                  <div
                    className="p-3 rounded-lg text-xs leading-relaxed"
                    style={{
                      backgroundColor: item.color + "10",
                      color: item.color,
                    }}
                  >
                    <span className="font-bold block mb-1">
                      Consequence:
                    </span>
                    <span className="text-stone-600 dark:text-stone-300">
                      {item.consequence}
                    </span>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Asymptotic note */}
      <div className="text-center max-w-lg mx-auto">
        <p className="text-xs text-stone-400 font-mono leading-relaxed">
          Collectively, the four irreducibilities ensure that the energy cost of
          approaching perfect consent increases asymptotically: each incremental
          improvement requires exponentially more coordination, computation, and
          infrastructure. This is governance's equivalent of the third law of
          thermodynamics.
        </p>
      </div>
    </div>
  );
}
