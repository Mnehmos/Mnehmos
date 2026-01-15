import React, { useState, useEffect } from 'react';

interface Language {
  name: string;
  startYear: number;
  mainstreamYear: number;
  currentShare: string;
  color: string;
  description: string;
}

const LANGUAGES: Language[] = [
  {
    name: "Python",
    startYear: 1991,
    mainstreamYear: 2018,
    currentShare: "26.14%",
    color: "#3776ab",
    description: "27 years from creation to TIOBE #1"
  },
  {
    name: "JavaScript",
    startYear: 1995,
    mainstreamYear: 2009,
    currentShare: "68%",
    color: "#f7df1e",
    description: "14 years to framework explosion (Node.js)"
  },
  {
    name: "Rust",
    startYear: 2010,
    mainstreamYear: 2025,
    currentShare: "~3%",
    color: "#dea584",
    description: "15 years and counting, #7 TIOBE"
  },
  {
    name: "TypeScript",
    startYear: 2012,
    mainstreamYear: 2020,
    currentShare: "69%",
    color: "#3178c6",
    description: "8 years to overtake JavaScript on GitHub"
  },
  {
    name: "Go",
    startYear: 2009,
    mainstreamYear: 2016,
    currentShare: "~4%",
    color: "#00add8",
    description: "7 years to cloud-native adoption"
  },
  {
    name: "Natural Language*",
    startYear: 2022,
    mainstreamYear: 2024,
    currentShare: "46%**",
    color: "#b45309",
    description: "18 months. 20M+ users. 90% Fortune 100."
  }
];

export const AdoptionTimeline = () => {
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const maxYears = Math.max(...LANGUAGES.map(l => l.mainstreamYear - l.startYear));

  return (
    <div className="my-12 p-6 bg-stone-50 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
      <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-6 text-center">
        Time to Mainstream Adoption
      </h3>
      
      <div className="space-y-4">
        {LANGUAGES.map((lang, index) => {
          const yearsToAdopt = lang.mainstreamYear - lang.startYear;
          const widthPercent = (yearsToAdopt / maxYears) * 100;
          const isNatural = lang.name.includes("Natural");
          
          return (
            <div 
              key={lang.name}
              className="relative"
              onMouseEnter={() => setHoveredLang(lang.name)}
              onMouseLeave={() => setHoveredLang(null)}
            >
              {/* Language Name */}
              <div className="flex items-center justify-between mb-1">
                <span className={`font-semibold text-sm ${
                  isNatural ? 'text-copper' : 'text-stone-700 dark:text-stone-300'
                }`}>
                  {lang.name}
                </span>
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  {yearsToAdopt} years → {lang.currentShare} share
                </span>
              </div>
              
              {/* Bar */}
              <div className="relative h-8 bg-stone-200 dark:bg-stone-800 rounded-lg overflow-hidden">
                <div 
                  className={`absolute left-0 top-0 h-full rounded-lg transition-all duration-1000 ease-out ${
                    isNatural ? 'ring-2 ring-copper ring-offset-2 ring-offset-stone-50 dark:ring-offset-stone-900' : ''
                  }`}
                  style={{ 
                    width: animated ? `${widthPercent}%` : '0%',
                    backgroundColor: lang.color,
                    transitionDelay: `${index * 150}ms`
                  }}
                >
                  {/* Year markers inside bar */}
                  <div className="absolute inset-0 flex items-center px-3">
                    <span className="text-xs font-bold text-white drop-shadow-md">
                      {lang.startYear}
                    </span>
                    <span className="ml-auto text-xs font-bold text-white drop-shadow-md">
                      {lang.mainstreamYear}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Hover tooltip */}
              {hoveredLang === lang.name && (
                <div className="absolute z-10 top-full mt-2 left-0 right-0 p-3 bg-white dark:bg-stone-950 rounded-lg shadow-lg border border-stone-200 dark:border-stone-700 text-sm">
                  <p className="text-stone-600 dark:text-stone-400">{lang.description}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Footnotes */}
      <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-700 text-xs text-stone-500 dark:text-stone-400 space-y-1">
        <p>* "Natural Language" = AI-assisted coding via prompts (Copilot, Claude, ChatGPT, Cursor)</p>
        <p>** 46% of code written by active GitHub Copilot users is AI-generated (GitHub, July 2025)</p>
        <p className="italic">Sources: TIOBE Index, Stack Overflow Survey 2025, GitHub Octoverse 2025</p>
      </div>
    </div>
  );
};
