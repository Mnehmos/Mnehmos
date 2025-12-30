import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function OrbitAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse position state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for "gravity" effect
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Parallax transforms for different layers
  // The further the layer, the less it moves (or vice versa for specific effect)
  const x1 = useTransform(springX, (value) => value * 0.05);
  const y1 = useTransform(springY, (value) => value * 0.05);
  
  const x2 = useTransform(springX, (value) => value * 0.12);
  const y2 = useTransform(springY, (value) => value * 0.12);

  const x3 = useTransform(springX, (value) => value * 0.25);
  const y3 = useTransform(springY, (value) => value * 0.25);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate position relative to center of screen
      const { innerWidth, innerHeight } = window;
      const centerX = innerWidth / 2;
      const centerY = innerHeight / 2;
      
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Background ambient glow - Static or very slow move */}
      <div className="absolute inset-0 bg-stone-50/50 dark:bg-stone-950/50 -z-10" />

      <div className="relative w-[800px] h-[800px] md:w-[1000px] md:h-[1000px]">
        {/* Central Glow - Anchored but subtle pulse */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-copper/5 dark:bg-copper/10 rounded-full blur-[100px] animate-pulse" />

        {/* Orbit Ring 1 - Background - Moves slightly */}
        <motion.div
          style={{ x: x1, y: y1, rotate: 360 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-stone-200/40 dark:border-stone-800/40"
        />

        {/* Orbit Ring 2 - Midground - Moves more */}
        <motion.div
          style={{ x: x2, y: y2, rotate: -360 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[15%] rounded-full border border-stone-200/30 dark:border-stone-800/30"
        />

        {/* Orbiting Particles Helper Functions */}
        
        {/* Particle 1 - Drifts with gravity */}
        <motion.div
          style={{ x: x3, y: y3, rotate: 360 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-3 h-3 bg-copper rounded-full shadow-[0_0_15px_rgba(184,115,51,0.6)] blur-[0.5px]" />
        </motion.div>

        {/* Particle 2 - Counter orbit */}
        <motion.div
          style={{ x: x2, y: y2, rotate: -360 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="absolute bottom-[20%] right-[20%] w-4 h-4 bg-stone-300 dark:bg-stone-700 rounded-full blur-[1px] opacity-60" />
        </motion.div>
        
         {/* Particle 3 - Fast inner */}
         <motion.div
          style={{ x: x3, y: y3, rotate: 360 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[25%] rounded-full"
        >
             <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-copper/80 rounded-full shadow-sm" />
        </motion.div>


         {/* Particle 4 - Counter weight */}
         <motion.div
          style={{ x: x1, y: y1, rotate: -360 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[10%] rounded-full"
        >
             <div className="absolute bottom-10 left-10 w-2 h-2 bg-stone-400 dark:bg-stone-600 rounded-full opacity-40" />
        </motion.div>

      </div>
    </div>
  );
}
