import React from 'react';
import { ArrowRight, Compass, ShieldCheck, Layers, MapPin } from 'lucide-react';
import { STUDIO_INFO } from '../../data/studioData';

interface StudioVignetteProps {
  onLearnMore: () => void;
}

export const StudioVignette: React.FC<StudioVignetteProps> = ({ onLearnMore }) => {
  return (
    <section className="py-24 sm:py-32 bg-canvas-off text-studio-black border-y border-canvas-stone/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Statement */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-[11px] tracking-architectural uppercase text-accent-terracotta font-medium block">
                The Studio Ethos
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-studio-black uppercase leading-tight">
                Contextual Clarity.<br />
                Material Honesty.
              </h2>
            </div>

            <p className="text-base sm:text-lg text-studio-charcoal font-light leading-relaxed">
              With design studios in <strong>Rasipuram</strong> (Head Office) and <strong>Salem</strong> (Hasthampatti), <strong>SANA Architects</strong> operates at the confluence of contemporary architectural expression and regional craftsmanship across Tamil Nadu.
            </p>

            <p className="text-sm text-studio-concrete font-light leading-relaxed">
              Our practice is dedicated to transforming spatial aspirations into refined architectural environments. We pair meticulous 3D elevation visualization and shadow modeling with verified on-site execution—delivering private residences, high-end retail showrooms, and multi-dwelling developments built to endure.
            </p>

            {/* Three Pillar Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2 border-l border-studio-black/20 pl-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-studio-black">
                  <Compass className="w-3.5 h-3.5 text-accent-terracotta" />
                  <span>3D Elevation Design</span>
                </div>
                <p className="text-xs text-studio-concrete font-light leading-normal">
                  Day and twilight architectural simulations integrating natural clay jaali screens and modern louvers.
                </p>
              </div>

              <div className="space-y-2 border-l border-studio-black/20 pl-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-studio-black">
                  <Layers className="w-3.5 h-3.5 text-accent-terracotta" />
                  <span>Turnkey Execution</span>
                </div>
                <p className="text-xs text-studio-concrete font-light leading-normal">
                  Direct physical site delivery, from custom cantilevered timber stairs to natural stone water walls.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onLearnMore}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-architectural text-studio-black hover:text-accent-terracotta transition-colors group"
              >
                <span>Read About Our Studio</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Image Pairing */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 w-full aspect-[4/5] rounded-sm overflow-hidden shadow-2xl border border-canvas-stone">
              <img
                src="/images/projects/page_083.jpg"
                alt="SANA Architects Real Site Execution in Rasipuram"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] tracking-architectural uppercase text-white/70 block">
                  Completed Site Execution
                </span>
                <p className="text-sm font-semibold tracking-tight">
                  Natural Slate Stone Water Feature & Buddha Shrine
                </p>
                <p className="text-xs text-white/80 font-mono">
                  {STUDIO_INFO.address}, {STUDIO_INFO.city}
                </p>
              </div>
            </div>

            {/* Overlapping Secondary Card */}
            <div className="hidden sm:block absolute -bottom-8 -left-8 z-20 w-48 aspect-video rounded-sm overflow-hidden shadow-xl border-2 border-white bg-studio-black">
              <img
                src="/images/projects/page_066.jpg"
                alt="Rasipuram Twilight Villa"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
