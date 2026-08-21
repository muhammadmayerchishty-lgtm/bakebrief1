import { useState, FormEvent } from 'react';
import { Scale, ArrowUp, Send, CheckCircle2 } from 'lucide-react';
import { ASSETS } from '../data/menuData';
import Magnetic from './Magnetic';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] border-t border-white/10 text-zinc-400 text-xs relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-[#C5A059]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={ASSETS.logoCrest}
                alt="BakeBrief Gold Crest"
                className="w-12 h-12 rounded-full border border-[#C5A059]/40 object-contain"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-white flex items-center gap-1.5">
                  BakeBrief
                  <Scale className="w-4 h-4 text-[#C5A059]" />
                </span>
                <span className="text-[9px] tracking-[0.25em] text-[#C5A059] uppercase font-mono font-medium">
                  Every Bite Wins The Case
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-sm">
              BakeBrief is a luxury bakery inspired by the legal profession. Every recipe is crafted like a legal brief with precision, trust, balance, and supreme culinary excellence.
            </p>

            <div className="p-3 rounded-2xl bg-black/60 border border-white/10 text-[11px] font-mono text-zinc-400">
              COURT LOCATION: <strong className="text-white">450 Park Avenue, Supreme District</strong>
            </div>
          </div>

          {/* Quick Menu Dockets */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Menu Dockets
            </h4>
            <ul className="space-y-2 text-xs font-light">
              <li><a href="#menu" className="hover:text-[#C5A059] transition">Chicken & Beef Burgers</a></li>
              <li><a href="#menu" className="hover:text-[#C5A059] transition">Zinger & Crunch Burgers</a></li>
              <li><a href="#menu" className="hover:text-[#C5A059] transition">72hr Sourdough Pizzas</a></li>
              <li><a href="#menu" className="hover:text-[#C5A059] transition">24K Gold Leaf Velvet Cakes</a></li>
              <li><a href="#menu" className="hover:text-[#C5A059] transition">Biscuits & Fresh Juices</a></li>
              <li><a href="#menu" className="hover:text-[#C5A059] transition">High Court Croissants</a></li>
            </ul>
          </div>

          {/* Courtroom Navigation */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Court Directory
            </h4>
            <ul className="space-y-2 text-xs font-light">
              <li><a href="#live-kitchen" className="hover:text-[#C5A059] transition">Live Kitchen Theater</a></li>
              <li><a href="#story" className="hover:text-[#C5A059] transition">The BakeBrief Case Story</a></li>
              <li><a href="#gallery" className="hover:text-[#C5A059] transition">High-Res Gallery Archive</a></li>
              <li><a href="#verdicts" className="hover:text-[#C5A059] transition">Judicial Opinions & Verdicts</a></li>
              <li><a href="#contact" className="hover:text-[#C5A059] transition">Bench Inquiries & Catering</a></li>
            </ul>
          </div>

          {/* Subpoena Newsletter */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Subpoena Newsletter
            </h4>
            <p className="text-xs text-zinc-400 font-light">
              Subscribe to receive weekly secret legal recipes and private bench event invitations.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Subpoena Issued To Your Inbox!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="counselor@domain.com"
                  className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                />
                <Magnetic strength={0.2}>
                  <button
                    type="submit"
                    data-cursor="SUBPOENA"
                    className="w-full py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#DBC182] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Issue Subpoena</span>
                  </button>
                </Magnetic>
              </form>
            )}
          </div>
        </div>

        {/* Footer Bottom Legal Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 font-mono text-[10px]">
          <div>
            © 2026 BakeBrief Atelier Ltd. Every Bite Wins The Case. All taste copyrights reserved.
          </div>

          <div className="flex items-center gap-4">
            <a href="#hero" className="hover:text-[#C5A059]">Privacy Brief</a>
            <span>•</span>
            <a href="#hero" className="hover:text-[#C5A059]">Terms of Court</a>
            <span>•</span>
            <Magnetic strength={0.2}>
              <button
                onClick={scrollToTop}
                data-cursor="TOP"
                className="p-2 rounded-full bg-black/60 text-zinc-400 hover:text-white border border-white/10 flex items-center gap-1"
              >
                <ArrowUp className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>TOP</span>
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  );
}

