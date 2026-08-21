import { useState, useMemo, useRef, RefObject } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Sparkles, 
  Star, 
  FileText, 
  ShoppingBag, 
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Scale
} from 'lucide-react';
import { MenuItem, MenuCategory } from '../types';
import { MENU_ITEMS, MENU_CATEGORIES } from '../data/menuData';
import TiltCard from './TiltCard';
import Magnetic from './Magnetic';
import CategorySensoryFX from './CategorySensoryFX';

interface InteractiveMenuProps {
  onExamineItem: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
  searchTriggerRef?: RefObject<HTMLInputElement | null>;
}

export default function InteractiveMenu({ onExamineItem, onAddToCart }: InteractiveMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string>('ALL');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const tagsList = ['ALL', 'Gold Grade', 'Chef Special', 'Halal', 'Sourdough', 'Spicy'];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.legalBrief.docketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.legalBrief.evidenceIngredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchesTag = true;
      if (activeTag === 'Gold Grade') matchesTag = !!item.isGoldGrade;
      if (activeTag === 'Chef Special') matchesTag = !!item.isChefSpecial;
      if (activeTag === 'Halal') matchesTag = item.dietaryTags.some(t => t.toLowerCase().includes('halal'));
      if (activeTag === 'Sourdough') matchesTag = item.dietaryTags.some(t => t.toLowerCase().includes('sourdough'));
      if (activeTag === 'Spicy') matchesTag = item.dietaryTags.some(t => t.toLowerCase().includes('spicy'));

      return matchesCategory && matchesSearch && matchesTag;
    });
  }, [selectedCategory, searchQuery, activeTag]);

  const scrollCategories = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -250 : 250;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="menu" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#050505] relative">
      {/* Background ambient spotlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#C5A059]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/60 border border-white/10 text-[#C5A059] text-xs font-mono uppercase tracking-[0.3em] mb-3">
            <Scale className="w-3.5 h-3.5" />
            <span>THE DOCKET OF DELICACIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tighter text-[#F5F5F0] mb-4">
            Interactive <span className="italic font-serif font-light text-[#C5A059]">Courtroom Menu.</span>
          </h2>
          <p className="text-zinc-400 text-sm font-light leading-relaxed">
            Every dish is listed under its legal category docket. Click "Examine Brief" for full flavor profiles, ingredients evidence, and court-recommended beverage pairings.
          </p>
        </div>

        {/* Search & Tag Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4 glass-card p-4 rounded-3xl border-white/10">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ingredient, docket # or name..."
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-black/60 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#C5A059] transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Tag Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <span className="text-xs font-mono text-zinc-500 mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3 text-[#C5A059]" />
              TAGS:
            </span>
            {tagsList.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-mono font-medium transition whitespace-nowrap ${
                  activeTag === tag
                    ? 'bg-[#C5A059] text-black font-bold shadow-md'
                    : 'bg-black/60 text-zinc-400 border border-white/10 hover:text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Carousel / Tabs (All 10 Categories) */}
        <div className="relative mb-12 flex items-center">
          <button
            onClick={() => scrollCategories('left')}
            className="hidden sm:flex p-2 rounded-full bg-black/60 border border-white/10 text-zinc-400 hover:text-white shrink-0 mr-2 z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex items-center gap-2 overflow-x-auto scrollbar-none py-2 w-full"
          >
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition whitespace-nowrap shrink-0 ${
                selectedCategory === 'ALL'
                  ? 'bg-[#C5A059] text-black shadow-[0_0_20px_rgba(197,160,89,0.4)]'
                  : 'bg-black/60 text-zinc-300 border border-white/10 hover:border-white/20'
              }`}
            >
              All Dockets ({MENU_ITEMS.length})
            </button>

            {MENU_CATEGORIES.map((cat) => {
              const count = MENU_ITEMS.filter((i) => i.category === cat).length;
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#C5A059] text-black shadow-[0_0_20px_rgba(197,160,89,0.4)]'
                      : 'bg-black/60 text-zinc-300 border border-white/10 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${isSelected ? 'bg-black text-[#C5A059]' : 'bg-white/10 text-zinc-400'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => scrollCategories('right')}
            className="hidden sm:flex p-2 rounded-full bg-black/60 border border-white/10 text-zinc-400 hover:text-white shrink-0 ml-2 z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Menu Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="glass-card p-12 text-center rounded-3xl border-white/10 max-w-md mx-auto">
            <Scale className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="font-serif text-lg font-bold text-white mb-2">
              No Dockets Match Your Search
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Try adjusting your search keywords or switching categories.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('ALL');
                setSearchQuery('');
                setActiveTag('ALL');
              }}
              className="px-5 py-2 text-xs font-bold text-black bg-[#C5A059] rounded-full"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <TiltCard dataCursor="EXAMINE" className="glass-card rounded-3xl overflow-hidden flex flex-col group border-white/10 h-full">
                    {/* Image & Badges */}
                    <div className="relative aspect-4/3 overflow-hidden bg-black">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />

                      {/* Category Specific Sensory Atmospheric FX */}
                      <CategorySensoryFX category={item.category} />

                      {/* Top Docket Badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#C5A059]/40 text-[#C5A059] text-[10px] font-mono font-bold tracking-wider">
                          {item.legalBrief.docketNumber}
                        </span>
                        {item.isGoldGrade && (
                          <span className="p-1 rounded-full bg-[#C5A059] text-black" title="24K Gold Grade">
                            <Sparkles className="w-3 h-3" />
                          </span>
                        )}
                      </div>

                      {/* Price Tag */}
                      <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-[#C5A059]/50 text-white font-serif font-extrabold text-sm shadow-xl">
                        ${item.price.toFixed(2)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                            {item.category}
                          </span>
                          <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            <span>{item.rating}</span>
                          </div>
                        </div>

                        <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#C5A059] transition-colors leading-snug">
                          {item.name}
                        </h3>

                        <p className="text-xs text-zinc-400 font-light leading-relaxed mt-2 line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      {/* Evidence Snippet */}
                      <div className="p-2.5 rounded-xl bg-black/60 border border-white/10 text-[11px] text-zinc-300">
                        <span className="text-[9px] font-mono text-[#C5A059] block uppercase mb-0.5">
                          KEY EVIDENCE
                        </span>
                        <p className="text-zinc-400 line-clamp-1">
                          {item.legalBrief.evidenceIngredients.join(' • ')}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <Magnetic strength={0.2} className="w-full">
                          <button
                            onClick={() => onExamineItem(item)}
                            className="w-full py-2.5 px-3 rounded-full text-xs font-semibold text-zinc-300 bg-black/60 border border-white/10 hover:border-[#C5A059]/50 hover:text-white transition flex items-center justify-center gap-1.5"
                          >
                            <FileText className="w-3.5 h-3.5 text-[#C5A059]" />
                            <span>Examine</span>
                          </button>
                        </Magnetic>

                        <Magnetic strength={0.2} className="w-full">
                          <button
                            onClick={() => onAddToCart(item)}
                            className="w-full py-2.5 px-3 rounded-full text-xs font-bold text-black bg-[#C5A059] hover:bg-[#DBC182] transition flex items-center justify-center gap-1.5 active:scale-95"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Order</span>
                          </button>
                        </Magnetic>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}

