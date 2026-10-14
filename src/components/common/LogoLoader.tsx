import React, { useEffect, useState, useRef, useCallback } from 'react';

interface LogoLoaderProps {
  onComplete: () => void;
  durationMs?: number; // Optional maximum timeout guard
}

export const LogoLoader: React.FC<LogoLoaderProps> = ({ 
  onComplete,
  durationMs 
}) => {
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

  // When video completes, open the page automatically
  const handleEnded = () => {
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
      {/* Watermark Skip Button (completely borderless, transparent watermark that does not partition the frame) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          dismissLoader();
        }}
        className="absolute top-4 right-4 sm:top-6 sm:right-7 z-30 font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-neutral-600/60 hover:text-studio-black opacity-60 hover:opacity-100 transition-all duration-300 touch-manipulation flex items-center gap-1.5 select-none bg-transparent border-0 p-2 cursor-pointer"
        title="Skip intro and open page"
      >
        <span>Skip</span>
        <span className="text-[10px] opacity-70">✕</span>
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
          onEnded={handleEnded}
          onError={dismissLoader}
          className="w-full h-full object-contain select-none max-w-full max-h-full"
        />
      </div>
    </div>
  );
};

export default LogoLoader;
