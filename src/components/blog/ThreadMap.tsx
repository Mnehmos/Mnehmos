import { useState } from "react";

interface Thread {
  id: number;
  label: string;
  short: string;
  color: string;
  description: string;
  keyFigure: string;
}

const threads: Thread[] = [
  {
    id: 1,
    label: "Pentagon AI",
    short: "T1",
    color: "#B87333",
    description: "The DoD's real AI spend is $25.2B — 14x the official figure. Project Maven, Replicator, and the $28.5B autonomous wingman program signal procurement, not speculation.",
    keyFigure: "$25.2B",
  },
  {
    id: 2,
    label: "Energy",
    short: "T2",
    color: "#D97706",
    description: "Data centers will consume 426 TWh by 2030 — more than all U.S. energy-intensive manufacturing. The nuclear renaissance, gas buildout, and DOE/DOD co-location are the response.",
    keyFigure: "426 TWh",
  },
  {
    id: 3,
    label: "Cooling",
    short: "T3",
    color: "#2563EB",
    description: "AI racks hit 120-132 kW — air physics breaks above 30 kW. Liquid cooling is 3,000x more efficient. Most existing data centers can't run current NVIDIA hardware at spec.",
    keyFigure: "132 kW/rack",
  },
  {
    id: 4,
    label: "Ukraine",
    short: "T4",
    color: "#059669",
    description: "500 drone manufacturers producing millions of units annually. AI-guided FPV drones with $50 modules. Naval drones sinking warships. The world's first autonomous warfare ecosystem.",
    keyFigure: "500 mfrs",
  },
  {
    id: 5,
    label: "Power Shift",
    short: "T5",
    color: "#7C3AED",
    description: "AI investment maps onto post-WWII power structures. Aging demographics make AI existential for G7 nations. The E7 will double the G7 by 2050 regardless.",
    keyFigure: "E7 > 2×G7",
  },
  {
    id: 6,
    label: "The People",
    short: "T6",
    color: "#DC2626",
    description: "Milley: '25-33% of the U.S. military will be robotic.' Luckey, Karp, Tseng — defense tech founders are the new power brokers. Defense VC hit $28B+ by September 2025.",
    keyFigure: "$28B+ VC",
  },
];

const connections: [number, number][] = [
  [1, 2], [1, 4], [1, 6],
  [2, 3], [2, 5],
  [3, 5],
  [4, 5], [4, 6],
  [5, 6],
];

export function ThreadMap() {
  const [active, setActive] = useState<number | null>(null);

  const getConnected = (id: number) =>
    connections
      .filter(([a, b]) => a === id || b === id)
      .map(([a, b]) => (a === id ? b : a));

  // Hexagonal layout positions (relative to a 400x340 viewbox)
  const positions: Record<number, [number, number]> = {
    1: [130, 50],
    2: [270, 50],
    3: [340, 170],
    4: [270, 290],
    5: [130, 290],
    6: [60, 170],
  };

  const connectedIds = active ? getConnected(active) : [];

  return (
    <div className="my-12">
      <h3 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100 mb-2 text-center">
        Six Threads, One Thesis
      </h3>
      <p className="text-stone-500 dark:text-stone-400 text-sm text-center mb-6">
        Click a thread to explore connections
      </p>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* SVG Map */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <svg viewBox="0 0 400 340" className="w-full max-w-md">
            {/* Connection lines */}
            {connections.map(([a, b]) => {
              const [x1, y1] = positions[a];
              const [x2, y2] = positions[b];
              const isHighlighted =
                active !== null && (a === active || b === active);
              const isDimmed = active !== null && !isHighlighted;
              return (
                <line
                  key={`${a}-${b}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isHighlighted ? threads[active! - 1].color : "#78716c"}
                  strokeWidth={isHighlighted ? 2.5 : 1}
                  strokeOpacity={isDimmed ? 0.15 : isHighlighted ? 0.8 : 0.3}
                  strokeDasharray={isHighlighted ? "none" : "4 4"}
                  style={{ transition: "all 0.3s ease" }}
                />
              );
            })}

            {/* Thread nodes */}
            {threads.map((t) => {
              const [cx, cy] = positions[t.id];
              const isActive = active === t.id;
              const isConnected = connectedIds.includes(t.id);
              const isDimmed = active !== null && !isActive && !isConnected;
              return (
                <g
                  key={t.id}
                  onClick={() => setActive(isActive ? null : t.id)}
                  style={{ cursor: "pointer" }}
                >
                  {/* Glow ring */}
                  {isActive && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={34}
                      fill="none"
                      stroke={t.color}
                      strokeWidth={2}
                      strokeOpacity={0.4}
                    />
                  )}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={28}
                    fill={isActive ? t.color : isDimmed ? "#44403c" : "#292524"}
                    fillOpacity={isDimmed ? 0.5 : 1}
                    stroke={isActive ? t.color : isConnected ? t.color : "#57534e"}
                    strokeWidth={isActive ? 2.5 : isConnected ? 2 : 1}
                    style={{ transition: "all 0.3s ease" }}
                  />
                  <text
                    x={cx}
                    y={cy + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isActive || !isDimmed ? "#fff" : "#a8a29e"}
                    fontSize={12}
                    fontWeight={700}
                    fontFamily="monospace"
                    style={{ transition: "fill 0.3s ease" }}
                  >
                    {t.short}
                  </text>
                  {/* Label below */}
                  <text
                    x={cx}
                    y={cy + 44}
                    textAnchor="middle"
                    fill={isDimmed ? "#78716c" : "#d6d3d1"}
                    fontSize={10}
                    fontWeight={600}
                    style={{ transition: "fill 0.3s ease" }}
                  >
                    {t.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Detail panel */}
        <div className="w-full lg:w-1/2">
          {active ? (
            <div
              className="p-6 rounded-2xl border transition-all duration-300"
              style={{
                borderColor: threads[active - 1].color + "40",
                backgroundColor: threads[active - 1].color + "08",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-xs font-mono font-bold px-2 py-1 rounded"
                  style={{
                    backgroundColor: threads[active - 1].color + "20",
                    color: threads[active - 1].color,
                  }}
                >
                  Thread {active}
                </span>
                <span className="font-display text-lg font-bold text-stone-900 dark:text-stone-100">
                  {threads[active - 1].label}
                </span>
              </div>
              <div
                className="text-3xl font-display font-black mb-3"
                style={{ color: threads[active - 1].color }}
              >
                {threads[active - 1].keyFigure}
              </div>
              <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
                {threads[active - 1].description}
              </p>
              {connectedIds.length > 0 && (
                <div className="mt-4 pt-3 border-t border-stone-200 dark:border-stone-700">
                  <span className="text-xs text-stone-400 font-mono">
                    Connected to:{" "}
                    {connectedIds
                      .map((id) => threads[id - 1].label)
                      .join(" · ")}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/50">
              <p className="text-stone-500 dark:text-stone-400 text-sm italic">
                The AI demand signal is not consumer hype. It's a $2.7 trillion
                global military expenditure base — accelerating, not
                decelerating. Click any thread to trace the evidence.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
