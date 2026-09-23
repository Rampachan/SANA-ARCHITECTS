import React from 'react';
import { ArrowRight, MapPin, Compass, ShieldCheck, Layers, Building, Eye } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioData';

interface AboutPageProps {
  navigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  return (
    <div className="pt-28 sm:pt-36 pb-32 bg-canvas-light text-studio-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Page Header */}
        <div className="space-y-4 max-w-3xl pb-16 border-b border-canvas-stone">
          <span className="text-[11px] tracking-architectural uppercase text-accent-terracotta font-medium block">
            Practice Profile
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-studio-black uppercase">
            About SANA Architects
          </h1>
          <p className="text-lg sm:text-xl text-studio-charcoal font-light leading-relaxed">
            An architectural, interior design, and 3D visualization practice with studios in Rasipuram and Salem, Tamil Nadu.
          </p>
        </div>

        {/* Studio Editorial Overview */}
        <div className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center border-b border-canvas-stone">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-sans font-bold text-studio-black tracking-tight">
              Spatial Rigor Grounded in Regional Character
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-studio-charcoal font-light leading-relaxed">
              <p>
                <strong>SANA Architects</strong> operates from its primary head office at 51 B, Gandhi Salai, Pattanam Road in Rasipuram, alongside its dedicated city studio at KPR Complex, Ground Floor, Cherry Road, Hasthampatti in Salem. The practice focuses on residential architecture, custom 3D facade elevations, commercial retail spaces, and comprehensive interior execution.
              </p>
              <p>
                Rather than imposing extraneous geometric forms, our architectural philosophy emphasizes climatic responsiveness, natural ventilation via terracotta breezeways (jaali), durable local stone cladding, and precise spatial planning tailored to each site’s solar orientation and urban context.
              </p>
              <p>
                Every project begins with rigorous 3D architectural visualization—enabling clients to interrogate day and evening lighting dynamics, volumetric depth, and material combinations long before physical construction commences.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate('/projects')}
                className="px-6 py-3 bg-studio-black text-white text-xs uppercase tracking-architectural font-medium rounded-sm hover:bg-studio-charcoal transition-colors inline-flex items-center gap-2"
              >
                <span>Browse Completed Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="px-6 py-3 border border-studio-black text-studio-black text-xs uppercase tracking-architectural font-medium rounded-sm hover:bg-canvas-stone transition-colors"
              >
                Consult Our Studio
              </button>
            </div>
          </div>

          {/* Supporting Architectural Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-canvas-stone shadow-xl bg-studio-charcoal">
              <img
                src="/images/projects/page_006.jpg"
                alt="SANA Architects Brick and Jaali Architecture"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs uppercase tracking-wider font-semibold">Exposed Brick & Jaali Craft</p>
                <p className="text-[11px] text-white/80 font-mono">Bangalore Urban Duplex Project</p>
              </div>
            </div>
          </div>
        </div>

        {/* Practice Pillars */}
        <div className="py-16">
          <div className="space-y-2 mb-12">
            <span className="text-[11px] tracking-architectural uppercase text-accent-terracotta font-medium block">
              Operational Focus
            </span>
            <h3 className="text-2xl sm:text-3xl font-sans font-bold text-studio-black">
              Verified Architectural Disciplines
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-sm bg-canvas-off border border-canvas-stone space-y-4">
              <Building className="w-8 h-8 text-accent-terracotta" />
              <h4 className="font-sans font-bold text-lg text-studio-black">
                Architectural & Elevation Design
              </h4>
              <p className="text-xs sm:text-sm text-studio-charcoal/80 font-light leading-relaxed">
                Specialized in multi-tier residential elevations, wire-cut brickwork integration, cantilevered porticos, and climate-tempered breezeways.
              </p>
            </div>

            <div className="p-8 rounded-sm bg-canvas-off border border-canvas-stone space-y-4">
              <Eye className="w-8 h-8 text-accent-terracotta" />
              <h4 className="font-sans font-bold text-lg text-studio-black">
                3D Digital Visualization
              </h4>
              <p className="text-xs sm:text-sm text-studio-charcoal/80 font-light leading-relaxed">
                Photorealistic exterior and interior renderings, animated architectural walkthroughs, and shadow-light studies for verified spatial accuracy.
              </p>
            </div>

            <div className="p-8 rounded-sm bg-canvas-off border border-canvas-stone space-y-4">
              <Layers className="w-8 h-8 text-accent-terracotta" />
              <h4 className="font-sans font-bold text-lg text-studio-black">
                Interior Design & Site Execution
              </h4>
              <p className="text-xs sm:text-sm text-studio-charcoal/80 font-light leading-relaxed">
                Bespoke cabinetry, high-gloss modular kitchens, acoustic living lounges, traditional teakwood pooja mandirs, and completed site masonry.
              </p>
            </div>
          </div>
        </div>

        {/* Dual Studio Location Notice */}
        <div className="p-8 sm:p-12 rounded-sm bg-studio-charcoal text-canvas-light space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-studio-slate/40 pb-6">
            <div className="space-y-1">
              <span className="text-[11px] tracking-architectural uppercase text-accent-amber font-medium block">
                Office Network
              </span>
              <h4 className="text-2xl font-sans font-bold text-white">
                Two Regional Studios in Tamil Nadu
              </h4>
            </div>
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3 bg-white text-studio-black text-xs uppercase tracking-architectural font-medium rounded-sm hover:bg-canvas-stone transition-colors flex-shrink-0"
            >
              Get in Touch
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm font-light">
            <div className="p-6 rounded bg-studio-dark/70 border border-studio-slate/30 space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-accent-amber block">
                Salem Office
              </span>
              <h5 className="font-bold text-base text-white">Salem Studio</h5>
              <p className="text-xs text-canvas-stone/90">
                KPR Complex, Ground Floor<br />
                Cherry Road, Hasthampatti<br />
                Salem, Tamil Nadu - 636 007
              </p>
            <div className="p-6 rounded bg-studio-dark/70 border border-studio-slate/30 space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-accent-amber block">
                Namakkal Office
              </span>
              <h5 className="font-bold text-base text-white">Rasipuram Studio</h5>
              <p className="text-xs text-canvas-stone/90">
                51 B, Gandhi Salai, Pattanam Road<br />
                (Opposite Vijayalakshmi Theatre)<br />
                Rasipuram, Namakkal Dt. - 637408
              </p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
