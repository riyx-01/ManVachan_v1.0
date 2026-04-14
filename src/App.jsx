import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Book, Gamepad, Sparkles, ChevronRight, ChevronLeft, Volume2, VolumeX, Heart, Star, LayoutGrid } from 'lucide-react';

// --- LIBRARY DATA (10-15 Stories) ---
const HERITAGE_LIBRARY = [
  { id: 1, title: "The Wise Elephant", world: "Jungle", icon: "🐘", summary: "How Ganesh saved the forest with words, not tusks." },
  { id: 2, title: "The Golden Peacock", world: "Peacock Plains", icon: "🦚", summary: "A tale of beauty and the dance of the monsoon." },
  { id: 3, title: "Brave Little Diya", world: "Ancient Village", icon: "🪔", summary: "The light that refused to go out in the dark storm." },
  { id: 4, title: "The Moon's Secret", world: "Night Sky", icon: "🌙", summary: "Why the moon changes its shape every night." },
  { id: 5, title: "Ocean's Song", world: "Deep Sapphire", icon: "🐚", summary: "The shell that sang the history of the waves." },
  { id: 6, title: "Mountain King", world: "Himalayas", icon: "🏔️", summary: "The tiger who protected the snow peaks." },
  { id: 7, title: "River Guardian", world: "Holy Ganges", icon: "💧", summary: "How the river brings life to the golden fields." },
  { id: 8, title: "Firefly Festival", world: "Glow Woods", icon: "✨", summary: "The smallest light that led the way home." },
  { id: 9, title: "Bamboo Flute", world: "Jade Grove", icon: "🎋", summary: "A melody that could make the flowers bloom." },
  { id: 10, title: "Desert Camel", world: "Silk Route", icon: "🐪", summary: "The desert traveler who knew the path by the stars." }
];

// --- STORY BUILDER ---
const buildStoryData = (seed) => {
  const hero = seed.charAt(0).toUpperCase() + seed.slice(1);
  return {
    title: `${hero}'s Legend`,
    scenes: [
      { text: `In a land of golden clouds, ${hero} started a great journey to find the Ancient Star.`, img: `https://loremflickr.com/800/800/${seed},fantasy,light` },
      { text: `Crossing the Whispering Bridge, ${hero} met a friendly fox who knew the way.`, img: `https://loremflickr.com/800/800/${seed},bridge,forest` },
      { text: `Suddenly, a Shadow Storm blocked the path, but ${hero} held their lantern high.`, img: `https://loremflickr.com/800/800/${seed},storm,mystery` },
      { text: `By sharing a kind word, the storm turned into a rain of flowers!`, img: `https://loremflickr.com/800/800/${seed},magic,flowers` },
      { text: `Finally, ${hero} found the Star and returned home to a world full of light.`, img: `https://loremflickr.com/800/800/${seed},celebration,sunset` }
    ],
    moral: "A kind heart is the brightest lantern."
  };
};

export default function App() {
  const [view, setView] = useState('home'); 
  const [inputTerm, setInputTerm] = useState('');
  const [activeStory, setActiveStory] = useState(null);
  const [index, setIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [score, setScore] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    document.body.className = isDarkMode ? 'night-mode' : 'day-mode';
  }, [isDarkMode]);

  const runMagic = (term) => {
    const seed = term || inputTerm;
    if (!seed.trim()) return;
    setActiveStory(buildStoryData(seed));
    setView('story');
    setIndex(0);
  };

  return (
    <div className="min-h-screen">
      <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" loop />

      {/* --- ULTIMATE NAVBAR --- */}
      <nav className="navbar-kids">
         <div className="flex items-center gap-2 font-black text-2xl text-[#ff85a1]">
            <Sparkles /> MAN-VAACHAN
         </div>
         
         <div className="nav-links-wrap">
            <div onClick={() => setView('home')} className={`nav-tab ${view === 'home' ? 'active' : ''}`}>
               <Home size={20} /> HOME
            </div>
            <div onClick={() => setView('library')} className={`nav-tab ${view === 'library' ? 'active' : ''}`}>
               <Book size={20} /> LIBRARY
            </div>
            <div onClick={() => setView('games')} className={`nav-tab ${view === 'games' ? 'active' : ''}`}>
               <Gamepad size={20} /> GAMES
            </div>
         </div>

         <div className="flex items-center gap-6">
            <label className="theme-switch" title="Toggle Dream Mode">
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
            <button onClick={() => setIsMuted(!isMuted)} className="p-2 opacity-50 hover:opacity-100 transition">
               {isMuted ? <VolumeX /> : <Volume2 />}
            </button>
         </div>
      </nav>

      <div className="pt-[100px]">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="home-portal-v2">
               <div className="portal-wand-v2">✨</div>
               <div className="magic-input-v2">
                  <h1 className="text-6xl font-black font-['Fredoka'] mb-6">Hello, Little Voyager!</h1>
                  <p className="text-xl opacity-60 mb-10 italic">Type a name to weave a magical legend...</p>
                  <div className="flex gap-4">
                     <input 
                       className="flex-1 bg-transparent border-b-4 border-[#ff85a1]/40 outline-none text-3xl font-medium py-2 text-center"
                       placeholder="e.g. Brave Arya..."
                       value={inputTerm}
                       onChange={(e) => setInputTerm(e.target.value)}
                     />
                     <button onClick={() => runMagic()} className="px-10 py-4 bg-[#ff85a1] rounded-3xl font-black text-white hover:scale-105 transition">GENERATE</button>
                  </div>
               </div>
            </motion.div>
          )}

          {view === 'library' && (
            <motion.div key="lib" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-6xl mx-auto p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {HERITAGE_LIBRARY.map((s) => (
                 <div key={s.id} className="game-hub-card" onClick={() => runMagic(s.title)}>
                    <div className="text-6xl mb-4">{s.icon}</div>
                    <h3 className="text-2xl font-black">{s.title}</h3>
                    <p className="opacity-60 text-sm mt-2">{s.summary}</p>
                    <div className="mt-6 font-bold text-[#4cc9f0]">READ STORY →</div>
                 </div>
               ))}
            </motion.div>
          )}

          {view === 'games' && (
            <motion.div key="games" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-10 p-20">
               <h2 className="text-5xl font-black">THE MAGIC PLAYZONE</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl">
                  <div className="game-hub-card relative overflow-hidden h-[300px] flex flex-col justify-center items-center">
                     <Star size={60} className="text-yellow-400 mb-4 animate-spin" />
                     <h3 className="text-3xl font-black">STAR CHASER</h3>
                     <p className="mt-2">Score: {score}</p>
                     <button onClick={() => setScore(score + 10)} className="mt-6 px-10 py-4 bg-yellow-400 rounded-full text-black font-black">CATCH STAR!</button>
                  </div>
                  <div className="game-hub-card h-[300px] flex flex-col justify-center items-center">
                     <Heart size={60} className="text-red-400 mb-4 animate-pulse" />
                     <h3 className="text-3xl font-black">BFF MATCH</h3>
                     <p className="mt-2 italic">A coming-soon memory challenge!</p>
                  </div>
               </div>
            </motion.div>
          )}

          {view === 'story' && activeStory && (
            <motion.div key="story" initial={{ opacity: 0, rotateY: 90 }} animate={{ opacity: 1, rotateY: 0 }} className="relative">
               <button className="book-nav-btn prev" onClick={() => setIndex(Math.max(0, index - 1))}><ChevronLeft size={40}/></button>
               <button className="book-nav-btn next" onClick={() => {
                  if (index < activeStory.scenes.length - 1) setIndex(index + 1);
                  else setView('home');
               }}><ChevronRight size={40}/></button>

               <div className="platinum-book">
                  <div className="w-1/2 bg-black flex p-4">
                    <img src={activeStory.scenes[index].img} className="w-full h-full object-cover rounded-3xl" alt="scene" />
                  </div>
                  <div className="w-1/2 p-20 flex flex-col justify-center text-[#2b2d42]">
                     <h2 className="text-sm font-black text-[#4cc9f0] tracking-widest uppercase mb-4">Chapter {index + 1}</h2>
                     <p className="text-3xl font-medium leading-relaxed">{activeStory.scenes[index].text}</p>
                     
                     {index === activeStory.scenes.length - 1 && (
                       <div className="mt-12 p-8 bg-[#ffea00]/20 rounded-3xl border-2 border-[#ffea00] italic">
                          <Heart fill="#eab308" stroke="none" className="mb-2" />
                          <p className="text-2xl font-black">"{activeStory.moral}"</p>
                       </div>
                     )}
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- DECORATIVE ROCKET --- */}
      <div className="fixed bottom-10 right-10 pointer-events-none opacity-20">
         <svg viewBox="0 0 50 100" width="100">
            <path d="M25 0 C15 30 10 70 10 90 L40 90 C40 70 35 30 25 0" fill="#ff85a1" />
            <circle cx="25" cy="40" r="5" fill="white" />
         </svg>
      </div>
    </div>
  );
}
