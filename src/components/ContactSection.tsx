import { useState, FormEvent } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Scale, 
  CheckCircle2, 
  Navigation, 
  Calendar 
} from 'lucide-react';

interface ContactSectionProps {
  onOpenReservation: () => void;
}

export default function ContactSection({ onOpenReservation }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Table Reservation');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 2000);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#09090b] relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-[#d4af37]/30 text-[#d4af37] text-xs font-mono uppercase tracking-widest mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>COURT LOCATION & INQUIRIES</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Visit BakeBrief <span className="text-gold-gradient">Atelier.</span>
          </h2>
          <p className="text-zinc-400 text-sm font-light leading-relaxed">
            Located in the central legal district. Experience our live courtroom kitchen in person or contact our bench for corporate catering & event briefs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Map & Information (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Google Maps Dark Luxury Vector Representation */}
            <div className="glass-card rounded-3xl p-3 border-[#d4af37]/30 overflow-hidden relative group">
              <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-[#0d0f12] border border-zinc-800 flex items-center justify-center">
                {/* Custom Vector Grid Lines representing Map streets */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="absolute inset-x-0 h-1 bg-amber-500/20 top-1/2 -translate-y-1/2" />
                <div className="absolute inset-y-0 w-1 bg-amber-500/20 left-1/3" />
                <div className="absolute inset-y-0 w-1 bg-amber-500/20 left-2/3" />

                {/* Animated BakeBrief Pin */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gold-gradient p-2 flex items-center justify-center text-black shadow-[0_0_30px_#d4af37] animate-bounce">
                      <Scale className="w-6 h-6" />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#d4af37] rotate-45" />
                  </div>

                  <div className="mt-3 px-4 py-2 rounded-xl bg-black/90 border border-[#d4af37] text-center backdrop-blur-md shadow-2xl">
                    <span className="font-serif-luxury font-bold text-xs text-white block">
                      BakeBrief Flagship Atelier
                    </span>
                    <span className="text-[10px] text-[#d4af37] font-mono">
                      450 Park Avenue, Supreme District
                    </span>
                  </div>
                </div>

                {/* Map Action Button */}
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-black/80 hover:bg-black border border-zinc-700 hover:border-[#d4af37] text-xs font-mono text-white flex items-center gap-2 transition"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>

            {/* Location Info Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="glass-card p-4 rounded-2xl border-zinc-800 space-y-1">
                <MapPin className="w-4 h-4 text-[#d4af37] mb-1" />
                <span className="text-[10px] font-mono text-zinc-400 block uppercase">ADDRESS</span>
                <p className="text-xs font-bold text-white">450 Park Avenue, Supreme District</p>
              </div>

              <div className="glass-card p-4 rounded-2xl border-zinc-800 space-y-1">
                <Phone className="w-4 h-4 text-[#d4af37] mb-1" />
                <span className="text-[10px] font-mono text-zinc-400 block uppercase">BENCH HOTLINE</span>
                <p className="text-xs font-bold text-white">+1 (800) 555-BAKE</p>
              </div>

              <div className="glass-card p-4 rounded-2xl border-zinc-800 space-y-1">
                <Clock className="w-4 h-4 text-[#d4af37] mb-1" />
                <span className="text-[10px] font-mono text-zinc-400 block uppercase">COURT HOURS</span>
                <p className="text-xs font-bold text-white">Mon–Sun: 7:00 AM – 11:00 PM</p>
              </div>
            </div>
          </div>

          {/* Contact / Inquiry Form (5 cols) */}
          <div className="lg:col-span-5 glass-card p-6 md:p-8 rounded-3xl border-gold-glow">
            <h3 className="font-serif-luxury text-xl font-bold text-white mb-2">
              Send a Subpoena Inquiry
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Contact our head clerk for private dining, corporate briefs, or feedback.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-serif-luxury font-bold text-white">Inquiry Received</h4>
                <p className="text-xs text-zinc-300">
                  Our head clerk will respond to your docket within 2 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Counselor Jane Smith"
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="counselor@firm.com"
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">Inquiry Type</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option>Table Reservation</option>
                    <option>Corporate Catering Brief</option>
                    <option>Private Bench Event</option>
                    <option>General Docket Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">Brief Details</label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Specify date, number of guests, or dietary preferences..."
                    className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-[#d4af37] h-24 resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                    <span>File Inquiry</span>
                  </button>

                  <button
                    type="button"
                    onClick={onOpenReservation}
                    className="w-full py-3 rounded-xl bg-zinc-900 text-[#d4af37] border border-[#d4af37]/40 hover:bg-[#d4af37]/10 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Instant Table Reservation Modal</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
