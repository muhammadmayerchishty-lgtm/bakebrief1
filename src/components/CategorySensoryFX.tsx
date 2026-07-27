import { motion } from 'motion/react';
import { Flame, Sparkles, Droplets, Wind, RotateCw, Layers } from 'lucide-react';
import { MenuCategory } from '../types';

interface CategorySensoryFXProps {
  category: MenuCategory | string;
  isHovered?: boolean;
}

export default function CategorySensoryFX({ category, isHovered = false }: CategorySensoryFXProps) {
  const cat = category.toLowerCase();

  // 1. BURGERS & CRUNCH BURGERS: Smoke, Fire Glow, Sizzling Steam & Floating Ingredients
  if (cat.includes('burger') || cat.includes('crunch') || cat.includes('zinger')) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {/* Fire Glow Effect */}
        <div
          className={`absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-amber-600/20 via-red-600/10 to-transparent transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-40'
          }`}
        />

        {/* Sizzling Steam Particles */}
        {isHovered && (
          <>
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.8 }}
              animate={{ y: -40, opacity: [0, 0.6, 0], scale: 1.4 }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
              className="absolute bottom-6 left-1/4 w-8 h-8 rounded-full bg-amber-500/10 blur-md"
            />
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.8 }}
              animate={{ y: -50, opacity: [0, 0.7, 0], scale: 1.6 }}
              transition={{ repeat: Infinity, duration: 2.5, delay: 0.4, ease: 'easeOut' }}
              className="absolute bottom-8 right-1/3 w-10 h-10 rounded-full bg-red-500/10 blur-lg"
            />
          </>
        )}

        {/* Badge Indicator */}
        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-amber-500/40 text-amber-400 text-[9px] font-mono uppercase tracking-wider flex items-center gap-1 shadow-lg">
          <Flame className="w-3 h-3 text-amber-500 animate-pulse" />
          <span>Charcoal Grill Searing</span>
        </div>
      </div>
    );
  }

  // 2. PIZZAS: Cheese Pull, Fire Oven Glow, Heat Distortion & Steam
  if (cat.includes('pizza') || cat.includes('sourdough')) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {/* Wood-Fired Oven Glow */}
        <div
          className={`absolute inset-0 bg-radial from-orange-500/15 via-transparent to-transparent transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-30'
          }`}
        />

        {/* Heat Distortion Steam Lines */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0.2, 0.6, 0.2], y: -20 }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute top-1/3 inset-x-0 h-12 bg-gradient-to-t from-orange-400/10 via-amber-300/10 to-transparent blur-sm"
          />
        )}

        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-orange-500/40 text-orange-400 text-[9px] font-mono uppercase tracking-wider flex items-center gap-1 shadow-lg">
          <Wind className="w-3 h-3 text-orange-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>72HR Fermented Sourdough Crust</span>
        </div>
      </div>
    );
  }

  // 3. CAKES & DESSERTS: Slow Rotating Gold Reflections & Premium Lighting
  if (cat.includes('cake') || cat.includes('dessert') || cat.includes('velvet')) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {/* Gold Reflection Highlights */}
        <div
          className={`absolute inset-0 bg-gradient-to-tr from-[#C5A059]/10 via-transparent to-[#C5A059]/20 transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-40'
          }`}
        />

        {/* Sparkling Gold Dust */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
            transition={{ repeat: Infinity, duration: 2.2 }}
            className="absolute top-4 right-4 text-[#C5A059]"
          >
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
          </motion.div>
        )}

        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#C5A059]/50 text-[#C5A059] text-[9px] font-mono uppercase tracking-wider flex items-center gap-1 shadow-lg">
          <RotateCw className="w-3 h-3 text-[#C5A059] animate-spin" style={{ animationDuration: '8s' }} />
          <span>24K Gold Dust Finished</span>
        </div>
      </div>
    );
  }

  // 4. SANDWICHES & BAGUETTES: Layer Reveal & Fresh Ingredient Accents
  if (cat.includes('sandwich') || cat.includes('baguette') || cat.includes('panini')) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <div
          className={`absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-black/40 transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-30'
          }`}
        />

        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-[9px] font-mono uppercase tracking-wider flex items-center gap-1 shadow-lg">
          <Layers className="w-3 h-3 text-emerald-400" />
          <span>Triple Layer Precision Assembly</span>
        </div>
      </div>
    );
  }

  // 5. JUICES & BEVERAGES: Condensation Sparkles & Liquid Movement
  if (cat.includes('juice') || cat.includes('drink') || cat.includes('beverage')) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <div
          className={`absolute inset-0 bg-gradient-to-t from-cyan-500/15 via-transparent to-transparent transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-40'
          }`}
        />

        {/* Condensation Droplets Animation */}
        {isHovered && (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 20, opacity: [0, 0.8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="absolute top-6 left-1/3 text-cyan-300"
          >
            <Droplets className="w-3 h-3 text-cyan-300" />
          </motion.div>
        )}

        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-[9px] font-mono uppercase tracking-wider flex items-center gap-1 shadow-lg">
          <Droplets className="w-3 h-3 text-cyan-300" />
          <span>Cold-Pressed Condensation</span>
        </div>
      </div>
    );
  }

  // 6. BAKERY ITEMS & PASTRIES: Flour Particles & Warm Bread Steam Glow
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      <div
        className={`absolute inset-0 bg-gradient-to-t from-amber-700/10 via-transparent to-transparent transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-30'
        }`}
      />

      <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#C5A059]/40 text-[#C5A059] text-[9px] font-mono uppercase tracking-wider flex items-center gap-1 shadow-lg">
        <Sparkles className="w-3 h-3 text-[#C5A059]" />
        <span>Fresh Morning Bake</span>
      </div>
    </div>
  );
}
