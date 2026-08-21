import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Send, 
  Clock, 
  MapPin, 
  Phone, 
  User, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  ExternalLink,
  Receipt
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, ParsedOrderDraft } from '../types';
import { BAKEBRIEF_INFO } from '../data/bakebriefData';

interface OrderBagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  currentDraft: ParsedOrderDraft;
  onUpdateDraft: (updates: Partial<ParsedOrderDraft>) => void;
}

export const OrderBagDrawer: React.FC<OrderBagDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currentDraft,
  onUpdateDraft,
}) => {
  const [customerName, setCustomerName] = useState(currentDraft.customerName || '');
  const [phone, setPhone] = useState(currentDraft.phone || '');
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>(currentDraft.orderType || 'delivery');
  const [preferredTime, setPreferredTime] = useState(currentDraft.preferredTime || 'As soon as possible (40-55 mins)');
  const [deliveryAddress, setDeliveryAddress] = useState(currentDraft.deliveryAddress || '');
  const [specialNotes, setSpecialNotes] = useState('');
  
  const [submittedOrder, setSubmittedOrder] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sync draft props if changed externally by Brief
  React.useEffect(() => {
    if (currentDraft.customerName && !customerName) setCustomerName(currentDraft.customerName);
    if (currentDraft.phone && !phone) setPhone(currentDraft.phone);
    if (currentDraft.orderType) setOrderType(currentDraft.orderType);
    if (currentDraft.deliveryAddress && !deliveryAddress) setDeliveryAddress(currentDraft.deliveryAddress);
    if (currentDraft.preferredTime && !preferredTime) setPreferredTime(currentDraft.preferredTime);
  }, [currentDraft]);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.selectedOption ? item.selectedOption.price : item.item.price;
    return acc + price * item.quantity;
  }, 0);

  const deliveryFee = orderType === 'delivery' && cartItems.length > 0 ? 200 : 0;
  const total = subtotal + deliveryFee;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsSubmitting(true);

    const orderPayload = {
      customerName: customerName.trim() || 'Valued Guest',
      phoneNumber: phone.trim() || 'Not specified',
      orderType,
      deliveryAddress: orderType === 'delivery' ? deliveryAddress.trim() : 'Store Pickup (Gulberg III)',
      preferredTime,
      items: cartItems,
      subtotal,
      deliveryFee,
      total,
      notes: specialNotes.trim(),
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });
      const data = await response.json();

      setSubmittedOrder(data.order);
      onUpdateDraft({ status: 'ready_for_review' });

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#d97706', '#fbbf24', '#78350f'],
        });
      } catch {}
    } catch (err) {
      console.error('Error submitting order draft:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateWhatsAppMessage = () => {
    const itemsList = cartItems
      .map(
        (ci) =>
          `• ${ci.quantity}x ${ci.item.name} (${ci.selectedOption ? ci.selectedOption.name : 'Standard'}) - PKR ${(
            (ci.selectedOption ? ci.selectedOption.price : ci.item.price) * ci.quantity
          ).toLocaleString()}`
      )
      .join('\n');

    const msg = `*BAKEBRIEF Order Ticket* 🍰
_Every Bite Wins the Case._

*Order ID:* ${submittedOrder?.id || 'BB-NEW'}
*Customer Name:* ${customerName || 'Customer'}
*Phone:* ${phone || 'N/A'}
*Service:* ${orderType.toUpperCase()}
*Preferred Time:* ${preferredTime}
${orderType === 'delivery' ? `*Delivery Address:* ${deliveryAddress}\n` : ''}${specialNotes ? `*Special Notes:* ${specialNotes}\n` : ''}
*Items:*
${itemsList}

*Subtotal:* PKR ${subtotal.toLocaleString()}
${orderType === 'delivery' ? `*Est. Delivery Fee:* PKR ${deliveryFee}\n` : ''}*Total Amount:* PKR ${total.toLocaleString()}

_Please confirm my order from BAKEBRIEF Lahore._`;

    return encodeURIComponent(msg);
  };

  const copyTicketText = () => {
    const itemsList = cartItems
      .map(
        (ci) =>
          `• ${ci.quantity}x ${ci.item.name} - PKR ${(
            (ci.selectedOption ? ci.selectedOption.price : ci.item.price) * ci.quantity
          ).toLocaleString()}`
      )
      .join('\n');

    const text = `BAKEBRIEF Order Ticket (${submittedOrder?.id || 'BB-NEW'})
Customer: ${customerName}
Phone: ${phone}
Service: ${orderType.toUpperCase()}
Time: ${preferredTime}
${orderType === 'delivery' ? `Address: ${deliveryAddress}\n` : ''}Items:
${itemsList}
Total: PKR ${total.toLocaleString()}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-lg bg-stone-900 border-l border-stone-800 h-full flex flex-col shadow-2xl text-stone-100 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-stone-100">
                Order Ticket & Bag
              </h2>
              <p className="text-xs text-amber-300/80">
                BAKEBRIEF Lahore • Step-by-Step Checkout
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {submittedOrder ? (
            /* Order Prepared Screen */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Ticket #{submittedOrder.id}
                </span>
                <h3 className="font-serif font-bold text-2xl text-stone-100 mt-3">
                  Order Details Prepared!
                </h3>
                <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
                  Assistant Brief has compiled your complete order specifications.
                </p>
              </div>

              {/* Statutory Note as mandated */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/40 text-amber-200 text-xs leading-relaxed text-left flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold text-amber-300 mb-0.5">BAKEBRIEF Confirmation Policy:</strong>
                  "I can help you prepare the order details, but the final order needs to be confirmed through BAKEBRIEF."
                </div>
              </div>

              {/* WhatsApp Action Button */}
              <div className="space-y-3">
                <a
                  href={`https://wa.me/923001232026?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition-transform active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Ticket to BAKEBRIEF WhatsApp (+92 300 123 2026)</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>

                <button
                  onClick={copyTicketText}
                  className="w-full py-2.5 px-4 bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 border border-stone-700 transition-colors"
                >
                  <Copy className="w-4 h-4 text-amber-400" />
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Order Ticket Text'}</span>
                </button>

                <button
                  onClick={() => {
                    setSubmittedOrder(null);
                    onClearCart();
                  }}
                  className="text-xs text-stone-400 hover:text-amber-300 underline pt-2"
                >
                  Start a Fresh Order
                </button>
              </div>
            </div>
          ) : (
            /* Standard Bag & Customer Form */
            <>
              {/* Itemized List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-400 font-semibold uppercase tracking-wider">
                  <span>Selected Items ({cartItems.length})</span>
                  {cartItems.length > 0 && (
                    <button
                      onClick={onClearCart}
                      className="text-rose-400 hover:text-rose-300 flex items-center gap-1 normal-case font-normal"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear all</span>
                    </button>
                  )}
                </div>

                {cartItems.length === 0 ? (
                  <div className="p-8 text-center bg-stone-950/60 rounded-2xl border border-stone-800/80">
                    <ShoppingBag className="w-8 h-8 text-stone-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-stone-300">Your bag is empty</p>
                    <p className="text-xs text-stone-500 mt-1">
                      Ask Brief in the chat or pick delicious items from the menu tab!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {cartItems.map((cartItem, idx) => {
                      const itemPrice = cartItem.selectedOption
                        ? cartItem.selectedOption.price
                        : cartItem.item.price;

                      return (
                        <div
                          key={idx}
                          className="p-3 bg-stone-950/80 rounded-xl border border-stone-800 flex items-center justify-between gap-3"
                        >
                          <img
                            src={cartItem.item.image}
                            alt={cartItem.item.name}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 rounded-lg object-cover shrink-0 border border-stone-800"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-stone-100 truncate">
                              {cartItem.item.name}
                            </h4>
                            <p className="text-[11px] text-amber-400/90 font-medium">
                              {cartItem.selectedOption ? cartItem.selectedOption.name : 'Standard'} • PKR {itemPrice.toLocaleString()}
                            </p>
                          </div>

                          {/* Quantity control */}
                          <div className="flex items-center gap-1.5 bg-stone-900 p-1 rounded-lg border border-stone-800">
                            <button
                              onClick={() => onUpdateQuantity(idx, cartItem.quantity - 1)}
                              className="p-1 text-stone-400 hover:text-stone-200"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-amber-300 px-1">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(idx, cartItem.quantity + 1)}
                              className="p-1 text-stone-400 hover:text-stone-200"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(idx)}
                            className="p-1.5 text-stone-500 hover:text-rose-400 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Customer Details Form */}
              <form onSubmit={handleFormSubmit} className="space-y-4 pt-2 border-t border-stone-800">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Customer & Delivery Details
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                      onUpdateDraft({ customerName: e.target.value });
                    }}
                    placeholder="e.g. Zaid Khan"
                    className="w-full bg-stone-950 text-stone-100 text-xs px-3.5 py-2.5 rounded-xl border border-stone-800 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Phone Number (WhatsApp) *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      onUpdateDraft({ phone: e.target.value });
                    }}
                    placeholder="e.g. 0300 1234567"
                    className="w-full bg-stone-950 text-stone-100 text-xs px-3.5 py-2.5 rounded-xl border border-stone-800 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                {/* Pickup vs Delivery */}
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Order Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setOrderType('delivery');
                        onUpdateDraft({ orderType: 'delivery' });
                      }}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-2 ${
                        orderType === 'delivery'
                          ? 'bg-amber-500 text-stone-950 border-amber-400'
                          : 'bg-stone-950 text-stone-400 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Delivery in Lahore</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setOrderType('pickup');
                        onUpdateDraft({ orderType: 'pickup' });
                      }}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-2 ${
                        orderType === 'pickup'
                          ? 'bg-amber-500 text-stone-950 border-amber-400'
                          : 'bg-stone-950 text-stone-400 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Store Pickup</span>
                    </button>
                  </div>
                </div>

                {/* Delivery Address if delivery */}
                {orderType === 'delivery' && (
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>Delivery Address (Lahore) *</span>
                    </label>
                    <textarea
                      required={orderType === 'delivery'}
                      rows={2}
                      value={deliveryAddress}
                      onChange={(e) => {
                        setDeliveryAddress(e.target.value);
                        onUpdateDraft({ deliveryAddress: e.target.value });
                      }}
                      placeholder="e.g. House 42, Block H, Phase 5 DHA, Lahore"
                      className="w-full bg-stone-950 text-stone-100 text-xs px-3.5 py-2 rounded-xl border border-stone-800 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                )}

                {/* Preferred Time */}
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Preferred Time</span>
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => {
                      setPreferredTime(e.target.value);
                      onUpdateDraft({ preferredTime: e.target.value });
                    }}
                    className="w-full bg-stone-950 text-stone-100 text-xs px-3.5 py-2.5 rounded-xl border border-stone-800 focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    <option value="As soon as possible (40-55 mins)">As soon as possible (40-55 mins)</option>
                    <option value="Today: In 2 Hours">Today: In 2 Hours</option>
                    <option value="Today Evening (7:00 PM - 9:00 PM)">Today Evening (7:00 PM - 9:00 PM)</option>
                    <option value="Tomorrow (Custom cake / Advance order)">Tomorrow (Custom cake / Advance order)</option>
                  </select>
                </div>

                {/* Special Instructions */}
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Kitchen / Message Notes (Optional)
                  </label>
                  <input
                    type="text"
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    placeholder="e.g. Write 'Happy Birthday Sarah' on the cake"
                    className="w-full bg-stone-950 text-stone-100 text-xs px-3.5 py-2 rounded-xl border border-stone-800 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Price Breakdown */}
                <div className="pt-3 border-t border-stone-800 space-y-1.5 text-xs">
                  <div className="flex justify-between text-stone-400">
                    <span>Subtotal:</span>
                    <span className="font-semibold text-stone-200">PKR {subtotal.toLocaleString()}</span>
                  </div>
                  {orderType === 'delivery' && (
                    <div className="flex justify-between text-stone-400">
                      <span>Estimated Delivery Fee (Lahore):</span>
                      <span className="font-semibold text-stone-200">PKR {deliveryFee}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold text-stone-100 pt-1.5 border-t border-stone-800">
                    <span>Estimated Total:</span>
                    <span className="text-amber-400 text-base">PKR {total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={cartItems.length === 0 || isSubmitting}
                  className="w-full py-3.5 px-4 bg-amber-500 hover:bg-amber-400 disabled:bg-stone-800 disabled:text-stone-600 text-stone-950 font-black rounded-xl text-sm transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                >
                  <Receipt className="w-4 h-4" />
                  <span>{isSubmitting ? 'Preparing Ticket...' : 'Prepare Order Ticket'}</span>
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
