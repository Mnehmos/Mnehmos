import { useState } from "react";

interface DroneCategory {
  id: string;
  name: string;
  icon: string;
  items: { label: string; value: string; detail?: string }[];
}

const categories: DroneCategory[] = [
  {
    id: "scale",
    name: "Industrial Scale",
    icon: "🏭",
    items: [
      { label: "Manufacturers", value: "~500", detail: "Up from 7 before the full-scale invasion. 107 new entities registered in just the first 4 months of 2025." },
      { label: "2024 Production", value: "2.2M UAVs", detail: "More than all NATO countries combined. The U.S. produces roughly 100,000 military drones annually." },
      { label: "2025 Target", value: "4.5M drones", detail: "At a cost of $2.7B. Production rate: 200,000 per month in early 2025." },
      { label: "Budget (2025)", value: "~$23.5B", detail: "775B hryvnias (~$18.5B) for drones + 216B hryvnias (~$5B) supplemental." },
    ],
  },
  {
    id: "ai",
    name: "AI Integration",
    icon: "🧠",
    items: [
      { label: "AI Guidance Module", value: "$50-100", detail: "TFL-1 by The Fourth Law: autonomous target lock in final 400-500m. Increases strike effectiveness 2-4x." },
      { label: "AI-Equipped FPV Cost", value: "$448/unit", detail: "Vyriy's mass-produced AI FPV drones with 70% domestic components and EW resistance." },
      { label: "DELTA Detections", value: "12,000/day", detail: "Avengers AI platform identifies 70% of unique enemy equipment in avg 2.2 seconds." },
      { label: "Machine Vision Firms", value: "100+", detail: "Over 100 companies developing machine vision systems. 10 producing ML-guided drones." },
    ],
  },
  {
    id: "naval",
    name: "Naval Revolution",
    icon: "🌊",
    items: [
      { label: "MAGURA V5 Cost", value: "$250-300K", detail: "Sank missile corvette Ivanovets (first naval drone warship kill in history), landing ship Tsezar Kunikov, patrol ship Sergiy Kotov." },
      { label: "MAGURA V5 → Aerial Kill", value: "R-73 missile", detail: "Dec 2024: first aerial kill by a naval drone — shot down a Russian Mi-8 helicopter." },
      { label: "MAGURA V7", value: "AIM-9 armed", detail: "Reportedly shot down two Russian Su-30 fighters in May 2025." },
      { label: "Sea Baby Range", value: "1,500 km", detail: "Evolved from single-use to reusable multi-purpose. 2,000 kg payload. AI friend-or-foe targeting." },
    ],
  },
  {
    id: "strike",
    name: "Long-Range Strike",
    icon: "🎯",
    items: [
      { label: "UJ-26 Beaver", value: "800-1,000 km", detail: "~$100K per unit. Used in Moscow strikes. 20 kg warhead. Partially crowdfunded." },
      { label: "Peklo ('Hell')", value: "700 km/h", detail: "Jet-powered, 700 km range. 100+ units/month production." },
      { label: "FP-5 Flamingo", value: "1,150 kg warhead", detail: "2.5x a Tomahawk Block V. 900 km/h. Now produced in Denmark as well." },
      { label: "Fiber-Optic FPV", value: "41 km record", detail: "Immune to EW jamming, undetectable by RF sensors. 35+ companies manufacturing by mid-2025." },
    ],
  },
];

export function DroneExplosion() {
  const [activeCategory, setActiveCategory] = useState("scale");
  const current = categories.find((c) => c.id === activeCategory)!;
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  return (
    <div className="my-12">
      <h3 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100 mb-2 text-center">
        Ukraine's Autonomous Warfare Ecosystem
      </h3>
      <p className="text-stone-500 dark:text-stone-400 text-sm text-center mb-6">
        The world's first — built under fire
      </p>

      {/* Category tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setExpandedItem(null);
            }}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
              activeCategory === cat.id
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
            }`}
          >
            <span className="mr-1.5">{cat.icon}</span>
            {cat.name}
          </button>
        ))}
      </div>

      {/* Items grid */}
      <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
        {current.items.map((item, i) => (
          <button
            key={i}
            onClick={() => setExpandedItem(expandedItem === i ? null : i)}
            className={`text-left p-4 rounded-xl border transition-all duration-200 ${
              expandedItem === i
                ? "border-emerald-500/50 bg-emerald-500/5"
                : "border-stone-200 dark:border-stone-700 hover:border-emerald-500/30 bg-white dark:bg-stone-900/50"
            }`}
          >
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-xs font-mono text-stone-400 uppercase tracking-wider">
                {item.label}
              </span>
              <span className="font-display text-lg font-black text-emerald-600 dark:text-emerald-400">
                {item.value}
              </span>
            </div>
            {expandedItem === i && item.detail && (
              <p className="text-stone-600 dark:text-stone-300 text-xs leading-relaxed mt-2 pt-2 border-t border-stone-200 dark:border-stone-700">
                {item.detail}
              </p>
            )}
          </button>
        ))}
      </div>

      {/* Comparison callout */}
      <div className="mt-6 text-center">
        <p className="text-xs text-stone-400 font-mono">
          RAND analyst Michael Bohnert: Ukraine produces "more than all NATO
          countries combined"
        </p>
      </div>
    </div>
  );
}
