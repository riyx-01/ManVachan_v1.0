import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Home, Settings, Search, Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';

// --- SEMANTIC STORY BUILDER ---
const buildAdventure = (seed) => {
  const hero = seed.charAt(0).toUpperCase() + seed.slice(1);
  return {
    title: `The Great Journey of ${hero}`,
    scenes: [
      {
        text: `In a world made of soft colors and gentle winds, ${hero} lived a very happy life. But ${hero} always had a curious heart, wondering what lay beyond the Great Sparkling River.`,
        image: `https://loremflickr.com/800/500/${seed},landscape`
      },
      {
        text: `As ${hero} walked through the Whispering Woods, the trees began to hum a sweet melody. A small problem appeared: a bridge made of rainbows had lost its colors!`,
        image: `https://loremflickr.com/800/500/${seed},forest`
      },
      {
        text: `By sharing a story and a warm smile, ${hero} helped the bridge glow once more. Crossing over, ${hero} found a field of golden sunflowers that matched the sunlight.`,
        image: `https://loremflickr.com/800/500/${seed},magic`
      },
      {
        text: `Returning home at sunset, ${hero} realized that the greatest adventure wasn't just the places seen, but the kindness shared along the way.`,
        image: `https://loremflickr.com/800/500/${seed},sunset`
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
      window.scrollTo({ top: 0 });
    }, 3500);
  };

  return (
    <div className="min-h-screen relative">
      <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" loop />
      
      {/* --- DREAMY BACKGROUND ELEMENTS --- */}
      <div className="rocket-env">
        <div className="rocket-body">
          <div className="body"></div>
          <div className="rocket-window"></div>
        </div>
      </div>

      <label className="theme-switch">
        <input 
          type="checkbox" 
          className="theme-switch__checkbox" 
          checked={isDarkMode}
          onChange={() => setIsDarkMode(!isDarkMode)}
        />
        <div className="theme-switch__container">
          <div className="theme-switch__sun-moon-container"></div>
        </div>
      </label>

      {/* --- MAIN COLUMN --- */}
      <div className="app-column">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
              <header className="text-center pt-10">
                <h1 className="elite-title">ManVachan</h1>
                <p className="font-bold text-sm tracking-widest opacity-40">STORYBOOK v1.0</p>
              </header>

              <div className="premium-card text-center space-y-8">
                <div className="space-y-4">
                  <p className="font-black text-sm uppercase opacity-50">Who is our Hero?</p>
                  <input 
                    type="text" 
                    value={inputTerm}
                    onChange={(e) => setInputTerm(e.target.value)}
                    placeholder="Enter hero name..." 
                    className="w-full text-center border-b-2 bg-transparent border-current outline-none text-2xl font-medium py-2"
                  />
                </div>
                
                <button 
                  onClick={startTelling}
                  disabled={!inputTerm.trim() || isGenerating}
                  className="premium-btn w-full"
                >
                  {isGenerating ? "CRAFTING..." : "LAUNCH ADVENTURE"}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="premium-card !p-6 flex flex-col items-center gap-2">
                    <Book className="text-[#4361ee]" />
                    <span className="font-black text-xs">LIBRARY</span>
                 </div>
                 <div className="premium-card !p-6 flex flex-col items-center gap-2">
                    <History className="text-[#ff85a1]" />
                    <span className="font-black text-xs">HISTORY</span>
                 </div>
              </div>
            </motion.div>
          )}

          {view === 'read' && activeStory && (
            <motion.div key="read" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 pb-24">
              <header className="text-center py-10">
                 <h2 className="elite-title">{activeStory.title}</h2>
                 <div className="flex justify-center gap-2 mt-4 text-yellow-400"><Sparkles /><Sparkles /><Sparkles /></div>
              </header>

              {activeStory.scenes.map((scene, i) => (
                <div key={i} className="premium-card !p-0 overflow-hidden">
                   <img src={scene.image} className="w-full aspect-[16/10] object-cover" alt="scene" />
                   <div className="p-10 story-text">
                      {scene.text}
                   </div>
                </div>
              ))}

              <div className="premium-card !bg-[#ffb703] !text-white text-center italic">
                 <Heart className="mx-auto mb-4" size={40} fill="white" />
                 <p className="text-2xl font-bold">"{activeStory.moral}"</p>
              </div>

              <button onClick={() => setView('home')} className="premium-btn w-full">BACK TO HUB</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- DOCK --- */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/80 dark:bg-black/80 backdrop-blur-xl px-10 py-4 rounded-full flex gap-10 shadow-2xl z-50 border border-white/20">
         <NavItem active={view === 'home'} icon={Home} label="HOME" onClick={() => setView('home')} />
         <NavItem active={view === 'read'} icon={Book} label="BOOK" onClick={() => activeStory && setView('read')} />
         <NavItem active={false} icon={Search} label="FIND" onClick={() => {}} />
         <NavItem active={false} icon={isMuted ? VolumeX : Volume2} label={isMuted ? "SILENT" : "MUSIC"} onClick={() => setIsMuted(!isMuted)} />
      </nav>
    </div>
  );
}

function NavItem({ active, icon: Icon, label, onClick }) {
  return (
    <div onClick={onClick} className={`flex flex-col items-center cursor-pointer transition-all ${active ? 'text-blue-500 scale-110' : 'text-gray-400'}`}>
       <Icon size={22} />
       <span className="text-[10px] font-black mt-1 tracking-widest">{label}</span>
    </div>
  );
}

function History({ className }) {
  return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l4 2" /></svg>;
}
