import React, { useEffect, useState, useRef } from 'react';

interface StatItem {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sublabel: string;
  source: string;
}

const STATS: StatItem[] = [
  { 
    value: 20, 
    suffix: 'M+',
    label: 'Copilot Users', 
    sublabel: 'July 2025 (5M added in 3 months)',
    source: 'Microsoft'
  },
  { 
    value: 46, 
    suffix: '%',
    label: 'Code AI-Generated', 
    sublabel: 'Of all code by active Copilot users',
    source: 'GitHub'
  },
  { 
    value: 90, 
    suffix: '%',
    label: 'Fortune 100', 
    sublabel: 'Have adopted GitHub Copilot',
    source: 'Microsoft'
  },
  { 
    value: 18, 
    suffix: ' mo',
    label: 'To Mainstream', 
    sublabel: 'From GPT-3.5 to Word of the Year',
    source: 'Collins'
  },
  { 
    value: 55, 
    suffix: '%',
    label: 'Faster Coding', 
    sublabel: 'Task completion with Copilot',
    source: 'Accenture'
  },
  { 
    value: 80, 
    suffix: '%',
    label: 'Day-1 Install', 
    sublabel: 'Developers install immediately',
    source: 'GitHub Research'
  },
];

const CountUp = ({ end, prefix = '', suffix = '' }: { end: number; prefix?: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 1500;
          const increment = end / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, hasAnimated]);

  return (
    <div ref={ref}>
      <span>{prefix}{count.toLocaleString()}{suffix}</span>
    </div>
  );
};

export const NaturalLanguageStats = () => {
  return (
    <div className="my-12">
      <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-6 text-center">
        The Numbers Don't Lie <span className="text-stone-400">(But They Do Hurt Feelings)</span>
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {STATS.map((stat, i) => (
          <div 
            key={i} 
            className="p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-copper/40 hover:shadow-lg transition-all group"
          >
            <div className="text-3xl font-display font-bold text-copper mb-1 transition-transform group-hover:scale-105 origin-left">
              <CountUp end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            </div>
            <div className="font-semibold text-stone-900 dark:text-stone-100 text-sm mb-1">
              {stat.label}
            </div>
            <div className="text-xs text-stone-500 dark:text-stone-400 leading-snug mb-2">
              {stat.sublabel}
            </div>
            <div className="text-[10px] text-stone-400 dark:text-stone-500 uppercase tracking-wide">
              Source: {stat.source}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
