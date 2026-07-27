import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Volume2, 
  VolumeX, 
  Calendar,
  Search,
  Scale
} from 'lucide-react';
import { ASSETS } from '../data/menuData';
import Magnetic from './Magnetic';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onSearchClick: () => void;
}

export default function Navbar({ 
  cartCount, 
  onOpenCart, 
  onOpenReservation,
  onSearchClick
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'The Brief', href: '#hero' },
    { name: 'Live Kitchen', href: '#live-kitchen', badge: 'LIVE' },
    { name: 'Interactive Menu', href: '#menu' },
    { name: 'Our Case', href: '#story' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Verdicts', href: '#verdicts' },
    { name: 'Contact', href: '#contact' },
  ];

  const toggleAmbientAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-[#050505]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl'
            : 'py-6 bg-transparent border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <Magnetic strength={0.2}>
            <a href="#hero" data-cursor="BAKEBRIEF" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-[#C5A059]/30 blur-md opacity-0 group-hover:opacity-100 transition duration-500" />
                <img
                  src={ASSETS.logoCrest}
                  alt="BakeBrief Logo"
                  className="w-10 h-10 md:w-11 md:h-11 object-contain rounded-full border border-[#C5A059]/40 transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-mono">Case No. 802</span>
                <span className="text-xl md:text-2xl font-bold tracking-tighter uppercase text-white flex items-center gap-1.5 font-sans">
                  BakeBrief
                  <Scale className="w-4 h-4 text-[#C5A059] opacity-80" />
                </span>
              </div>
            </a>
          </Magnetic>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-[11px] uppercase tracking-[0.2em] font-medium">
            {navLinks.map((link) => (
              <Magnetic key={link.name} strength={0.15}>
                <a
                  href={link.href}
                  className="hover:text-[#C5A059] transition-colors flex items-center gap-1.5 py-1"
                >
                  {link.name}
                  {link.badge && (
                    <span className="px-1.5 py-0.5 text-[8px] font-bold bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/30 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </a>
              </Magnetic>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Search Button */}
            <Magnetic strength={0.25}>
              <button
                onClick={onSearchClick}
                data-cursor="SEARCH"
                className="p-2.5 rounded-full bg-black/60 text-zinc-300 hover:text-[#C5A059] border border-white/10 hover:border-[#C5A059]/50 transition-all duration-300"
                title="Search Docket Menu"
              >
                <Search className="w-4 h-4" />
              </button>
            </Magnetic>

            {/* Audio Toggle */}
            <Magnetic strength={0.25}>
              <button
                onClick={toggleAmbientAudio}
                data-cursor={isPlayingAudio ? 'MUTE' : 'SOUND'}
                className={`p-2.5 rounded-full border transition-all duration-300 ${
                  isPlayingAudio
                    ? 'bg-[#C5A059]/20 text-[#C5A059] border-[#C5A059]/50 shadow-[0_0_15px_rgba(197,160,89,0.3)]'
                    : 'bg-black/60 text-zinc-400 border-white/10 hover:text-white'
                }`}
                title={isPlayingAudio ? 'Mute Courtroom Ambience' : 'Play Courtroom Lounge Ambience'}
              >
                {isPlayingAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </Magnetic>

            {/* Table Reservation Button */}
            <Magnetic strength={0.25}>
              <button
                onClick={onOpenReservation}
                data-cursor="RESERVE"
                className="px-4 py-2 text-[11px] uppercase tracking-[0.2em] font-medium text-white/90 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all flex items-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Request Brief</span>
              </button>
            </Magnetic>

            {/* Order Brief Cart Drawer Toggle */}
            <Magnetic strength={0.25}>
              <button
                onClick={onOpenCart}
                data-cursor="TRAY"
                className="relative px-5 py-2 text-[11px] uppercase tracking-[0.2em] font-bold text-black bg-[#C5A059] rounded-full hover:bg-[#DBC182] hover:shadow-[0_0_20px_rgba(197,160,89,0.4)] transition-all flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Tray</span>
                {cartCount > 0 && (
                  <span className="w-4 h-4 bg-black text-[#C5A059] rounded-full text-[9px] font-black flex items-center justify-center border border-[#C5A059]">
                    {cartCount}
                  </span>
                )}
              </button>
            </Magnetic>
          </div>

          {/* Mobile Menu & Cart Icon Trigger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-[#C5A059] text-black font-bold"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-[#C5A059] rounded-full text-[10px] font-extrabold flex items-center justify-center border border-[#C5A059]">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-full bg-black/60 border border-white/10 text-zinc-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#C5A059]" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[70px] z-30 bg-[#050505]/95 backdrop-blur-2xl border-b border-white/10 p-6 shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-xs font-mono text-[#C5A059] tracking-widest uppercase">
                  COURT DOCKET DIRECTORY
                </span>
                <button
                  onClick={toggleAmbientAudio}
                  className="flex items-center gap-2 text-xs text-zinc-400 bg-black/60 px-3 py-1.5 rounded-full border border-white/10"
                >
                  {isPlayingAudio ? <Volume2 className="w-3.5 h-3.5 text-[#C5A059]" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span>{isPlayingAudio ? 'Sound On' : 'Sound Off'}</span>
                </button>
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-base font-sans font-semibold text-zinc-200 hover:text-[#C5A059] flex items-center justify-between border-b border-white/5"
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/30 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </a>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenReservation();
                  }}
                  className="w-full py-3 text-xs font-bold uppercase tracking-wider text-zinc-200 bg-black/60 border border-white/20 rounded-xl flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#C5A059]" />
                  Reserve Bench Tasting
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCart();
                  }}
                  className="w-full py-3 text-xs font-bold uppercase tracking-wider text-black bg-[#C5A059] rounded-xl flex items-center justify-center gap-2 shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" />
                  View Brief Order Tray ({cartCount})
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

