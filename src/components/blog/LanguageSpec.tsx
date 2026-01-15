import React, { useState } from 'react';

interface SpecItem {
  feature: string;
  traditional: string;
  naturalLang: string;
  satirical: string;
}

const SPEC_ITEMS: SpecItem[] = [
  {
    feature: "Syntax",
    traditional: "Strict grammar, keywords, punctuation",
    naturalLang: "\"Make it work\" ≡ \"Please implement the functionality as discussed\"",
    satirical: "Flexible to the point of absurdity"
  },
  {
    feature: "Type System",
    traditional: "Static, dynamic, or gradual typing",
    naturalLang: "Gradual typing via increasingly specific adjectives",
    satirical: "\"a function\" → \"a pure function\" → \"a pure, memoized function that handles edge cases\""
  },
  {
    feature: "Error Handling",
    traditional: "try/catch, Result types, panic",
    naturalLang: "\"That's not what I meant\" and try again",
    satirical: "Compiler errors replaced with vibes"
  },
  {
    feature: "Package Management",
    traditional: "npm, pip, cargo, bundler",
    naturalLang: "Describe what you need; runtime figures it out",
    satirical: "npm left in shambles"
  },
  {
    feature: "Comments",
    traditional: "Inline documentation of code",
    naturalLang: "The entire program IS comments",
    satirical: "Code is inferred from vibes"
  },
  {
    feature: "Debugging",
    traditional: "Breakpoints, stack traces, printf",
    naturalLang: "Copy-paste error message, no comment, usually works",
    satirical: "Andrej Karpathy approved™"
  },
  {
    feature: "Version Control",
    traditional: "git diff, blame, history",
    naturalLang: "\"Make it like it was before but better\"",
    satirical: "Conversation history IS the changelog"
  },
  {
    feature: "Learning Curve",
    traditional: "Weeks to months to years",
    naturalLang: "If you can complain, you can code",
    satirical: "Literacy is your prerequisite"
  }
];

export const LanguageSpec = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [showSatirical, setShowSatirical] = useState(true);

  return (
    <div className="my-12 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
          The Language Specification
        </h3>
        <button
          onClick={() => setShowSatirical(!showSatirical)}
          className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
            showSatirical 
              ? 'bg-copper text-white' 
              : 'bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300'
          }`}
        >
          {showSatirical ? '🎭 Satirical Mode' : '📚 Serious Mode'}
        </button>
      </div>

      <div className="rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-3 bg-stone-100 dark:bg-stone-800 text-xs font-bold uppercase tracking-wide">
          <div className="px-4 py-3 text-stone-600 dark:text-stone-400">Feature</div>
          <div className="px-4 py-3 text-stone-600 dark:text-stone-400 border-l border-stone-200 dark:border-stone-700">Traditional</div>
          <div className="px-4 py-3 text-copper border-l border-stone-200 dark:border-stone-700">Natural Language</div>
        </div>

        {/* Rows */}
        {SPEC_ITEMS.map((item, index) => (
          <div 
            key={item.feature}
            className={`grid grid-cols-3 text-sm transition-colors cursor-pointer ${
              index % 2 === 0 ? 'bg-white dark:bg-stone-900' : 'bg-stone-50 dark:bg-stone-950'
            } hover:bg-copper/5 dark:hover:bg-copper/10`}
            onClick={() => setSelectedFeature(selectedFeature === item.feature ? null : item.feature)}
          >
            <div className="px-4 py-4 font-semibold text-stone-900 dark:text-stone-100">
              {item.feature}
            </div>
            <div className="px-4 py-4 text-stone-600 dark:text-stone-400 border-l border-stone-100 dark:border-stone-800">
              {item.traditional}
            </div>
            <div className="px-4 py-4 border-l border-stone-100 dark:border-stone-800">
              <span className="text-stone-700 dark:text-stone-300">
                {showSatirical ? item.satirical : item.naturalLang}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-stone-500 dark:text-stone-400 text-sm italic">
        "It's like if someone looked at PHP and said 'what if we made the implicit even more implicit'"
        <br />
        <span className="text-xs">— Anonymous programming language theorist (meant as criticism)</span>
      </p>
    </div>
  );
};
