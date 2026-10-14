import React, { useEffect, useState, useRef, useCallback } from 'react';

interface LogoLoaderProps {
  onComplete: () => void;
  durationMs?: number; // Optional maximum timeout guard
}

export const LogoLoader: React.FC<LogoLoaderProps> = ({ 
  onComplete,
  durationMs 
}) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const onCompleteRef = useRef(onComplete);
  const hasFinishedRef = useRef(false);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Lock body scroll while loader is playing
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

    if (videoRef.current) {
      try {
        videoRef.current.pause();
      } catch {
        // Ignore pause errors
      }
    }

    // Smooth curtain dissolve before opening the page
    setTimeout(() => {
      onCompleteRef.current();
    }, 650);
  }, []);

  // Keyboard shortcut: Esc or Space immediately enters site
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        dismissLoader();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dismissLoader]);

  // Autoplay video on initial mount with universal browser compliance
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Video autoplay prevented by browser policy:', err);
      });
    }
  }, []);

  // Track playback progress
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration || Number.isNaN(video.duration)) return;

    const current = video.currentTime;
    const duration = video.duration;
    const pct = Math.min(100, Math.max(0, Math.floor((current / duration) * 100)));
    setProgress(pct);
  };

  // When video completes, open the page automatically
  const handleEnded = () => {
    setProgress(100);
    dismissLoader();
  };

  // Safety fallback: guarantees page opens if video stalls or encounters decode issues
  useEffect(() => {
    const hardLimit = durationMs || 12000;
    const timer = setTimeout(() => {
      if (!hasFinishedRef.current) {
        dismissLoader();
      }
    }, hardLimit);

    return () => clearTimeout(timer);
  }, [durationMs, dismissLoader]);

  return (
    <div
      onClick={dismissLoader}
      className={`fixed inset-0 z-[10000] w-full h-[100dvh] bg-[#e4f5fd] flex items-center justify-center overflow-hidden cursor-pointer select-none transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
      title="Click anywhere to enter site"
    >
      {/* Sleek Skip Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          dismissLoader();
        }}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-neutral-600 hover:text-studio-black bg-white/80 hover:bg-white backdrop-blur-md border border-neutral-300/80 hover:border-studio-black px-3.5 py-1.5 rounded-full shadow-xs transition-all duration-200 touch-manipulation flex items-center gap-1.5"
        title="Skip intro and open page"
      >
        <span>Skip</span>
        <span>✕</span>
      </button>

      {/* Main 3D Logo Animation Video (fills the canvas seamlessly) */}
      <div className="relative w-full h-full flex items-center justify-center p-0">
        <video
          ref={videoRef}
          src="/videos/sana-logo-intro.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onError={dismissLoader}
          className="w-full h-full object-contain select-none max-w-full max-h-full"
        />
      </div>

      {/* Hairline Progress Conduit along the bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-[3px] bg-neutral-300/40">
        <div
          className="h-full bg-gradient-to-r from-accent-terracotta to-accent-amber transition-all duration-100 ease-out shadow-[0_0_8px_rgba(217,119,6,0.5)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default LogoLoader;
