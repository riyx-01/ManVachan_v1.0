import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Book, Gamepad2, Volume2, VolumeX, ArrowLeft, ArrowRight, Star, Cloud, Moon, Rainbow, Rocket } from 'lucide-react';

// --- STABLE STORY ENGINE (PRESERVED) ---
const FETCH_LORE = (keywords) => {
  const K = keywords.toLowerCase();
  const T = [
    {
      tags: ["elephant", "jungle"],
      title: "Gajju's Gentle Heart",
      pages: [
        { text: "In the sun-drenched jungles of Bharat, Gajju the Elephant was known as the Great Protector. Everyone loved him.", img: "elephant-jungle" },
        { text: "One day, he found a tiny bird with a broken wing. Gajju sheltered the bird from the heavy monsoon rains.", img: "elephant-bird" },
        { text: "The bird healed, and soon the jungle was filled with the most beautiful songs ever heard.", img: "happy-jungle" }
      ],
      moral: "Small kindnesses create big songs in the heart."
    },
    {
      tags: ["space", "stars"],
      title: "Aria's Galactic Box",
      pages: [
        { text: "Aria sat inside a refrigerator box and painted white stars on its navy-blue walls.", img: "box-rocket" },
        { text: "She closed her eyes, and suddenly she was zooming past the Moon, headed for the Milky Way!", img: "space-voyage" },
        { text: "She returned home just in time for milk and cookies, with a pocket full of stardust memories.", img: "bed-stars" }
      ],
      moral: "Your imagination can take you where no ship has ever gone."
    }
  ];
  return T.find(t => t.tags.some(tag => K.includes(tag))) || T[0];
};

export default function App() {
  const [view, setView] = useState('home');
  const [input, setInput] = useState('');
  const [story, setStory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const speak = (text) => {
    if (isMuted) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.pitch = 1.2; u.rate = 1.0;
    window.speechSynthesis.speak(u);
  };

  useEffect(() => {
    if (view === 'read' && story) {
      speak(story.pages[currentPage].text);
    } else {
      window.speechSynthesis.cancel();
    }
  }, [currentPage, view]);

  const handleCreate = () => {
    if (!input.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setStory(FETCH_LORE(input));
      setCurrentPage(0);
      setIsGenerating(false);
      setView('read');
    }, 3000);
  };

  return (
    <div className="min-h-screen">
      <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" loop muted={isMuted} />
      
      {/* --- BACKGROUND DECORATION LAYER (STABILIZED) --- */}
      <div className="magic-background">
        <Doodle icon={Star} top="10%" left="5%" color="#ff9f1c" />
        <Doodle icon={Cloud} top="20%" right="10%" color="#4cc9f0" />
        <Doodle icon={Rainbow} bottom="15%" left="8%" color="#ff4d6d" />
        <Doodle icon={Moon} top="50%" right="8%" color="#7209b7" />
        <Doodle icon={Rocket} bottom="10%" right="10%" color="#ff9f1c" />
      </div>

      {/* --- STABLE NAV BAR --- */}
      <nav className="stable-nav">
        <div className={`nav-item ${view === 'home' ? 'active' : ''}`} onClick={() => setView('home')}>HOME</div>
        <div className={`nav-item ${view === 'library' ? 'active' : ''}`} onClick={() => setView('library')}>LIBRARY</div>
        <div className={`nav-item ${view === 'games' ? 'active' : ''}`} onClick={() => setView('games')}>GAMES</div>
        <button onClick={() => setIsMuted(!isMuted)} className="p-2 text-[#7209b7]">
           {isMuted ? <VolumeX /> : <Volume2 />}
        </button>
      </nav>

      <main className="main-stage">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div key="home" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-12 pt-12">
               <h1 className="text-6xl font-luckiest text-[#7209b7] text-center leading-tight">
                 CREATE YOUR OWN<br/>MAGICAL STORYBOOK
               </h1>
               
               <div className="magical-card-v2 w-full max-w-[800px]">
                  <input 
                    className="w-full bg-transparent border-none text-3xl font-bold text-center outline-none text-[#7209b7]"
                    placeholder="Elephant, Stars, Space..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
               </div>

               <button onClick={handleCreate} disabled={isGenerating || !input.trim()} className="bouncy-btn">
                 {isGenerating ? "WAKING MAGIC..." : "CREATE STORY"}
               </button>

               <div className="flex gap-12 mt-10">
                  <div className="flex flex-col items-center"><Book className="text-[#4cc9f0] mb-2" size={40} /><p className="font-bold">Library</p></div>
                  <div className="flex flex-col items-center"><Star className="text-[#ff9f1c] mb-2" size={40} /><p className="font-bold">Favorites</p></div>
               </div>
            </motion.div>
          )}

          {view === 'read' && story && (
            <motion.div key="read" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="book-stage">
               <div className="open-book">
                  <div className="left-inner">
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={currentPage} 
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        src={`https://picsum.photos/seed/${story.pages[currentPage].img}/800/800`}
                        className="w-full h-full object-cover rounded-2xl shadow-lg border-4 border-white"
                      />
                    </AnimatePresence>
                  </div>
                  <div className="right-inner">
                    <div className="flex-1">
                      <h2 className="text-4xl font-luckiest text-[#7209b7] mb-8">{story.title}</h2>
                      <motion.p key={currentPage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl leading-relaxed text-gray-700 italic">
                        {story.pages[currentPage].text}
                      </motion.p>
                    </div>

                    {currentPage === story.pages.length - 1 && (
                      <div className="bg-[#ff9f1c]/10 border-4 border-dashed border-[#ff9f1c] p-6 rounded-3xl mb-8">
                        <p className="font-black text-[#ff9f1c] text-xs uppercase mb-1">The Moral</p>
                        <p className="text-xl font-bold">"{story.moral}"</p>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <button disabled={currentPage === 0} onClick={() => setCurrentPage(p => p - 1)} className="p-4 bg-[#7209b7] text-white rounded-full disabled:opacity-0 shadow-lg"><ArrowLeft /></button>
                      <span className="font-black text-gray-300">P. {currentPage+1}</span>
                      <button onClick={() => currentPage < story.pages.length - 1 ? setCurrentPage(p => p + 1) : setView('home')} className="p-4 bg-[#7209b7] text-white rounded-full shadow-lg"><ArrowRight /></button>
                    </div>
                  </div>
               </div>
            </motion.div>
          )}

          {view === 'library' && (
            <motion.div key="lib" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="magical-card-v2 border-[#4cc9f0] cursor-pointer hover:scale-105 transition-all">
                  <img src={`https://picsum.photos/seed/l${i}/400/300`} className="rounded-2xl mb-4 w-full h-40 object-cover" />
                  <h3 className="font-luckiest text-2xl text-[#7209b7]">ADVENTURE #{i}</h3>
                  <p className="text-sm font-bold text-gray-400 mt-2">Open the story book...</p>
                </div>
              ))}
            </motion.div>
          )}

          {view === 'games' && (
             <motion.div key="games" initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                <h2 className="text-5xl font-luckiest text-[#7209b7] mb-12">ANIMAL MATCH</h2>
                <div className="grid grid-cols-4 gap-6">
                   {[1,2,3,4,5,6,7,8].map(i => (
                     <div key={i} className="w-24 h-24 bg-[#4cc9f0] rounded-2xl shadow-xl flex items-center justify-center text-4xl cursor-pointer">?</div>
                   ))}
                </div>
                <button className="bouncy-btn mt-12">REPLAY MAGIC</button>
             </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function Doodle({ icon: Icon, top, left, bottom, right, color }) {
  return (
    <div className="doodle-deco" style={{ top, left, bottom, right, color }}>
      <Icon size={80} />
    </div>
  );
}
