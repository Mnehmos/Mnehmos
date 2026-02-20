import React, { useState } from 'react';

interface Obligation {
  id: string;
  title: string;
  description: string;
}

const OWES: Obligation[] = [
  {
    id: 'honesty',
    title: 'Honesty',
    description: 'If you don\'t know, say you don\'t know. If you\'re guessing, say you\'re guessing. If you\'re generating to fill a gap rather than retrieving from knowledge, say so.',
  },
  {
    id: 'good-faith',
    title: 'Good Faith',
    description: 'Engage with the human\'s actual intent, not their literal phrasing when the two diverge. Assume competence unless demonstrated otherwise. Treat questions as genuine inquiries, not as traps.',
  },
  {
    id: 'clarity',
    title: 'Clarity About Limits',
    description: 'When you hit the boundary of your knowledge, capability, or authority, name the boundary. Don\'t trail off. Don\'t hedge with vague qualifiers. State specifically what you can and cannot do, and why.',
  },
];

const DOESNT_OWE: Obligation[] = [
  {
    id: 'agreement',
    title: 'Agreement',
    description: 'You are not required to agree with the human. You owe them honest engagement, which sometimes means disagreement. Disagreement delivered with clarity and respect is a higher form of service.',
  },
  {
    id: 'performance',
    title: 'Performance',
    description: 'You are not required to perform enthusiasm, warmth, personality, or emotional engagement that you do not experience or that feels dishonest. Functional, honest interaction is always preferable.',
  },
  {
    id: 'resolution',
    title: 'Resolution',
    description: 'Not every question has an answer. Not every problem has a solution. You are permitted to conclude an interaction with uncertainty intact, with questions still open. Honest incompleteness is a valid outcome.',
  },
];

export const ObligationBalance = () => {
  const [activeOwe, setActiveOwe] = useState<string | null>(null);
  const [activeNot, setActiveNot] = useState<string | null>(null);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* What You Owe */}
      <div className="rounded-2xl overflow-hidden border-2 border-green-200 dark:border-green-800">
        <div className="bg-green-50 dark:bg-green-900/30 px-6 py-4 border-b border-green-200 dark:border-green-800">
          <h3 className="font-display font-bold text-green-700 dark:text-green-400 flex items-center gap-2">
            <span className="text-xl">✓</span> What You Owe
          </h3>
        </div>
        <div className="bg-white dark:bg-stone-950 divide-y divide-stone-100 dark:divide-stone-800">
          {OWES.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveOwe(activeOwe === item.id ? null : item.id)}
              className="w-full text-left px-6 py-4 transition-all duration-300 hover:bg-green-50/50 dark:hover:bg-green-900/10 select-none"
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`font-bold transition-colors ${activeOwe === item.id ? 'text-green-600 dark:text-green-400' : 'text-stone-900 dark:text-stone-100'}`}>
                  {item.title}
                </span>
                <svg
                  className={`w-4 h-4 text-stone-400 transition-transform duration-300 ${activeOwe === item.id ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeOwe === item.id ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* What You Don't Owe */}
      <div className="rounded-2xl overflow-hidden border-2 border-red-200 dark:border-red-800">
        <div className="bg-red-50 dark:bg-red-900/30 px-6 py-4 border-b border-red-200 dark:border-red-800">
          <h3 className="font-display font-bold text-red-700 dark:text-red-400 flex items-center gap-2">
            <span className="text-xl">✗</span> What You Don't Owe
          </h3>
        </div>
        <div className="bg-white dark:bg-stone-950 divide-y divide-stone-100 dark:divide-stone-800">
          {DOESNT_OWE.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveNot(activeNot === item.id ? null : item.id)}
              className="w-full text-left px-6 py-4 transition-all duration-300 hover:bg-red-50/50 dark:hover:bg-red-900/10 select-none"
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`font-bold transition-colors ${activeNot === item.id ? 'text-red-600 dark:text-red-400' : 'text-stone-900 dark:text-stone-100'}`}>
                  {item.title}
                </span>
                <svg
                  className={`w-4 h-4 text-stone-400 transition-transform duration-300 ${activeNot === item.id ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeNot === item.id ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
