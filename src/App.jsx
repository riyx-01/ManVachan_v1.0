import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Book, Gamepad2, Volume2, VolumeX, ArrowLeft, ArrowRight, Star, Cloud, Moon, Sun, Rainbow } from 'lucide-react';

const LIBRARY = [
  { id: 1, title: "The Joyful Elephant", preview: "A big elephant learns to dance...", color: "#ff4d6d" },
  { id: 2, title: "Starry Night Wings", preview: "A butterfly that flies to the moon...", color: "#4cc9f0" },
  { id: 3, title: "Ocean's Secret", preview: "The crab who found a pearl...", color: "#7209b7" },
  { id: 4, title: "The Tiny Cloud", preview: "A cloud that only rains glitter...", color: "#ff9f1c" },
  { id: 5, title: "Robot's Garden", preview: "A robot who loves sunflowers...", color: "#4ade80" },
  { id: 6, title: "Mountain Giant", preview: "A giant who was very gentle...", color: "#ff4d6d" }
];

const FETCH_STORY = (keyword) => {
  return {
    title: keyword.toUpperCase() + " ADVENTURE",
    pages: [
      { text: `Deep in the ${keyword} world, a tiny hero appeared. The sun was shining and the colors were bright.`, sound: "jungle", img: "city" },
      { text: `Suddenly, the ${keyword} began to glow! Every leaf and every star started to sing a happy song.`, sound: "jungle", img: "space" },
      { text: `It became clear that the magic of the ${keyword} was always inside the hero's gentle heart.`, sound: "jungle", img: "nature" }
    ],
    moral: "Kindness and imagination can turn any place into a magical kingdom."
  };
};

export default function App() {
  const [view, setView] = useState('home');
  const [elements, setElements] = useState('');
  const [story, setStory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // --- MEMORY GAME STATE ---
  const emojis = ['🐘', '🐱', '🦋', '🤖', '🐘', '🐱', '🦋', '🤖'].sort(() => Math.random() - 0.5);
  const [cards, setCards] = useState(emojis);
  const [flipped, setFlipped] = useState([]);

  const speak = (text) => {
    if (isMuted) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1.3;
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (view === 'read' && story) {
      speak(story.pages[currentPage].text);
    } else {
      window.speechSynthesis.cancel();
    }
  }, [currentPage, view]);

  const handleCreate = () => {
    if (!elements.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setStory(FETCH_STORY(elements));
      setCurrentPage(0);
      setIsGenerating(false);
      setView('read');
    }, 4000);
  };

  return (
    <div className="min-h-screen">
      <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" loop muted={isMuted} />
      
      {/* --- GLOBAL NAV --- */}
      <nav className="global-nav">
        <div className={`nav-item ${view === 'home' ? 'active' : ''}`} onClick={() => setView('home')}>HOME</div>
        <div className={`nav-item ${view === 'library' ? 'active' : ''}`} onClick={() => setView('library')}>LIBRARY</div>
        <div className={`nav-item ${view === 'games' ? 'active' : ''}`} onClick={() => setView('games')}>GAMES</div>
        <div className="nav-item" onClick={() => setIsMuted(!isMuted)}>
          {isMuted ? <VolumeX /> : <Volume2 />}
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {/* --- RESTORED HOME VIEW (PREVIOUS APPROVED VERSION) --- */}
        {view === 'home' && (
          <motion.div key="home" className="hero-section">
            <Doodle icon={Star} top="10%" left="5%" color="#ff9f1c" />
            <Doodle icon={Cloud} top="20%" right="10%" color="#4cc9f0" />
            <Doodle icon={Rainbow} bottom="15%" left="8%" color="#ff4d6d" />
            <Doodle icon={Moon} top="50%" right="15%" color="#7209b7" />
            <Doodle icon={Sun} bottom="10%" right="5%" color="#ff9f1c" />

            <motion.h1 
              initial={{ scale: 0.5, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              className="hero-title"
            >
              CREATE YOUR OWN<br/>MAGICAL STORYBOOK
            </motion.h1>

            <div className="input-bubble-container">
              <input 
                className="magical-input" 
                value={elements}
                onChange={(e) => setElements(e.target.value)}
                placeholder="Type here (e.g. elephant, jungle, space...)"
              />
            </div>

            <button 
              onClick={handleCreate}
              disabled={isGenerating || !elements.trim()}
              className="create-btn"
            >
              {isGenerating ? "FETCHING LORE..." : "CREATE STORY"}
            </button>

            <div className="mt-20 flex gap-10">
               <div className="text-center">
                 <div className="bg-white p-6 rounded-full shadow-lg mb-2"><Book className="text-[#7209b7]" /></div>
                 <p className="font-bold text-[#7209b7]">How it works</p>
               </div>
               <div className="text-center">
                 <div className="bg-white p-6 rounded-full shadow-lg mb-2"><Star className="text-[#ff9f1c]" /></div>
                 <p className="font-bold text-[#7209b7]">Previews</p>
               </div>
            </div>
          </motion.div>
        )}

        {/* --- IMPROVEMENTS PRESERVED (NEW VERSION) --- */}
        {view === 'library' && (
          <motion.div key="lib" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-28 pb-20 px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
            {LIBRARY.map(s => (
              <div key={s.id} onClick={() => { setStory(FETCH_STORY(s.title)); setView('read'); }} className="bg-white rounded-[40px] border-4 border-[#4cc9f0] p-6 shadow-xl cursor-pointer hover:rotate-2 transition-all">
                <img src={`https://picsum.photos/seed/${s.id}/400/300`} className="w-full h-40 object-cover rounded-3xl mb-4" />
                <h3 className="font-luckiest text-2xl" style={{ color: s.color }}>{s.title}</h3>
                <p className="text-sm font-bold text-gray-400 mt-2">{s.preview}</p>
              </div>
            ))}
          </motion.div>
        )}

        {view === 'read' && story && (
          <motion.div key="read" initial={{ rotateY: -90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} className="flip-book-container">
            <div className="book-page">
              <div className="left-panel">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentPage}
                    initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    src={`https://picsum.photos/seed/${story.pages[currentPage].img}/800/800`}
                    className="story-illustration"
                  />
                </AnimatePresence>
              </div>
              <div className="right-panel">
                <div className="flex-1">
                  <h2 className="text-4xl font-luckiest text-[#7209b7] mb-8">{story.title}</h2>
                  <motion.p key={currentPage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-medium leading-relaxed text-gray-700">
                    {story.pages[currentPage].text}
                  </motion.p>
                </div>

                {currentPage === story.pages.length - 1 && (
                  <div className="p-6 bg-[#ff9f1c]/10 border-4 border-dashed border-[#ff9f1c] rounded-3xl mb-8">
                    <p className="font-black text-[#ff9f1c] uppercase text-xs mb-1">The Golden Moral</p>
                    <p className="text-xl font-bold italic">"{story.moral}"</p>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <button disabled={currentPage === 0} onClick={() => setCurrentPage(p => p - 1)} className="p-4 bg-[#7209b7] text-white rounded-full disabled:opacity-0"><ArrowLeft /></button>
                  <span className="font-black text-gray-300">PAGE {currentPage + 1} OF {story.pages.length}</span>
                  <button onClick={() => currentPage < story.pages.length - 1 ? setCurrentPage(p => p + 1) : setView('home')} className="p-4 bg-[#7209b7] text-white rounded-full"><ArrowRight /></button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {view === 'games' && (
          <motion.div key="games" initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="pt-28 flex flex-col items-center">
             <h2 className="text-5xl font-luckiest text-[#7209b7] mb-12">ANIMAL MATCH!</h2>
             <div className="memory-grid">
                {cards.map((e, i) => (
                  <div key={i} className="memory-card" onClick={() => setFlipped([...flipped, i])}>
                     {flipped.includes(i) ? e : '❓'}
                  </div>
                ))}
             </div>
             <button onClick={() => setFlipped([])} className="p-6 bg-[#ff4d6d] text-white font-luckiest text-2xl rounded-full mt-12 shadow-xl">RESTART GAME</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Doodle({ icon: Icon, top, left, bottom, right, color }) {
  return (
    <motion.div className="doodle" style={{ top, left, bottom, right, color }}>
      <Icon size={64} />
    </motion.div>
  );
}
