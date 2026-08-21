import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Scale, 
  ShieldCheck, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Clock, 
  Flame, 
  Star, 
  Check, 
  FileText, 
  Sparkles,
  Wine
} from 'lucide-react';
import { MenuItem } from '../types';
import Magnetic from './Magnetic';

interface BriefDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, options: string[], notes: string) => void;
}

export default function BriefDetailModal({ item, onClose, onAddToCart }: BriefDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [specialNotes, setSpecialNotes] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!item) return null;

  const customizationOptions = [
    'Add Extra 24K Gold Leaf Flakes (+$3)',
    'Extra Truffle Aioli Brief Sauce (+$2)',
    'Double Cheese Verdict Melt (+$3)',
    'Gluten-Free Organic Bread Substitute (+$2)',
    'Side of Hand-Cut Gold Dust Fries (+$5)',
  ];

  const toggleOption = (opt: string) => {
    if (selectedOptions.includes(opt)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== opt));
    } else {
      setSelectedOptions([...selectedOptions, opt]);
    }
  };

  const handleAdd = () => {
    onAddToCart(item, quantity, selectedOptions, specialNotes);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl glass-card rounded-3xl border-[#C5A059]/30 shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto"
        >
          {/* Top Header Bar */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-black/80">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#C5A059]">
                <Scale className="w-4 h-4" />
              </span>
              <div>
                <span className="text-[10px] font-mono text-[#C5A059] tracking-widest uppercase block">
                  LEGAL BRIEF DOCKET • {item.legalBrief.docketNumber}
                </span>
                <h3 className="font-serif text-lg font-bold text-white leading-none">
                  {item.name}
                </h3>
              </div>
            </div>

            <Magnetic strength={0.3}>
              <button
                onClick={onClose}
                data-cursor="CLOSE"
                className="p-2 rounded-full bg-black/60 text-zinc-400 hover:text-white border border-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </Magnetic>
          </div>

          {/* Modal Body - Scrollable */}
          <div className="p-6 overflow-y-auto space-y-6">
            {/* Image & Quick Attributes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-white/10 group">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                {item.isGoldGrade && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#C5A059] text-[#C5A059] text-[10px] font-bold flex items-center gap-1 shadow-lg">
                    <Sparkles className="w-3 h-3" />
                    24K GOLD GRADE
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-serif font-extrabold text-[#C5A059]">
                    ${item.price.toFixed(2)}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{item.rating} ({item.reviewsCount} Verdicts)</span>
                  </div>
                </div>

                <p className="text-sm text-zinc-300 font-light leading-relaxed">
                  {item.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-black/60 border border-white/10 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#C5A059]" />
                    <span className="text-zinc-400">Prep: <strong className="text-white">{item.prepTimeMinutes} mins</strong></span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/60 border border-white/10 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-500" />
                    <span className="text-zinc-400">Energy: <strong className="text-white">{item.calories} kcal</strong></span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.dietaryTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-md bg-black/60 border border-white/10 text-zinc-300 text-[10px] font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Legal Brief Arguments & Evidence */}
            <div className="p-5 rounded-2xl bg-black/80 border border-[#C5A059]/30 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                <FileText className="w-4 h-4 text-[#C5A059]" />
                <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
                  The Official Legal Case Brief
                </h4>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#C5A059] block uppercase mb-1">
                  CASE ARGUMENT SUMMARY
                </span>
                <p className="text-xs text-zinc-300 italic bg-black/40 p-3 rounded-xl border border-white/10">
                  "{item.legalBrief.argumentSummary}"
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#C5A059] block uppercase mb-2">
                  EVIDENCE (INGREDIENTS IN THE DOCKET)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {item.legalBrief.evidenceIngredients.map((ing) => (
                    <div
                      key={ing}
                      className="text-[11px] text-zinc-200 bg-black/60 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5"
                    >
                      <Check className="w-3 h-3 text-[#C5A059]" />
                      <span className="truncate">{ing}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-black/60 border border-white/10">
                  <span className="text-[10px] font-mono text-emerald-400 block uppercase mb-1">
                    VERDICT & FLAVOR PROFILE
                  </span>
                  <p className="text-xs text-zinc-300">{item.legalBrief.verdictFlavorProfile}</p>
                </div>

                <div className="p-3 rounded-xl bg-black/60 border border-white/10 flex items-start gap-2">
                  <Wine className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-mono text-purple-300 block uppercase mb-0.5">
                      RECOMMENDED BEVERAGE PAIRING
                    </span>
                    <p className="text-xs text-zinc-300">{item.legalBrief.pairings}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customization Options */}
            <div>
              <h4 className="font-serif text-sm font-bold text-white mb-3">
                Custom Case Adjustments
              </h4>
              <div className="space-y-2">
                {customizationOptions.map((opt) => {
                  const isChecked = selectedOptions.includes(opt);
                  return (
                    <button
                      key={opt}
                      onClick={() => toggleOption(opt)}
                      className={`w-full p-3 rounded-xl border text-xs text-left transition flex items-center justify-between ${
                        isChecked
                          ? 'bg-[#C5A059]/15 border-[#C5A059] text-white'
                          : 'bg-black/60 border-white/10 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <span>{opt}</span>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${isChecked ? 'bg-[#C5A059] border-[#C5A059]' : 'border-white/20'}`}>
                        {isChecked && <Check className="w-3 h-3 text-black font-extrabold" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Special Instructions Note */}
            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                Special Bench Instructions
              </label>
              <textarea
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder="E.g. Extra toasted brioche, dressing on the side..."
                className="w-full p-3 rounded-xl bg-black/60 border border-white/10 text-xs text-zinc-200 focus:outline-none focus:border-[#C5A059] resize-none h-20"
              />
            </div>
          </div>

          {/* Modal Footer Bar */}
          <div className="p-5 border-t border-white/10 bg-black/90 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-400 font-mono">QUANTITY:</span>
              <div className="flex items-center gap-2 bg-black/60 border border-white/10 rounded-full p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-bold text-white font-mono">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <Magnetic strength={0.25} className="w-full sm:w-auto">
              <button
                onClick={handleAdd}
                disabled={addedSuccess}
                data-cursor="ADD TO TRAY"
                className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-xl ${
                  addedSuccess
                    ? 'bg-emerald-500 text-black'
                    : 'bg-[#C5A059] hover:bg-[#DBC182] text-black hover:shadow-[0_0_30px_rgba(197,160,89,0.6)] transform hover:scale-105'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Added to Brief Tray!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Brief Tray • ${(item.price * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
