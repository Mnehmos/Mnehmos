import React, { useEffect, useState } from 'react';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
}

const STATS: StatItem[] = [
  { value: 2000, suffix: '+', label: 'Enemy Targets', sublabel: 'Processed daily by the DELTA system' },
  { value: 12000, suffix: '', label: 'AI Detections', sublabel: 'Weekly unit identifications by Avengers AI' },
  { value: 4000, suffix: '+', label: 'Daily Objects', sublabel: 'Classified UAV video streams via Vezha' },
  { value: 50, suffix: '$', label: 'Module Cost', sublabel: 'TFL-1 terminal guidance entry point' },
];

const CountUp = ({ end, suffix }: { end: number, suffix: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
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

    return () => clearInterval(timer);
  }, [end]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

export const StatGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
      {STATS.map((stat, i) => (
        <div key={i} className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 shadow-sm hover:shadow-md hover:border-copper/20 transition-all group">
          <div className="text-3xl font-display font-bold text-copper mb-1 transition-transform group-hover:scale-110 origin-left inline-block">
            <CountUp end={stat.value} suffix={stat.suffix} />
          </div>
          <div className="font-bold text-stone-900 dark:text-stone-100 mb-2">{stat.label}</div>
          <div className="text-sm text-stone-500 dark:text-stone-400 line-height-relaxed leading-snug">{stat.sublabel}</div>
        </div>
      ))}
    </div>
  );
};
