import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Book, Gamepad, Sparkles, Sun, Moon, Volume2, VolumeX, ChevronRight, ChevronLeft, Heart, Star } from 'lucide-react';

// --- RELIABLE STORY ENGINE ---
const FIXED_STORIES = [
  { title: "The Wise Elephant", intro: "Ganesh was the wisest elephant in the Jaipur woods...", image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&q=80&w=800" },
  { title: "The Golden Peacock", intro: "Near the holy river, a peacock with feathers of gold sang at dawn...", image: "https://images.unsplash.com/photo-1549608276-5786d7510476?auto=format&fit=crop&q=80&w=800" }
];

const generateStory = (seed) => {
  const hero = seed || "Our Hero";
  return {
    title: `${hero}'s Magic Journey`,
    pages: [
      { text: `Once in a land of candy clouds, ${hero} found a flying umbrella!`, image: `https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800` },
      { text: `The umbrella took ${hero} to a castle made of chocolate and moon-cheese.`, image: `https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800` },
      { text: `A friendly dragon offered ${hero} a ride to the stars.`, image: `https://images.unsplash.com/photo-1590420485404-f86d22b8abf8?q=80&w=800` },
      { text: `Back home, ${hero} realized the whole world was waiting to be explored.`, image: `https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800` }
    ],
    moral: "Your imagination is the most magical key you own."
  };
};

export default function App() {
  const [view, setView] = useState('home');
  const [inputTerm, setInputTerm] = useState('');
  const [activeStory, setActiveStory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [score, setScore] = useState(0);
  
  const startMagic = () => {
    if (!inputTerm.trim()) return;
    setActiveStory(generateStory(inputTerm));
    setView('read');
    setCurrentPage(0);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'night-mode' : 'day-mode'}`}>
      
      {/* --- VOID BACKGROUND --- */}
      <div className="star-field">
        {[...Array(20)].map((_, i) => (
          <motion.div 
            key={i} 
            animate={{ opacity: [0.2, 0.8, 0.2] }} 
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bg-white rounded-full" 
            style={{ width: '3px', height: '3px', top: Math.random()*100+'%', left: Math.random()*100+'%' }} 
          />
        ))}
      </div>

      <div className="rocket-fly">
        <svg viewBox="0 0 50 100" width="80">
          <path d="M25 0 C15 30 10 70 10 90 L40 90 C40 70 35 30 25 0" fill="#ff85a1" />
          <circle cx="25" cy="40" r="5" fill="white" />
          <path d="M10 80 L0 100 L10 100" fill="#4cc9f0" />
          <path d="M40 80 L50 100 L40 100" fill="#4cc9f0" />
        </svg>
      </div>

      {/* --- NAVBAR --- */}
      <nav className="kids-nav">
         <div className="text-2xl font-black text-[#ff85a1]">MAN-VAACHAN ✨</div>
         <div className="nav-links">
            <button onClick={() => setView('home')} className={`nav-btn ${view === 'home' ? 'active' : ''}`}><Home size={20}/> HOME</button>
            <button onClick={() => setView('library')} className={`nav-btn ${view === 'library' ? 'active' : ''}`}><Book size={20}/> STORIES</button>
            <button onClick={() => setView('games')} className={`nav-btn ${view === 'games' ? 'active' : ''}`}><Gamepad size={20}/> GAMES</button>
         </div>
         <div className="flex gap-4">
            <button onClick={() => setIsMuted(!isMuted)} className="nav-btn">{isMuted ? <VolumeX /> : <Volume2 />}</button>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="nav-btn">{isDarkMode ? <Sun /> : <Moon />}</button>
         </div>
      </nav>

      <div className="main-wrapper">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div key="home" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="magic-input-box text-center space-y-8">
               <h2 className="text-4xl font-bold font-['Fredoka']">Hello, Adventurer!</h2>
               <p className="opacity-80">Type your name to start a magical story...</p>
               <input 
                type="text" 
                value={inputTerm}
                onChange={(e) => setInputTerm(e.target.value)}
                placeholder="Name here..." 
                className="w-full p-6 rounded-3xl bg-white/10 border-2 border-white/20 text-2xl text-center outline-none focus:border-[#ff85a1]"
               />
               <button onClick={startMagic} className="w-full py-6 bg-[#ff85a1] rounded-3xl font-black text-xl hover:scale-105 transition">START STORY</button>
            </motion.div>
          )}

          {view === 'library' && (
            <motion.div key="lib" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-6">
               {FIXED_STORIES.map((s, i) => (
                 <div key={i} className="game-card">
                    <img src={s.image} className="w-full h-40 object-cover rounded-2xl mb-4" alt="tale" />
                    <h3 className="text-2xl font-bold">{s.title}</h3>
                    <p className="text-sm opacity-70 mb-4">{s.intro}</p>
                    <button onClick={() => { setActiveStory(generateStory(s.title)); setView('read'); }} className="nav-btn !bg-[#4cc9f0] mx-auto">READ NOW</button>
                 </div>
               ))}
            </motion.div>
          )}

          {view === 'games' && (
            <motion.div key="game" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 text-center">
               <h2 className="text-5xl font-black">GAME ZONE</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto px-6">
                  <div className="game-card">
                     <Star size={40} className="mx-auto mb-4 text-yellow-400" />
                     <h3>STAR CHASER</h3>
                     <p className="mb-4">Score: {score}</p>
                     <motion.button 
                      animate={{ scale: [1, 1.2, 1], x: [0, 10, -10, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      onClick={() => setScore(score + 1)} 
                      className="magic-btn !p-8 !rounded-full"
                     >CLICK ME!</motion.button>
                  </div>
                  <div className="game-card">
                     <Sparkles size={40} className="mx-auto mb-4 text-[#ff85a1]" />
                     <h3>BUBBLE POP</h3>
                     <p className="mb-4">Pop the magic bubbles!</p>
                     <div className="flex justify-center gap-4">
                        {[1,2,3].map(i => <div key={i} className="w-12 h-12 rounded-full bg-white/20 hover:bg-[#ff85a1] cursor-pointer" />)}
                     </div>
                  </div>
               </div>
            </motion.div>
          )}

          {view === 'read' && activeStory && (
            <motion.div key="read" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="blended-book-frame">
               <div className="book-img-side flex flex-col p-4">
                  <img src={activeStory.pages[currentPage].image} className="w-full h-full object-cover rounded-2xl" alt="page" />
               </div>
               <div className="book-text-side space-y-8">
                  <h3 className="text-3xl font-black text-[#ff85a1]">{activeStory.title}</h3>
                  <p className="text-2xl leading-relaxed">{activeStory.pages[currentPage].text}</p>
                  
                  {currentPage === activeStory.pages.length - 1 && (
                    <div className="p-6 bg-yellow-400/20 rounded-2xl border-2 border-yellow-400 italic">
                       <Heart className="mb-2" fill="#eab308" stroke="none" />
                       "{activeStory.moral}"
                    </div>
                  )}

                  <div className="flex gap-4">
                     <button onClick={() => setCurrentPage(Math.max(0, currentPage - 1))} className="nav-btn !bg-gray-200 !text-black"><ChevronLeft/> PREV</button>
                     <button onClick={() => {
                        if (currentPage < activeStory.pages.length - 1) setCurrentPage(currentPage + 1);
                        else setView('home');
                     }} className="nav-btn !bg-[#ff85a1]">{currentPage === activeStory.pages.length - 1 ? <Home/> : <ChevronRight/>} {currentPage === activeStory.pages.length - 1 ? 'FINISH' : 'NEXT'}</button>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
