import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
  onContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplore,
  onContact,
}) => {
  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col justify-between bg-studio-black text-white overflow-hidden px-4 sm:px-8 lg:px-16 pt-28 sm:pt-32 pb-8 sm:pb-12">
      {/* Background Architectural Canvas & Cinematic Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Full-bleed Architectural Vignette Image */}
        <img
          src="/images/hero/hero-main.jpg"
          alt="SANA Architecture Elevation"
          className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-[1.08] scale-105 transition-transform duration-1000 ease-out"
        />

        {/* Cinematic Volume Lighting & Gradient Shading */}
        <div className="absolute inset-0 bg-gradient-to-t from-studio-black via-black/50 to-studio-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(217,119,6,0.12)_0%,_transparent_70%)]" />

        {/* Subtle Architectural Drafting Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="w-full h-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:5rem_5rem]" />
        </div>
      </div>

      {/* Top Studio Indicator */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between text-xs font-mono text-neutral-400">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-amber animate-pulse" />
          <span className="tracking-widest uppercase text-[10px] sm:text-[11px] text-neutral-200">
            Rasipuram • Salem • Tamil Nadu
          </span>
        </div>

        <span className="hidden md:inline tracking-wider uppercase text-[10px] sm:text-[11px] text-neutral-400">
          Contemporary Architecture & Interior Design
        </span>
      </div>

      {/* Center Stage: Monumental Heading, Slogan & Le Corbusier Quote in Distinct Fonts */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center my-auto py-8 sm:py-12 max-w-4xl mx-auto">
        {/* 1. Main Heading in Font 1: Cinzel (Architectural Monumental Capitals) */}
        <h1 className="font-cinzel text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.2em] sm:tracking-[0.28em] md:tracking-[0.32em] uppercase text-white leading-tight drop-shadow-2xl select-none">
          SANA ARCHITECTS
        </h1>

        {/* 2. Brand Slogan in Font 2: Playfair Display (Warm, Flowing Editorial Serif) */}
        <p className="font-serif italic text-lg xs:text-xl sm:text-2xl md:text-3xl text-canvas-light font-normal tracking-wide max-w-3xl mx-auto leading-relaxed mt-4 sm:mt-6 drop-shadow-md text-neutral-100">
          “Spaces Designed for the Way Life Unfolds.”
        </p>

        {/* 3. Architectural Philosophical Quote in Font 3: Cormorant Garamond + JetBrains Mono */}
        <blockquote className="mt-8 sm:mt-12 max-w-2xl mx-auto pt-6 sm:pt-8 border-t border-white/20 relative">
          {/* Subtle Center Emblem Accent */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-studio-black border border-white/20 rounded-full text-accent-amber text-[10px] font-mono tracking-widest uppercase">
            Ethos
          </div>

          <p className="font-cormorant italic text-lg sm:text-2xl md:text-[26px] text-neutral-300 font-light leading-relaxed drop-shadow-sm">
            “Architecture is the masterly, correct and magnificent play of volumes assembled in light.”
          </p>
          <cite className="block mt-3.5 sm:mt-4 not-italic font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-accent-amber font-semibold">
            — Le Corbusier
          </cite>
        </blockquote>

        {/* Action Controls */}
        <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onExplore}
            className="px-6 sm:px-8 py-3.5 bg-white text-studio-black font-sans font-semibold text-xs sm:text-sm uppercase tracking-architectural rounded-sm hover:bg-canvas-stone transition-all duration-300 shadow-xl flex items-center gap-2 group cursor-pointer"
          >
            <span>Explore Works</span>
            <ArrowDown className="w-4 h-4 transform group-hover:translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={onContact}
            className="px-6 sm:px-8 py-3.5 border border-white/30 text-white font-sans font-medium text-xs sm:text-sm uppercase tracking-architectural rounded-sm hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm flex items-center gap-2 group cursor-pointer"
          >
            <span>Contact Studio</span>
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Bottom Architectural Metadata Bar & Geographic Coordinates */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pt-6 sm:pt-8 border-t border-white/15 flex flex-col xs:flex-row items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono text-neutral-400">
        <div className="flex items-center gap-4">
          <span>Rasipuram 637408</span>
          <span className="hidden sm:inline text-neutral-600">•</span>
          <span className="hidden sm:inline">Salem 636007</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-accent-amber font-bold">11.4582° N, 78.1746° E</span>
        </div>

        <div className="flex items-center gap-2 text-neutral-400">
          <span>Scroll to Discover</span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent-amber animate-ping" />
        </div>
      </div>
    </section>
  );
};
