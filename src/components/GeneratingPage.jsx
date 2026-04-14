import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scroll, Sparkles, BookOpen, Music, PenTool, Sun } from 'lucide-react';

export default function GeneratingPage() {
  const [step, setStep] = useState(0);
  const steps = [
    { icon: Scroll, text: "Unrolling the Ancient Parchment...", color: "#8e2a2a" },
    { icon: PenTool, text: "Dipping the Quill in Golden Ink...", color: "#c5a059" },
    { icon: Sun, text: "Summoning the Spirits of Wisdom...", color: "#e67e22" },
    { icon: Music, text: "Tuning the Cosmic Sitar...", color: "#1a237e" },
    { icon: Sparkles, text: "Weaving the Stardust into Words...", color: "#f1c40f" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % steps.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-12 bg-vintage-paper paper-texture">
      <div className="relative mb-20">
         <div className="mandala-bg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 scale-[2]" />
         <motion.div
           animate={{ 
             rotate: [0, 5, -5, 0],
             scale: [1, 1.1, 1]
           }}
           transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
           className="relative z-10 p-12 heritage-border rounded-full bg-white/5"
         >
           <BookOpen size={120} className="text-heritage-red" />
         </motion.div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="flex flex-col items-center gap-6 z-10"
        >
          <div className="p-6 rounded-full bg-white/50 shadow-inner" style={{ color: steps[step].color }}>
            {React.createElement(steps[step].icon, { size: 40 })}
          </div>
          <h2 className="text-4xl font-bold text-heritage-red tracking-wide drop-shadow-sm font-sahitya uppercase">
            {steps[step].text}
          </h2>
        </motion.div>
      </AnimatePresence>

      <div className="mt-16 w-96 h-2 bg-heritage-red/10 rounded-full overflow-hidden border border-royal-gold/30">
        <motion.div 
          className="h-full bg-heritage-red"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 7, ease: "linear" }}
        />
      </div>
      
      <p className="mt-8 text-royal-gold font-bold italic opacity-60">Preparing your legacy...</p>
    </div>
  );
}
