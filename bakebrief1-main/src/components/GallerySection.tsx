import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, X, Maximize2 } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/menuData';
import { GalleryItem } from '../types';
import TextReveal from './TextReveal';
import TiltCard from './TiltCard';

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const categories = ['ALL', 'Storefront', 'Live Prep', 'Gourmet Dishes', 'Pastry Studio'];

  const filteredItems = selectedCategory === 'ALL' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/60 border border-white/10 text-[#C5A059] text-xs font-mono uppercase tracking-[0.3em] mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>VISUAL EVIDENCE ARCHIVE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tighter text-[#F5F5F0] mb-4">
            The BakeBrief <span className="italic font-serif font-light text-[#C5A059] inline-block">
              <TextReveal text="Gallery." delay={0.2} />
            </span>
          </h2>
          <p className="text-zinc-400 text-sm font-light leading-relaxed">
            A high-definition look inside our obsidian storefront, live preparation kitchen, and gold-embellished culinary creations.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition ${
                selectedCategory === cat
                  ? 'bg-[#C5A059] text-black shadow-[0_0_20px_rgba(197,160,89,0.4)]'
                  : 'bg-black/60 text-zinc-400 border border-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setActiveLightboxItem(item)}
              >
                <TiltCard dataCursor="VIEW EXHIBIT" className="glass-card rounded-3xl overflow-hidden cursor-pointer group relative border-white/10 h-full">
                  <div className="aspect-16/9 relative overflow-hidden bg-black">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition" />

                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#C5A059]/40 text-[#C5A059] text-[10px] font-mono font-bold uppercase">
                      {item.category}
                    </div>

                    <div className="absolute top-4 right-4 p-2 rounded-full bg-black/70 text-white opacity-0 group-hover:opacity-100 transition duration-300 border border-white/20">
                      <Maximize2 className="w-4 h-4" />
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-serif text-lg font-bold text-white mb-1 group-hover:text-[#C5A059] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-zinc-300 font-light line-clamp-2">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl w-full glass-card rounded-3xl border-[#C5A059]/30 overflow-hidden"
            >
              <button
                onClick={() => setActiveLightboxItem(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/80 text-white border border-white/20 hover:border-[#C5A059]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-16/9 bg-black">
                <img
                  src={activeLightboxItem.image}
                  alt={activeLightboxItem.title}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 bg-black/90 border-t border-white/10">
                <span className="text-xs font-mono text-[#C5A059] uppercase tracking-widest block mb-1">
                  EXHIBIT • {activeLightboxItem.category}
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mb-2">
                  {activeLightboxItem.title}
                </h3>
                <p className="text-sm text-zinc-300 font-light">
                  {activeLightboxItem.caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

