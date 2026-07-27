import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Scale, Star, Quote, Plus, Send, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS } from '../data/menuData';
import { Testimonial } from '../types';
import TextReveal from './TextReveal';
import TiltCard from './TiltCard';
import Magnetic from './Magnetic';

export default function VerdictsSection() {
  const [reviewsList, setReviewsList] = useState<Testimonial[]>(TESTIMONIALS);
  const [formOpen, setFormOpen] = useState(false);
  const [judgeName, setJudgeName] = useState('');
  const [courtTitle, setCourtTitle] = useState('');
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState('');
  const [favoriteDish, setFavoriteDish] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = (e: FormEvent) => {
    e.preventDefault();
    if (!judgeName || !quote) return;

    const newRev: Testimonial = {
      id: `rev-${Date.now()}`,
      judgeName: judgeName.startsWith('Hon.') ? judgeName : `Counselor ${judgeName}`,
      courtTitle: courtTitle || 'Visiting Gourmet Jurist',
      rating,
      verdictQuote: quote,
      favoriteDish: favoriteDish || 'The Supreme Brief Burger',
      date: `Verdict Issued ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    };

    setReviewsList([newRev, ...reviewsList]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormOpen(false);
      setJudgeName('');
      setCourtTitle('');
      setQuote('');
      setFavoriteDish('');
    }, 1200);
  };

  return (
    <section id="verdicts" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#050505] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/60 border border-white/10 text-[#C5A059] text-xs font-mono uppercase tracking-widest mb-3">
              <Scale className="w-3.5 h-3.5" />
              <span>JUDICIAL OPINIONS & REVIEWS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
              <TextReveal text="Verdicts of" /> <span className="italic font-serif text-[#C5A059] inline-block">
                <TextReveal text="The Bench." delay={0.2} />
              </span>
            </h2>
          </div>

          <Magnetic strength={0.25} className="mt-4 md:mt-0 self-start md:self-auto">
            <button
              onClick={() => setFormOpen(!formOpen)}
              data-cursor="ISSUE VERDICT"
              className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-[#C5A059] hover:bg-[#DBC182] hover:shadow-[0_0_20px_rgba(197,160,89,0.4)] transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Issue Your Verdict</span>
            </button>
          </Magnetic>
        </div>

        {/* Submit Review Form Modal / Box */}
        {formOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-12 glass-card p-6 md:p-8 rounded-3xl border-[#C5A059]/40 max-w-2xl mx-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
                <span>Submit Official Judicial Opinion</span>
              </h3>
            </div>

            {submitted ? (
              <div className="py-8 text-center text-emerald-400 font-serif font-bold text-lg">
                Your Verdict Has Been Entered Into Court Records!
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">Your Full Name / Title</label>
                    <input
                      type="text"
                      required
                      value={judgeName}
                      onChange={(e) => setJudgeName(e.target.value)}
                      placeholder="e.g. Attorney John Doe"
                      className="w-full p-3 rounded-xl bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">Profession / Firm</label>
                    <input
                      type="text"
                      value={courtTitle}
                      onChange={(e) => setCourtTitle(e.target.value)}
                      placeholder="e.g. Senior Partner, Legal Firm"
                      className="w-full p-3 rounded-xl bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">Favorite BakeBrief Dish</label>
                    <input
                      type="text"
                      value={favoriteDish}
                      onChange={(e) => setFavoriteDish(e.target.value)}
                      placeholder="e.g. 28-Day Angus Smash Burger"
                      className="w-full p-3 rounded-xl bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">Verdict Rating (Stars)</label>
                    <div className="flex items-center gap-2 pt-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setRating(s)}
                          className="p-1"
                        >
                          <Star className={`w-5 h-5 ${s <= rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-700'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">Your Verdict Statement</label>
                  <textarea
                    required
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    placeholder="Describe your dining experience and flavor findings..."
                    className="w-full p-3 rounded-xl bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-[#C5A059] h-24 resize-none"
                  />
                </div>

                <Magnetic strength={0.2}>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#C5A059] hover:bg-[#DBC182] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Seal & File Verdict</span>
                  </button>
                </Magnetic>
              </form>
            )}
          </motion.div>
        )}

        {/* Testimonial Cards Grid with Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewsList.map((rev) => (
            <TiltCard
              key={rev.id}
              dataCursor="VERDICT"
              className="glass-card p-6 rounded-3xl border-white/10 flex flex-col justify-between space-y-6 relative group border-white/10 hover:border-[#C5A059]/40 h-full"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-[#C5A059]/10 group-hover:text-[#C5A059]/20 transition" />

              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-zinc-200 font-light leading-relaxed italic">
                  "{rev.verdictQuote}"
                </p>

                <div className="p-2.5 rounded-xl bg-black/60 border border-white/10 text-[11px] text-zinc-400 font-mono">
                  FAVORITE DOCKET: <strong className="text-[#C5A059]">{rev.favoriteDish}</strong>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <img
                  src={rev.avatar}
                  alt={rev.judgeName}
                  className="w-10 h-10 rounded-full object-cover border border-[#C5A059]/40"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-serif text-sm font-bold text-white leading-tight">
                    {rev.judgeName}
                  </h4>
                  <span className="text-[10px] text-zinc-400 font-mono block">{rev.courtTitle}</span>
                  <span className="text-[9px] text-[#C5A059] block mt-0.5">{rev.date}</span>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

