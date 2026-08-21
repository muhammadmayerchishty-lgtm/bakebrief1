import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ASSETS } from '../data/menuData';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const phrases = [
    'Preparing the Brief...',
    'Balancing the Evidence...',
    'Authenticating 24K Gold Stamping...',
    'Court is in Session...',
  ];

  useEffect(() => {
    const counterObj = { val: 0 };
    const tween = gsap.to(counterObj, {
      val: 100,
      duration: 2.2,
      ease: 'power3.inOut',
      onUpdate: () => {
        setProgress(Math.floor(counterObj.val));
      },
      onComplete: () => {
        setTimeout(() => onComplete(), 500);
      },
    });

    const phraseTimer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 550);

    return () => {
      tween.kill();
      clearInterval(phraseTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      exit={{
        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
        transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] },
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#050505] text-[#F5F5F0] px-6 py-12 select-none overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C5A059]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full flex justify-between items-center max-w-7xl opacity-50 text-[10px] tracking-[0.4em] font-mono uppercase text-[#C5A059]">
        <span>BAKEBRIEF ATELIER</span>
        <span>CASE NO. 802</span>
      </div>

      <div className="flex flex-col items-center text-center max-w-xl my-auto relative z-10">
        {/* Glowing Logo Crest */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-8"
        >
          <div className="absolute inset-0 rounded-full bg-[#C5A059]/20 blur-3xl animate-pulse" />
          <img
            src={ASSETS.logoCrest}
            alt="BakeBrief Gold Crest"
            className="w-28 h-28 md:w-36 md:h-36 object-contain rounded-full border border-[#C5A059]/40 shadow-[0_0_50px_rgba(197,160,89,0.3)]"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-3xl md:text-5xl font-light tracking-tight mb-2 text-[#F5F5F0] uppercase font-sans"
        >
          BakeBrief
        </motion.h1>

        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#C5A059] font-mono mb-8"
        >
          Every Bite Wins The Case
        </motion.p>

        {/* Dynamic Phrase */}
        <div className="h-6 mb-8 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={phraseIndex}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="text-xs font-mono text-white/60 tracking-[0.2em] uppercase"
            >
              {phrases[phraseIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress Counter */}
        <div className="w-64 md:w-80">
          <div className="flex justify-between items-center text-[10px] font-mono text-white/40 mb-2 tracking-widest">
            <span>DOCKET DISCOVERY</span>
            <span className="text-[#C5A059] font-bold">{progress}%</span>
          </div>
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden p-[1px]">
            <motion.div
              className="h-full bg-gradient-to-r from-[#8C6A2B] via-[#C5A059] to-[#FFF8DC] rounded-full shadow-[0_0_12px_#C5A059]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="text-center text-[10px] text-white/30 font-mono tracking-[0.3em] uppercase">
        SUPREME CULINARY PRECISION • EST. 2026
      </div>
    </motion.div>
  );
}

