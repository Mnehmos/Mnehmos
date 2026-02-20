import { useState } from "react";

interface TechItem {
  tech: string;
  militaryStart: string;
  civilianStart: string;
  yearsExclusive: string;
  militaryUse: string;
  civilianUse: string;
  color: string;
}

const items: TechItem[] = [
  {
    tech: "Internet",
    militaryStart: "1966",
    civilianStart: "1990",
    yearsExclusive: "24 years",
    militaryUse: "ARPANET — DARPA-funded packet-switched network for military communication resilience",
    civilianUse: "Decommissioned 1990; became the commercial internet, then the backbone of the global economy",
    color: "#B87333",
  },
  {
    tech: "GPS",
    militaryStart: "1973",
    civilianStart: "2000",
    yearsExclusive: "27 years",
    militaryUse: "Precision targeting, navigation, troop coordination. Deliberately degraded for civilian use (Selective Availability)",
    civilianUse: "President Clinton removed SA in 2000. Now in every smartphone, car, and delivery route",
    color: "#D97706",
  },
  {
    tech: "Semiconductors",
    militaryStart: "1960s",
    civilianStart: "1970s",
    yearsExclusive: "~15 years",
    militaryUse: "DoD procurement was the critical early market for integrated circuits. Military demand drove manufacturing scale",
    civilianUse: "Consumer electronics, personal computers, and eventually the entire digital economy",
    color: "#2563EB",
  },
  {
    tech: "Radar",
    militaryStart: "1935",
    civilianStart: "1950s",
    yearsExclusive: "~20 years",
    militaryUse: "WWII air defense, naval warfare, bombing guidance. The technology that won the Battle of Britain",
    civilianUse: "Air traffic control, weather forecasting, maritime navigation, speed enforcement",
    color: "#059669",
  },
  {
    tech: "Jet Engines",
    militaryStart: "1944",
    civilianStart: "1952",
    yearsExclusive: "~8 years",
    militaryUse: "Me 262 (Germany), Gloster Meteor (UK). Air superiority through speed",
    civilianUse: "de Havilland Comet (1952), Boeing 707 (1958). Transformed global travel and trade",
    color: "#7C3AED",
  },
  {
    tech: "Nuclear Energy",
    militaryStart: "1945",
    civilianStart: "1957",
    yearsExclusive: "12 years",
    militaryUse: "Weapons program, naval propulsion (USS Nautilus, 1954)",
    civilianUse: "Shippingport reactor (1957). Now 10% of global electricity. Renaissance underway for AI data centers",
    color: "#DC2626",
  },
  {
    tech: "AI",
    militaryStart: "2017",
    civilianStart: "???",
    yearsExclusive: "Ongoing",
    militaryUse: "Project Maven (2017), Replicator, CCA, autonomous targeting, drone swarms, battlefield management",
    civilianUse: "Consumer chatbots and productivity tools exist, but the primary demand driver remains defense procurement",
    color: "#F59E0B",
  },
];

export function TechTransferTimeline() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="my-12">
      <h3 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100 mb-2 text-center">
        The Pattern: Military First, Civilian Later
      </h3>
      <p className="text-stone-500 dark:text-stone-400 text-sm text-center mb-8">
        Every transformative civilian technology originated in military spending
      </p>

      <div className="max-w-2xl mx-auto space-y-2">
        {items.map((item, i) => {
          const isSelected = selected === i;
          const isAI = item.tech === "AI";
          return (
            <button
              key={i}
              onClick={() => setSelected(isSelected ? null : i)}
              className={`w-full text-left transition-all duration-300 rounded-xl overflow-hidden border ${
                isSelected
                  ? "border-opacity-50"
                  : "border-stone-200 dark:border-stone-700 hover:border-opacity-40"
              } ${isAI ? "ring-2 ring-amber-500/30" : ""}`}
              style={{
                borderColor: isSelected ? item.color + "80" : undefined,
              }}
            >
              {/* Header row */}
              <div className="flex items-center gap-4 p-4">
                {/* Tech name */}
                <span
                  className="font-display text-base font-bold w-32 shrink-0"
                  style={{ color: item.color }}
                >
                  {item.tech}
                </span>

                {/* Timeline bar */}
                <div className="flex-1 relative">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-mono text-stone-400 w-12 text-right shrink-0">
                      {item.militaryStart}
                    </span>
                    <div className="flex-1 h-3 rounded-full overflow-hidden bg-stone-200 dark:bg-stone-800 relative">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                        style={{
                          backgroundColor: item.color,
                          width: isAI ? "100%" : "70%",
                          opacity: 0.6,
                        }}
                      />
                      {!isAI && (
                        <div
                          className="absolute inset-y-0 right-0 rounded-r-full"
                          style={{
                            backgroundColor: item.color,
                            width: "30%",
                            opacity: 0.25,
                          }}
                        />
                      )}
                    </div>
                    <span
                      className={`text-xs font-mono w-16 shrink-0 ${
                        isAI ? "text-amber-500 font-bold" : "text-stone-400"
                      }`}
                    >
                      {isAI ? "→ ???" : item.civilianStart}
                    </span>
                  </div>
                </div>

                {/* Exclusive years */}
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap ${
                    isAI
                      ? "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                      : "bg-stone-100 dark:bg-stone-800 text-stone-500"
                  }`}
                >
                  {item.yearsExclusive}
                </span>
              </div>

              {/* Expanded detail */}
              {isSelected && (
                <div className="px-4 pb-4 grid sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-stone-100 dark:bg-stone-800/80">
                    <span className="text-xs font-mono font-bold text-stone-400 block mb-1">
                      MILITARY APPLICATION
                    </span>
                    <p className="text-stone-700 dark:text-stone-200 text-xs leading-relaxed">
                      {item.militaryUse}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-stone-100 dark:bg-stone-800/80">
                    <span className="text-xs font-mono font-bold text-stone-400 block mb-1">
                      CIVILIAN ADOPTION
                    </span>
                    <p className="text-stone-700 dark:text-stone-200 text-xs leading-relaxed">
                      {item.civilianUse}
                    </p>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <p className="text-center text-xs text-stone-400 mt-6 font-mono max-w-lg mx-auto">
        CSIS: "A fab costs almost as much as a new aircraft carrier... Silicon
        Valley was built on federal investment."
      </p>
    </div>
  );
}
