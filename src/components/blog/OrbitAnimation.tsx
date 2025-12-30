import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  z: number; // depth (0-1, 0=background, 1=foreground)
  size: number;
}

export default function OrbitAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [energy, setEnergy] = useState(0); // 0-100
  const mousePos = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });
  const energyDecayRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const BASE_PARTICLE_COUNT = 30;
  const MAX_PARTICLE_COUNT = BASE_PARTICLE_COUNT * 3;
  const CONNECTION_DISTANCE = 20; // % distance threshold for connections

  // Initialize particles
  useEffect(() => {
    const initialParticles: Particle[] = Array.from({ length: BASE_PARTICLE_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      z: Math.random(),
      size: 2 + Math.random() * 3,
    }));
    setParticles(initialParticles);
  }, []);

  // Track mouse movement and calculate energy
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX;
      const newY = e.clientY;
      
      // Calculate velocity (movement speed)
      const dx = newX - lastMousePos.current.x;
      const dy = newY - lastMousePos.current.y;
      const velocity = Math.sqrt(dx * dx + dy * dy);
      
      // Increase energy based on velocity (capped at 100)
      setEnergy(prev => Math.min(100, prev + velocity * 0.5));
      
      mousePos.current = { x: newX, y: newY };
      lastMousePos.current = { x: newX, y: newY };
      
      // Clear existing decay timer
      if (energyDecayRef.current) {
        clearTimeout(energyDecayRef.current);
      }
      
      // Start energy decay after mouse stops moving
      energyDecayRef.current = setTimeout(() => {
        setEnergy(prev => Math.max(0, prev - 1));
      }, 50);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (energyDecayRef.current) {
        clearTimeout(energyDecayRef.current);
      }
    };
  }, []);

  // Energy decay loop
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy(prev => Math.max(0, prev * 0.98)); // Gradual decay
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Update particles based on energy
  useEffect(() => {
    const targetCount = Math.floor(BASE_PARTICLE_COUNT + (energy / 100) * (MAX_PARTICLE_COUNT - BASE_PARTICLE_COUNT));
    
    setParticles(prev => {
      let updated = [...prev];
      
      // Add particles if below target
      while (updated.length < targetCount) {
        updated.push({
          id: Date.now() + Math.random(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          z: Math.random(),
          size: 2 + Math.random() * 3,
        });
      }
      
      // Remove particles if above target
      if (updated.length > targetCount) {
        updated = updated.slice(0, targetCount);
      }
      
      // Update particle positions and velocities
      const speedMultiplier = 1 + (energy / 100) * 2; // 1x to 3x speed
      
      return updated.map(p => {
        let newX = p.x + p.vx * speedMultiplier;
        let newY = p.y + p.vy * speedMultiplier;
        let newVx = p.vx;
        let newVy = p.vy;
        
        // Bounce off edges
        if (newX < 0 || newX > 100) {
          newVx = -p.vx;
          newX = Math.max(0, Math.min(100, newX));
        }
        if (newY < 0 || newY > 100) {
          newVy = -p.vy;
          newY = Math.max(0, Math.min(100, newY));
        }
        
        // Cycle z-depth for fade in/out effect
        let newZ = p.z + (Math.random() - 0.5) * 0.01;
        newZ = Math.max(0, Math.min(1, newZ));
        
        return {
          ...p,
          x: newX,
          y: newY,
          vx: newVx,
          vy: newVy,
          z: newZ,
        };
      });
    });
  }, [energy]);

  // Calculate heat color based on energy
  const getHeatColor = (baseZ: number) => {
    const normalizedEnergy = energy / 100;
    
    if (normalizedEnergy < 0.3) {
      // Low energy: Copper
      return `rgba(184, 115, 51, ${0.3 + baseZ * 0.7})`;
    } else if (normalizedEnergy < 0.6) {
      // Medium energy: Orange
      return `rgba(251, 146, 60, ${0.4 + baseZ * 0.6})`;
    } else if (normalizedEnergy < 0.85) {
      // High energy: Yellow
      return `rgba(250, 204, 21, ${0.5 + baseZ * 0.5})`;
    } else {
      // Max energy: White/Yellow hot
      return `rgba(255, 255, 200, ${0.6 + baseZ * 0.4})`;
    }
  };

  // Calculate particle distance
  const getDistance = (p1: Particle, p2: Particle) => {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Generate connection lines between nearby particles (neural network effect)
  const renderConnections = () => {
    const connections: React.ReactElement[] = [];
    const connectionOpacity = 0.1 + (energy / 100) * 0.3; // Connections intensify with energy
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const distance = getDistance(particles[i], particles[j]);
        
        if (distance < CONNECTION_DISTANCE) {
          // Line opacity based on distance and particle depth
          const opacity = (1 - distance / CONNECTION_DISTANCE) * connectionOpacity * Math.min(particles[i].z, particles[j].z);
          
          connections.push(
            <line
              key={`${particles[i].id}-${particles[j].id}`}
              x1={`${particles[i].x}%`}
              y1={`${particles[i].y}%`}
              x2={`${particles[j].x}%`}
              y2={`${particles[j].y}%`}
              stroke={energy > 60 ? "rgba(250, 204, 21, " + opacity + ")" : "rgba(184, 115, 51, " + opacity + ")"}
              strokeWidth="1"
              opacity={opacity}
            />
          );
        }
      }
    }
    
    return connections;
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Background glow - intensity based on energy */}
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(184, 115, 51, ${0.05 + energy / 1000}) 0%, transparent 70%)`,
        }}
      />

      {/* Neural network connections (SVG overlay) */}
      <svg className="absolute inset-0 w-full h-full">
        {renderConnections()}
      </svg>

      {/* Particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: getHeatColor(particle.z),
              filter: `blur(${(1 - particle.z) * 2}px)`,
              opacity: 0.3 + particle.z * 0.7,
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
