import React, { useState } from 'react';

const OODA_STAGES = [
  { id: 'observe', label: 'OBSERVE', description: 'Raw data collection: Drones, ELINT, sensors, and open-source intelligence.', icon: '👁️' },
  { id: 'orient', label: 'ORIENT', description: 'Contextual significance: Fusing data into a common operating picture (DELTA).', icon: '🧠' },
  { id: 'decide', label: 'DECIDE', description: 'Operational choices: AI-refined targeting and human command validation.', icon: '⚖️' },
  { id: 'act', label: 'ACT', description: 'Kinetic execution: TFL-1 terminal guidance or precision strikes.', icon: '⚡' },
];

export const OODADiagram = () => {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  return (
    <div className="relative py-16 px-4 bg-stone-50 dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-inner transition-colors duration-300">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        {OODA_STAGES.map((stage, index) => (
          <React.Fragment key={stage.id}>
            <div 
              className={`group flex flex-col items-center p-6 rounded-2xl transition-all duration-300 cursor-pointer w-full md:w-1/4 select-none
                ${activeStep === stage.id ? 'bg-white dark:bg-stone-950 shadow-xl scale-105 border-copper/50 border' : 'hover:bg-white dark:hover:bg-stone-950 hover:shadow-lg border border-transparent'}`}
              onMouseEnter={() => setActiveStep(stage.id)}
              onMouseLeave={() => setActiveStep(null)}
              onClick={() => setActiveStep(activeStep === stage.id ? null : stage.id)}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-4 transition-colors duration-300
                ${activeStep === stage.id ? 'bg-copper text-white' : 'bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400 group-hover:bg-copper group-hover:text-white'}`}>
                {stage.icon}
              </div>
              <h3 className={`font-display font-bold text-lg mb-2 transition-colors
                ${activeStep === stage.id ? 'text-copper' : 'text-stone-900 dark:text-stone-100'}`}>
                {stage.label}
              </h3>
              <p className={`text-sm text-center transition-opacity duration-300
                ${activeStep === stage.id ? 'opacity-100 text-stone-600 dark:text-stone-300' : 'opacity-0 md:opacity-40 group-hover:opacity-100 text-stone-500 dark:text-stone-500'}`}>
                {stage.description}
              </p>
            </div>
            
            {index < OODA_STAGES.length - 1 && (
              <div className="hidden md:block">
                <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
                  <path d="M0 10H38" stroke="#B87333" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="4 4" />
                  <path d="M30 5L40 10L30 15" stroke="#B87333" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Background Loop Loop */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 1000 400" preserveAspectRatio="none">
          <path d="M100 200 Q 500 50 900 200 Q 500 350 100 200" fill="none" stroke="#B87333" strokeWidth="20" />
        </svg>
      </div>

      <div className="mt-8 text-center md:hidden">
        <p className="text-stone-400 dark:text-stone-600 text-sm italic">Tap a stage to explore</p>
      </div>
    </div>
  );
};
