import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [followerPos, setFollowerPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mousePosRef = useRef({ x: -100, y: -100 });
  const followerPosRef = useRef({ x: -100, y: -100 });
  const animFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Only activate custom cursor on fine pointer devices (desktop/mouse)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactiveEl = target.closest('a, button, input, select, textarea, [role="button"], .cursor-pointer, [data-cursor]');
        if (interactiveEl) {
          setIsHovered(true);
          const customText = interactiveEl.getAttribute('data-cursor');
          setCursorText(customText || null);
        } else {
          setIsHovered(false);
          setCursorText(null);
        }
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth follower loop with easing (lerp)
    const render = () => {
      const ease = 0.18;
      followerPosRef.current.x += (mousePosRef.current.x - followerPosRef.current.x) * ease;
      followerPosRef.current.y += (mousePosRef.current.y - followerPosRef.current.y) * ease;
      setFollowerPos({ x: followerPosRef.current.x, y: followerPosRef.current.y });

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* 1. Precise Inner Dot (terracotta / amber accent like KNS Architects) */}
      <div
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-100 ease-out pointer-events-none ${
          isClicking
            ? 'w-2 h-2 bg-accent-amber scale-75'
            : isHovered
            ? 'w-2 h-2 bg-white scale-125'
            : 'w-2.5 h-2.5 bg-accent-terracotta'
        }`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          willChange: 'transform',
        }}
      />

      {/* 2. Smooth Floating Outer Ring / Follower */}
      <div
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ease-out flex items-center justify-center pointer-events-none ${
          cursorText
            ? 'w-16 h-16 bg-studio-black/90 text-white border border-accent-terracotta shadow-xl scale-100 backdrop-blur-md'
            : isHovered
            ? 'w-12 h-12 border-2 border-accent-terracotta bg-accent-terracotta/10 scale-100 backdrop-blur-[1px]'
            : isClicking
            ? 'w-7 h-7 border border-accent-amber scale-90'
            : 'w-9 h-9 border border-accent-terracotta/40 bg-transparent scale-100'
        }`}
        style={{
          transform: `translate3d(${followerPos.x}px, ${followerPos.y}px, 0)`,
          willChange: 'transform',
        }}
      >
        {cursorText && (
          <span className="text-[9px] font-mono tracking-widest uppercase font-bold text-white select-none animate-fade-in">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
