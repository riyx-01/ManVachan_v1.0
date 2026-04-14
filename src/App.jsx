import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Book, Gamepad, ChevronRight, ChevronLeft, Volume2, VolumeX, Sun, Moon, Sparkles, Heart, Star } from 'lucide-react';

// --- PLATINUM NARRATIVE ENGINE ---
const buildEpicStory = (seed) => {
  const hero = seed.charAt(0).toUpperCase() + seed.slice(1);
  const scenarios = [
    { type: "Galaxy", world: "Starlight Nebulae", tool: "Crystal Compass", obstacle: "the Shadow Storm" },
    { type: "Jungle", world: "Evergreen Whispers", tool: "Golden Flute", obstacle: "the Sleeping Mountain" },
    { type: "Ocean", world: "Sapphire Depths", tool: "Glowing Pearl", obstacle: "the Giant Whirlpool" }
  ];
  
  const hash = seed.length % scenarios.length;
  const s = scenarios[hash];

  return {
    title: `${hero} and the ${s.world}`,
    scenes: [
      {
        topic: "The Beginning",
        text: `In the heart of the ${s.world}, ${hero} lived a peaceful life. But one night, a wise owl brought a message: the ${s.tool} had been lost, and only someone with a pure heart could find it.`,
        image: `https://loremflickr.com/800/800/${s.type},fantasy,village`
      },
      {
        topic: "The Journey",
        text: `${hero} didn't hesitate. Packing a bag of hope, the adventure began. The path led deep into the unknown, where the very trees whispered secrets of the ancient past.`,
        image: `https://loremflickr.com/800/800/${s.type},path,forest`
      },
      {
        topic: "The Challenge",
        text: `Suddenly, ${s.obstacle} blocked the way! It was cold and dark, and for a moment, ${hero} felt small. But then, the hero remembered: "Courage is not the absence of fear, but the decision to move forward."`,
        image: `https://loremflickr.com/800/800/${s.type},storm,mystery`
      },
      {
        topic: "The Solution",
        text: `With a deep breath, ${hero} used the power of kindness. Instead of fighting, the hero sang a song of peace. The ${s.obstacle} began to melt away, revealing the ${s.tool} hidden inside.`,
        image: `https://loremflickr.com/800/800/${s.type},magic,light`
      },
      {
        topic: "The Return",
        text: `With the ${s.tool} safe, ${hero} returned as a legend. The entire ${s.world} glowed with happiness, and the shadows were gone forever. The stars shone brighter than ever before.`,
        image: `https://loremflickr.com/800/800/${s.type},celebration,sunset`
      },
      {
        topic: "The Legacy",
        text: `And so, the story of ${hero} reminds us all: that even the smallest person can change the world if they have the courage to try and the heart to be kind.`,
        image: `https://loremflickr.com/800/800/${s.type},hero,statue`
      }
    ],
    moral: "Kindness is the strongest magic, and courage is the bravest step."
  };
};

export default function App() {
  const [view, setView] = useState('home');
  const [inputTerm, setInputTerm] = useState('');
  const [story, setStory] = useState(null);
  const [index, setIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    document.body.className = isDarkMode ? 'night-mode' : 'day-mode';
  }, [isDarkMode]);

  const generateEpic = () => {
    if (!inputTerm.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setStory(buildEpicStory(inputTerm));
      setIsGenerating(false);
      setView('story');
      setIndex(0);
    }, 4000);
  };

  return (
    <div className="min-h-screen relative">
      <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" loop />
      
      {/* --- PLATINUM NAVBAR --- */}
      <nav className="navbar-platinum">
         <div className="flex items-center gap-2">
            <Sparkles className="text-[#4cc9f0]" />
            <span className="font-black text-xl tracking-tighter">MAN-VAACHAN</span>
         </div>
         <div className="flex gap-8 font-bold text-sm">
            <span onClick={() => setView('home')} className="cursor-pointer hover:text-[#ff85a1]">HOME</span>
            <span className="cursor-pointer opacity-30">LIBRARY</span>
            <span className="cursor-pointer opacity-30">GAMES</span>
         </div>
         <div className="flex gap-4">
            <button onClick={() => setIsMuted(!isMuted)} className="p-2">{isMuted ? <VolumeX/> : <Volume2/>}</button>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2">{isDarkMode ? <Sun/> : <Moon/>}</button>
         </div>
      </nav>

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="magic-portal">
               <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
                  <Star size={80} className="text-[#ffb703] mb-6 drop-shadow-lg" fill="currentColor" />
               </motion.div>
               <div className="portal-glass">
                  <h1 className="text-6xl font-black font-['Fredoka'] mb-4">Hello, Small Hero!</h1>
                  <p className="text-xl opacity-60">Which world shall we build today? Whisper a name...</p>
                  
                  <div className="portal-input-wrap">
                    <input 
                      className="portal-input"
                      value={inputTerm}
                      onChange={(e) => setInputTerm(e.target.value)}
                      placeholder="e.g. Brave Arya..."
                    />
                  </div>

                  <button onClick={generateEpic} disabled={!inputTerm.trim() || isGenerating} className="go-btn">
                     {isGenerating ? "WAKING UP THE MAGIC..." : "CREATE MY EPIC"}
                  </button>
               </div>
            </motion.div>
          )}

          {view === 'story' && story && (
            <motion.div key="story" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative">
               
               {/* NAV GEMS */}
               <div className="nav-gem prev" onClick={() => setIndex(Math.max(0, index - 1))}>
                  <ChevronLeft size={40} />
               </div>
               
               <div className="storybook-container">
                  <div className="book-image-pan">
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        src={story.scenes[index].image} 
                        alt="scene" 
                      />
                    </AnimatePresence>
                  </div>
                  <div className="book-text-pan">
                     <AnimatePresence mode="wait">
                        <motion.div 
                          key={index}
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -20, opacity: 0 }}
                          className="space-y-6"
                        >
                           <h3 className="text-sm font-black uppercase text-[#4cc9f0] tracking-widest">CHAPTER {index + 1}</h3>
                           <p className="text-2xl leading-relaxed font-medium">{story.scenes[index].text}</p>
                           
                           {index === story.scenes.length - 1 && (
                             <div className="mt-10 p-8 bg-yellow-400/10 border-2 border-yellow-400/20 rounded-3xl italic">
                                <Heart className="text-red-500 mb-2" fill="currentColor" />
                                <p className="text-xl font-bold">"{story.moral}"</p>
                             </div>
                           )}
                        </motion.div>
                     </AnimatePresence>
                  </div>
               </div>

               <div className="nav-gem next" onClick={() => {
                  if (index < story.scenes.length - 1) setIndex(index + 1);
                  else setView('home');
               }}>
                  <ChevronRight size={40} />
               </div>

               <div className="text-center mt-4">
                  <span className="text-xs font-black opacity-40 uppercase tracking-widest">Page {index + 1} of {story.scenes.length}</span>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- DECORATIVE ROCKET --- */}
      <div className="fixed bottom-10 right-10 pointer-events-none opacity-20">
         <svg viewBox="0 0 50 100" width="80">
            <path d="M25 0 C15 30 10 70 10 90 L40 90 C40 70 35 30 25 0" fill="#ff85a1" />
            <circle cx="25" cy="40" r="5" fill="white" />
         </svg>
      </div>
    </div>
  );
}
