import { useState } from "react";

const analogies = [
  {
    id: "zero",
    name: "Absolute Zero",
    field: "Thermodynamics",
    value: "0 K",
    color: "#2563EB",
    description:
      "Never reached, only asymptotically approached through decreasing entropy. Yet it structures every law of energy transfer. One does not measure proximity to absolute zero directly — one measures entropy, heat capacity, and energy state.",
    parallel:
      "Perfect consent is never reached, only approached through increasing consent fidelity. One does not measure consent directly — one measures representational fidelity, authority distribution, refusal capacity, and accountability depth.",
  },
  {
    id: "halting",
    name: "Halting Problem",
    field: "Computability",
    value: "Undecidable",
    color: "#7C3AED",
    description:
      "Defined precisely by its impossibility. Without the proof that halting is undecidable, the distinction between computable and non-computable functions would not exist. The impossibility creates the structure.",
    parallel:
      "Without the proof that perfect consent is unreachable, the distinction between legitimate and illegitimate governance would lack structural grounding. The impossibility is the foundation.",
  },
  {
    id: "shannon",
    name: "Shannon Limit",
    field: "Information Theory",
    value: "C = B log₂(1+S/N)",
    color: "#059669",
    description:
      "No channel achieves maximum theoretical capacity. But the limit tells engineers exactly how close they can get, and which strategies are futile. It converts aspiration into engineering.",
    parallel:
      "The consent horizon tells architects exactly which improvements in governance are possible and which are structurally foreclosed. It converts political aspiration into governance engineering.",
  },
  {
    id: "light",
    name: "Speed of Light",
    field: "Physics",
    value: "c",
    color: "#D97706",
    description:
      "Empirically grounded and operationally measurable. Shapes the structure of spacetime itself. But unlike perfect consent, c is a physical constant — measurable, testable, falsifiable.",
    parallel:
      "Early formulations drew this analogy, but it breaks down: there is no experiment that yields '0.73 consent units.' Perfect consent is a regulative invariant, not a physical constant. The analogy is pedagogically useful but structurally imprecise.",
  },
];

export function ConsentLimit() {
  const [active, setActive] = useState<string | null>(null);
  const current = analogies.find((a) => a.id === active);

  return (
    <div className="my-12">
      <h3 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100 mb-2 text-center">
        The Regulative Invariant
      </h3>
      <p className="text-stone-500 dark:text-stone-400 text-sm text-center mb-6">
        Perfect consent as structural limit — click each analogy
      </p>

      {/* Analogy buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {analogies.map((a) => (
          <button
            key={a.id}
            onClick={() => setActive(active === a.id ? null : a.id)}
            className={`px-4 py-3 rounded-xl border transition-all duration-200 text-left ${
              active === a.id
                ? "shadow-lg scale-[1.02]"
                : "hover:scale-[1.01] bg-white dark:bg-stone-900/50"
            }`}
            style={{
              borderColor:
                active === a.id ? a.color + "60" : undefined,
              backgroundColor:
                active === a.id ? a.color + "08" : undefined,
            }}
          >
            <div className="text-xs font-mono text-stone-400 mb-1">
              {a.field}
            </div>
            <div
              className="font-display text-lg font-black"
              style={{ color: a.color }}
            >
              {a.name}
            </div>
            <div className="text-xs font-mono text-stone-500 mt-1">
              {a.value}
            </div>
          </button>
        ))}
      </div>

      {/* Detail panel */}
      {current ? (
        <div
          className="rounded-2xl border p-6 transition-all duration-300"
          style={{
            borderColor: current.color + "30",
            backgroundColor: current.color + "05",
          }}
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <span
                className="text-xs font-mono font-bold uppercase tracking-wider block mb-2"
                style={{ color: current.color }}
              >
                The Limit
              </span>
              <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
                {current.description}
              </p>
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-stone-400 uppercase tracking-wider block mb-2">
                The Parallel
              </span>
              <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
                {current.parallel}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-stone-200 dark:border-stone-700 p-6 bg-stone-50 dark:bg-stone-900/50">
          <p className="text-stone-500 dark:text-stone-400 text-sm italic text-center">
            Every mature engineering discipline possesses a structural limit —
            a boundary that cannot be crossed but whose existence defines
            everything designed within the discipline. Governance lacks such a
            limit. This paper proposes one.
          </p>
        </div>
      )}
    </div>
  );
}
