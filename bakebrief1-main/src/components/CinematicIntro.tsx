import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, SkipForward, Flame, Sparkles, Scale, CheckCircle2 } from 'lucide-react';
import { ASSETS } from '../data/menuData';

interface CinematicIntroProps {
  onComplete: () => void;
}

const STAGES = [
  {
    id: 1,
    title: 'Brioche Bun Toasting',
    subtitle: 'Golden artisan brioche toasted over charcoal embers with garlic butter',
    badge: 'STAGE 01 • GRILL PREPARATION',
    image: ASSETS.cinematicChef,
  },
  {
    id: 2,
    title: 'Beef Patty Sizzling & Cheese Melting',
    subtitle: '28-day aged wagyu patty seared at high heat, cascading aged cheddar',
    badge: 'STAGE 02 • HIGH-HEAT SEARING',
    image: ASSETS.sizzlingPatty,
  },
  {
    id: 3,
    title: 'Artisanal Toppings & House Gold Sauce',
    subtitle: 'Crisp butter lettuce, heirloom tomato, truffle aioli & gold legal sauce',
    badge: 'STAGE 03 • CINEMATIC LAYERING',
    image: ASSETS.cinematicChef,
  },
  {
    id: 4,
    title: 'Plated on Black Obsidian Board',
    subtitle: 'Final gold-dusted crown placed and served on polished court obsidian',
    badge: 'STAGE 04 • OBSIDIAN PRESENTATION',
    image: ASSETS.finishedBurger,
  },
];

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [showLogoReveal, setShowLogoReveal] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Web Audio API refs for cooking sound effects
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sizzleNodeRef = useRef<AudioNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Canvas for rising gold embers & cooking steam
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize Web Audio synthesizer for sizzling cooking effects & chimes
  useEffect(() => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
    } catch (e) {
      console.warn('Web Audio API not supported', e);
    }

    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Control Audio Sizzle Synthesis
  useEffect(() => {
    if (isMuted || !audioCtxRef.current) {
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.1);
      }
      return;
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    const ctx = audioCtxRef.current;
    
    // Create sizzle noise buffer (brownian/white noise for sizzling grill)
    if (!sizzleNodeRef.current) {
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filter to simulate sizzle and steam
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2500, ctx.currentTime);
      filter.Q.setValueAtTime(1.5, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.08, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start();
      sizzleNodeRef.current = whiteNoise;
      gainNodeRef.current = gain;
    } else if (gainNodeRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(0.08, ctx.currentTime, 0.1);
    }
  }, [isMuted]);

  // Trigger Gold Chime when Logo Reveal activates
  const playGoldChime = () => {
    if (isMuted || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 1.2); // C6

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.8);
    } catch {
      // Ignore audio resume restrictions if unclicked
    }
  };

  // Main Timeline Progress Loop (~5.5s total animation)
  useEffect(() => {
    const durationMs = 5600;
    const intervalMs = 40;
    const increment = (intervalMs / durationMs) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        
        // Stage transitions based on progress percentage
        if (next < 22) {
          setCurrentStageIndex(0);
        } else if (next < 45) {
          setCurrentStageIndex(1);
        } else if (next < 68) {
          setCurrentStageIndex(2);
        } else if (next < 85) {
          setCurrentStageIndex(3);
        } else if (next >= 85 && !showLogoReveal) {
          setShowLogoReveal(true);
          playGoldChime();
        }

        if (next >= 100) {
          clearInterval(timer);
          triggerCompletion();
          return 100;
        }
        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [showLogoReveal]);

  // Particle System Effect (Gold Embers + Steam)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create 60 golden embers and rising steam particles
    const particles = Array.from({ length: 65 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.6,
      vy: -(Math.random() * 1.5 + 0.4),
      vx: (Math.random() - 0.5) * 0.6,
      opacity: Math.random() * 0.8 + 0.2,
      pulseSpeed: Math.random() * 0.03 + 0.01,
      isSteam: Math.random() > 0.6,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.y * 0.01) * 0.2;
        p.opacity += Math.sin(Date.now() * p.pulseSpeed) * 0.01;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (p.isSteam) {
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.02, Math.min(0.2, p.opacity * 0.15))})`;
        } else {
          ctx.fillStyle = `rgba(197, 160, 89, ${Math.max(0.1, Math.min(0.9, p.opacity))})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#C5A059';
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const triggerCompletion = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 700);
  };

  const handleSkip = () => {
    triggerCompletion();
  };

  const toggleSound = () => {
    setIsMuted(!isMuted);
  };

  const currentStage = STAGES[currentStageIndex];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1, scale: isExiting ? 1.05 : 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#050505] text-[#F5F5F0] select-none overflow-hidden"
    >
      {/* Background Interactive Gold Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      {/* Atmospheric Fire & Gold Ambient Heat Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60 pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C5A059]/15 rounded-full blur-[160px] pointer-events-none animate-pulse z-0" />
      <div className="absolute bottom-0 inset-x-0 h-96 bg-gradient-to-t from-[#C5A059]/10 to-transparent pointer-events-none z-0" />

      {/* Top Header Bar */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[#C5A059]/40 bg-black/60 flex items-center justify-center shadow-[0_0_15px_rgba(197,160,89,0.3)]">
            <Scale className="w-4 h-4 text-[#C5A059]" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C5A059]">
              BAKEBRIEF CINEMATIC ATELIER
            </span>
            <span className="text-xs font-bold tracking-tight text-white/90">
              CASE NO. 802 • LIVE CHEF BENCH
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Sound Toggle Button (Muted by default with clear toggle) */}
          <button
            onClick={toggleSound}
            className={`px-3.5 py-1.5 rounded-full border text-xs font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
              !isMuted
                ? 'bg-[#C5A059]/20 border-[#C5A059] text-[#C5A059] shadow-[0_0_20px_rgba(197,160,89,0.3)]'
                : 'bg-black/80 border-white/20 text-zinc-400 hover:text-white hover:border-white/40'
            }`}
          >
            {!isMuted ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>SOUND ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span>SOUND OFF</span>
              </>
            )}
          </button>

          {/* Skip Intro Button */}
          <button
            onClick={handleSkip}
            className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono uppercase tracking-widest text-white transition flex items-center gap-1.5"
          >
            <span>SKIP INTRO</span>
            <SkipForward className="w-3.5 h-3.5 text-[#C5A059]" />
          </button>
        </div>
      </div>

      {/* Main Center Stage Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 my-auto w-full flex flex-col items-center text-center">
        <AnimatePresence mode="wait">
          {!showLogoReveal ? (
            /* Stage 1-4: Slow-Motion Cooking & Chef Assembly Sequence */
            <motion.div
              key={currentStage.id}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -10 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center w-full"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/80 border border-[#C5A059]/40 text-[#C5A059] text-xs font-mono uppercase tracking-[0.25em] mb-6 shadow-[0_0_25px_rgba(197,160,89,0.2)]">
                <Flame className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
                <span>{currentStage.badge}</span>
              </div>

              {/* High-Res Cinematic Image Frame */}
              <div className="relative w-full max-w-3xl aspect-[16/9] rounded-3xl overflow-hidden border border-[#C5A059]/30 shadow-[0_0_60px_rgba(0,0,0,0.9)] bg-black mb-6 group">
                <motion.img
                  src={currentStage.image}
                  alt={currentStage.title}
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.8, ease: 'easeOut' }}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />

                {/* Sizzling smoke & fire overlay vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none" />
                
                {/* Live Heat Smoke Effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

                {/* Corner Detail Tags */}
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-mono text-zinc-300 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span>CHEF UNIFORM • GOLD EMBROIDERED</span>
                </div>

                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#C5A059]/30 text-[10px] font-mono text-[#C5A059] uppercase tracking-widest">
                  SLOW MOTION 120 FPS
                </div>
              </div>

              {/* Title & Description */}
              <h2 className="text-2xl md:text-4xl font-light text-white tracking-tight mb-2 font-sans">
                {currentStage.title}
              </h2>
              <p className="text-xs md:text-sm text-zinc-400 font-light max-w-lg">
                {currentStage.subtitle}
              </p>
            </motion.div>
          ) : (
            /* Final Stage: BakeBrief Logo Reveal & Slogan */
            <motion.div
              key="logo-reveal"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              {/* Glowing Gold Logo Crest */}
              <div className="relative mb-8">
                <div className="absolute -inset-4 rounded-full bg-[#C5A059]/30 blur-3xl animate-pulse" />
                <img
                  src={ASSETS.logoCrest}
                  alt="BakeBrief Gold Crest"
                  className="w-32 h-32 md:w-44 md:h-44 object-contain rounded-full border-2 border-[#C5A059] shadow-[0_0_80px_rgba(197,160,89,0.5)]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Brand Name */}
              <h1 className="text-4xl md:text-6xl font-extralight tracking-tight text-white mb-3 uppercase font-sans">
                BakeBrief
              </h1>

              {/* Slogan */}
              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="flex items-center gap-2 mb-6"
              >
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <p className="text-sm md:text-xl tracking-[0.35em] uppercase text-[#C5A059] font-serif italic font-light">
                  "Every Bite Wins The Case."
                </p>
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
              </motion.div>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/80 border border-[#C5A059]/40 text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>BENCH TASTING READY • ENTERING COURTROOM</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Progress Bar & Step Tracker */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-8">
        <div className="flex flex-col gap-3">
          {/* Timeline Step Indicators */}
          <div className="grid grid-cols-4 gap-2 md:gap-4 mb-2">
            {STAGES.map((stg, idx) => {
              const isActive = currentStageIndex === idx && !showLogoReveal;
              const isPast = currentStageIndex > idx || showLogoReveal;
              return (
                <div
                  key={stg.id}
                  className={`p-2 rounded-xl border text-[10px] font-mono transition-all duration-300 ${
                    isActive
                      ? 'bg-[#C5A059]/20 border-[#C5A059] text-white shadow-[0_0_15px_rgba(197,160,89,0.3)]'
                      : isPast
                      ? 'bg-black/60 border-emerald-500/40 text-emerald-300'
                      : 'bg-black/40 border-white/10 text-zinc-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold">0{stg.id}</span>
                    {isPast ? (
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    )}
                  </div>
                  <span className="truncate block font-sans font-medium">{stg.title}</span>
                </div>
              );
            })}
          </div>

          {/* Continuous Smooth Progress Line */}
          <div className="w-full flex justify-between items-center text-[10px] font-mono text-zinc-400">
            <span>SLOW MOTION COMMERCIAL DISCOVERY</span>
            <span className="text-[#C5A059] font-bold">{Math.min(100, Math.floor(progress))}%</span>
          </div>
          <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#8C6A2B] via-[#C5A059] to-[#FFF8DC] rounded-full shadow-[0_0_15px_#C5A059] transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
