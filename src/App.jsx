import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, BookOpen, Search, Settings, Volume2, VolumeX, Send, History, Trophy } from 'lucide-react';

const STORY_TEMPLATES = [
  {
    theme: "Wisdom",
    acts: [
      "{user} lived in a quiet corner of the world, searching for a meaning that felt lost in the noise of everyday life.",
      "One day, an old wanderer spoke of a hidden mirror in the mountains that didn't show your face, but your destiny.",
      "The climb was steep, and {user} felt like giving up many times. But with every step, the heart grew stronger.",
      "Finally reaching the peak, the mirror was found. It showed not a person, but a single glowing flame that grew the more it was shared.",
      "Returning home, the village was changed by the kindness {user} brought back from the heights."
    ],
    moral: "The light you seek is the light you give to others."
  },
  {
    theme: "Courage",
    acts: [
      "In the land of {user}, the shadows had grown long because the people had forgotten how to laugh in the dark.",
      "A mysterious wall appeared overnight, blocking the path to the ancient well. Fear was everywhere.",
      "While others waited for a hero, {user} realized that courage isn't the absence of fear, but the decision to move despite it.",
      "Approaching the wall with a simple song, the bricks turned into butterflies. The wall was made of the people's own doubts.",
      "The well was reached, and the water tasted of pure truth. The shadows vanished as soon as the first person smiled."
    ],
    moral: "Faith is the bird that feels the light when the dawn is still dark."
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('status');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [story, setStory] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [backlight, setBacklight] = useState(true);
  const audioRef = useRef(null);

  const generateDeepStory = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    
    setTimeout(() => {
      const template = STORY_TEMPLATES[Math.floor(Math.random() * STORY_TEMPLATES.length)];
      const seed = prompt || "Spirit";
      
      const scenes = template.acts.map((act, i) => ({
        text: act.replace(/{user}/g, seed),
        image: `https://picsum.photos/seed/${seed}${i}/800/800`
      }));

      setStory({ ...template, scenes, title: seed.toUpperCase() + " LOG" });
      setIsGenerating(false);
      setActiveTab('map'); // Switch to story view
    }, 4000);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      if (!isMuted) audioRef.current.play().catch(() => {});
      else audioRef.current.pause();
    }
  }, [isMuted]);

  return (
    <div className={`pda2 ${backlight ? 'backlight-active' : ''}`}>
      <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" loop />
      
      <div className="pda2__bezel">
        {/* Hardware Screws */}
        <div className="pda2__screws">
          <Screw /><Screw /><Screw /><Screw />
        </div>

        {/* Home/Backlight Button */}
        <div className="pda2__knob" onClick={() => setBacklight(!backlight)}>
          <div className="pda2__knob-cap" />
        </div>

        <div className="pda2__led" />

        <div className="pda2__screen" style={{ opacity: backlight ? 1 : 0.6, transition: '0.3s' }}>
          {/* Status Bar */}
          <div className="pda2__statusbar">
            <div className="flex items-center gap-2">
              <span className="font-black">MAN-VAACHAN</span>
              <div className="w-2 h-4 bg-black animate-pulse" />
            </div>
            <div className="flex items-center gap-4">
              <span>{isMuted ? 'MUTE' : 'AUDIO'}</span>
              <span>12:45</span>
            </div>
          </div>

          <div className="pda2__viewport custom-scroll">
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div key="gen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full gap-4">
                   <div className="text-xl font-bold">CALCULATING_WISDOM...</div>
                   <div className="w-full h-4 border-2 border-black p-1">
                     <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 4 }} className="h-full bg-black" />
                   </div>
                </motion.div>
              ) : (
                <>
                  {activeTab === 'status' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="pda-card font-bold text-sm">
                        > READY_FOR_INPUT...
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-xs font-black">USER_SEED_INPUT:</label>
                        <textarea 
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          placeholder="Ex: A brave elephant..."
                          className="pda-input !h-32"
                        />
                      </div>

                      <button onClick={generateDeepStory} className="pda-button">
                        [ WEAVE_WISDOM ]
                      </button>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="pda-card text-center">
                          <History className="mx-auto mb-2" size={20} />
                          <div className="text-xs font-black">LOGS: 12</div>
                        </div>
                        <div className="pda-card text-center">
                          <Trophy className="mx-auto mb-2" size={20} />
                          <div className="text-xs font-black">ZEN: LVL 4</div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'map' && story && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 pb-10">
                      <header className="border-b-4 border-black pb-2">
                        <h2 className="text-2xl font-black italic">{story.title}</h2>
                      </header>

                      {story.scenes.map((scene, i) => (
                        <div key={i} className="space-y-4 story-scene">
                          <img src={scene.image} alt="Scene" />
                          <p className="text-lg leading-tight font-bold">{scene.text}</p>
                          <div className="h-0.5 bg-black/20 w-full" />
                        </div>
                      ))}

                      <div className="moral-box">
                        <div className="text-xs font-black mb-2 tracking-widest uppercase">The Moral of the Lore</div>
                        <p className="text-xl font-black italic">"{story.moral}"</p>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'info' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pda-card">
                      <h3 className="text-lg font-black mb-4">SYSTEM_INFO</h3>
                      <p className="font-bold">> UNIT: MV-98-PRIME</p>
                      <p className="font-bold">> OS: HERITAGE_V1.09</p>
                      <p className="font-bold">> SENSORS: GPT_WISDOM_CORE</p>
                      <div className="mt-6 p-4 border-2 border-dashed border-black text-xs font-bold">
                        The ancient wisdom has been digitized for current PDA hardware. 
                        Carry the scrolls everywhere you go.
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'sys' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <div className="pda-card">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-black">AUDIO_CORE:</span>
                          <button onClick={() => setIsMuted(!isMuted)} className="pda-button !m-0 !w-auto !px-6">
                            {isMuted ? 'OFF' : 'ON'}
                          </button>
                        </div>
                        <button onClick={() => window.location.reload()} className="pda-button !bg-red-900 border-2 border-black">
                          HARD_REBOOT_SYSTEM
                        </button>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Dock */}
        <div className="pda2__dock">
          <NavBtn active={activeTab === 'status'} icon={Home} label="STATUS" onClick={() => setActiveTab('status')} />
          <NavBtn active={activeTab === 'map'} icon={BookOpen} label="STORY" onClick={() => story && setActiveTab('map')} />
          <NavBtn active={activeTab === 'info'} icon={Search} label="INFO" onClick={() => setActiveTab('info')} />
          <NavBtn active={activeTab === 'sys'} icon={Settings} label="SYS" onClick={() => setActiveTab('sys')} />
        </div>
      </div>
    </div>
  );
}

function NavBtn({ active, icon: Icon, label, onClick }) {
  return (
    <div onClick={onClick} className={`pda2__db ${active ? 'active' : ''}`}>
      <Icon className="pda2__ico" />
      <span className="text-[10px] font-black">{label}</span>
    </div>
  );
}

function Screw() {
  return (
    <svg className="pda2__screw" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="7" fill="#26292f"></circle>
      <path d="M3 8h10" stroke="#70757d" stroke-width="2"></path>
    </svg>
  );
}
