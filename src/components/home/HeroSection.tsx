import React from 'react';
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react';
import { STUDIO_INFO } from '../../data/studioData';

interface HeroSectionProps {
  onExplore: () => void;
  onContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore, onContact }) => {
  return (
    <section className="relative w-full h-screen min-h-[640px] flex items-end justify-start overflow-hidden bg-studio-black text-white">
      {/* Background Hero Photograph */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero/hero-main.jpg"
          alt="SANA Architects Architectural Work"
          className="w-full h-full object-cover object-center scale-105 animate-[pulse_10s_ease-in-out_infinite] brightness-[0.78] contrast-[1.05]"
        />
        {/* Subtle Architectural Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-studio-black via-studio-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-studio-black/80 via-studio-black/30 to-transparent" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16 sm:pb-20 md:pb-24">
        <div className="max-w-3xl space-y-6 animate-fade-in">
          {/* Subtle Location Subtitle */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-canvas-light text-[11px] uppercase tracking-architectural">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-amber animate-ping" />
            <span>Rasipuram • Salem, {STUDIO_INFO.state}</span>
          </div>

          {/* Large Architectural Heading */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-extrabold tracking-tight text-white uppercase leading-[1.05]">
              SANA ARCHITECTS
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-light tracking-wide text-canvas-stone/90">
              Architecture &nbsp;|&nbsp; Interior &nbsp;|&nbsp; 3D Design
            </p>
          </div>

          {/* Minimal Editorial Lead */}
          <p className="text-sm sm:text-base text-canvas-muted font-light leading-relaxed max-w-xl">
            Contemporary residential elevations, bespoke luxury interiors, and photorealistic 3D visualization crafted with contextual clarity and refined Indian materiality.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onExplore}
              className="px-6 py-3.5 bg-white text-studio-black text-xs uppercase tracking-architectural font-medium rounded-sm hover:bg-canvas-stone transition-all duration-300 flex items-center gap-2 shadow-lg"
            >
              <span>Selected Works</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onContact}
              className="px-6 py-3.5 border border-white/30 text-white text-xs uppercase tracking-architectural font-medium rounded-sm hover:bg-white/10 transition-all duration-300"
            >
              Start a Commission
            </button>
          </div>
        </div>
      </div>

      {/* Discreet Animated Scroll Indicator */}
      <div 
        onClick={onExplore}
        className="absolute bottom-8 right-8 md:right-12 z-10 cursor-pointer hidden sm:flex flex-col items-center gap-3 text-white/70 hover:text-white transition-colors"
      >
        <span className="text-[10px] uppercase tracking-architectural [writing-mode:vertical-lr] font-mono">
          Scroll
        </span>
        <div className="w-[1.5px] h-10 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white animate-scroll-line" />
        </div>
      </div>
    </section>
  );
};
