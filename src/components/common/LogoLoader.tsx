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
    { title: "Architecture & Elevation Design", short: "Architecture" },
    { title: "3D Architectural Visualization", short: "3D Visuals" },
    { title: "Interior Architecture & Joinery", short: "Interiors" },
    { title: "Turnkey Construction Execution", short: "Execution" }
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
      className={`fixed inset-0 z-[10000] w-full h-[100dvh] flex flex-col justify-between bg-studio-black text-canvas-light transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] select-none px-4 sm:px-8 py-6 sm:py-10 ${
        isExiting ? '-translate-y-full opacity-90 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
    >
      {/* Subtle Architectural Grid Lines Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] sm:opacity-[0.04]">
        <div className="w-full h-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] sm:bg-[size:4rem_4rem]" />
      </div>

      {/* Top Header Bar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between text-xs tracking-architectural uppercase">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-amber animate-pulse" />
          <span className="font-mono text-[10px] sm:text-[11px] text-canvas-muted tracking-wider">
            Rasipuram • Salem
          </span>
        </div>

        <button
          onClick={() => {
            setIsExiting(true);
            setTimeout(onComplete, 350);
          }}
          className="text-[10px] tracking-widest text-canvas-muted hover:text-white transition-colors uppercase border border-white/10 px-3 py-1.5 rounded hover:border-white/30 touch-manipulation min-h-[36px] flex items-center"
        >
          Skip Intro
        </button>
      </div>

      {/* Center Stage: Animated Logo & Services (Optimized for Mobile & Desktop) */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center my-auto py-4">
        {/* Animated Monogram Emblem */}
        <div className="relative mb-5 sm:mb-7 group">
          {/* Luminous Warm Backlight Glow */}
          <div className="absolute -inset-3 sm:-inset-4 rounded-full bg-gradient-to-r from-accent-terracotta/30 to-accent-amber/30 blur-xl sm:blur-2xl opacity-70 animate-pulse pointer-events-none" />

          <div className="relative w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center bg-white/5 border border-white/10 rounded-sm p-3.5 sm:p-4 backdrop-blur-sm shadow-2xl transition-transform duration-700 ease-out">
            <img
              src="/images/sana-emblem-clean.png"
              alt="SANA Architects Monogram"
              className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(217,119,6,0.3)] animate-[pulse_2.5s_ease-in-out_infinite]"
            />
          </div>
        </div>

        {/* Brand Name Typography Reveal (Responsive Scaling & Tracking) */}
        <div className="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8 max-w-full px-2">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-white leading-tight">
            SANA ARCHITECTS
          </h1>
          <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-architectural text-canvas-stone/75 font-light">
            Architecture • Interior • 3D Design
          </p>
        </div>

        {/* Dynamic Service Highlight Badge */}
        <div className="min-h-[44px] flex items-center justify-center px-2 w-full max-w-md mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md max-w-full">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-amber animate-ping flex-shrink-0" />
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-canvas-light truncate">
              {services[activeServiceIndex].title}
            </span>
          </div>
        </div>

        {/* 4 Segmented Architectural Progress Steps (Mobile & Desktop) */}
        <div className="mt-5 w-full max-w-xs sm:max-w-md mx-auto px-4">
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
            {services.map((srv, idx) => {
              const isPastOrCurrent = idx <= activeServiceIndex;
              const isCurrent = idx === activeServiceIndex;
              return (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <div 
                    className={`w-full h-1 sm:h-1.5 rounded-full transition-all duration-300 ${
                      isCurrent
                        ? 'bg-gradient-to-r from-accent-terracotta to-accent-amber shadow-[0_0_8px_rgba(217,119,6,0.8)]'
                        : isPastOrCurrent
                        ? 'bg-accent-terracotta/70'
                        : 'bg-white/10'
                    }`}
                  />
                  <span className={`text-[9px] sm:text-[10px] uppercase font-mono tracking-wider truncate w-full text-center ${
                    isCurrent ? 'text-white font-semibold' : 'text-studio-concrete/60'
                  }`}>
                    {srv.short}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar & Coordinates (Optimized for Mobile screens) */}
      <div className="relative z-10 w-full max-w-2xl mx-auto space-y-2.5 pt-2">
        <div className="flex items-center justify-between text-xs font-mono text-studio-concrete">
          <span className="tracking-wider text-[11px] sm:text-xs">Loading Studio Archive</span>
          <span className="text-white font-semibold text-[11px] sm:text-xs font-mono">{String(progress).padStart(2, '0')}%</span>
        </div>

        {/* Minimal Architectural Progress Line */}
        <div className="w-full h-[2px] bg-white/10 relative overflow-hidden rounded-full">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent-terracotta to-accent-amber transition-all duration-75 ease-out shadow-[0_0_8px_rgba(217,119,6,0.6)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Geographic Coordinates Bar */}
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-studio-concrete/70 pt-0.5">
          <span>Rasipuram 637408</span>
          <span className="hidden xs:inline">11.4582° N, 78.1746° E</span>
          <span>Salem 636007</span>
        </div>
      </div>
    </div>
  );
};
