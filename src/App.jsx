import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Book, Gamepad2, Volume2, VolumeX, ArrowLeft, ArrowRight, Star, Cloud, Moon, Sun, Rainbow, Pencil, Rocket } from 'lucide-react';

// --- ADVANCED STORY RETRIEVAL ENGINE ---
const STORY_REWRITE_ENGINE = (keywords) => {
  const K = keywords.toLowerCase();
  
  // High-Quality Themes
  const THEMES = [
    {
      tags: ["elephant", "jungle", "mouse"],
      title: "The Giant and the Tiny Hero",
      pages: [
        { text: "In the heart of the whispering jungle, Gajju the Elephant was famous for being the biggest and the kindest. He loved the smell of jasmine and the sound of the rain.", img: "elephant-1" },
        { text: "One day, a tiny mouse named Miku got stuck in a prickly bush. Everyone ignored Miku's small cries, but Gajju's big ears heard him from a mile away.", img: "mouse-bush" },
        { text: "With great care, Gajju used his trunk to clear the thorns. He didn't care that he was a giant and Miku was small; he only cared that someone needed help.", img: "trunk-rescue" },
        { text: "Miku and Gajju realized that size doesn't matter when it comes to a hero's heart. They spent the sunset sharing stories and sweet jungle fruits.", img: "friends-sunset" }
      ],
      moral: "True strength lies in being gentle to those smaller than you."
    },
    {
      tags: ["rocket", "space", "stars"],
      title: "Aria's Cardboard Journey",
      pages: [
        { text: "Aria spent all afternoon building a rocket out of a refrigerator box. She painted it with glittery stars and gave it a secret golden button.", img: "cardboard-rocket" },
        { text: "Suddenly, the golden button glowed. The rocket wasn't on the floor anymore—it was soaring past the clouds toward the silver moon!", img: "space-launch" },
        { text: "She met a Moon-Cat who taught her how to dance in zero gravity. Everything was made of stardust and tasted like warm vanilla milk.", img: "moon-cat" },
        { text: "When Aria woke up, she found a piece of moon-dust in her pocket. She knew that with imagination, any box can take you to the stars.", img: "bedroom-morning" }
      ],
      moral: "Your imagination is the most magical ship ever built."
    }
  ];

  // Logic: Search for tags or return a high-quality default
  return THEMES.find(t => t.tags.some(tag => K.includes(tag))) || THEMES[0];
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
      setStory(STORY_REWRITE_ENGINE(input));
      setCurrentPage(0);
      setIsGenerating(false);
      setView('read');
    }, 3500);
  };

  return (
    <div className="min-h-screen relative">
      <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" loop muted={isMuted} />
      
      {/* --- THE GLOBAL DOODLE CANVAS (RESTORED EVERYWHERE) --- */}
      <div className="doodle-canvas">
        <Doodle icon={Star} top="5%" left="10%" color="var(--p-yellow)" />
        <Doodle icon={Cloud} top="15%" right="15%" color="var(--p-blue)" />
        <Doodle icon={Moon} top="45%" right="5%" color="var(--p-purple)" />
        <Doodle icon={Sun} bottom="10%" right="8%" color="var(--p-yellow)" />
        <Doodle icon={Rocket} top="60%" left="5%" color="var(--p-pink)" />
        <Doodle icon={Pencil} bottom="20%" left="15%" color="var(--p-blue)" />
      </div>

      {/* --- GLOBAL NAV --- */}
      <nav className="global-nav">
        <div className={`nav-item ${view === 'home' ? 'active' : ''}`} onClick={() => setView('home')}>HOME</div>
        <div className={`nav-item ${view === 'library' ? 'active' : ''}`} onClick={() => setView('library')}>LIBRARY</div>
        <div className={`nav-item ${view === 'games' ? 'active' : ''}`} onClick={() => setView('games')}>GAMES</div>
        <button onClick={() => setIsMuted(!isMuted)} className="p-2 text-[#7209b7]">
          {isMuted ? <VolumeX /> : <Volume2 />}
        </button>
      </nav>

      <div className="relative z-10 pt-24 pb-20 px-6">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hero-section">
              <h1 className="hero-title">CREATE YOUR OWN<br/>MAGICAL STORYBOOK</h1>
              <div className="input-bubble-container">
                <input 
                  className="magical-input" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Elephant, Stars, Space adventure..."
                />
              </div>
              <button onClick={handleCreate} disabled={isGenerating || !input.trim()} className="magical-btn-global mt-10">
                {isGenerating ? "RETRIEVING LORE..." : "CREATE STORY"}
              </button>
            </motion.div>
          )}

          {view === 'read' && story && (
            <motion.div key="read" initial={{ scale: 0.8, rotateY: -90 }} animate={{ scale: 1, rotateY: 0 }} className="master-book flip-book-container">
              <div className="book-page book-leaf">
                {/* LEFT: BLENDED IMAGE */}
                <div className="left-panel">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={currentPage} 
                      className="w-full h-full relative"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    >
                      <img 
                        src={`https://picsum.photos/seed/${story.pages[currentPage].img}/800/800`}
                        className="story-image-blend"
                        alt="Scene illustration"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
                {/* RIGHT: TEXT PANEL */}
                <div className="right-panel">
                  <div className="flex-1">
                    <h2 className="text-4xl mb-8">{story.title}</h2>
                    <motion.p key={currentPage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl leading-relaxed text-gray-700">
                      {story.pages[currentPage].text}
                    </motion.p>
                  </div>

                  {currentPage === story.pages.length - 1 && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-[#ff9f1c]/10 border-4 border-dashed border-[#ff9f1c] p-6 rounded-3xl mb-8">
                       <p className="font-bold text-[#ff9f1c] text-xs uppercase mb-1">The Lesson Learned</p>
                       <p className="text-xl italic font-bold">"{story.moral}"</p>
                    </motion.div>
                  )}

                  <div className="flex justify-between items-center">
                    <button disabled={currentPage === 0} onClick={() => setCurrentPage(p => p - 1)} className="page-nav-btn !opacity-50 disabled:opacity-0"><ArrowLeft /></button>
                    <span className="font-black text-gray-400">PAGE {currentPage + 1} OF {story.pages.length}</span>
                    <button onClick={() => currentPage < story.pages.length - 1 ? setCurrentPage(p => p + 1) : setView('home')} className="page-nav-btn"><ArrowRight /></button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'library' && (
             <motion.div key="lib" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
               {[1,2,3,4,5,6].map(i => (
                 <div key={i} className="magical-card !bg-white/80 !p-6 border-4 border-[#4cc9f0]">
                   <img src={`https://picsum.photos/seed/lib${i}/400/300`} className="w-full h-40 object-cover rounded-3xl mb-4" />
                   <h3 className="text-2xl text-[#7209b7]">ADVENTURE_{i}</h3>
                   <button onClick={() => { setStory(STORY_REWRITE_ENGINE('elephant')); setView('read'); }} className="magical-btn-global !text-sm !py-2 mt-4">READ NOW</button>
                 </div>
               ))}
             </motion.div>
          )}

          {view === 'games' && (
            <motion.div key="games" initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex flex-col items-center">
               <h2 className="text-5xl mb-12">ANIMAL MATCH!</h2>
               <div className="memory-grid">
                  {[1,2,3,4,5,6,7,8].map(i => (
                    <div key={i} className="memory-card">🎨</div>
                  ))}
               </div>
               <button className="magical-btn-global mt-12">REPLAY</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Doodle({ icon: Icon, top, left, bottom, right, color }) {
  return (
    <motion.div 
      className="doodle" 
      style={{ top, left, bottom, right, color }}
      animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
      transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <Icon size={64} />
    </motion.div>
  );
}
