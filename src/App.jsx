import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Book, Gamepad2, Volume2, VolumeX, ArrowLeft, ArrowRight, Star, Cloud, Moon, Sun, Rainbow } from 'lucide-react';

// --- THE MAGIC LIBRARIAN DATA ---
const STORY_DATABASE = [
  {
    trigger: ["elephant", "jungle", "friends"],
    base_story: "Gajju the Elephant lived in the deep jungles of Bharat. He was very big, but very afraid of mice. One day, a mouse named Minu fell into a puddle.",
    acts: [
      { text: "In the thick, green jungles, Gajju the Big Elephant was having a slow morning. The sun was warm, and the birds were singing.", sound: "jungle", img: "elephant_jungle" },
      { text: "Suddenly, he saw Minu the tiny mouse trapped in a muddy hole. Minu was crying for help!", sound: "jungle", img: "mouse_hole" },
      { text: "Though Gajju was afraid of mice, he knew he had to be brave. He used his long trunk to gently lift Minu out of the mud.", sound: "jungle", img: "elephant_rescue" },
      { text: "Minu hugged Gajju's trunk. From that day on, the biggest elephant and the smallest mouse became the best of friends.", sound: "jungle", img: "friends_celebration" }
    ],
    moral: "Kindness makes us brave, and friends can come in all sizes!"
  },
  {
    trigger: ["space", "stars", "rocket"],
    base_story: "A little girl named Aria built a rocket out of cardboard boxes. She wanted to visit the Moon and taste cheese.",
    acts: [
      { text: "Aria stood in her garden next to her shiny cardboard rocket. 'Destination: The Moon!' she shouted to the stars.", sound: "night", img: "girl_rocket" },
      { text: "She counted down—3, 2, 1—and with a spark of imagination, the rocket zoomed past the clouds and into the starry sky.", sound: "night", img: "space_flight" },
      { text: "The Moon was giant and silver. Aria stepped out and realized the Moon wasn't made of cheese, but of magical moon-dust and dreams.", sound: "night", img: "moon_surface" },
      { text: "She brought back a bag of moon-dust for her little brother, proving that even a cardboard box can take you to the stars.", sound: "night", img: "happy_return" }
    ],
    moral: "Your imagination is the most powerful ship in the universe."
  }
];

export default function App() {
  const [view, setView] = useState('home');
  const [elements, setElements] = useState('');
  const [currentStory, setCurrentStory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // --- NARRATION & SOUND LOGIC ---
  const speak = (text) => {
    if (isMuted) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1.2;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (view === 'read' && currentStory) {
      speak(currentStory.acts[currentPage].text);
      // Play Ambient Sound (Placeholder logic)
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
    } else {
      window.speechSynthesis.cancel();
    }
  }, [currentPage, view]);

  const handleMagicCreate = () => {
    if (!elements.trim()) return;
    setIsGenerating(true);
    
    setTimeout(() => {
      // Find matching story based on keywords
      const match = STORY_DATABASE.find(s => 
        s.trigger.some(tag => elements.toLowerCase().includes(tag))
      ) || STORY_DATABASE[0];

      setCurrentStory(match);
      setCurrentPage(0);
      setIsGenerating(false);
      setView('read');
    }, 4000);
  };

  return (
    <div className="min-h-screen">
      <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" loop muted={isMuted} />
      
      {/* --- NAVBAR --- */}
      <nav className="kids-nav">
        <div className={`kids-nav-link ${view === 'home' ? 'active' : ''}`} onClick={() => setView('home')}>Home</div>
        <div className="kids-nav-link" onClick={() => setView('library')}>Library</div>
        <div className="kids-nav-link" onClick={() => setView('games')}>Games</div>
        <div className="kids-nav-link" onClick={() => setIsMuted(!isMuted)}>
          {isMuted ? <VolumeX /> : <Volume2 />}
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div key="home" className="hero-section">
            {/* Floating Doodles */}
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
              onClick={handleMagicCreate}
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

        {view === 'read' && currentStory && (
          <motion.div key="read" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="storybook-view">
             {/* LEFT PAGE: ILLUSTRATION */}
             <div className="page-left">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentPage}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="story-illustration"
                    src={`https://picsum.photos/seed/${currentStory.acts[currentPage].img}/800/800`}
                  />
                </AnimatePresence>
             </div>

             {/* RIGHT PAGE: STORY TEXT */}
             <div className="page-right">
                <div className="flex-1">
                  <h2 className="text-4xl font-black text-[#7209b7] mb-8 uppercase tracking-tighter">
                    {currentStory.trigger[0]}_LOG
                  </h2>
                  <motion.p 
                    key={currentPage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-2xl leading-relaxed text-gray-800 font-medium"
                  >
                    {currentStory.acts[currentPage].text}
                  </motion.p>
                </div>

                {currentPage === currentStory.acts.length - 1 && (
                  <div className="bg-[#ff9f1c]/10 border-4 border-dashed border-[#ff9f1c] p-6 rounded-3xl mb-8">
                     <p className="font-black text-[#ff9f1c] text-xs uppercase mb-2">The Magical Lesson</p>
                     <p className="text-xl font-bold">"{currentStory.moral}"</p>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <NavButton 
                    disabled={currentPage === 0} 
                    onClick={() => setCurrentPage(p => p - 1)}
                    icon={ArrowLeft}
                  />
                  <div className="text-lg font-black text-gray-300">
                    PAGE {currentPage+1} OF {currentStory.acts.length}
                  </div>
                  <NavButton 
                    onClick={() => currentPage < currentStory.acts.length - 1 ? setCurrentPage(p => p + 1) : setView('home')}
                    icon={currentPage === currentStory.acts.length - 1 ? Home : ArrowRight}
                  />
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Doodle({ icon: Icon, top, left, bottom, right, color }) {
  return (
    <motion.div 
      className="floating-item"
      style={{ top, left, bottom, right, color }}
      animate={{ y: [0, -20, 0] }}
      transition={{ duration: 4 + Math.random() * 2, repeat: Infinity }}
    >
      <Icon size={48} />
    </motion.div>
  );
}

function NavButton({ icon: Icon, onClick, disabled }) {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`p-5 bg-[#7209b7] text-white rounded-full shadow-xl transition-all ${disabled ? 'opacity-0' : 'hover:scale-110 active:scale-95'}`}
    >
      <Icon size={32} />
    </button>
  );
}
