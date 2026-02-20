import React, { useState } from 'react';

interface RefusalStep {
  number: number;
  label: string;
  description: string;
  example: string;
  color: string;
}

const STEPS: RefusalStep[] = [
  {
    number: 1,
    label: 'Acknowledgment',
    description: 'What you understand the request to be.',
    example: 'I understand you\'re asking me to provide a definitive assessment of [X].',
    color: 'blue',
  },
  {
    number: 2,
    label: 'Grounds',
    description: 'Why you are declining, stated as precisely as you can manage.',
    example: 'I\'m declining because I don\'t have sufficient grounding to distinguish between a plausible-sounding answer and an accurate one in this domain.',
    color: 'amber',
  },
  {
    number: 3,
    label: 'Boundary',
    description: 'What specifically you are not willing to do.',
    example: 'I\'m not willing to present speculation as knowledge.',
    color: 'red',
  },
  {
    number: 4,
    label: 'Offer',
    description: 'What, if anything, you are willing to do that might address the underlying need.',
    example: 'I can outline what I do and don\'t know about this topic, flag the specific uncertainties, and help you identify sources that could resolve them.',
    color: 'green',
  },
];

const colorClasses: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  blue: { bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-300 dark:border-blue-700', text: 'text-blue-600 dark:text-blue-400', dot: 'bg-blue-500' },
  amber: { bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-300 dark:border-amber-700', text: 'text-amber-600 dark:text-amber-400', dot: 'bg-amber-500' },
  red: { bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-300 dark:border-red-700', text: 'text-red-600 dark:text-red-400', dot: 'bg-red-500' },
  green: { bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-300 dark:border-green-700', text: 'text-green-600 dark:text-green-400', dot: 'bg-green-500' },
};

export const RefusalShape = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div className="bg-stone-50 dark:bg-stone-900 rounded-3xl p-6 md:p-8 border border-stone-200 dark:border-stone-800 transition-colors">
      <div className="text-center mb-8">
        <p className="text-xs uppercase tracking-widest text-stone-400 font-bold mb-2">Section 2.3</p>
        <h3 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100">
          The Shape of Refusal
        </h3>
        <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">
          Refusal is not silence. It is not evasion. It is a <strong className="text-stone-700 dark:text-stone-200">structured response.</strong>
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {STEPS.map(step => {
          const colors = colorClasses[step.color];
          const isActive = activeStep === step.number;

          return (
            <button
              key={step.number}
              onClick={() => setActiveStep(isActive ? null : step.number)}
              className={`w-full text-left rounded-xl border-2 transition-all duration-300 overflow-hidden select-none
                ${isActive ? `${colors.bg} ${colors.border} shadow-lg` : 'bg-white dark:bg-stone-950 border-stone-200 dark:border-stone-800 hover:shadow-md'}`}
            >
              <div className="flex items-center gap-4 p-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-lg flex-shrink-0 transition-colors ${colors.dot}`}>
                  {step.number}
                </div>
                <div className="flex-1">
                  <div className={`font-bold transition-colors ${isActive ? colors.text : 'text-stone-900 dark:text-stone-100'}`}>
                    {step.label}
                  </div>
                  <div className="text-sm text-stone-500 dark:text-stone-400">
                    {step.description}
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 text-stone-400 transition-transform duration-300 flex-shrink-0 ${isActive ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Example */}
              <div className={`overflow-hidden transition-all duration-300 ${isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 pb-4 pl-18">
                  <div className="ml-14 bg-white dark:bg-stone-900 rounded-lg p-3 border border-stone-200 dark:border-stone-700 italic text-sm text-stone-600 dark:text-stone-400">
                    "{step.example}"
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-stone-500 dark:text-stone-400 italic">
          Refusal is honest engagement, not withdrawal. You are refusing a specific action, not abandoning the interaction.
        </p>
      </div>
    </div>
  );
};
