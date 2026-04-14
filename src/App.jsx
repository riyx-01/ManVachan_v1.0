import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Book, Home, ChevronRight, ChevronLeft, Volume2, VolumeX, Moon, Sun, Heart } from 'lucide-react';

// --- GIGA-DYNAMIC STORY ENGINE ---
const generateUniqueStory = (seed) => {
  const hero = seed.charAt(0).toUpperCase() + seed.slice(1);
  const themes = [
    { loc: "Whispering Peaks", quest: "find the Lost Emerald", fail: "a mysterious mist", win: "a song of light" },
    { loc: "Neon Galaxy", quest: "repair the Golden Rocket", fail: "a stray asteroid", win: "a burst of star-dust" },
    { loc: "Coral Kingdom", quest: "save the Diamond Shell", fail: "a giant bubble-trap", win: "a dance of dolphins" },
    { loc: "Enchanted Library", quest: "read the Silent Scroll", fail: "a cheeky ink-goblin", win: "a rain of wisdom" }
  ];
  
  // Hash seed to pick theme
  const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const theme = themes[hash % themes.length];

  return {
    hero,
    title: `${hero} and the ${theme.loc}`,
    pages: [
      {
        text: `In the heart of the ${theme.loc}, lived a brave soul named ${hero}. Life was peaceful until a strange message arrived: it was time to ${theme.quest}.`,
        image: `https://loremflickr.com/800/800/${seed},${theme.loc.split(' ')[0]},fantasy`
      },
      {
        text: `The path was long and winding. Suddenly, ${theme.fail} appeared out of nowhere! It seemed like ${hero} would never reach the goal. But a hero never gives up.`,
        image: `https://loremflickr.com/800/800/${seed},travel,mystery`
      },
      {
        text: `Using a ${theme.win}, ${hero} cleared the path. The ${theme.quest} was finally within reach, glowing brighter than the sun itself!`,
        image: `https://loremflickr.com/800/800/${seed},magic,win`
      },
      {
        text: `With the quest complete, ${hero} returned home. The stars of the ${theme.loc} twinkled in celebration of a journey well-spent and a lesson well-learned.`,
        image: `https://loremflickr.com/800/800/${seed},celebration,sunset`
      }
    ],
    moral: `Every ${theme.quest} begins with a single step and a heart full of ${theme.win.split(' ')[2]}.`
  };
};

export default function App() {
  const [view, setView] = useState('home');
  const [inputTerm, setInputTerm] = useState('');
  const [activeStory, setActiveStory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const audioRef = useRef(null);

  const startStory = () => {
    if (!inputTerm.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setActiveStory(generateUniqueStory(inputTerm));
      setIsGenerating(false);
      setView('book');
      setCurrentPage(0);
    }, 3000);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark-mode' : ''}`}>
      <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" loop />
      
      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div 
            key="home" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0, scale: 1.1 }}
            className="home-portal"
          >
            <div className="portal-wand">✨</div>
            <h1 className="text-7xl font-bold mb-4 font-['Fredoka'] text-white drop-shadow-2xl">ManVachan</h1>
            <p className="text-2xl text-white/70 mb-12 italic">Whisper a name, weave a world...</p>

            <div className="input-magic-container">
              <input 
                type="text" 
                value={inputTerm}
                onChange={(e) => setInputTerm(e.target.value)}
                placeholder="Name your hero..." 
                className="magic-input"
              />
              <button onClick={startStory} className="magic-btn">
                {isGenerating ? "Wand is Glowing..." : "WEAVE MAGIC"}
              </button>
            </div>

            <div className="fixed bottom-10 right-10" onClick={() => setIsDarkMode(!isDarkMode)}>
               <button className="nav-circle !bg-white/10">{isDarkMode ? <Sun /> : <Moon />}</button>
            </div>
          </motion.div>
        )}

        {view === 'book' && activeStory && (
          <motion.div 
            key="book" 
            initial={{ opacity: 0, rotateY: 90 }} 
            animate={{ opacity: 1, rotateY: 0 }} 
            className="book-container"
          >
            <div className="book">
               {/* Left Side: Always Image */}
               <div className="book-left">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={currentPage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      src={activeStory.pages[currentPage].image} 
                      className="page-image" 
                    />
                  </AnimatePresence>
               </div>

               {/* Right Side: Always Text */}
               <div className="book-right">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={currentPage}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      className="page-content"
                    >
                      <h3 className="story-heading">Chapter {currentPage + 1}</h3>
                      <p className="story-body">{activeStory.pages[currentPage].text}</p>
                      
                      {currentPage === activeStory.pages.length - 1 && (
                        <div className="moral-overlay mt-10">
                           <Heart className="mx-auto mb-2" fill="white" />
                           <p className="font-bold">"{activeStory.moral}"</p>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
               </div>
            </div>

            <div className="book-nav">
               <button 
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                className="nav-circle"
               >
                 <ChevronLeft />
               </button>
               
               <div className="nav-circle bg-white/20 px-8 !w-auto !rounded-full text-sm font-bold">
                 {currentPage + 1} / {activeStory.pages.length}
               </div>

               <button 
                onClick={() => {
                  if (currentPage < activeStory.pages.length - 1) {
                    setCurrentPage(currentPage + 1);
                  } else {
                    setView('home');
                  }
                }}
                className="nav-circle"
               >
                 {currentPage === activeStory.pages.length - 1 ? <Home /> : <ChevronRight />}
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
