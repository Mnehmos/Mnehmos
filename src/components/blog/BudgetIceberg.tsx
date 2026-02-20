import { useState } from "react";

interface Layer {
  id: string;
  label: string;
  amount: string;
  description: string;
  width: string;
  color: string;
  sources: string;
}

const layers: Layer[] = [
  {
    id: "official",
    label: "Official AI/ML Budget Line",
    amount: "$1.8B",
    description:
      "The narrow, publicly reported AI/ML spending line that grew from $874M in FY2022 to $1.8B in FY2024-25. This is what headlines cite.",
    width: "35%",
    color: "#B87333",
    sources: "DefenseScoop, Pentagon budget overviews",
  },
  {
    id: "standalone",
    label: "FY2026 AI & Autonomy Line",
    amount: "$13.4B",
    description:
      "The Pentagon's first-ever standalone AI and autonomy budget: UAVs ($9.4B), maritime autonomous systems ($1.7B), underwater ($734M), ground vehicles ($210M), AI tech ($200M), legacy replacement ($150M), software integration ($1.2B).",
    width: "55%",
    color: "#D97706",
    sources: "MeriTalk FY2026 Pentagon budget analysis",
  },
  {
    id: "comprehensive",
    label: "All Programs Incorporating AI",
    amount: "$25.2B",
    description:
      "Independent analysis of all FY2025 programs incorporating AI and autonomous systems — roughly 3% of the entire DoD budget. Tripled from ~$7B in 2019. Fourth Estate alone accounts for $9.9B.",
    width: "75%",
    color: "#DC2626",
    sources: "Defense analyst Maggie Gray, March 2025",
  },
  {
    id: "classified",
    label: "Classified Programs",
    amount: "$???",
    description:
      "The GAO noted the DoD's AI inventory 'excludes classified activities.' In FY2025, Congress pressed for answers about $60B in classified defense spending. The Pentagon maintains 685+ unclassified AI projects — the classified number is unknown.",
    width: "95%",
    color: "#57534e",
    sources: "GAO 2022, Congressional reconciliation",
  },
];

export function BudgetIceberg() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="my-12">
      <h3 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100 mb-2 text-center">
        Pentagon AI Spending: What the Headlines Hide
      </h3>
      <p className="text-stone-500 dark:text-stone-400 text-sm text-center mb-8">
        Click each layer to see what it includes
      </p>

      {/* Waterline indicator */}
      <div className="relative max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-3 px-4">
          <div className="h-px flex-1 bg-blue-400/30"></div>
          <span className="text-xs font-mono text-blue-400/70 whitespace-nowrap">
            ▼ what gets reported ▼
          </span>
          <div className="h-px flex-1 bg-blue-400/30"></div>
        </div>

        <div className="space-y-3">
          {layers.map((layer, i) => {
            const isExpanded = expanded === layer.id;
            return (
              <div key={layer.id} className="flex flex-col items-center">
                {/* Bar */}
                <button
                  onClick={() =>
                    setExpanded(isExpanded ? null : layer.id)
                  }
                  className="relative group transition-all duration-300 rounded-xl overflow-hidden"
                  style={{
                    width: layer.width,
                    minHeight: isExpanded ? "auto" : "52px",
                  }}
                >
                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      backgroundColor: layer.color,
                      opacity: isExpanded ? 0.2 : 0.12,
                    }}
                  />
                  <div
                    className="absolute inset-0 border-2 rounded-xl transition-all duration-300"
                    style={{
                      borderColor: isExpanded
                        ? layer.color
                        : layer.color + "40",
                    }}
                  />
                  <div className="relative p-3 flex items-center justify-between">
                    <span
                      className="text-sm font-bold"
                      style={{ color: layer.color }}
                    >
                      {layer.label}
                    </span>
                    <span className="font-display text-xl font-black text-stone-900 dark:text-stone-100">
                      {layer.amount}
                    </span>
                  </div>

                  {isExpanded && (
                    <div className="relative px-4 pb-4 text-left">
                      <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed mb-2">
                        {layer.description}
                      </p>
                      <p className="text-xs text-stone-400 font-mono">
                        Source: {layer.sources}
                      </p>
                    </div>
                  )}
                </button>

                {/* Below-waterline indicator after first layer */}
                {i === 0 && (
                  <div className="flex items-center gap-3 my-3 w-full px-4">
                    <div className="h-px flex-1 bg-stone-300 dark:bg-stone-700"></div>
                    <span className="text-xs font-mono text-stone-400 whitespace-nowrap">
                      ▼ what's below the surface ▼
                    </span>
                    <div className="h-px flex-1 bg-stone-300 dark:bg-stone-700"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom label */}
        <p className="text-center text-xs text-stone-400 mt-6 font-mono">
          Gregory Allen (CSIS): The $1.8B figure "should perhaps be growing
          faster" — the real total is multiples of the official figure.
        </p>
      </div>
    </div>
  );
}
