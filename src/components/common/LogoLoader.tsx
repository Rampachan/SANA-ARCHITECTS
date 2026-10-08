import React, { useEffect, useState, useRef } from 'react';

interface ServiceItem {
  title: string;
  short: string;
}

const SERVICES: ServiceItem[] = [
  { title: "Architecture & Elevation Design", short: "Architecture" },
  { title: "3D Architectural Visualization", short: "3D Visuals" },
  { title: "Interior Architecture & Joinery", short: "Interiors" },
  { title: "Turnkey Construction Execution", short: "Execution" }
];

interface LogoLoaderProps {
  onComplete: () => void;
  durationMs?: number; // default 2600ms for elegant architectural intro
}

export const LogoLoader: React.FC<LogoLoaderProps> = ({ 
  onComplete,
  durationMs = 2600 
}) => {
  const [progress, setProgress] = useState(0);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const onCompleteRef = useRef(onComplete);
  const hasFinishedRef = useRef(false);

  // Keep latest onComplete callback in ref to prevent effect resets
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const dismissLoader = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setIsExiting(true);
    setTimeout(() => {
      onCompleteRef.current();
    }, 400); // Swift curtain exit
  };

  useEffect(() => {
    const startTime = performance.now();
    let animId: number;

    const updateLoader = (now: number) => {
      if (hasFinishedRef.current) return;

      // Ensure elapsed is never negative due to clock drift/navigation timing
      const elapsed = Math.max(0, now - startTime);
      const currentProgress = Math.max(0, Math.min(100, Math.floor((elapsed / durationMs) * 100)));
      setProgress(currentProgress);

      const serviceIdx = Math.max(
        0,
        Math.min(
          SERVICES.length - 1,
          Math.floor((currentProgress / 100) * SERVICES.length)
        )
      );
      setActiveServiceIndex(serviceIdx);

      if (elapsed < durationMs) {
        animId = requestAnimationFrame(updateLoader);
      } else {
        setProgress(100);
        dismissLoader();
      }
    };

    animId = requestAnimationFrame(updateLoader);

    // Hard fallback timeout: guarantees loader dismissal even if rAF is paused/throttled by browser
    const fallbackTimeout = setTimeout(() => {
      if (!hasFinishedRef.current) {
        dismissLoader();
      }
    }, durationMs + 250);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      clearTimeout(fallbackTimeout);
    };
  }, [durationMs]);

  return (
    <div
      onClick={dismissLoader}
      className={`fixed inset-0 z-[10000] w-full h-[100dvh] flex flex-col justify-between bg-white text-studio-black transition-all duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] select-none px-4 sm:px-8 py-6 sm:py-10 cursor-pointer ${
        isExiting ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
      title="Click or tap anywhere to enter site"
    >
      {/* Architectural Grid Lines Overlay on White */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
        <div className="w-full h-full bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] sm:bg-[size:4rem_4rem]" />
      </div>

      {/* Top Header Bar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between text-xs tracking-architectural uppercase">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-amber animate-pulse" />
          <span className="font-mono text-[10px] sm:text-[11px] text-neutral-500 tracking-wider">
            Rasipuram • Salem
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            dismissLoader();
          }}
          className="text-[10px] tracking-widest text-neutral-600 hover:text-studio-black uppercase border border-neutral-300 hover:border-studio-black px-3 py-1.5 rounded touch-manipulation min-h-[36px] flex items-center bg-neutral-100 hover:bg-neutral-200/80 font-mono shadow-xs transition-colors"
        >
          Skip to Portfolio ✕
        </button>
      </div>

      {/* Center Stage: Official Logo & Services (Optimized for Mobile & Desktop) */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center my-auto py-4">
        {/* Official SANA Architects Logo Graphic */}
        <div className="relative mb-2 group">
          <div className="relative w-48 h-48 xs:w-56 xs:h-56 sm:w-64 sm:h-64 flex items-center justify-center mx-auto transition-transform duration-700 ease-out transform group-hover:scale-105">
            <img
              src="/images/sana-official-logo.png"
              alt="SANA Architects Logo"
              className="w-full h-full object-contain select-none filter drop-shadow-sm"
              onError={(e) => {
                e.currentTarget.src = '/images/sana-official-logo.jpg';
              }}
            />
          </div>
        </div>

        {/* Brand Tagline */}
        <p className="text-[11px] sm:text-xs md:text-sm uppercase tracking-architectural text-neutral-500 font-light mb-6 sm:mb-8">
          Architecture • Interior • 3D Design
        </p>

        {/* Dynamic Service Highlight Badge */}
        {(() => {
          const safeIdx = Math.max(0, Math.min(SERVICES.length - 1, activeServiceIndex));
          const activeService = SERVICES[safeIdx] || SERVICES[0];
          return (
            <div className="min-h-[44px] flex items-center justify-center px-2 w-full max-w-md mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200/90 shadow-xs max-w-full">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-amber animate-ping flex-shrink-0" />
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-studio-black font-semibold truncate">
                  {activeService.title}
                </span>
              </div>
            </div>
          );
        })()}

        {/* 4 Segmented Architectural Progress Steps (Mobile & Desktop) */}
        <div className="mt-5 w-full max-w-xs sm:max-w-md mx-auto px-4">
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
            {SERVICES.map((srv, idx) => {
              const safeIdx = Math.max(0, Math.min(SERVICES.length - 1, activeServiceIndex));
              const isPastOrCurrent = idx <= safeIdx;
              const isCurrent = idx === safeIdx;
              return (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <div 
                    className={`w-full h-1 sm:h-1.5 rounded-full transition-all duration-300 ${
                      isCurrent
                        ? 'bg-gradient-to-r from-accent-terracotta to-accent-amber shadow-[0_0_8px_rgba(217,119,6,0.5)]'
                        : isPastOrCurrent
                        ? 'bg-accent-terracotta/75'
                        : 'bg-neutral-200'
                    }`}
                  />
                  <span className={`text-[9px] sm:text-[10px] uppercase font-mono tracking-wider truncate w-full text-center ${
                    isCurrent ? 'text-studio-black font-bold' : 'text-neutral-400 font-medium'
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
        <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
          <span className="tracking-wider text-[11px] sm:text-xs">
            Tap anywhere to enter • Loading
          </span>
          <span className="text-studio-black font-bold text-[11px] sm:text-xs font-mono">
            {String(progress).padStart(2, '0')}%
          </span>
        </div>

        {/* Minimal Architectural Progress Line */}
        <div className="w-full h-[2px] bg-neutral-200 relative overflow-hidden rounded-full">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent-terracotta to-accent-amber transition-all duration-75 ease-out shadow-[0_0_8px_rgba(217,119,6,0.4)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Geographic Coordinates Bar */}
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-neutral-400 pt-0.5">
          <span>Rasipuram 637408</span>
          <span className="hidden xs:inline">11.4582° N, 78.1746° E</span>
          <span>Salem 636007</span>
        </div>
      </div>
    </div>
  );
};
