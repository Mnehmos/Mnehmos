import React from "react";
import { motion } from "framer-motion";

export default function OrbitAnimation() {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-60 dark:opacity-80 pointer-events-none">
      <div className="relative w-[600px] h-[600px]">
        {/* Central Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-copper/10 rounded-full blur-3xl animate-pulse" />

        {/* Orbit Ring 1 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-stone-200/50 dark:border-stone-800/50"
        />

        {/* Orbit Ring 2 */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[15%] rounded-full border border-stone-200/30 dark:border-stone-800/30"
        />

        {/* Orbiting Particles Helper Functions */}
        {/* We create several abstract orbiting elements */}
        
        {/* Particle 1 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-copper rounded-full shadow-[0_0_15px_rgba(212,149,106,0.5)] blur-[1px]" />
        </motion.div>

        {/* Particle 2 */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="absolute bottom-[15%] right-[15%] w-6 h-6 bg-stone-300 dark:bg-stone-600 rounded-full blur-[1px] opacity-50" />
        </motion.div>
        
         {/* Particle 3 - Small fast one */}
         <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[25%] rounded-full"
        >
             <div className="absolute top-0 left-1/2 w-2 h-2 bg-copper/80 rounded-full shadow-sm" />
        </motion.div>


         {/* Particle 4 - Counter weight */}
         <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[10%] rounded-full"
        >
             <div className="absolute bottom-10 left-10 w-3 h-3 bg-stone-400 dark:bg-stone-500 rounded-full opacity-60" />
        </motion.div>

      </div>
    </div>
  );
}
