import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Users, ShieldCheck, CheckCircle2, Scale, Sparkles } from 'lucide-react';

interface TableReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TableReservationModal({ isOpen, onClose }: TableReservationModalProps) {
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('2026-07-28');
  const [time, setTime] = useState('19:30');
  const [seating, setSeating] = useState('Live Glass Courtroom Bench');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleReserve = (e: FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
  };

  const seatingOptions = [
    { title: 'Live Glass Courtroom Bench', desc: 'Directly facing our live theater chefs through crystal glass.' },
    { title: 'Judges Private Velvet Booth', desc: 'Secluded luxury leather booth for private legal gatherings.' },
    { title: 'Gourmet Park Avenue Terrace', desc: 'Heated outdoor seating overlooking twilight avenue views.' },
  ];

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
          className="relative w-full max-w-xl glass-card rounded-3xl border-[#d4af37]/40 shadow-2xl overflow-hidden z-10 my-auto"
        >
          {/* Header */}
          <div className="p-5 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37]">
                <Scale className="w-4 h-4" />
              </span>
              <div>
                <span className="text-[10px] font-mono text-[#d4af37] tracking-widest uppercase block">
                  BAKEBRIEF BENCH RESERVATIONS
                </span>
                <h3 className="font-serif-luxury text-lg font-bold text-white">
                  Reserve Your Courtroom Bench
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

          {/* Form Content */}
          <div className="p-6">
            {confirmed ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border-2 border-[#d4af37] flex items-center justify-center text-[#d4af37] mx-auto animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="font-serif-luxury text-2xl font-bold text-white">
                  Bench Reservation Confirmed!
                </h3>

                <p className="text-xs text-zinc-300 max-w-sm mx-auto font-light">
                  We look forward to hosting you at <strong className="text-[#d4af37]">{seating}</strong> on <strong className="text-white">{date}</strong> at <strong className="text-white">{time}</strong>.
                </p>

                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-left space-y-1 font-mono text-xs">
                  <div className="text-[10px] text-[#d4af37] uppercase">CONFIRMATION DOCKET:</div>
                  <div className="text-white font-bold">RESERV-BENCH-2026-991</div>
                  <div className="text-zinc-400">GUESTS: {guests} Persons</div>
                </div>

                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider"
                >
                  Done & Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleReserve} className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">GUESTS</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((g) => (
                        <option key={g} value={g}>{g} Guests</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">DATE</label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">TIME SLOT</label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="12:00">12:00 PM (Lunch)</option>
                      <option value="13:30">01:30 PM</option>
                      <option value="18:00">06:00 PM (Dinner)</option>
                      <option value="19:30">07:30 PM (Peak)</option>
                      <option value="21:00">09:00 PM (Late)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">
                    SEATING ZONE PREFERENCE
                  </label>
                  <div className="space-y-2">
                    {seatingOptions.map((opt) => (
                      <button
                        key={opt.title}
                        type="button"
                        onClick={() => setSeating(opt.title)}
                        className={`w-full p-3 rounded-xl border text-left transition ${
                          seating === opt.title
                            ? 'bg-[#d4af37]/15 border-[#d4af37] text-white'
                            : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        <div className="font-bold text-xs">{opt.title}</div>
                        <div className="text-[10px] text-zinc-400 font-light">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">YOUR NAME</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Counselor Alex"
                      className="w-full p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">PHONE NUMBER</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider shadow-xl hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition"
                >
                  Confirm Bench Reservation
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
