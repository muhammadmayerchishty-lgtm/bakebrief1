import React from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Truck, 
  Calendar, 
  ShieldCheck, 
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import { BAKEBRIEF_INFO } from '../data/bakebriefData';

interface StoreInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoreInfoModal: React.FC<StoreInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-2xl shadow-2xl text-stone-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-amber-950 via-stone-950 to-stone-900 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-stone-950 font-black text-2xl flex items-center justify-center shadow-lg">
              B
            </div>
            <div>
              <h2 className="font-serif font-bold text-xl text-stone-100">
                BAKEBRIEF Bakery & Café
              </h2>
              <p className="text-xs text-amber-300/80 italic font-serif">
                "{BAKEBRIEF_INFO.slogan}"
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

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Quick Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Opening Hours */}
            <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Operating Hours</span>
              </div>
              <p className="text-sm font-semibold text-stone-200">
                {BAKEBRIEF_INFO.openingHours.days}
              </p>
              <p className="text-xs text-amber-300 font-mono">
                {BAKEBRIEF_INFO.openingHours.hours}
              </p>
              <p className="text-[11px] text-stone-400">
                Kitchen closes at {BAKEBRIEF_INFO.openingHours.kitchenCloses}
              </p>
            </div>

            {/* Location */}
            <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Lahore Location</span>
              </div>
              <p className="text-xs font-semibold text-stone-200 leading-relaxed">
                {BAKEBRIEF_INFO.address}
              </p>
              <p className="text-[11px] text-stone-400">
                Hub: {BAKEBRIEF_INFO.neighborhood}
              </p>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Truck className="w-4 h-4" />
              <span>Lahore Delivery Network</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              We deliver fresh pastries, cakes, and café meals across Lahore.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {BAKEBRIEF_INFO.deliveryInfo.zones.map((zone, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg text-xs bg-stone-900 border border-stone-700 text-stone-300"
                >
                  {zone}
                </span>
              ))}
            </div>
            <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-400 space-y-1">
              <div>• <strong>Standard Delivery:</strong> {BAKEBRIEF_INFO.deliveryInfo.standardTime}</div>
              <div>• <strong>Custom Tiered Cakes:</strong> {BAKEBRIEF_INFO.deliveryInfo.customCakeAdvance}</div>
              <div>• <strong>Delivery Fee:</strong> {BAKEBRIEF_INFO.deliveryInfo.deliveryFee}</div>
            </div>
          </div>

          {/* Table Reservations & Dining */}
          <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Calendar className="w-4 h-4" />
              <span>Dine-In & Reservations</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              {BAKEBRIEF_INFO.reservations.note}
            </p>
          </div>

          {/* Direct Contact Info */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/30 to-stone-950 border border-amber-900/30 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Phone className="w-4 h-4" />
              <span>Direct Restaurant Contacts</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <a
                href={`tel:${BAKEBRIEF_INFO.phone}`}
                className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500 text-stone-200 flex items-center justify-between"
              >
                <span>Landline: {BAKEBRIEF_INFO.phone}</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              </a>

              <a
                href={`https://wa.me/923001232026`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800 hover:border-emerald-500 text-emerald-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp: {BAKEBRIEF_INFO.whatsapp}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              </a>
            </div>
          </div>

          {/* AI Assistant Statement */}
          <div className="flex items-center gap-3 p-3 bg-stone-950 rounded-xl border border-stone-800 text-[11px] text-stone-400">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
            <span>
              This assistant is dedicated to BAKEBRIEF. You can chat with Brief anytime for guidance on pastries, ingredients, allergies, and ordering.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
