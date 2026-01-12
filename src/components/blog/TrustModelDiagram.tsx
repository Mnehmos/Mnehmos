import React, { useState } from 'react';

interface SystemFeature {
  label: string;
  blockchain: string;
  questkeeper: string;
}

const FEATURES: SystemFeature[] = [
  { label: 'Foundation', blockchain: 'Distributed Ledger', questkeeper: 'Shared Database' },
  { label: 'Consensus', blockchain: 'Proof mechanisms', questkeeper: 'Visible state changes' },
  { label: 'Transparency', blockchain: 'All see all transactions', questkeeper: 'All see all state' },
  { label: 'Malicious', blockchain: 'Hidden transactions', questkeeper: 'Hidden context changes' },
  { label: 'Trust Source', blockchain: 'Visibility, not constraint', questkeeper: 'Visibility, not constraint' },
];

export const TrustModelDiagram = () => {
  const [activeRow, setActiveRow] = useState<number | null>(null);

  return (
    <div className="bg-stone-50 dark:bg-stone-900 rounded-3xl p-6 md:p-8 border border-stone-200 dark:border-stone-800 transition-colors">
      {/* Header */}
      <div className="grid grid-cols-3 gap-4 mb-6 text-center">
        <div className="text-stone-500 dark:text-stone-400 text-sm font-medium uppercase tracking-wider">
          Aspect
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="font-bold text-stone-900 dark:text-stone-100">Blockchain</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="w-3 h-3 rounded-full bg-copper"></div>
          <span className="font-bold text-stone-900 dark:text-stone-100">Quest Keeper</span>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-3">
        {FEATURES.map((feature, index) => (
          <div
            key={feature.label}
            className={`grid grid-cols-3 gap-4 p-4 rounded-xl transition-all duration-300 cursor-pointer select-none
              ${activeRow === index
                ? 'bg-white dark:bg-stone-950 shadow-lg scale-[1.02] border border-copper/30'
                : 'hover:bg-white dark:hover:bg-stone-950 hover:shadow-md border border-transparent'}`}
            onMouseEnter={() => setActiveRow(index)}
            onMouseLeave={() => setActiveRow(null)}
            onClick={() => setActiveRow(activeRow === index ? null : index)}
          >
            <div className={`font-semibold text-sm transition-colors ${
              activeRow === index ? 'text-copper' : 'text-stone-700 dark:text-stone-300'
            }`}>
              {feature.label}
            </div>
            <div className={`text-sm text-center transition-all ${
              activeRow === index
                ? 'text-blue-600 dark:text-blue-400 font-medium'
                : 'text-stone-500 dark:text-stone-400'
            }`}>
              {feature.blockchain}
            </div>
            <div className={`text-sm text-center transition-all ${
              activeRow === index
                ? 'text-copper font-medium'
                : 'text-stone-500 dark:text-stone-400'
            }`}>
              {feature.questkeeper}
            </div>
          </div>
        ))}
      </div>

      {/* Connection Line */}
      <div className="relative mt-8 pt-8 border-t border-stone-200 dark:border-stone-700">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-stone-50 dark:bg-stone-900 px-4">
          <span className="text-copper font-bold text-sm">=</span>
        </div>
        <p className="text-center text-stone-600 dark:text-stone-400 font-medium">
          <span className="text-copper">Same architecture.</span> Same principle. Different scale.
        </p>
      </div>

      {/* Insight Box */}
      <div className="mt-6 p-4 bg-copper/10 rounded-xl border border-copper/20">
        <p className="text-center text-sm text-stone-700 dark:text-stone-300">
          <strong className="text-copper">Key Insight:</strong> The database isn't just memory.
          <span className="block mt-1 font-bold text-stone-900 dark:text-stone-100">
            The database is the consensus mechanism.
          </span>
        </p>
      </div>

      {/* Mobile hint */}
      <p className="text-center text-stone-400 dark:text-stone-600 text-xs mt-4 md:hidden italic">
        Tap a row to highlight
      </p>
    </div>
  );
};
