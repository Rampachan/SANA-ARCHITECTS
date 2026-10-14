import React, { useEffect, useState, useRef, useCallback } from 'react';

interface ArchitecturalPhase {
  title: string;
  titleMobile: string;
  short: string;
  detail: string;
}

const PHASES: ArchitecturalPhase[] = [
  {
    title: "Phase 01 • 3D Blueprint Drafting & Compass Arcs",
    titleMobile: "Phase 01 • 3D Drafting",
    short: "3D Drafting",
    detail: "Isometric Spatial Geometry"
  },
  {
    title: "Phase 02 • Spatial Volumetric Assembly & 3D Extrusion",
    titleMobile: "Phase 02 • Form Assembly",
    short: "Form Assembly",
    detail: "Precision Structural Volumes"
  },
  {
    title: "Phase 03 • Chromatic Identity & Orthographic View",
    titleMobile: "Phase 03 • Identity",
    short: "Identity",
    detail: "Light, Tone & Form Alignment"
  },
  {
    title: "Phase 04 • Spaces Designed for the Way Life Unfolds",
    titleMobile: "Phase 04 • SANA Portfolio",
    short: "Architecture",
    detail: "SANA Architects Studio Portfolio"
  }
];

interface LogoLoaderProps {
  onComplete: () => void;
  durationMs?: number; // Optional duration override (defaults to video playback)
}

export const LogoLoader: React.FC<LogoLoaderProps> = ({ 
  onComplete,
  durationMs 
}) => {
  const [progress, setProgress] = useState(0);
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const onCompleteRef = useRef(onComplete);
  const hasFinishedRef = useRef(false);

  // Keep latest onComplete callback in ref to prevent effect resets
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Lock body scroll while loader is displayed (inspired by studio360photography.com preloader)
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const dismissLoader = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setIsExiting(true);

    // Pause video on dismissal to release decode resources
    if (videoRef.current) {
      try {
        videoRef.current.pause();
      } catch {
        // Ignore pause errors
      }
    }

    // 950ms allows the cubic-bezier curtain dissolve to complete smoothly
    setTimeout(() => {
      onCompleteRef.current();
    }, 950);
  }, []);

  // Keyboard shortcut: Esc or Space immediately dismisses the intro
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        dismissLoader();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dismissLoader]);

  // Video Autoplay Initialization with iOS Safari & Android Chrome compliance
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure audio tracks are strictly muted for universal browser autoplay compliance
    video.muted = true;
    video.defaultMuted = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Video autoplay prevented by browser policy:', err);
          // If browser policy rejects autoplay without gesture, fallback safely
          setVideoFailed(true);
        });
    }
  }, []);

  // Update progress and phases based on video currentTime
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration || Number.isNaN(video.duration)) return;

    const current = video.currentTime;
    const duration = video.duration;
    const pct = Math.min(100, Math.max(0, Math.floor((current / duration) * 100)));
    setProgress(pct);

    const phaseIdx = Math.min(
      PHASES.length - 1,
      Math.max(0, Math.floor((pct / 100) * PHASES.length))
    );
    setActivePhaseIndex(phaseIdx);
  };

  const handleEnded = () => {
    setProgress(100);
    dismissLoader();
  };

  // Fallback safety ticker: triggers if video fails, or if max duration elapses
  useEffect(() => {
    let fallbackInterval: ReturnType<typeof setInterval> | null = null;

    // If video fails or doesn't start, run an elegant 2.6s fallback animation
    if (videoFailed) {
      const startTime = Date.now();
      const fallbackDuration = 2600;
      fallbackInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const p = Math.min(100, Math.floor((elapsed / fallbackDuration) * 100));
        setProgress(p);

        const phaseIdx = Math.min(
          PHASES.length - 1,
          Math.max(0, Math.floor((p / 100) * PHASES.length))
        );
        setActivePhaseIndex(phaseIdx);

        if (p >= 100) {
          if (fallbackInterval) clearInterval(fallbackInterval);
          dismissLoader();
        }
      }, 50);
    }

    // Hard ceiling timeout: guarantees loader dismisses even on slow or stalled networks
    const hardLimit = durationMs || 12000;
    const maxTimeout = setTimeout(() => {
      if (!hasFinishedRef.current) {
        dismissLoader();
      }
    }, hardLimit);

    return () => {
      if (fallbackInterval) clearInterval(fallbackInterval);
      clearTimeout(maxTimeout);
    };
  }, [videoFailed, durationMs, dismissLoader]);

  return (
    <div
      onClick={dismissLoader}
      className={`fixed inset-0 z-[10000] w-full h-[100dvh] overflow-hidden flex flex-col justify-between bg-white text-studio-black select-none px-4 sm:px-8 py-4 sm:py-7 cursor-pointer transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isExiting ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
      }`}
      title="Click or tap anywhere to enter site"
    >
      {/* Studio 360-inspired Ambient Radial Amber Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-[300px] xs:w-[420px] sm:w-[580px] md:w-[740px] h-[300px] xs:h-[420px] sm:h-[580px] md:h-[740px] rounded-full bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.16)_0%,rgba(194,65,12,0.06)_45%,transparent_70%)] blur-2xl transform scale-110" />
      </div>

      {/* Subtle Architectural Drafting Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]">
        <div className="w-full h-full bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] sm:bg-[size:4rem_4rem]" />
      </div>

      {/* Top Header Bar (Studio360 preloader layout) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between text-xs uppercase">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-amber animate-pulse shadow-[0_0_8px_rgba(217,119,6,0.8)] flex-shrink-0" />
          <span className="font-mono text-[10px] sm:text-[11px] text-neutral-600 tracking-wider">
            Rasipuram • Salem<span className="hidden sm:inline"> • Tamil Nadu</span>
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            dismissLoader();
          }}
          className="text-[10px] sm:text-[11px] tracking-widest text-neutral-700 hover:text-studio-black uppercase border border-neutral-300 hover:border-studio-black px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-sm touch-manipulation min-h-[32px] sm:min-h-[36px] flex items-center bg-neutral-100/90 hover:bg-neutral-200 font-mono shadow-xs transition-colors flex-shrink-0"
          title="Skip intro animation"
        >
          <span className="hidden xs:inline">Skip Intro ✕</span>
          <span className="xs:hidden">Skip ✕</span>
        </button>
      </div>

      {/* Center Stage: 3D Animated Logo Video Viewport & Brand Title */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center my-auto py-1 sm:py-2">
        {/* Architectural 16:9 Viewport */}
        <div className="relative w-full max-w-[400px] xs:max-w-[480px] sm:max-w-[580px] md:max-w-[660px] lg:max-w-[720px] aspect-video flex items-center justify-center mx-auto rounded-xl sm:rounded-2xl overflow-hidden bg-white/80 shadow-[0_16px_50px_-20px_rgba(0,0,0,0.12)] border border-neutral-200/80 transition-transform duration-700">
          {!videoFailed ? (
            <video
              ref={videoRef}
              src="/videos/sana-logo-intro.mp4"
              autoPlay
              muted
              playsInline
              preload="auto"
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleEnded}
              onError={() => setVideoFailed(true)}
              className="w-full h-full object-contain select-none"
            />
          ) : (
            <div className="p-6 flex flex-col items-center justify-center">
              <img
                src="/images/sana-official-logo.png"
                alt="SANA Architects Logo"
                className="w-36 h-36 sm:w-48 sm:h-48 object-contain animate-pulse filter drop-shadow-md"
                onError={(e) => {
                  e.currentTarget.src = '/images/sana-official-logo.jpg';
                }}
              />
            </div>
          )}
        </div>

        {/* Brand Name in Playfair Display */}
        <h1 className="font-playfair tracking-[0.2em] uppercase font-bold text-lg sm:text-xl md:text-2xl text-studio-black mt-3 sm:mt-4">
          SANA ARCHITECTS
        </h1>

        {/* Dynamic Architectural Phase Badge */}
        <div className="mt-2 min-h-[34px] flex items-center justify-center px-2 w-full max-w-md mx-auto">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-neutral-100 border border-neutral-200/90 shadow-xs max-w-full overflow-hidden">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-amber animate-ping flex-shrink-0" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider sm:tracking-widest text-studio-black font-semibold truncate">
              <span className="sm:hidden">{PHASES[activePhaseIndex]?.titleMobile}</span>
              <span className="hidden sm:inline">{PHASES[activePhaseIndex]?.title}</span>
            </span>
          </div>
        </div>

        {/* 4 Segmented Architectural Progress Steps */}
        <div className="mt-2.5 sm:mt-3 w-full max-w-xs sm:max-w-md mx-auto px-1 sm:px-4">
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
            {PHASES.map((ph, idx) => {
              const isPastOrCurrent = idx <= activePhaseIndex;
              const isCurrent = idx === activePhaseIndex;
              return (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <div 
                    className={`w-full h-1 sm:h-1.5 rounded-full transition-all duration-300 ${
                      isCurrent
                        ? 'bg-gradient-to-r from-accent-terracotta to-accent-amber shadow-[0_0_8px_rgba(217,119,6,0.6)]'
                        : isPastOrCurrent
                        ? 'bg-accent-terracotta/75'
                        : 'bg-neutral-200'
                    }`}
                  />
                  <span className={`text-[8px] xs:text-[9px] sm:text-[10px] uppercase font-mono tracking-tight sm:tracking-wider truncate w-full text-center ${
                    isCurrent ? 'text-studio-black font-bold' : 'text-neutral-400 font-medium'
                  }`}>
                    {ph.short}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar & Coordinates (Studio 360 Style) */}
      <div className="relative z-10 w-full max-w-2xl mx-auto space-y-2 pt-1 sm:pt-2">
        <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
          <span className="tracking-wider text-[10px] sm:text-[11px] text-neutral-600 truncate">
            <span className="hidden sm:inline">Tap anywhere to enter • </span>Loading Portfolio
          </span>
          <span className="text-studio-black font-bold text-[11px] sm:text-xs font-mono flex-shrink-0 ml-2">
            {String(progress).padStart(2, '0')}%
          </span>
        </div>

        {/* Hairline Architectural Progress Line with Amber Glow */}
        <div className="w-full h-[2px] bg-neutral-200 relative overflow-hidden rounded-full">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent-terracotta to-accent-amber transition-all duration-75 ease-out shadow-[0_0_8px_rgba(217,119,6,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Geographic Coordinates Bar */}
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-neutral-400 pt-0.5">
          <span>Rasipuram 637408</span>
          <span className="hidden sm:inline">11.4582° N, 78.1746° E</span>
          <span>Salem 636007</span>
        </div>
      </div>
    </div>
  );
};

export default LogoLoader;
