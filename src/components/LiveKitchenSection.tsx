import { useState, useEffect } from 'react';
import { 
  Eye, 
  Thermometer, 
  Users, 
  CheckCircle2, 
  Play, 
  Maximize2, 
  Clock, 
  Radio, 
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { LIVE_CAM_STREAMS } from '../data/menuData';
import TextReveal from './TextReveal';
import Magnetic from './Magnetic';

export default function LiveKitchenSection() {
  const [activeCamIndex, setActiveCamIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [prepStep, setPrepStep] = useState(2);
  const activeCam = LIVE_CAM_STREAMS[activeCamIndex];

  // Simulating live activity updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPrepStep((prev) => (prev % 4) + 1);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const prepProgressSteps = [
    { title: 'Dredge & Searing', desc: 'Precision temperature searing under infrared spotlight' },
    { title: 'Live Assembly', desc: 'Assembling brioche, micro-greens, and brief sauce' },
    { title: '24K Gold Embellishment', desc: 'Applying genuine gold leaf flakes under macro glass' },
    { title: 'Final Verdict Inspection', desc: 'Master Chef signature approval stamp' },
  ];

  return (
    <section id="live-kitchen" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#050505] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-[#C5A059] text-xs font-mono uppercase tracking-widest mb-3">
              <Radio className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
              <span>THE LIVE COURTROOM EXPERIENCE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
              <TextReveal text="Customers Watch Their" /> <br />
              <span className="italic font-serif text-[#C5A059] inline-block">
                <TextReveal text="Food Prepared Live." delay={0.2} />
              </span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-zinc-400 text-sm max-w-md font-light">
            Every BakeBrief kitchen is enclosed in crystal soundproof glass. Watch master chefs assemble your order with surgical precision—in person or on our live feeds.
          </p>
        </div>

        {/* Live Theater Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Video Stream Frame (8 cols) */}
          <div className="lg:col-span-8 glass-card rounded-3xl p-3 md:p-4 border-white/10 relative overflow-hidden group shadow-2xl">
            {/* Camera Viewport Header Overlay */}
            <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-center pointer-events-none">
              <div className="flex items-center gap-2.5 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="text-xs font-mono font-bold text-white tracking-wider uppercase">
                  LIVE STREAM • {activeCam.angle}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs font-mono text-[#C5A059]">
                  <Users className="w-3.5 h-3.5" />
                  <span>{activeCam.viewers.toLocaleString()} Watching</span>
                </div>
                <Magnetic strength={0.3}>
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="pointer-events-auto p-2 bg-black/80 hover:bg-black text-white rounded-full border border-white/20"
                    title="Toggle Full View"
                    data-cursor="FULLSCREEN"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </Magnetic>
              </div>
            </div>

            {/* Video Feed Simulation Display */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/10">
              <img
                src={activeCam.image}
                alt={activeCam.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Grid HUD Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

              {/* Bottom Stream Status HUD */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-[#C5A059] tracking-widest uppercase block mb-1">
                    {activeCam.station}
                  </span>
                  <h3 className="font-serif text-lg md:text-2xl font-bold text-white">
                    {activeCam.name}
                  </h3>
                  <p className="text-xs text-zinc-300 flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>{activeCam.chefName}</span>
                    <span className="text-zinc-500">•</span>
                    <span className="text-zinc-400 italic">{activeCam.currentActivity}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-3.5 py-2 rounded-xl bg-black/80 border border-white/10 flex items-center gap-2 text-xs font-mono text-[#C5A059]">
                    <Thermometer className="w-4 h-4 text-[#C5A059]" />
                    <span>{activeCam.temperature}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Order Step Progress Tracker */}
            <div className="mt-4 p-4 rounded-2xl bg-black/60 border border-white/10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>LIVE BENCH PREPARATION STAGE</span>
                </span>
                <span className="text-xs font-bold text-[#C5A059]">STEP {prepStep} OF 4</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {prepProgressSteps.map((step, idx) => {
                  const stepNum = idx + 1;
                  const isActive = stepNum === prepStep;
                  const isDone = stepNum < prepStep;

                  return (
                    <div
                      key={step.title}
                      className={`p-2.5 rounded-xl border text-xs transition-all ${
                        isActive
                          ? 'bg-[#C5A059]/15 border-[#C5A059] text-white shadow-[0_0_15px_rgba(197,160,89,0.2)]'
                          : isDone
                          ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                          : 'bg-black/40 border-white/10 text-zinc-500'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold mb-1">
                        {isDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <span className={`w-3.5 h-3.5 rounded-full text-[10px] flex items-center justify-center font-mono ${isActive ? 'bg-[#C5A059] text-black font-extrabold' : 'bg-white/10 text-zinc-400'}`}>
                            {stepNum}
                          </span>
                        )}
                        <span className="truncate">{step.title}</span>
                      </div>
                      <p className="text-[10px] text-zinc-400 line-clamp-1">{step.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Camera Stations Selector Sidebar (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="glass-card p-5 rounded-3xl border-white/10">
              <h3 className="font-serif text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#C5A059]" />
                <span>Select Camera Angle</span>
              </h3>
              <p className="text-xs text-zinc-400 mb-4">
                Switch camera perspectives to inspect different live stations across our courtroom kitchen.
              </p>

              <div className="flex flex-col gap-3">
                {LIVE_CAM_STREAMS.map((cam, idx) => {
                  const isSelected = idx === activeCamIndex;
                  return (
                    <button
                      key={cam.id}
                      onClick={() => setActiveCamIndex(idx)}
                      data-cursor={`CAM 0${idx + 1}`}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-300 flex items-center gap-3 ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#C5A059]/20 to-black/60 border-[#C5A059] text-white shadow-lg'
                          : 'bg-black/60 border-white/10 text-zinc-300 hover:border-white/20'
                      }`}
                    >
                      <div className="relative w-16 h-12 rounded-xl overflow-hidden shrink-0 border border-white/10">
                        <img
                          src={cam.image}
                          alt={cam.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-[#C5A059]/20 flex items-center justify-center">
                            <Play className="w-4 h-4 text-white fill-white" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-mono text-[#C5A059] block uppercase font-semibold">
                          STATION 0{idx + 1}
                        </span>
                        <h4 className="text-xs font-bold text-white truncate">{cam.station}</h4>
                        <span className="text-[10px] text-zinc-400 flex items-center gap-1 mt-0.5">
                          <Thermometer className="w-3 h-3 text-[#C5A059]" />
                          {cam.temperature}
                        </span>
                      </div>

                      <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#C5A059]' : 'text-zinc-600'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* In-Person Experience Guarantee Card */}
            <div className="glass-card p-5 rounded-3xl border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <ShieldAlert className="w-5 h-5 text-[#C5A059]" />
                <h4 className="font-serif text-sm font-bold text-white">
                  The Courtroom Transparency Oath
                </h4>
              </div>
              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                "No hidden doors. No secret ingredients behind closed walls. Every single item served at BakeBrief is prepared in full view of our guests."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

