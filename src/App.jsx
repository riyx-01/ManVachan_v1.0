import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Compass, PenTool, Settings, Volume2, VolumeX, Sparkles } from 'lucide-react';

export default function App() {
  const [view, setView] = useState('home');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [story, setStory] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // --- SMART NARRATIVE ENGINE ---
  const weaveStory = (hero) => {
    const heroName = hero.trim() || "The Traveler";
    const beats = [
      {
        title: "The Awakening",
        text: `In the quiet ripples of history, ${heroName} stood alone at the edge of the Jade Mountains. The air was thick with the scent of jasmine and the weight of a curious destiny. It was a day like no other, for the wind whispered a name that had been forgotten for centuries.`,
        image: `https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800`
      },
      {
        title: "The Mysterious Call",
        text: `As ${heroName} ventured deeper into the silent woods, a glowing trail appeared—a path of stardust that seemed to respond to every heartbeat. There were no maps for this journey, only the inner compass that had always pointed toward the unknown.`,
        image: `https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800`
      },
      {
        title: "The Ancient Mirror",
        text: `Deep within a hidden cave, ${heroName} found a mirror made of frozen time. When our hero looked into it, the reflection showed not a person, but a radiant light. It became clear that the strength sought in the mountains was already dwelling within.`,
        image: `https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800`
      },
      {
        title: "The Transformation",
        text: `The stardust trail merged with ${heroName}, turning doubt into wisdom and fear into a magnificent song. The entire world seemed to bow in recognition as the seeker became the Sage of the Jade Mountains.`,
        image: `https://images.unsplash.com/photo-1502481851512-e9e2529bbbf9?auto=format&fit=crop&q=80&w=800`
      },
      {
        title: "The Returning Legacy",
        text: `${heroName} returned to the village, not with gold or treasures, but with a gaze that could calm a storm. The story ends here, but the wisdom of the mountains lives on in every heart that our hero touches.`,
        image: `https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800`
      }
    ];

    return {
      id: Date.now(),
      title: `${heroName.toUpperCase()}: THE CHRONICLE`,
      beats,
      moral: "The greatest journey is the return to your own true self."
    };
  };

  const handleCreate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setStory(weaveStory(prompt));
      setIsGenerating(false);
      setView('read');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 4500);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      if (!isMuted) audioRef.current.play().catch(() => {});
      else audioRef.current.pause();
    }
  }, [isMuted]);

  return (
    <div className="min-h-screen">
      <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" loop />
      
      {/* Navigation */}
      <nav className="manuscript-nav">
        <div className={`nav-link ${view === 'home' ? 'active' : ''}`} onClick={() => setView('home')}>Journal</div>
        <div className={`nav-link ${view === 'read' ? 'active' : ''}`} onClick={() => story && setView('read')}>Manuscript</div>
        <div className="nav-link" onClick={() => setIsMuted(!isMuted)}>{isMuted ? 'Muted' : 'Sound ON'}</div>
      </nav>

      <div className="story-scroll-container">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 space-y-16">
              <header>
                <h1 className="manuscript-title">ManVachan</h1>
                <p className="manuscript-subtitle">— Digitizing the Ancient Lore —</p>
              </header>

              <div className="manuscript-page text-center space-y-12">
                <div className="space-y-4">
                  <p className="font-bold uppercase tracking-widest text-xs text-[#c5a059]">Enter the name of your Hero</p>
                  <input 
                    className="royal-input"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Who will the stars follow today?"
                  />
                </div>

                <button 
                  onClick={handleCreate} 
                  disabled={isGenerating || !prompt.trim()}
                  className="royal-button"
                >
                  {isGenerating ? "Consulting the Stars..." : "Begin the Chronicle"}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="manuscript-page !p-8 !m-0 flex items-center gap-6">
                    <Book className="text-[#c5a059]" size={40} />
                    <div>
                      <p className="font-black text-sm">ARCHIVES</p>
                      <p className="text-xs text-gray-500 italic">Explore past wisdom</p>
                    </div>
                 </div>
                 <div className="manuscript-page !p-8 !m-0 flex items-center gap-6">
                    <PenTool className="text-[#c5a059]" size={40} />
                    <div>
                      <p className="font-black text-sm">SCRIBES</p>
                      <p className="text-xs text-gray-500 italic">The art of the lore</p>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}

          {view === 'read' && story && (
            <motion.div key="read" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-24">
              <header className="mb-20">
                <h1 className="manuscript-title !text-4xl">{story.title}</h1>
                <div className="w-24 h-0.5 bg-[#c5a059] mx-auto mt-4" />
              </header>

              {story.beats.map((beat, i) => (
                <div key={i} className="manuscript-page">
                   <h3 className="manuscript-subtitle !text-left !text-2xl mb-6">— Book {i+1}: {beat.title} —</h3>
                   <img src={beat.image} className="story-image" alt="Folio" />
                   <div className="story-text-pane">
                      <span className="drop-cap">{beat.text.charAt(0)}</span>
                      {beat.text.slice(1)}
                   </div>
                </div>
              ))}

              <div className="manuscript-page !bg-[#1a1a2e] !text-white text-center">
                 <Sparkles className="mx-auto text-[#c5a059] mb-4" size={32} />
                 <h4 className="font-bold text-xs tracking-widest uppercase mb-4 text-[#c5a059]">The Wisdom Retrieved</h4>
                 <p className="text-3xl font-serif italic">"{story.moral}"</p>
              </div>

              <button onClick={() => setView('home')} className="royal-button !outline !outline-1 !outline-[#1a1a2e] !bg-transparent !text-[#1a1a2e]">
                Finish the Scroll
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
