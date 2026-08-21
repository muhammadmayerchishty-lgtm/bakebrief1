import React from 'react';
import { Sparkles, UtensilsCrossed, ShoppingBag, Clock, MapPin, Phone, Info } from 'lucide-react';
import { BAKEBRIEF_INFO } from '../data/bakebriefData';

interface NavbarProps {
  activeTab: 'chat' | 'menu' | 'orders';
  setActiveTab: (tab: 'chat' | 'menu' | 'orders') => void;
  cartCount: number;
  openStoreInfo: () => void;
  openBag: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  openStoreInfo,
  openBag,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur border-b border-amber-950/40 text-stone-100 shadow-md">
      {/* Top micro-banner */}
      <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 px-4 py-1.5 text-xs text-amber-200/90 flex items-center justify-between border-b border-amber-900/30">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-medium tracking-wide">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Gulberg III, Lahore</span>
          </span>
          <span className="hidden sm:inline-block text-stone-500">•</span>
          <span className="hidden sm:flex items-center gap-1 text-stone-300">
            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Open Today: 8:00 AM – 11:30 PM</span>
          </span>
        </div>
        <div className="flex items-center gap-3 font-serif italic text-amber-300 text-xs">
          <span>"{BAKEBRIEF_INFO.slogan}"</span>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div 
          onClick={() => setActiveTab('chat')}
          className="cursor-pointer flex items-center gap-3 group"
          id="brand-logo"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 font-black text-xl flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
            B
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-black text-2xl tracking-wider text-amber-50 group-hover:text-amber-300 transition-colors">
                BAKEBRIEF
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full">
                EST. 2026
              </span>
            </div>
            <p className="text-[11px] text-amber-200/70 font-medium tracking-tight">
              Lahore Bakery & Café • AI Assistant Brief
            </p>
          </div>
        </div>

        {/* View Switchers */}
        <nav className="flex items-center gap-1.5 bg-stone-950/70 p-1 rounded-xl border border-stone-800" id="nav-tabs">
          <button
            onClick={() => setActiveTab('chat')}
            id="tab-brief-chat"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 ${
              activeTab === 'chat'
                ? 'bg-amber-500 text-stone-950 shadow font-semibold'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-inherit" />
            <span>Chat with Brief</span>
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            id="tab-digital-menu"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 ${
              activeTab === 'menu'
                ? 'bg-amber-500 text-stone-950 shadow font-semibold'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4 text-inherit" />
            <span>Menu & Bakes</span>
          </button>
        </nav>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={openStoreInfo}
            id="btn-store-info"
            title="Restaurant Information & Hours"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-300 bg-stone-800/60 hover:bg-stone-800 hover:text-amber-300 border border-stone-700/50 transition-colors"
          >
            <Info className="w-4 h-4 text-amber-400" />
            <span>Store Info</span>
          </button>

          <a
            href={`tel:${BAKEBRIEF_INFO.phone}`}
            id="btn-call-store"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-300 bg-stone-800/60 hover:bg-stone-800 hover:text-amber-300 border border-stone-700/50 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>Call Store</span>
          </a>

          <button
            onClick={openBag}
            id="btn-open-bag"
            className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-amber-600 hover:bg-amber-500 text-stone-950 transition-all shadow-md active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Order Bag</span>
            {cartCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 bg-stone-950 text-amber-300 text-xs font-bold rounded-full border border-amber-400/40">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
