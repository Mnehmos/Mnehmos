import React, { useState } from 'react';

interface Complaint {
  claim: string;
  rebuttal: string;
  icon: string;
}

const COMPLAINTS: Complaint[] = [
  {
    claim: "\"It's not reproducible!\"",
    rebuttal: "Neither was your build process until you wrote a Dockerfile at 2 AM while something was on fire.",
    icon: "🔄"
  },
  {
    claim: "\"You don't understand what the code is doing!\"",
    rebuttal: "*Gestures broadly at node_modules*",
    icon: "📦"
  },
  {
    claim: "\"There's no version control for prompts!\"",
    rebuttal: "There is now. Also, your conversation history IS the changelog.",
    icon: "📜"
  },
  {
    claim: "\"The AI makes mistakes!\"",
    rebuttal: "The AI makes different mistakes than you do. Sometimes that's better. Sometimes it's O(n!) complexity because you didn't specify otherwise. This is called \"learning.\"",
    icon: "🐛"
  },
  {
    claim: "\"Real programmers don't need this!\"",
    rebuttal: "Real programmers also claimed they didn't need garbage collection, IDEs with autocomplete, or Stack Overflow. The definition keeps retreating up the abstraction ladder.",
    icon: "🧗"
  },
  {
    claim: "\"It doesn't even have types!\"",
    rebuttal: "Complains the person who mass-adopted JavaScript in 2012.",
    icon: "🎭"
  },
  {
    claim: "\"Where are the loops?\"",
    rebuttal: "In the inference engine, where they always should have been.",
    icon: "🔁"
  },
  {
    claim: "\"It's not Turing complete!\"",
    rebuttal: "Neither is CSS. Look where that got us.",
    icon: "🎨"
  }
];

export const ComplaintsRebuttals = () => {
  const [revealedIndex, setRevealedIndex] = useState<number | null>(null);
  const [allRevealed, setAllRevealed] = useState(false);

  const handleReveal = (index: number) => {
    if (!allRevealed) {
      setRevealedIndex(revealedIndex === index ? null : index);
    }
  };

  return (
    <div className="my-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
          The Complaints Department
        </h3>
        <button
          onClick={() => setAllRevealed(!allRevealed)}
          className="px-3 py-1 text-xs font-semibold rounded-full bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-copper hover:text-white transition-colors"
        >
          {allRevealed ? 'Hide Rebuttals' : 'Reveal All'}
        </button>
      </div>

      <div className="grid gap-3">
        {COMPLAINTS.map((item, index) => {
          const isRevealed = allRevealed || revealedIndex === index;
          
          return (
            <div
              key={index}
              onClick={() => handleReveal(index)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                isRevealed 
                  ? 'bg-copper/5 border-copper/30 dark:bg-copper/10' 
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-stone-900 dark:text-stone-100">
                    {item.claim}
                  </p>
                  <div className={`overflow-hidden transition-all duration-300 ${
                    isRevealed ? 'max-h-32 opacity-100 mt-2' : 'max-h-0 opacity-0'
                  }`}>
                    <p className="text-sm text-copper font-medium italic">
                      {item.rebuttal}
                    </p>
                  </div>
                </div>
                <span className={`text-stone-400 transition-transform duration-300 ${
                  isRevealed ? 'rotate-180' : ''
                }`}>
                  ▼
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-center text-stone-500 dark:text-stone-400 text-sm">
        All of these complaints are valid. None of them appear to be slowing adoption.
      </p>
    </div>
  );
};
