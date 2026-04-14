import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, BookOpen, Compass, Settings, Sparkles, Send, Quote, Trophy, History, Volume2, VolumeX } from 'lucide-react';

const STORY_TEMPLATES = [
  {
    theme: "Wisdom",
    acts: [
      "{user} lived in a quiet corner of the world, searching for a meaning that felt lost in the noise of everyday life.",
      "One day, an old wanderer spoke of a hidden mirror in the mountains that didn't show your face, but your destiny.",
      "The climb was steep, and {user} felt like giving up many times. But with every step, the heart grew stronger than the legs.",
      "Finally reaching the peak, the mirror was found. It showed not a person, but a single glowing flame that grew the more {user} shared it with others.",
      "Returning home, the village was changed, not by magic, but by the kindness {user} brought back from the heights."
    ],
    moral: "The light you seek is the light you give to others."
  },
  {
    theme: "Courage",
    acts: [
      "In the land of {user}, the shadows had grown long because the people had forgotten how to laugh in the dark.",
      "A mysterious wall appeared overnight, blocking the path to the only well in the kingdom. Fear was everywhere.",
      "While others waited for a hero, {user} realized that courage isn't the absence of fear, but the decision to move despite it.",
      "Approaching the wall with a simple song, the bricks turned into butterflies. The wall was made of the people's own doubts.",
      "The well was reached, and the water tasted of pure truth. The shadows vanished as soon as the first person smiled again."
    ],
    moral: "Faith is the bird that feels the light when the dawn is still dark."
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [story, setStory] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const generateDeepStory = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    
    setTimeout(() => {
      const template = STORY_TEMPLATES[Math.floor(Math.random() * STORY_TEMPLATES.length)];
      const seed = prompt || "Spirit";
      
      const scenes = template.acts.map((act, i) => ({
        title: `Scene ${i + 1}`,
        text: act.replace(/{user}/g, seed),
        image: `https://picsum.photos/seed/${seed}${i}/800/800`
      }));

      setStory({ ...template, scenes, title: seed.toUpperCase() + " TALE" });
      setIsGenerating(false);
      setActiveTab('read');
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
    <div className="mobile-container">
      <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" loop />
      
      {/* Background */}
      <div className="fixed inset-0 bg-[#0a0a0b] -z-10" />

      <div className="h-full flex flex-col w-full relative">
        
        {/* Header */}
        <header className="px-6 pt-12 pb-6 flex justify-between items-center z-10">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">ManVachan</h1>
            <p className="text-xs text-blue-500 uppercase tracking-widest font-bold">V-1.0 Heritage</p>
          </div>
          <button onClick={() => setIsMuted(!isMuted)} className="p-3 bg-white/5 rounded-full border border-white/10">
            {isMuted ? <VolumeX className="text-white/40" /> : <Volume2 className="text-blue-400" />}
          </button>
        </header>

        <main className="flex-1 overflow-y-auto px-6 pb-24 custom-scroll z-10">
          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <motion.div key="home" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
                <div className="p-6 bg-blue-600/10 rounded-[32px] border border-blue-500/20 space-y-4">
                  <Quote className="text-blue-400" />
                  <p className="text-lg text-white font-medium italic">
                    "The journey of a thousand miles begins with a single thought."
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest">Create New Lore</h3>
                  <div className="relative group">
                    <textarea 
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe your theme..."
                      className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-white text-lg min-h-[180px] outline-none focus:border-blue-500/50 transition-all font-medium"
                    />
                    <button 
                      onClick={generateDeepStory}
                      disabled={!prompt.trim() || isGenerating}
                      className="absolute bottom-4 right-4 p-4 bg-blue-500 text-white rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                    >
                      {isGenerating ? <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Send size={24} />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 bg-white/5 rounded-3xl border border-white/10 text-center space-y-2">
                    <History className="mx-auto text-blue-400" />
                    <p className="text-xl font-bold text-white">12</p>
                    <p className="text-xs text-white/40 font-bold uppercase">Tales</p>
                  </div>
                  <div className="p-5 bg-white/5 rounded-3xl border border-white/10 text-center space-y-2">
                    <Trophy className="mx-auto text-amber-400" />
                    <p className="text-xl font-bold text-white">Zen</p>
                    <p className="text-xs text-white/40 font-bold uppercase">Rank</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'read' && story && (
              <motion.div key="read" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 pb-20">
                <header className="text-center">
                  <h2 className="text-3xl font-bold text-white italic tracking-tighter">{story.title}</h2>
                  <div className="w-12 h-1 bg-blue-500 mx-auto mt-4 rounded-full" />
                </header>

                {story.scenes.map((scene, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 30 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <div className="rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
                      <img src={scene.image} className="w-full aspect-square object-cover" alt="scene" />
                    </div>
                    <p className="text-xl leading-relaxed text-white/90 font-medium">{scene.text}</p>
                  </motion.div>
                ))}

                <div className="p-8 bg-blue-500/10 border-2 border-dashed border-blue-500/30 rounded-[40px] text-center space-y-4">
                  <h4 className="text-blue-400 font-bold uppercase tracking-widest text-xs">The Moral</h4>
                  <p className="text-2xl text-white font-bold italic">"{story.moral}"</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <nav className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto h-24 px-8 flex justify-between items-center bg-black/80 backdrop-blur-3xl border-t border-white/10 z-20">
          <TabButton active={activeTab === 'home'} icon={Home} label="Home" onClick={() => setActiveTab('home')} />
          <TabButton active={activeTab === 'read'} icon={BookOpen} label="Read" onClick={() => story && setActiveTab('read')} disabled={!story} />
          <TabButton active={activeTab === 'explore'} icon={Compass} label="Explore" onClick={() => {}} />
          <TabButton active={activeTab === 'settings'} icon={Settings} label="User" onClick={() => {}} />
        </nav>
      </div>
    </div>
  );
}

function TabButton({ active, icon: Icon, label, onClick, disabled }) {
  return (
    <button 
      onClick={disabled ? null : onClick} 
      className={`flex flex-col items-center gap-1 transition-all ${disabled ? 'opacity-20 ' : 'opacity-100'} ${active ? 'text-blue-400 scale-110' : 'text-white/40'}`}
    >
      <Icon size={24} />
      <span className="text-[10px] uppercase font-bold tracking-widest">{label}</span>
    </button>
  );
}
