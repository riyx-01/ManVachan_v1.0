import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scroll, Book, PenTool, Sparkles, ChevronRight } from 'lucide-react';

const PREMADE_STORIES = [
  { 
    id: 'panchatantra', 
    title: "The Wise Rabbit", 
    desc: "A classic tale of wit winning over brute force.",
    prompt: "A wise rabbit, a mighty lion, a deep well, and a forest in fear." 
  },
  { 
    id: 'tenali', 
    title: "The Golden Mangoes", 
    desc: "Tenali Rama's clever lesson to greedy priests.",
    prompt: "Tenali Rama, a greedy priest, golden mangoes, and a funny lesson."
  },
  { 
    id: 'akbar', 
    title: "Birbal's Cleverness", 
    desc: "How Birbal solved the Emperor's impossible task.",
    prompt: "Emperor Akbar, witty Birbal, the court, and a mysterious puzzle."
  }
];

export default function InputPage({ onGenerate }) {
  const [elements, setElements] = useState('');
  const [selectedPremade, setSelectedPremade] = useState(null);

  const handleStart = (prompt) => {
    onGenerate({ text: prompt || elements, category: 'heritage' });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 w-screen max-w-6xl mx-auto overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full text-center space-y-4 mb-8"
      >
        <h1 className="text-6xl text-royal-gold font-bold mb-2">Heritage Story Weaver</h1>
        <p className="text-xl text-royal-gold/60 italic font-medium">Ancient wisdom meets modern magic</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
        {/* Left: Classic Tales */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Book className="text-royal-gold" />
            <h2 className="text-2xl font-bold text-royal-gold">Classic Tales</h2>
          </div>
          <div className="space-y-4">
            {PREMADE_STORIES.map((story) => (
              <motion.div
                key={story.id}
                whileHover={{ x: 10, backgroundColor: 'rgba(197, 160, 89, 0.1)' }}
                onClick={() => handleStart(story.prompt)}
                className={`aesthetic-card p-6 cursor-pointer transition-all border-l-4 ${
                  selectedPremade === story.id ? 'border-heritage-red bg-heritage-red/5' : 'border-royal-gold'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{story.title}</h3>
                    <p className="text-sm opacity-70 italic">{story.desc}</p>
                  </div>
                  <ChevronRight className="text-royal-gold" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Right: Custom Weaving */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <PenTool className="text-royal-gold" />
            <h2 className="text-2xl font-bold text-royal-gold">Weave Your Own</h2>
          </div>
          <div className="aesthetic-card p-8 h-full flex flex-col justify-between heritage-border paper-texture">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-widest text-heritage-red/60 font-bold">Write on the Scroll</p>
              <textarea
                value={elements}
                onChange={(e) => setElements(e.target.value)}
                placeholder="Once, in a village far away, there lived a shepherd who found a golden feather..."
                className="w-full bg-transparent border-none outline-none text-xl manuscript-text placeholder:text-heritage-red/20 resize-none min-h-[250px]"
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleStart()}
              className="heritage-button w-full flex items-center justify-center gap-3 text-2xl mt-8"
              disabled={!elements.trim()}
            >
              <Scroll size={28} /> Woven Into Gold
            </motion.button>
          </div>
        </section>
      </div>

      {/* Footer Motif */}
      <div className="mt-12 opacity-30">
        <Sparkles size={40} className="text-royal-gold" />
      </div>
    </div>
  );
}
