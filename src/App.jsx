import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Book, Sparkles, Settings, Telescope, Volume2, VolumeX, Heart, Cloud } from 'lucide-react';

// --- SWEET & SENSIBLE STORY ENGINE ---
const DREAM_TALES = [
  {
    theme: "The Cloud who couldn't Rain",
    scenes: [
      {
        text: "Once upon a time, there was a fluffy little cloud named Cirrus. While all his friends were busy raining on gardens, Cirrus only produced tiny soap bubbles! He felt very sad and different.",
        image: "https://picsum.photos/seed/cloud1/500/500"
      },
      {
        text: "Cirrus tried everything to be a 'real' rain cloud. He drank lots of mountain mist and even stood over the ocean, but only more bubbles came out. The birds laughed and the flowers wondered where the water was.",
        image: "https://picsum.photos/seed/cloud2/500/500"
      },
      {
        text: "One afternoon, he flew over a very grumpy kingdom where no one had smiled for years. As Cirrus floated by, his bubbles began to fall. One landed on the nose of a cranky king!",
        image: "https://picsum.photos/seed/cloud3/500/500"
      },
      {
        text: "The King popped the bubble and a tiny giggle escaped his lips. Soon, the whole kingdom was chasing bubbles, laughing and dancing! Cirrus realized that while he couldn't give water, he could give something just as important: Joy.",
        image: "https://picsum.photos/seed/cloud4/500/500"
      }
    ],
    moral: "You don't have to be like everyone else to do something wonderful. Your unique gift is your magic!"
  },
  {
    theme: "The Star who wanted to Sleep",
    scenes: [
      {
        text: "Dot was the smallest star in the Milky Way, and she was very, very tired. 'Why do we have to glow all night?' she yawned. She just wanted to find a soft cloud and go to sleep like the children on Earth.",
        image: "https://picsum.photos/seed/star1/500/500"
      },
      {
        text: "She decided to stop glowing and hid behind a big purple planet. But down on Earth, a little boy named Leo was lost in the woods. He looked up, and without Dot's light, he couldn't see the path home.",
        image: "https://picsum.photos/seed/star2/500/500"
      },
      {
        text: "Dot saw Leo's tears and felt a warm flicker in her heart. She realized that even a tiny star has a big responsibility. She took a deep breath and glowed brighter than she ever had before!",
        image: "https://picsum.photos/seed/star3/500/500"
      },
      {
        text: "Leo saw Dot blinking and followed the light all the way back to his bedroom. Dot felt so happy helping her friend that she wasn't tired anymore. She realized that being a guiding light is the best job in the universe.",
        image: "https://picsum.photos/seed/star4/500/500"
      }
    ],
    moral: "Even the smallest kindness can light up someone's darkest night."
  }
];

export default function App() {
  const [view, setView] = useState('home');
  const [inputTerm, setInputTerm] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStory, setCurrentStory] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const startAdventure = () => {
    if (!inputTerm.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      const tale = DREAM_TALES[Math.floor(Math.random() * DREAM_TALES.length)];
      setCurrentStory(tale);
      setIsGenerating(false);
      setView('read');
    }, 4000);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" loop />
      
      {/* --- FLOATING STARS --- */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div 
            key={i}
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.2, 1] }}
            transition={{ duration: 2 + Math.random() * 3, repeat: Infinity }}
            className="absolute rounded-full bg-white shadow-lg"
            style={{ 
              width: Math.random() * 4 + 2 + 'px', 
              height: Math.random() * 4 + 2 + 'px', 
              top: Math.random() * 100 + '%', 
              left: Math.random() * 100 + '%' 
            }}
          />
        ))}
      </div>

      {/* --- THE ROCKET --- */}
      <div className="rocket">
        <div className="rocket-body">
          <div className="body"></div>
          <div className="fin fin-left"></div>
          <div className="fin fin-right"></div>
          <div className="window"></div>
        </div>
        <div className="exhaust-flame"></div>
      </div>

      <div className="max-w-[800px] mx-auto pt-20 px-6 pb-40">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div key="home" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} className="text-center space-y-12">
              <header className="space-y-4">
                <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
                   <Heart size={80} className="text-[#ffafcc] mx-auto shadow-2xl" />
                </motion.div>
                <h1 className="text-6xl font-black text-white italic tracking-tight drop-shadow-lg">ManVachan</h1>
                <p className="text-2xl text-white/80 font-bold">Where Dreams Become Tales</p>
              </header>

              <div className="space-y-6 max-w-[500px] mx-auto">
                <div className="relative">
                  <input 
                    type="text"
                    value={inputTerm}
                    onChange={(e) => setInputTerm(e.target.value)}
                    placeholder="Who is the hero today? (e.g. A Brave Bunny)"
                    className="cloud-input text-center"
                  />
                  <div className="absolute -top-4 -right-4 bg-yellow-300 p-2 rounded-full rotate-12 shadow-md">
                    <Sparkles size={24} className="text-white" />
                  </div>
                </div>
                
                <button 
                  onClick={startAdventure}
                  disabled={!inputTerm.trim() || isGenerating}
                  className="dream-button w-full"
                >
                  {isGenerating ? "WAKING UP THE DREAMS..." : "[ LAUNCH ADVENTURE ]"}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="dream-card flex items-center gap-4">
                   <div className="p-4 bg-[#a2d2ff] rounded-3xl"><Telescope className="text-white" /></div>
                   <div className="text-left"><p className="font-black text-white">Daily Star</p><p className="text-xs text-white/60 font-bold">NEW MANUSCRIPT!</p></div>
                 </div>
                 <div className="dream-card flex items-center gap-4">
                   <div className="p-4 bg-[#cdb4db] rounded-3xl"><Book className="text-white" /></div>
                   <div className="text-left"><p className="font-black text-white">My Scrolls</p><p className="text-xs text-white/60 font-bold">12 TALES KEPT</p></div>
                 </div>
              </div>
            </motion.div>
          )}

          {view === 'read' && currentStory && (
            <motion.div key="read" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-20 flex flex-col items-center">
              <header className="text-center space-y-2">
                 <h2 className="text-4xl font-black text-white italic drop-shadow-md">{currentStory.theme}</h2>
                 <div className="w-24 h-2 bg-[#ffea00] mx-auto rounded-full shadow-lg" />
              </header>

              {currentStory.scenes.map((scene, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true }}
                  className="story-panel w-full"
                >
                  <div className="story-img-wrapper">
                    <img src={scene.image} className="w-full h-full object-cover" alt="illustration" />
                  </div>
                  <div className="dream-card w-full">
                    <p className="story-text font-bold leading-relaxed">{scene.text}</p>
                  </div>
                </motion.div>
              ))}

              <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} className="moral-bubble">
                 <div className="flex flex-col items-center gap-2">
                   <Heart className="text-red-400" fill="currentColor" />
                   <p className="text-sm uppercase tracking-widest text-[#959DB1] mb-2">The Golden Moral</p>
                   <p>"{currentStory.moral}"</p>
                 </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- DREAM NAV --- */}
      <nav className="dream-nav">
        <div onClick={() => setView('home')} className={`nav-item ${view === 'home' ? 'active' : ''}`}>
          <Star />
          <span>DREAM</span>
        </div>
        <div onClick={() => currentStory && setView('read')} className={`nav-item ${view === 'read' ? 'active' : ''} ${!currentStory ? 'opacity-20' : ''}`}>
          <Book />
          <span>READ</span>
        </div>
        <div className="nav-item">
          <Telescope />
          <span>EXPLORE</span>
        </div>
        <div className="nav-item" onClick={() => setIsMuted(!isMuted)}>
          {isMuted ? <VolumeX /> : <Volume2 />}
          <span>{isMuted ? 'SILENT' : 'SONGS'}</span>
        </div>
      </nav>
    </div>
  );
}
