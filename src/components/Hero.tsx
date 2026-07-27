import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { ArrowRight, Play, Eye, Sparkles, ShieldCheck, Flame, Award } from 'lucide-react';
import { ASSETS } from '../data/menuData';
import Magnetic from './Magnetic';
import TiltCard from './TiltCard';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenReservation: () => void;
  onWatchLive: () => void;
}

export default function Hero({ onExploreMenu, onOpenReservation, onWatchLive }: HeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroTextY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Mouse Parallax for Background
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const parallaxX = useSpring(mouseX, springConfig);
  const parallaxY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
    const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
    mouseX.set(x * 18);
    mouseY.set(y * 18);
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#050505]"
    >
      {/* Ambient background blur elements matching design */}
      <div className="absolute top-0 left-0 w-full h-full opacity-15 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-white rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-[#C5A059] rounded-full blur-[140px]" />
      </div>

      {/* Parallax Background Image */}
      <motion.div style={{ y: heroImageY, x: parallaxX, y: parallaxY }} className="absolute inset-0 z-0">
        <img
          src={ASSETS.storefront}
          alt="BakeBrief Luxury Storefront"
          className="w-full h-full object-cover object-center opacity-25 scale-110 filter brightness-75 contrast-125 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]" />
      </motion.div>

      {/* Decorative Side Vertical Scroll Text */}
      <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-4 z-20 pointer-events-none">
        <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <div className="writing-vertical text-[9px] uppercase tracking-[0.4em] text-white/30 font-mono">
          SCROLL TO WITNESS
        </div>
        <div className="w-[1px] h-24 bg-gradient-to-t from-transparent via-white/20 to-transparent" />
      </div>

      <motion.div style={{ y: heroTextY, opacity: opacityFade }} className="relative z-10 max-w-6xl mx-auto text-center flex flex-col items-center">
        {/* Case Eyebrow Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md mb-8"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-mono">CASE NO. 802 //</span>
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#C5A059] font-mono font-semibold">
            LUXURY PASTRY LAW
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-ping" />
        </motion.div>

        {/* Bold Typography Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mb-8 max-w-5xl"
        >
          <h1 className="text-[52px] sm:text-[85px] lg:text-[105px] leading-[0.88] font-light tracking-tighter text-[#F5F5F0]">
            EVERY BITE<br />
            <span className="italic font-serif font-light text-[#C5A059] drop-shadow-lg">
              Wins The Case.
            </span>
          </h1>
        </motion.div>

        {/* Description Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="max-w-xl text-sm sm:text-base text-white/60 leading-relaxed uppercase tracking-wider mb-10 font-sans font-light"
        >
          Meticulously crafted with legal precision. Every recipe is a documented masterpiece of flavor, balance, and culinary excellence.
        </motion.p>

        {/* Action Buttons with Magnetic hover effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto"
        >
          <Magnetic strength={0.25} className="w-full sm:w-auto">
            <button
              onClick={onExploreMenu}
              data-cursor="EXAMINE"
              className="w-full sm:w-auto px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-bold text-black bg-[#C5A059] rounded-full hover:bg-[#DBC182] hover:shadow-[0_0_25px_rgba(197,160,89,0.5)] transition-all duration-300 flex items-center justify-center gap-3"
            >
              <span>Examine Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Magnetic>

          <Magnetic strength={0.25} className="w-full sm:w-auto">
            <button
              onClick={onWatchLive}
              data-cursor="LIVE VIEW"
              className="w-full sm:w-auto px-7 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-white/90 bg-black/60 border border-white/20 hover:border-[#C5A059] hover:bg-white hover:text-black rounded-full transition-all duration-300 flex items-center justify-center gap-2.5 backdrop-blur-md"
            >
              <Play className="w-3.5 h-3.5 text-[#C5A059] fill-[#C5A059]" />
              <span>Watch Live Chamber</span>
            </button>
          </Magnetic>

          <Magnetic strength={0.25} className="w-full sm:w-auto">
            <button
              onClick={onOpenReservation}
              data-cursor="RESERVE"
              className="w-full sm:w-auto px-7 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-[#C5A059] bg-transparent border border-[#C5A059]/40 hover:border-[#C5A059] rounded-full hover:bg-[#C5A059]/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Request Brief Bench</span>
            </button>
          </Magnetic>
        </motion.div>

        {/* 3D Tilt Feature Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl"
        >
          <TiltCard dataCursor="CHAMBER" className="glass-card p-5 border-white/10 hover:border-[#C5A059]/40">
            <div className="flex flex-col items-center text-center">
              <Eye className="w-5 h-5 text-[#C5A059] mb-2" />
              <span className="text-[11px] font-bold text-white uppercase tracking-[0.15em] mb-1">Live Chamber</span>
              <span className="text-[10px] text-white/50 uppercase tracking-wider">Crystal glass view</span>
            </div>
          </TiltCard>

          <TiltCard dataCursor="WOODFIRE" className="glass-card p-5 border-white/10 hover:border-[#C5A059]/40">
            <div className="flex flex-col items-center text-center">
              <Flame className="w-5 h-5 text-amber-500 mb-2" />
              <span className="text-[11px] font-bold text-white uppercase tracking-[0.15em] mb-1">Woodfire & Sear</span>
              <span className="text-[10px] text-white/50 uppercase tracking-wider">485°C Sourdough</span>
            </div>
          </TiltCard>

          <TiltCard dataCursor="10 DOCKETS" className="glass-card p-5 border-white/10 hover:border-[#C5A059]/40">
            <div className="flex flex-col items-center text-center">
              <Award className="w-5 h-5 text-[#C5A059] mb-2" />
              <span className="text-[11px] font-bold text-white uppercase tracking-[0.15em] mb-1">10 Dockets</span>
              <span className="text-[10px] text-white/50 uppercase tracking-wider">Burgers, Pizzas & Pastries</span>
            </div>
          </TiltCard>

          <TiltCard dataCursor="24K GOLD" className="glass-card p-5 border-white/10 hover:border-[#C5A059]/40">
            <div className="flex flex-col items-center text-center">
              <Sparkles className="w-5 h-5 text-amber-300 mb-2" />
              <span className="text-[11px] font-bold text-white uppercase tracking-[0.15em] mb-1">24K Gold Stamped</span>
              <span className="text-[10px] text-white/50 uppercase tracking-wider">Edible gold leaf</span>
            </div>
          </TiltCard>
        </motion.div>
      </motion.div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
    </section>
  );
}


