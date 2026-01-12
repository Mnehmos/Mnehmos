import React, { useState } from 'react';

interface LadderRung {
  level: number;
  title: string;
  subtitle: string;
  description: string;
  insight: string;
}

const RUNGS: LadderRung[] = [
  {
    level: 1,
    title: "D&D with AI",
    subtitle: "The Surface View",
    description: "Playing a tabletop RPG where an AI acts as dungeon master. Fun, immersive, collaborative storytelling.",
    insight: "This is what players see."
  },
  {
    level: 2,
    title: "Database as Memory",
    subtitle: "The Technical Layer",
    description: "The AI doesn't remember anything. The database holds all state. Every session, the AI reconstructs context from stored data.",
    insight: "Memory isn't magic—it's engineering."
  },
  {
    level: 3,
    title: "Kernel Simulation",
    subtitle: "The Architecture Pattern",
    description: "The database isn't just storage—it's running a continuous world simulation. Characters have autonomous goals. Time passes. Consequences propagate.",
    insight: "The world doesn't need the AI to exist."
  },
  {
    level: 4,
    title: "Mutual Knowledge",
    subtitle: "The Game Theory View",
    description: "Both human and AI can see the same database state. This shared visibility creates common knowledge—each knows what the other knows.",
    insight: "Transparency enables cooperation."
  },
  {
    level: 5,
    title: "Distributed Consensus",
    subtitle: "The Blockchain Parallel",
    description: "What we've built is a two-party blockchain. The shared database serves as a distributed ledger between human and AI participants.",
    insight: "We accidentally invented economic infrastructure."
  }
];

export const AbstractionLadder = () => {
  const [activeRung, setActiveRung] = useState<number>(0);
  const [expanded, setExpanded] = useState<Set<number>>(new Set([0]));

  const toggleRung = (level: number) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(level)) {
      newExpanded.delete(level);
    } else {
      newExpanded.add(level);
    }
    setExpanded(newExpanded);
    setActiveRung(level);
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Ladder Rail - Left */}
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-stone-300 via-copper to-stone-300 dark:from-stone-700 dark:via-copper dark:to-stone-700 rounded-full" />

      {/* Ladder Rail - Right (hidden on mobile) */}
      <div className="hidden md:block absolute right-8 top-0 bottom-0 w-1 bg-gradient-to-b from-stone-300 via-copper to-stone-300 dark:from-stone-700 dark:via-copper dark:to-stone-700 rounded-full" />

      {/* Rungs */}
      <div className="relative space-y-4 pl-12 md:pl-20 md:pr-20">
        {RUNGS.map((rung, index) => {
          const isActive = activeRung === rung.level;
          const isExpanded = expanded.has(rung.level);
          const isTop = rung.level === 5;

          return (
            <div key={rung.level} className="relative">
              {/* Horizontal Rung Line */}
              <div
                className={`absolute left-[-2rem] md:left-[-3rem] right-0 md:right-[-3rem] top-6 h-0.5 transition-colors duration-300 ${
                  isActive ? 'bg-copper' : 'bg-stone-300 dark:bg-stone-700'
                }`}
              />

              {/* Level Number Badge */}
              <div
                className={`absolute left-[-3rem] md:left-[-4.5rem] top-3 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-copper text-white scale-125'
                    : 'bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                }`}
              >
                {rung.level}
              </div>

              {/* Rung Content Card */}
              <button
                onClick={() => toggleRung(rung.level)}
                className={`w-full text-left p-4 md:p-6 rounded-xl transition-all duration-300 border ${
                  isActive
                    ? 'bg-white dark:bg-stone-950 shadow-lg border-copper/30 scale-[1.02]'
                    : 'bg-stone-50 dark:bg-stone-900 hover:bg-white dark:hover:bg-stone-950 hover:shadow-md border-transparent'
                } ${isTop ? 'ring-2 ring-copper/20' : ''}`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className={`font-bold text-lg transition-colors ${
                      isActive ? 'text-copper' : 'text-stone-900 dark:text-stone-100'
                    }`}>
                      {rung.title}
                    </h3>
                    <p className="text-sm text-stone-500 dark:text-stone-400">
                      {rung.subtitle}
                    </p>
                  </div>
                  <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Expanded Content */}
                <div className={`overflow-hidden transition-all duration-300 ${
                  isExpanded ? 'max-h-48 opacity-100 mt-4' : 'max-h-0 opacity-0'
                }`}>
                  <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-3">
                    {rung.description}
                  </p>
                  <div className="flex items-start gap-2 p-3 bg-copper/10 rounded-lg border border-copper/20">
                    <span className="text-copper font-bold text-sm">→</span>
                    <p className="text-sm font-medium text-stone-700 dark:text-stone-300 italic">
                      {rung.insight}
                    </p>
                  </div>
                </div>
              </button>

              {/* Top Badge for Level 5 */}
              {isTop && (
                <div className="absolute -top-2 right-4 md:right-8 px-2 py-0.5 bg-copper text-white text-xs font-bold rounded-full">
                  KEY INSIGHT
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Caption */}
      <div className="mt-8 text-center">
        <p className="text-stone-500 dark:text-stone-400 text-sm">
          Click each rung to explore the abstraction layers
        </p>
        <p className="text-copper font-semibold mt-2">
          Same system. Five perspectives. One truth.
        </p>
      </div>
    </div>
  );
};
