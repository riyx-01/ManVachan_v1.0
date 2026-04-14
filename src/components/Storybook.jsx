import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Volume2, VolumeX, BookOpen, Scroll } from 'lucide-react';

const HERITAGE_SOUNDS = {
  heritage: 'https://assets.mixkit.co/active_storage/sfx/120/120-preview.mp3', // Placeholder for soft flute
  // A better looping ambient flute/sitar path
  ambient: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3'
};

export default function Storybook({ storyData }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const pages = storyData.scenes;

  // Sync mute state with Audio Ref
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      if (!isMuted) {
        audioRef.current.play().catch(e => console.log("User gesture needed"));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMuted]);

  // Restart audio on page load if not muted
  useEffect(() => {
    if (audioRef.current && !isMuted) {
      audioRef.current.play().catch(() => {});
    }
  }, []);

  const changePage = (dir) => {
    const next = dir === 'next' ? currentPage + 1 : currentPage - 1;
    if (next >= 0 && next < pages.length) {
      setCurrentPage(next);
      // Removed the bird sound, now only silent page flips or a soft 'paper' rustle
      const rustle = new Audio('https://assets.mixkit.co/active_storage/sfx/1723/1723-preview.mp3');
      rustle.volume = 0.1;
      rustle.play().catch(() => {});
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Background Ambient Audio */}
      <audio 
        ref={audioRef} 
        src={HERITAGE_SOUNDS.ambient} 
        loop 
        autoPlay={!isMuted} 
      />

      <div className="relative w-full max-w-5xl aspect-[1.6/1] flex flex-col items-center">
        
        {/* Book Container */}
        <div className="relative w-full h-full flex bg-heritage-red/20 heritage-border shadow-2xl p-4 overflow-hidden">
          
          {/* Left: Illustration Area */}
          <div className="w-1/2 h-full paper-texture border-r-2 border-royal-gold/30 relative">
            <div className="mandala-bg top-0 left-0" />
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="w-full h-full p-8"
              >
                <div className="w-full h-full heritage-border !border-2 relative overflow-hidden">
                  <img 
                    src={pages[currentPage].image} 
                    alt="Legacy Art"
                    className="w-full h-full object-cover grayscale-[0.2] sepia-[0.3]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-heritage-red/30 to-transparent" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Manuscript Area */}
          <div className="w-1/2 h-full paper-texture p-12 flex flex-col relative">
             <div className="mandala-bg bottom-0 right-0 rotate-180" />
             
             <div className="flex justify-between items-center mb-6 z-10">
                <span className="text-heritage-red font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                   <Scroll size={14} /> Page {currentPage + 1}
                </span>
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 heritage-button !shadow-none !p-2 !rounded-full opacity-60 hover:opacity-100"
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
             </div>

             <div className="flex-1 z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-3xl font-bold mb-6 border-b-2 border-royal-gold pb-2 tracking-wide">
                       {pages[currentPage].title}
                    </h2>
                    <p className="manuscript-text text-xl leading-relaxed">
                       {pages[currentPage].text}
                    </p>
                  </motion.div>
                </AnimatePresence>
             </div>

             <div className="mt-8 flex justify-between items-center z-10 border-t border-royal-gold/20 pt-6">
                <button 
                  onClick={() => changePage('prev')}
                  disabled={currentPage === 0}
                  className={`heritage-button ${currentPage === 0 ? 'opacity-0' : 'opacity-100'}`}
                >
                  <ChevronLeft />
                </button>

                <div className="text-royal-gold font-bold italic opacity-40">
                  Legacy of {currentPage + 1} of {pages.length}
                </div>

                <button 
                  onClick={() => changePage('next')}
                  disabled={currentPage === pages.length - 1}
                  className={`heritage-button ${currentPage === pages.length - 1 ? 'opacity-0' : 'opacity-100'}`}
                >
                  <ChevronRight />
                </button>
             </div>
          </div>
        </div>

        {/* Shadow Drop Under Book */}
        <div className="w-[90%] h-8 bg-black/40 blur-2xl rounded-[100%] mt-[-10px] opacity-50" />
      </div>

      <div className="mt-12 text-royal-gold/40 text-sm font-bold tracking-widest uppercase">
          Woven from users input: "{storyData.seedText.substring(0, 30)}..."
      </div>
    </div>
  );
}
