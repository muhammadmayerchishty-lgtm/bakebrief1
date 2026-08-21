import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  ShoppingBag, 
  Plus, 
  Check, 
  Clock, 
  MapPin, 
  Phone, 
  AlertCircle, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  ChevronRight,
  ShieldCheck,
  Utensils
} from 'lucide-react';
import { ChatMessage, MenuItem, CartItem, ParsedOrderDraft } from '../types';
import { QUICK_PROMPTS, BAKEBRIEF_INFO, MENU_ITEMS } from '../data/bakebriefData';

interface ChatAssistantViewProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => Promise<void>;
  isLoading: boolean;
  onAddToCart: (item: MenuItem, quantity?: number, option?: { name: string; price: number }) => void;
  cartItems: CartItem[];
  currentOrderDraft: ParsedOrderDraft;
  onOpenBag: () => void;
  onResetChat: () => void;
  onOpenStoreInfo: () => void;
}

export const ChatAssistantView: React.FC<ChatAssistantViewProps> = ({
  messages,
  onSendMessage,
  isLoading,
  onAddToCart,
  cartItems,
  currentOrderDraft,
  onOpenBag,
  onResetChat,
  onOpenStoreInfo,
}) => {
  const [inputText, setInputText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputText.trim();
    if (!text || isLoading) return;
    setInputText('');
    await onSendMessage(text);
  };

  const handleQuickPrompt = async (promptQuery: string) => {
    if (isLoading) return;
    await onSendMessage(promptQuery);
  };

  const handleAddItem = (item: MenuItem) => {
    onAddToCart(item, 1);
    setAddedItemIds(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds(prev => ({ ...prev, [item.id]: false }));
    }, 2000);
  };

  // Browser TTS capability
  const speakMessage = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const cleanText = text.replace(/\*\*/g, '').replace(/[#*_]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.05;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Render markdown-like simple formatting for bold text and bullet points
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');
    return (
      <div className="space-y-1.5 text-stone-100 leading-relaxed text-sm sm:text-base">
        {lines.map((line, idx) => {
          if (!line.trim()) {
            return <div key={idx} className="h-2" />;
          }

          // Handle bullet point lines
          const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
          const cleanLine = isBullet ? line.trim().substring(1).trim() : line;

          // Parse **bold** parts
          const parts = cleanLine.split(/(\*\*.*?\*\*)/g);

          const formattedLine = parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-bold text-amber-300">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return <span key={pIdx}>{part}</span>;
          });

          if (isBullet) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-2">
                <span className="text-amber-400 font-bold mt-1 text-xs">◆</span>
                <span className="flex-1">{formattedLine}</span>
              </div>
            );
          }

          return <p key={idx}>{formattedLine}</p>;
        })}
      </div>
    );
  };

  const totalCartValue = cartItems.reduce(
    (sum, ci) => sum + (ci.selectedOption ? ci.selectedOption.price : ci.item.price) * ci.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Main Chat Column (8 cols on lg) */}
      <div className="lg:col-span-8 flex flex-col h-[calc(100vh-160px)] min-h-[580px] bg-stone-900/90 rounded-2xl border border-stone-800 shadow-xl overflow-hidden backdrop-blur">
        
        {/* Chat Header Bar */}
        <div className="px-4 sm:px-6 py-3.5 bg-stone-950/80 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center font-bold text-stone-950 shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-stone-900 rounded-full" title="Brief is Online" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif font-bold text-stone-100 text-base sm:text-lg">
                  Brief — AI Assistant
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded">
                  Verified BAKEBRIEF Knowledge
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Lahore, Pakistan • Ask about cakes, viennoiserie, savory & ordering
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const lastAsst = [...messages].reverse().find(m => m.sender === 'assistant');
                if (lastAsst) speakMessage(lastAsst.text);
              }}
              title={isSpeaking ? "Stop Voice" : "Listen to Brief's last response"}
              className={`p-2 rounded-lg text-xs transition-colors ${
                isSpeaking 
                  ? 'bg-amber-500 text-stone-950 font-bold' 
                  : 'text-stone-400 hover:text-amber-300 hover:bg-stone-800'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onResetChat}
              title="Reset conversation"
              className="p-2 text-stone-400 hover:text-stone-200 hover:bg-stone-800 rounded-lg text-xs transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chat Messages Timeline */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6" id="chat-messages-container">
          {messages.map((message) => {
            const isUser = message.sender === 'user';
            return (
              <div
                key={message.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center shrink-0 mt-1 shadow">
                    B
                  </div>
                )}

                <div className={`max-w-[88%] sm:max-w-[80%] space-y-2.5`}>
                  {/* Speech Bubble */}
                  <div
                    className={`rounded-2xl px-4 py-3 shadow-md ${
                      isUser
                        ? 'bg-amber-600 text-stone-950 font-medium rounded-tr-none'
                        : 'bg-stone-800/90 text-stone-100 border border-stone-700/60 rounded-tl-none'
                    }`}
                  >
                    {isUser ? (
                      <p className="text-sm sm:text-base font-medium whitespace-pre-wrap">{message.text}</p>
                    ) : (
                      renderFormattedText(message.text)
                    )}

                    <div className={`text-[10px] mt-1.5 text-right ${isUser ? 'text-amber-950/70' : 'text-stone-400'}`}>
                      {message.timestamp}
                    </div>
                  </div>

                  {/* If assistant referenced specific verified menu items, render interactive product chips */}
                  {message.suggestedItems && message.suggestedItems.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <p className="text-xs text-amber-300/80 font-medium flex items-center gap-1.5">
                        <Utensils className="w-3.5 h-3.5" />
                        <span>Verified BAKEBRIEF Menu Items Mentioned:</span>
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {message.suggestedItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 p-2.5 rounded-xl bg-stone-950/80 border border-stone-800 hover:border-amber-500/40 transition-colors"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              referrerPolicy="no-referrer"
                              className="w-12 h-12 rounded-lg object-cover shrink-0 border border-stone-800"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-stone-100 truncate">
                                {item.name}
                              </h4>
                              <p className="text-xs font-semibold text-amber-400">
                                {item.currency} {item.price.toLocaleString()}
                              </p>
                            </div>
                            <button
                              onClick={() => handleAddItem(item)}
                              className={`p-2 rounded-lg text-xs font-medium shrink-0 transition-all ${
                                addedItemIds[item.id]
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                              }`}
                              title="Add to order bag"
                            >
                              {addedItemIds[item.id] ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <Plus className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-full bg-stone-700 text-stone-200 font-bold text-xs flex items-center justify-center shrink-0 mt-1">
                    You
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center shrink-0">
                B
              </div>
              <div className="bg-stone-800/90 border border-stone-700/60 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="text-xs text-stone-400 ml-1">Brief is thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-stone-950/60 border-t border-stone-800/80 overflow-x-auto scrollbar-none flex items-center gap-2">
          <span className="text-[11px] font-semibold text-amber-400/70 whitespace-nowrap uppercase tracking-wider">
            Quick Ask:
          </span>
          {QUICK_PROMPTS.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleQuickPrompt(qp.query)}
              disabled={isLoading}
              className="px-3 py-1 bg-stone-800/80 hover:bg-stone-800 hover:border-amber-500/40 text-stone-300 hover:text-amber-200 text-xs rounded-full border border-stone-700/50 whitespace-nowrap transition-colors disabled:opacity-50"
            >
              {qp.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSubmit} className="p-3 sm:p-4 bg-stone-950 border-t border-stone-800 flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask Brief about pastries, cakes, burgers, allergens, or place an order..."
            disabled={isLoading}
            className="flex-1 bg-stone-900 text-stone-100 placeholder-stone-500 px-4 py-3 rounded-xl border border-stone-800 focus:outline-none focus:border-amber-500 text-sm transition-colors"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="px-5 py-3 bg-amber-500 hover:bg-amber-400 disabled:bg-stone-800 disabled:text-stone-600 text-stone-950 font-bold rounded-xl flex items-center gap-2 text-sm transition-all active:scale-95 shadow-md"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Right Column: Live Order Draft & Assistant Knowledge (4 cols on lg) */}
      <div className="lg:col-span-4 space-y-4">
        
        {/* Live Order Briefing Card */}
        <div className="bg-stone-900/90 rounded-2xl border border-stone-800 p-5 shadow-lg backdrop-blur">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h3 className="font-serif font-bold text-stone-100 text-base">
                Live Order Draft
              </h3>
            </div>
            <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          {/* Customer info gathered by assistant */}
          <div className="mt-3.5 space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-stone-950/60 border border-stone-800/80 space-y-1.5">
              <div className="flex justify-between text-stone-400">
                <span>Customer:</span>
                <span className="font-medium text-stone-200">
                  {currentOrderDraft.customerName || 'Pending details'}
                </span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Phone:</span>
                <span className="font-medium text-stone-200">
                  {currentOrderDraft.phone || 'Pending number'}
                </span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Service:</span>
                <span className="font-medium text-amber-300 capitalize">
                  {currentOrderDraft.orderType || 'Pickup or Delivery'}
                </span>
              </div>
              {currentOrderDraft.deliveryAddress && (
                <div className="flex justify-between text-stone-400">
                  <span>Address:</span>
                  <span className="font-medium text-stone-200 truncate max-w-[160px]">
                    {currentOrderDraft.deliveryAddress}
                  </span>
                </div>
              )}
            </div>

            {/* Cart Items Preview */}
            {cartItems.length > 0 ? (
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {cartItems.map((ci, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1 border-b border-stone-800/40 text-xs">
                    <span className="text-stone-300 font-medium truncate max-w-[180px]">
                      {ci.quantity}x {ci.item.name}
                    </span>
                    <span className="text-amber-400 font-semibold shrink-0">
                      PKR {((ci.selectedOption ? ci.selectedOption.price : ci.item.price) * ci.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between pt-2 text-xs font-bold text-stone-100">
                  <span>Estimated Subtotal:</span>
                  <span className="text-amber-400">PKR {totalCartValue.toLocaleString()}</span>
                </div>
              </div>
            ) : (
              <p className="text-stone-500 italic py-2 text-center">
                No items added yet. Ask Brief for recommendations or browse the menu!
              </p>
            )}

            <button
              onClick={onOpenBag}
              className="w-full mt-3 py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow"
            >
              <span>Review Order Ticket & Checkout</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* BAKEBRIEF Verified Promise Card */}
        <div className="bg-stone-900/90 rounded-2xl border border-stone-800 p-5 shadow-lg text-xs space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Official BAKEBRIEF Guidelines</span>
          </div>
          <p className="text-stone-400 leading-relaxed">
            Brief strictly uses verified BAKEBRIEF menu data, Lahore branch opening hours, and actual prices in PKR. We never hallucinate or invent policies.
          </p>

          <div className="pt-2 border-t border-stone-800 space-y-2 text-stone-300">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{BAKEBRIEF_INFO.openingHours.hours} Daily</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{BAKEBRIEF_INFO.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>WhatsApp: {BAKEBRIEF_INFO.whatsapp}</span>
            </div>
          </div>

          <button
            onClick={onOpenStoreInfo}
            className="w-full py-2 bg-stone-800 hover:bg-stone-700/80 text-amber-300 font-semibold rounded-lg text-xs transition-colors border border-stone-700/60"
          >
            View Full Store & Delivery Details
          </button>
        </div>

        {/* Tasteful Quote */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 to-stone-900 border border-amber-900/30 text-center">
          <p className="font-serif italic text-amber-300/90 text-sm">
            "{BAKEBRIEF_INFO.slogan}"
          </p>
          <span className="text-[10px] text-stone-500 uppercase tracking-widest block mt-1">
            Artisan Baking • Lahore, Pakistan
          </span>
        </div>

      </div>
    </div>
  );
};
