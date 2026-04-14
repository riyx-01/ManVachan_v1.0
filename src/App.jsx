import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Book, Home, Telescope, Settings, Heart, Send, Volume2, VolumeX } from 'lucide-react';

// --- SEMANTIC STORY BUILDER ---
const buildAdventure = (seed) => {
  const hero = seed.charAt(0).toUpperCase() + seed.slice(1);
  return {
    title: `The Great Journey of ${hero}`,
    scenes: [
      {
        text: `In a world made of soft colors and gentle winds, ${hero} lived a very happy life. But ${hero} always had a curious heart, wondering what lay beyond the Great Sparkling River. One sunny morning, with a bag full of courage, the journey began.`,
        image: `https://loremflickr.com/800/500/${seed},landscape`
      },
      {
        text: `As ${hero} walked through the Whispering Woods, the trees began to hum a sweet melody. A small problem appeared: a bridge made of rainbows had lost its colors! ${hero} knew that only a truly brave heart could help the rainbow shine again.`,
        image: `https://loremflickr.com/800/500/${seed},forest`
      },
      {
        text: `By sharing a story and a warm smile, ${hero} helped the bridge glow once more. Crossing over, ${hero} found a field of golden sunflowers that matched the sunlight. The world felt bigger and more beautiful than ever before.`,
        image: `https://loremflickr.com/800/500/${seed},magic`
      },
      {
        text: `Returning home at sunset, ${hero} realized that the greatest adventure wasn't just the places seen, but the kindness shared along the way. The village gathered around to hear the tales of the brave traveler who brought the rainbow back to life.`,
        image: `https://loremflickr.com/800/500/${seed},sunset`
      }
    ],
    moral: `True bravery is found in kindness, and the best adventures are those we share with others.`
  };
};

export default function App() {
  const [view, setView] = useState('home');
  const [inputTerm, setInputTerm] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeStory, setActiveStory] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const startTelling = () => {
    if (!inputTerm.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      const story = buildAdventure(inputTerm);
      setActiveStory(story);
      setIsGenerating(false);
      setView('read');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 3500);
  };

  return (
    <div className="min-h-screen">
      <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" loop />
      
      <div className="storybook-hub">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
              <header className="space-y-4">
                <div className="brand-rocket">
                   <svg viewBox="0 0 24 24" fill="#ff85a1" className="w-full h-full">
                     <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75-4.365-9.75-9.75-9.75zm0 18c-4.557 0-8.25-3.693-8.25-8.25s3.693-8.25 8.25-8.25 8.25 3.693 8.25 8.25-3.693 8.25-8.25 8.25z" />
                     <path d="M12 6.75a.75.75 0 01.75.75v3h3a.75.75 0 010 1.5h-3v3a.75.75 0 01-1.5 0v-3h-3a.75.75 0 010-1.5h3v-3a.75.75 0 01.75-.75z" />
                   </svg>
                </div>
                <h1 className="heading-elite">ManVachan</h1>
                <p className="subheading-elite">A Masterpiece for Every Child</p>
              </header>

              <div className="space-y-8 text-center">
                 <div className="input-group">
                    <input 
                      type="text" 
                      value={inputTerm}
                      onChange={(e) => setInputTerm(e.target.value)}
                      placeholder="Who shall we write about?" 
                      className="premium-input"
                    />
                 </div>
                 <button 
                  onClick={startTelling}
                  disabled={!inputTerm.trim() || isGenerating}
                  className="action-btn w-full"
                 >
                   {isGenerating ? "CRAFTING YOUR MASTERPIECE..." : "GENERATE STORY"}
                 </button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                 <div className="story-page p-8 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-lg">Pick a Classic</p>
                      <p className="text-sm text-gray-400">Read our curated heritage tales</p>
                    </div>
                    <Book className="text-[#4361ee]" />
                 </div>
              </div>
            </motion.div>
          )}

          {view === 'read' && activeStory && (
            <motion.div key="read" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
              <header className="text-center py-10">
                 <p className="subheading-elite mb-4">You are Reading</p>
                 <h2 className="heading-elite">{activeStory.title}</h2>
                 <div className="mt-4 flex justify-center gap-2">
                    <Sparkles className="text-yellow-400" size={20} />
                    <Sparkles className="text-yellow-400" size={20} />
                    <Sparkles className="text-yellow-400" size={20} />
                 </div>
              </header>

              {activeStory.scenes.map((scene, i) => (
                <div key={i} className="story-page">
                   <div className="image-frame">
                      <img src={scene.image} alt="Story scene" />
                   </div>
                   <div className="text-frame">
                      {scene.text}
                   </div>
                </div>
              ))}

              <div className="moral-plaque">
                 <Heart className="mx-auto mb-4" size={40} fill="#fff" />
                 <p className="text-sm uppercase tracking-widest opacity-80 mb-2">The Lesson of Life</p>
                 <p>"{activeStory.moral}"</p>
              </div>
              
              <button 
                onClick={() => setView('home')}
                className="action-btn w-full"
              >
                BACK TO HOME
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <nav className="nav-dock-elite">
         <div onClick={() => setView('home')} className={`nav-link ${view === 'home' ? 'active' : ''}`}>
           <Home size={24} />
           <span>HOME</span>
         </div>
         <div onClick={() => activeStory && setView('read')} className={`nav-link ${view === 'read' ? 'active' : ''} ${!activeStory ? 'opacity-20' : ''}`}>
           <Book size={24} />
           <span>BOOK</span>
         </div>
         <div className="nav-link">
           <Telescope size={24} />
           <span>FIND</span>
         </div>
         <div className="nav-link" onClick={() => setIsMuted(!isMuted)}>
           {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
           <span>{isMuted ? 'MUTE' : 'PLAY'}</span>
         </div>
      </nav>
    </div>
  );
}
