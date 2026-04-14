import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Book, Home, Telescope, Settings, Heart, Send, Volume2, VolumeX, Moon, Sun } from 'lucide-react';

// --- SEMANTIC STORY ENGINE (Elite Optimized) ---
const buildAdventure = (seed) => {
  const hero = seed.charAt(0).toUpperCase() + seed.slice(1);
  return {
    title: `The Great Journey of ${hero}`,
    scenes: [
      {
        text: `In a world made of soft colors and gentle winds, ${hero} lived a very happy life. But ${hero} always had a curious heart, wondering what lay beyond the Great Sparkling River. One morning, with a bag full of courage, the journey began.`,
        image: `https://loremflickr.com/800/800/${seed},nature`
      },
      {
        text: `As ${hero} walked through the Whispering Woods, a small problem appeared: a bridge made of rainbows had lost its colors! ${hero} knew that only a truly brave heart could help the rainbow shine again.`,
        image: `https://loremflickr.com/800/800/${seed},forest`
      },
      {
        text: `By sharing a story and a warm smile, ${hero} helped the bridge glow once more. Crossing over, ${hero} found a field of golden sunflowers. The world felt bigger and more beautiful than ever.`,
        image: `https://loremflickr.com/800/800/${seed},garden`
      },
      {
        text: `Returning home at sunset, ${hero} realized that the greatest adventure was the kindness shared along the way. The village gathered around to hear the tales of the brave traveler.`,
        image: `https://loremflickr.com/800/800/${seed},village`
      }
    ],
    moral: `True bravery is found in kindness, and the best adventures are those we share.`
  };
};

export default function App() {
  const [view, setView] = useState('home');
  const [inputTerm, setInputTerm] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeStory, setActiveStory] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    document.body.className = isDarkMode ? 'night-mode' : 'day-mode';
  }, [isDarkMode]);

  const startTelling = () => {
    if (!inputTerm.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setActiveStory(buildAdventure(inputTerm));
      setIsGenerating(false);
      setView('read');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 4000);
  };

  return (
    <div className="min-h-screen">
      <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" loop />
      
      {/* --- HYBRID BACKGROUND ELEMENTS --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="star-hybrid" style={{ 
            width: Math.random() * 4 + 2 + 'px', 
            height: Math.random() * 4 + 2 + 'px', 
            top: Math.random() * 100 + '%', 
            left: Math.random() * 100 + '%',
            animationDelay: Math.random() * 5 + 's' 
          }} />
        ))}
      </div>

      <div className="rocket-hybrid">
         <svg viewBox="0 0 100 200" className="w-full">
            <path d="M50 20 C30 50 20 100 20 150 L80 150 C80 100 70 50 50 20 Z" fill="#ff85a1" />
            <circle cx="50" cy="80" r="10" fill="white" opacity="0.5" />
            <path d="M20 130 L5 160 L20 160 Z" fill="#4cc9f0" />
            <path d="M80 130 L95 160 L80 160 Z" fill="#4cc9f0" />
         </svg>
      </div>

      <div className="theme-toggle-fixed" onClick={() => setIsDarkMode(!isDarkMode)}>
         <button className="hybrid-btn !p-4 !rounded-full shadow-2xl">
            {isDarkMode ? <Sun /> : <Moon />}
         </button>
      </div>

      {/* --- HYBRID HUB --- */}
      <div className="hybrid-hub">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div key="home" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="space-y-12">
               <header>
                  <h1 className="hybrid-title">ManVachan</h1>
                  <p className="hybrid-subtitle">The AI Heritage Masterpiece</p>
               </header>

               <div className="elite-card text-center space-y-10">
                  <div className="space-y-4">
                     <p className="font-bold uppercase tracking-widest text-[#ff85a1]">What shall we weave?</p>
                     <input 
                      type="text" 
                      value={inputTerm}
                      onChange={(e) => setInputTerm(e.target.value)}
                      placeholder="e.g. A Brave Robot..." 
                      className="w-full bg-transparent border-b-4 border-[#ff85a1]/30 outline-none text-2xl font-black text-center py-4 text-inherit"
                     />
                  </div>
                  <button 
                    onClick={startTelling}
                    disabled={!inputTerm.trim() || isGenerating}
                    className="hybrid-btn w-full"
                  >
                    {isGenerating ? "WAKING THE SCROLLS..." : "LAUNCH ADVENTURE"}
                  </button>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="elite-card !p-8 flex flex-col items-center gap-2">
                     <Book className="text-[#4cc9f0]" />
                     <span className="font-black text-xs">LIBRARY</span>
                  </div>
                  <div className="elite-card !p-8 flex flex-col items-center gap-2" onClick={() => setIsMuted(!isMuted)}>
                     {isMuted ? <VolumeX className="text-[#ff85a1]" /> : <Volume2 className="text-[#ff85a1]" />}
                     <span className="font-black text-xs">MUSIC</span>
                  </div>
               </div>
            </motion.div>
          )}

          {view === 'read' && activeStory && (
            <motion.div key="read" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
               <header className="text-center">
                  <h2 className="hybrid-title !text-4xl italic">{activeStory.title}</h2>
                  <div className="flex justify-center gap-2 mt-4 text-yellow-500"><Sparkles /><Sparkles /><Sparkles /></div>
               </header>

               {activeStory.scenes.map((scene, i) => (
                 <div key={i} className="elite-card !p-0 overflow-hidden flex flex-col items-center">
                    <div className="blended-image-wrapper">
                       <img src={scene.image} alt="Story scene" />
                    </div>
                    <div className="p-10 text-xl leading-relaxed text-center font-medium opacity-90">
                       {scene.text}
                    </div>
                 </div>
               ))}

               <div className="elite-card !bg-yellow-500 !text-white text-center italic shadow-2xl border-none">
                  <Heart className="mx-auto mb-4" fill="white" size={40} />
                  <p className="text-2xl font-black">"{activeStory.moral}"</p>
               </div>

               <button onClick={() => setView('home')} className="hybrid-btn w-full !bg-gray-500">BACK TO HOME</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-3xl px-12 py-5 rounded-full flex gap-12 shadow-2xl z-50 border border-white/30">
        <NavIcon icon={Home} label="STAR" active={view === 'home'} onClick={() => setView('home')} />
        <NavIcon icon={Book} label="LORE" active={view === 'read'} onClick={() => activeStory && setView('read')} />
        <NavIcon icon={Telescope} label="SEEK" active={false} onClick={() => {}} />
        <NavIcon icon={Settings} label="CORE" active={false} onClick={() => {}} />
      </nav>
    </div>
  );
}

function NavIcon({ icon: Icon, label, active, onClick }) {
  return (
    <div onClick={onClick} className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${active ? 'text-[#ff85a1] scale-125' : 'text-gray-400 group-hover:text-white'}`}>
       <Icon size={24} />
       <span className="text-[10px] font-black tracking-widest uppercase">{label}</span>
    </div>
  );
}
