import { Scale, Compass, ShieldCheck, Award, FileCheck2 } from 'lucide-react';
import { ASSETS } from '../data/menuData';
import TextReveal from './TextReveal';
import TiltCard from './TiltCard';

export default function StorySection() {
  const pillars = [
    {
      title: '01. Precision Draft',
      subtitle: 'The Formula of Law',
      description: 'Every recipe is formulated with legal precision. Flour hydrations, sourdough fermentations, and searing temperatures are measured down to the milligram and degree.',
      icon: Compass,
    },
    {
      title: '02. Absolute Trust',
      subtitle: 'Open Court Testimony',
      description: 'We believe in complete transparency. Our live preparation kitchen puts every action under public witness behind pristine crystal glass.',
      icon: ShieldCheck,
    },
    {
      title: '03. Perfect Balance',
      subtitle: 'The Scale of Flavour',
      description: 'Just as justice requires equal scales, our pastries and burgers balance rich umami, bright acid, crisp crunch, and velvet softness.',
      icon: Scale,
    },
    {
      title: '04. Unanimous Verdict',
      subtitle: 'The Supreme Excellence',
      description: 'Before any dish enters our docket menu, it must win a unanimous vote from our panel of Michelin-trained chefs and master pastry legalists.',
      icon: Award,
    },
  ];

  return (
    <section id="story" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#050505] relative overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/60 border border-white/10 text-[#C5A059] text-xs font-mono uppercase tracking-[0.3em]">
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>THE BAKEBRIEF ORIGIN STORY</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tighter text-[#F5F5F0] leading-tight">
              <TextReveal text="Where Legal Minds" />
              <br />
              <span className="italic font-serif font-light text-[#C5A059] inline-block">
                <TextReveal text="Meet Culinary Masters." delay={0.2} />
              </span>
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed">
              BakeBrief was founded by a Supreme Court appellate attorney and a French master pastry chef. Frustrated by compromise in casual dining, they applied the rigorous standards of constitutional law to the art of bakery and gastronomy.
            </p>

            <blockquote className="p-5 rounded-2xl bg-black/60 border-l-4 border-[#C5A059] text-xs sm:text-sm text-zinc-300 italic font-serif">
              "A weak legal argument crumbles under cross-examination. A bad recipe crumbles on the plate. At BakeBrief, every ingredient is verified evidence."
            </blockquote>

            <div className="pt-2 grid grid-cols-2 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10">
                <span className="font-serif text-2xl font-bold text-[#C5A059] block">
                  72 Hours
                </span>
                <span className="text-[11px] text-zinc-400 font-mono uppercase">
                  Natural Sourdough Fermentation
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-white/10">
                <span className="font-serif text-2xl font-bold text-[#C5A059] block">
                  28 Days
                </span>
                <span className="text-[11px] text-zinc-400 font-mono uppercase">
                  Dry-Aged Prime Angus
                </span>
              </div>
            </div>
          </div>

          {/* Right Visual Frame (6 cols) */}
          <div className="lg:col-span-6 relative">
            <TiltCard dataCursor="LIVE CHAMBER" className="rounded-3xl overflow-hidden border border-[#C5A059]/30 shadow-2xl group relative">
              <img
                src={ASSETS.liveKitchen}
                alt="BakeBrief Master Chef at work"
                className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Overlaid Gold Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-6 glass-card rounded-2xl border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-[#C5A059] text-black">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-white">
                      The Scale of Excellence
                    </h4>
                    <span className="text-[10px] font-mono text-[#C5A059] uppercase">
                      Every Bite Wins The Case
                    </span>
                  </div>
                </div>
                <p className="text-xs text-zinc-300 font-light">
                  Witness perfection prepared live before your eyes. Our court is always open.
                </p>
              </div>
            </TiltCard>
          </div>
        </div>

        {/* The 4 Pillars Grid */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <TiltCard
                key={p.title}
                dataCursor="VERIFY"
                className="glass-card p-6 rounded-3xl border-white/10 space-y-3 h-full"
              >
                <div className="w-10 h-10 rounded-2xl bg-black/60 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-[#C5A059] block uppercase tracking-widest font-bold">
                  {p.subtitle}
                </span>
                <h3 className="font-serif text-lg font-bold text-white">{p.title}</h3>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">{p.description}</p>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

