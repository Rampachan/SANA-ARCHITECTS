import React, { useEffect, useState } from 'react';

interface LogoLoaderProps {
  onComplete: () => void;
  durationMs?: number; // default 3000ms (3 seconds)
}

export const LogoLoader: React.FC<LogoLoaderProps> = ({ 
  onComplete,
  durationMs = 3000 
}) => {
  const [progress, setProgress] = useState(0);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const services = [
    "Architecture & Elevation Design",
    "3D Architectural Visualization",
    "Interior Architecture & Joinery",
    "Turnkey Construction Execution"
  ];

  useEffect(() => {
    const startTime = performance.now();
    let animId: number;

    const updateLoader = (now: number) => {
      const elapsed = now - startTime;
      const currentProgress = Math.min(100, Math.floor((elapsed / durationMs) * 100));
      setProgress(currentProgress);

      // Cycle service text based on progress
      const serviceIdx = Math.min(
        services.length - 1,
        Math.floor((currentProgress / 100) * services.length)
      );
      setActiveServiceIndex(serviceIdx);

      if (elapsed < durationMs) {
        animId = requestAnimationFrame(updateLoader);
      } else {
        setProgress(100);
        // Begin curtain reveal exit
        setIsExiting(true);
        setTimeout(() => {
          onComplete();
        }, 750); // Matches slide-up exit duration
      }
    };

    animId = requestAnimationFrame(updateLoader);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [durationMs, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col justify-between bg-studio-black text-canvas-light transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] select-none ${
        isExiting ? '-translate-y-full opacity-90 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
    >
      {/* Subtle Architectural Grid Lines Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        <div className="w-full h-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Top Header Bar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pt-8 flex items-center justify-between text-xs text-studio-concrete tracking-architectural uppercase">
        <span className="font-mono text-[11px] text-canvas-muted">
          Rasipuram • Salem
        </span>

        <button
          onClick={() => {
            setIsExiting(true);
            setTimeout(onComplete, 350);
          }}
          className="text-[10px] tracking-widest text-canvas-muted hover:text-white transition-colors uppercase border border-white/10 px-3 py-1 rounded hover:border-white/30"
        >
          Skip Intro
        </button>
      </div>

      {/* Center Stage: Animated Logo & Services */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center -mt-6">
        {/* Animated Monogram Emblem */}
        <div className="relative mb-6 group">
          {/* Luminous Warm Backlight Glow */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-accent-terracotta/25 to-accent-amber/25 blur-2xl opacity-60 animate-pulse pointer-events-none" />

          <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center bg-white/5 border border-white/10 rounded-sm p-4 backdrop-blur-sm shadow-2xl transition-transform duration-1000 ease-out hover:scale-105">
            <img
              src="/images/sana-emblem-clean.png"
              alt="SANA Architects Monogram"
              className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(217,119,6,0.25)] animate-[pulse_2.5s_ease-in-out_infinite]"
            />
          </div>
        </div>

        {/* Brand Name Typography Reveal */}
        <div className="space-y-2 mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold tracking-[0.3em] uppercase text-white leading-none">
            SANA ARCHITECTS
          </h1>
          <p className="text-xs sm:text-sm uppercase tracking-architectural text-canvas-stone/70 font-light">
            Architecture • Interior • 3D Design
          </p>
        </div>

        {/* Services Mentioned Below Logo with Smooth Transition */}
        <div className="h-10 flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-amber animate-ping" />
            <span className="text-xs font-mono uppercase tracking-widest text-canvas-light transition-all duration-300">
              {services[activeServiceIndex]}
            </span>
          </div>
        </div>

        {/* Micro Services Tagline Row */}
        <div className="mt-4 flex items-center gap-3 text-[10px] tracking-architectural uppercase text-studio-concrete">
          <span className={activeServiceIndex === 0 ? 'text-white font-medium' : 'opacity-40'}>01 Architecture</span>
          <span className="opacity-20">•</span>
          <span className={activeServiceIndex === 1 ? 'text-white font-medium' : 'opacity-40'}>02 3D Visualization</span>
          <span className="opacity-20">•</span>
          <span className={activeServiceIndex === 2 ? 'text-white font-medium' : 'opacity-40'}>03 Interiors</span>
          <span className="opacity-20">•</span>
          <span className={activeServiceIndex === 3 ? 'text-white font-medium' : 'opacity-40'}>04 Execution</span>
        </div>
      </div>

      {/* Bottom Progress Bar & Coordinates */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 pb-12 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-studio-concrete">
          <span className="tracking-wider">Loading Portfolio</span>
          <span className="text-white font-semibold">{String(progress).padStart(2, '0')}%</span>
        </div>

        {/* Minimal Architectural Progress Line */}
        <div className="w-full h-[1.5px] bg-white/15 relative overflow-hidden rounded-full">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent-terracotta to-accent-amber transition-all duration-75 ease-out shadow-[0_0_8px_rgba(217,119,6,0.6)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-studio-concrete/70 pt-1">
          <span>Rasipuram 637408</span>
          <span>11.4582° N, 78.1746° E</span>
          <span>Salem 636007</span>
        </div>
      </div>
    </div>
  );
};
