import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Scale, 
  CheckCircle2, 
  Printer, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [fulfillmentType, setFulfillmentType] = useState<'Dine-In' | 'Express Takeout' | 'Luxury Delivery'>('Dine-In');
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const subtotal = cartItems.reduce((acc, ci) => acc + ci.item.price * ci.quantity, 0);
  const tax = subtotal * 0.08;
  const deliveryFee = fulfillmentType === 'Luxury Delivery' ? 5 : 0;
  const total = subtotal + tax + deliveryFee;

  const handleCheckout = () => {
    setCheckoutComplete(true);
  };

  const resetOrder = () => {
    setCheckoutComplete(false);
    onClearCart();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-screen max-w-md bg-[#0c0c0e] border-l border-[#d4af37]/30 shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-5 border-b border-zinc-800/80 bg-zinc-950 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37]">
                  <ShoppingBag className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-[10px] font-mono text-[#d4af37] tracking-widest uppercase block">
                    COURT DOCKET TRAY
                  </span>
                  <h3 className="font-serif-luxury text-base font-bold text-white">
                    Your Brief Order ({cartItems.length})
                  </h3>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {checkoutComplete ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border-2 border-[#d4af37] flex items-center justify-center text-[#d4af37] mx-auto animate-pulse">
                    <Scale className="w-8 h-8" />
                  </div>

                  <h3 className="font-serif-luxury text-2xl font-bold text-white">
                    Order Submitted To Live Kitchen!
                  </h3>

                  <p className="text-xs text-zinc-300 font-light max-w-xs mx-auto">
                    Your order is currently being prepared live on Station 01. Proceed to the viewing window or watch the live feed!
                  </p>

                  <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-left space-y-2 font-mono text-xs">
                    <div className="flex justify-between text-[10px] text-[#d4af37]">
                      <span>OFFICIAL DOCKET #:</span>
                      <span>CASE-ORD-2026-881</span>
                    </div>
                    <div className="border-t border-zinc-900 pt-2 flex justify-between font-bold text-white">
                      <span>TOTAL PAID:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="text-[10px] text-zinc-400">
                      FULFILLMENT: {fulfillmentType.toUpperCase()}
                    </div>
                  </div>

                  <button
                    onClick={() => window.print()}
                    className="w-full py-2.5 rounded-xl bg-zinc-900 text-zinc-300 border border-zinc-800 text-xs font-mono uppercase flex items-center justify-center gap-2 hover:text-white"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Formal Docket Receipt</span>
                  </button>

                  <button
                    onClick={resetOrder}
                    className="w-full py-3 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase"
                  >
                    Return to Menu
                  </button>
                </div>
              ) : cartItems.length === 0 ? (
                <div className="py-16 text-center space-y-4">
                  <Scale className="w-12 h-12 text-zinc-700 mx-auto" />
                  <h4 className="font-serif-luxury text-base font-bold text-white">
                    Your Brief Tray is Empty
                  </h4>
                  <p className="text-xs text-zinc-400 font-light max-w-xs mx-auto">
                    Examine our menu dockets and add artisan burgers, pizzas, or pastries to your order.
                  </p>
                </div>
              ) : (
                <>
                  {/* Fulfillment Type Toggle */}
                  <div className="grid grid-cols-3 gap-2 p-1 bg-zinc-900 rounded-xl border border-zinc-800 text-[10px] font-mono">
                    {(['Dine-In', 'Express Takeout', 'Luxury Delivery'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setFulfillmentType(type)}
                        className={`py-2 rounded-lg transition ${
                          fulfillmentType === type
                            ? 'bg-[#d4af37] text-black font-bold'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  {/* Items List */}
                  <div className="space-y-3">
                    {cartItems.map(({ item, quantity, selectedOptions }) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center gap-3"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 rounded-xl object-cover border border-zinc-800 shrink-0"
                          referrerPolicy="no-referrer"
                        />

                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] font-mono text-[#d4af37] block">
                            {item.legalBrief.docketNumber}
                          </span>
                          <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                          <span className="text-xs text-[#d4af37] font-semibold">
                            ${(item.price * quantity).toFixed(2)}
                          </span>

                          {selectedOptions && selectedOptions.length > 0 && (
                            <span className="text-[9px] text-zinc-400 block line-clamp-1 mt-0.5">
                              + {selectedOptions.join(', ')}
                            </span>
                          )}
                        </div>

                        {/* Qty Controls */}
                        <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
                          <button
                            onClick={() => onUpdateQuantity(item.id, quantity - 1)}
                            className="p-1 hover:text-[#d4af37]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-bold w-4 text-center text-white">
                            {quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, quantity + 1)}
                            className="p-1 hover:text-[#d4af37]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1.5 text-zinc-600 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Footer Calculation */}
            {!checkoutComplete && cartItems.length > 0 && (
              <div className="p-5 border-t border-zinc-800/80 bg-zinc-950 space-y-3">
                <div className="space-y-1.5 text-xs font-mono text-zinc-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Court Tax (8%)</span>
                    <span className="text-white">${tax.toFixed(2)}</span>
                  </div>
                  {fulfillmentType === 'Luxury Delivery' && (
                    <div className="flex justify-between text-amber-400">
                      <span>Delivery Service</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[10px] text-[#d4af37]">
                    <span>24K Gold Stamp</span>
                    <span>COMPLIMENTARY</span>
                  </div>
                  <div className="border-t border-zinc-800 pt-2 flex justify-between text-sm font-bold text-white">
                    <span>Total Docket Amount</span>
                    <span className="text-[#d4af37] font-serif-luxury font-extrabold text-base">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition"
                >
                  <span>Submit Case Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
