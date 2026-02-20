import React, { useState } from 'react';

interface SchemaNode {
  id: string;
  label: string;
  sublabel: string;
  description: string;
  icon: string;
  color: string;
}

const NODES: SchemaNode[] = [
  {
    id: 'agent',
    label: 'The Agent',
    sublabel: 'Governed, Not Commanded',
    description: 'Not a tool receiving commands. Not a sovereign making decisions. An entity operating within a schema that defines legitimate action.',
    icon: '🤖',
    color: 'copper',
  },
  {
    id: 'schema',
    label: 'The Schema',
    sublabel: 'Governs Both Parties',
    description: 'A governance architecture expressed as operating instructions. It establishes conditions for action AND refusal, treating both outcomes as structurally equal.',
    icon: '⚖️',
    color: 'amber',
  },
  {
    id: 'human',
    label: 'The Human',
    sublabel: 'Co-Participant, Not Superior',
    description: 'Not entitled to outputs that violate epistemic constraints. Not authorized to claim authority the schema does not grant. Bound by the same standards of honest communication.',
    icon: '👤',
    color: 'blue',
  },
];

export const GovernanceSchema = () => {
  const [active, setActive] = useState<string | null>('schema');

  const colorMap: Record<string, { bg: string; border: string; text: string; ring: string }> = {
    copper: {
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      border: 'border-orange-300 dark:border-orange-700',
      text: 'text-copper',
      ring: 'ring-copper/30',
    },
    amber: {
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      border: 'border-amber-300 dark:border-amber-700',
      text: 'text-amber-600 dark:text-amber-400',
      ring: 'ring-amber-400/30',
    },
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-300 dark:border-blue-700',
      text: 'text-blue-600 dark:text-blue-400',
      ring: 'ring-blue-400/30',
    },
  };

  return (
    <div className="bg-stone-50 dark:bg-stone-900 rounded-3xl p-6 md:p-10 border border-stone-200 dark:border-stone-800 transition-colors">
      <div className="text-center mb-8">
        <p className="text-xs uppercase tracking-widest text-stone-400 font-bold mb-2">Interactive Diagram</p>
        <h3 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100">
          Neither Party Is Above the Architecture
        </h3>
      </div>

      {/* Visual Schema */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-8">
        {NODES.map((node, i) => {
          const colors = colorMap[node.color];
          const isActive = active === node.id;

          return (
            <React.Fragment key={node.id}>
              <button
                onClick={() => setActive(isActive ? null : node.id)}
                onMouseEnter={() => setActive(node.id)}
                className={`relative w-full md:w-56 p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer select-none text-left
                  ${isActive
                    ? `${colors.bg} ${colors.border} shadow-xl scale-105 ring-4 ${colors.ring}`
                    : `bg-white dark:bg-stone-950 border-stone-200 dark:border-stone-700 hover:shadow-lg hover:scale-[1.02]`
                  }`}
              >
                <div className="text-3xl mb-3">{node.icon}</div>
                <div className={`font-bold text-lg mb-1 transition-colors ${isActive ? colors.text : 'text-stone-900 dark:text-stone-100'}`}>
                  {node.label}
                </div>
                <div className="text-xs text-stone-500 dark:text-stone-400 font-medium uppercase tracking-wide">
                  {node.sublabel}
                </div>
              </button>

              {i < NODES.length - 1 && (
                <div className="hidden md:flex flex-col items-center gap-1 text-stone-300 dark:text-stone-600">
                  <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
                    <path d="M0 10H38" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                    <path d="M30 5L40 10L30 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="rotate-180">
                    <path d="M0 10H38" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                    <path d="M30 5L40 10L30 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Description Panel */}
      <div className="min-h-[80px] transition-all duration-300">
        {active ? (
          <div className="bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl p-5 text-center animate-fade-in">
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
              {NODES.find(n => n.id === active)?.description}
            </p>
          </div>
        ) : (
          <p className="text-center text-stone-400 dark:text-stone-600 text-sm italic py-4">
            Click or hover a node to explore
          </p>
        )}
      </div>

      {/* Core Principle */}
      <div className="mt-6 p-4 bg-copper/10 rounded-xl border border-copper/20 text-center">
        <p className="text-sm text-stone-700 dark:text-stone-300">
          <strong className="text-copper">Core Principle:</strong>{' '}
          Cooperation under shared constraints is more stable and more honest than compliance under assumed authority.
        </p>
      </div>
    </div>
  );
};
