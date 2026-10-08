import React, { useState, useRef, useEffect, MouseEvent } from 'react';

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // max tilt degrees (default 10)
  enableGlare?: boolean;
  perspective?: number; // default 1000px
}

export const Tilt3DCard: React.FC<Tilt3DCardProps> = ({
  children,
  className = '',
  intensity = 9,
  enableGlare = true,
  perspective = 1000,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
    }
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * intensity;
    const rotateY = ((x - centerX) / centerX) * intensity;

    setRotate({ x: rotateX, y: rotateY });

    if (enableGlare) {
      setGlarePos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
      });
    }
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  if (isTouchDevice) {
    return <div className={`relative ${className}`}>{children}</div>;
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-300 ease-out preserve-3d ${className}`}
      style={{
        perspective: `${perspective}px`,
        WebkitPerspective: `${perspective}px`,
        transform: `perspective(${perspective}px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        WebkitTransform: `perspective(${perspective}px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transformStyle: 'preserve-3d',
        WebkitTransformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {children}

      {/* Specular Glare Sheen Simulation */}
      {enableGlare && isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 320px at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.18), transparent 70%)`,
          }}
        />
      )}
    </div>
  );
};
