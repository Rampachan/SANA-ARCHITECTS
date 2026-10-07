import React, { useState, useEffect } from 'react';
import { Compass, Box, SunMedium, FileText, HardHat, Check, ArrowRight, Play, Pause } from 'lucide-react';

interface LifecycleStage {
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  deliverables: string[];
  image: string;
  pageRef: string;
  icon: React.ElementType;
}

const STAGES: LifecycleStage[] = [
  {
    number: '01',
    title: 'Site Appraisal & Spatial Zoning',
    category: 'Analytical Phase',
    tagline: 'Topography, Setbacks & Sun-Path Orientation',
    description: 'Detailed on-site analysis of plot orientation, wind corridors, soil contours, and regulatory zoning in Rasipuram, Salem, and Tamil Nadu.',
    deliverables: ['Solar Path & Thermal Analysis', 'Volumetric Massing Footprint', 'Municipal Setback Coordination'],
    image: '/images/projects/page_006.jpg',
    pageRef: 'PDF Page 06',
    icon: Compass,
  },
  {
    number: '02',
    title: '3D Elevation & Facade Massing',
    category: 'Digital Sculpting',
    tagline: 'CNC Jaali Screens, Vertical Louvers & Portals',
    description: 'Translating spatial requirements into sculpted 3D architectural elevations, exploring rough-cut stone pylons, brick louvers, and cantilevered volumes.',
    deliverables: ['Digital 3D Architectural Model', 'Tactile Materiality Palettes', 'Perforated Breeze Screen Layouts'],
    image: '/images/projects/page_022.jpg',
    pageRef: 'PDF Page 22',
    icon: Box,
  },
  {
    number: '03',
    title: 'Photorealistic Light Simulation',
    category: 'Photometric Studies',
    tagline: 'Daylight & Twilight Architectural Studies',
    description: 'Calculating natural tropical sun angles alongside warm recessed LED cove illumination to visualize the building across day and night.',
    deliverables: ['4K Photometric Day & Night Renders', 'Glazing Glare Mitigation Studies', 'Architectural Twilight Illuminations'],
    image: '/images/projects/page_009.jpg',
    pageRef: 'PDF Page 09',
    icon: SunMedium,
  },
  {
    number: '04',
    title: 'Joinery & Working Drawings',
    category: 'Technical Blueprints',
    tagline: 'MEP Systems & Detailed Interior Millwork',
    description: 'Developing complete construction-ready documentation including structural details, electrical & plumbing schematics, and custom joinery cabinetry.',
    deliverables: ['Good-For-Construction (GFC) Sheets', 'Bespoke Wardrobe & Kitchen Details', 'Structural Steel & RCC Coordinates'],
    image: '/images/projects/page_035.jpg',
    pageRef: 'PDF Page 35',
    icon: FileText,
  },
  {
    number: '05',
    title: 'Turnkey On-Site Execution',
    category: 'Physical Realization',
    tagline: 'Hands-On Supervision & Quality Handover',
    description: 'Direct field oversight ensuring physical masonry, stone cladding, waterfall installations, and finishes match the approved 3D elevation down to the millimeter.',
    deliverables: ['Rasipuram & Salem Field Supervision', 'Material Quality Verification', 'Snag-Free Physical Turnkey Handover'],
    image: '/images/projects/page_083.jpg',
    pageRef: 'PDF Page 83',
    icon: HardHat,
  },
];

interface PracticeLifecycleWidgetProps {
  onStartProject?: () => void;
}

export const PracticeLifecycleWidget: React.FC<PracticeLifecycleWidgetProps> = ({
  onStartProject,
}) => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const STEP_DURATION_MS = 4500;
  const TICK_MS = 50;

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveStageIndex((idx) => (idx + 1) % STAGES.length);
          return 0;
        }
        return prev + (TICK_MS / STEP_DURATION_MS) * 100;
      });
    }, TICK_MS);

    return () => clearInterval(timer);
  }, [isAutoPlaying, activeStageIndex]);

  const selectStage = (index: number) => {
    setActiveStageIndex(index);
    setProgress(0);
  };

  const activeStage = STAGES[activeStageIndex];
  const IconComponent = activeStage.icon;

  return (
    <section className="py-24 sm:py-32 bg-studio-charcoal text-canvas-light relative overflow-hidden">
      {/* Background Architectural Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="w-full h-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-accent-amber text-xs uppercase tracking-architectural font-medium">
              <span className="w-2 h-2 rounded-full bg-accent-amber animate-pulse" />
              <span>SANA Practice Methodology</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight uppercase">
              5-Stage Architectural Lifecycle
            </h2>
            <p className="text-sm text-canvas-muted font-light max-w-xl">
              From raw topography in Rasipuram and Salem to photorealistic 3D simulations and turnkey physical delivery—a proven, structured methodology.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded border border-white/20 text-xs font-mono uppercase tracking-wider text-canvas-light hover:bg-white/10 transition-colors"
            >
              {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isAutoPlaying ? 'Pause Automated Flow' : 'Play Automated Flow'}</span>
            </button>
          </div>
        </div>

        {/* 5-Step Progress Conduit Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-8 pb-10">
          {STAGES.map((stage, idx) => {
            const isActive = idx === activeStageIndex;
            const isPast = idx < activeStageIndex;
            const StageIcon = stage.icon;

            return (
              <button
                key={stage.number}
                onClick={() => selectStage(idx)}
                className={`relative p-3.5 sm:p-4 rounded text-left transition-all duration-300 border ${
                  isActive
                    ? 'bg-white/10 border-accent-amber shadow-lg shadow-accent-amber/10'
                    : isPast
                    ? 'bg-white/5 border-white/20 hover:border-white/40'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/25 opacity-70'
                }`}
              >
                {/* Active Step Laser Progress Bar */}
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-3">
                  <div
                    className={`h-full transition-all duration-75 ${
                      isActive
                        ? 'bg-gradient-to-r from-accent-terracotta to-accent-amber shadow-[0_0_8px_rgba(217,119,6,0.8)]'
                        : isPast
                        ? 'bg-accent-terracotta w-full'
                        : 'w-0'
                    }`}
                    style={{
                      width: isActive ? `${progress}%` : undefined,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className={`font-mono text-xs font-bold ${isActive ? 'text-accent-amber' : 'text-canvas-muted'}`}>
                    {stage.number}
                  </span>
                  <StageIcon className={`w-3.5 h-3.5 ${isActive ? 'text-accent-amber' : 'text-studio-concrete'}`} />
                </div>

                <h4 className="text-xs sm:text-sm font-semibold text-white tracking-tight line-clamp-1">
                  {stage.title}
                </h4>
                <p className="text-[10px] text-canvas-muted font-mono uppercase tracking-wider truncate mt-0.5">
                  {stage.category}
                </p>
              </button>
            );
          })}
        </div>

        {/* Stage Interactive Split Stage: Left Narrative / Right 3D Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-studio-dark/60 border border-white/10 rounded-sm p-6 sm:p-10 backdrop-blur-sm">
          {/* Left Narrative Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 border border-white/15 text-[11px] font-mono uppercase text-accent-amber">
                <IconComponent className="w-3.5 h-3.5" />
                <span>Stage {activeStage.number} • {activeStage.category}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight">
                {activeStage.title}
              </h3>
              <p className="text-sm font-editorial italic text-canvas-stone/90">
                "{activeStage.tagline}"
              </p>
            </div>

            <p className="text-sm text-canvas-muted font-light leading-relaxed">
              {activeStage.description}
            </p>

            {/* Deliverables Checklist */}
            <div className="space-y-2.5 pt-2">
              <span className="text-[11px] uppercase font-mono tracking-wider text-canvas-stone/80 block">
                Verified Deliverables:
              </span>
              <div className="space-y-2">
                {activeStage.deliverables.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-canvas-light">
                    <div className="w-4 h-4 rounded-full bg-accent-terracotta/20 border border-accent-terracotta/40 flex items-center justify-center flex-shrink-0 text-accent-amber">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {onStartProject && (
              <div className="pt-4">
                <button
                  onClick={onStartProject}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-studio-black text-xs uppercase tracking-architectural font-semibold rounded-sm hover:bg-canvas-stone transition-colors shadow-lg"
                >
                  <span>Initiate Stage 01 Commission</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Right Visual Stage (Photorealistic Elevation / Site Render Preview) */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-sm overflow-hidden border border-white/15 shadow-2xl group">
              <img
                key={activeStage.image}
                src={activeStage.image}
                alt={activeStage.title}
                className="w-full h-full object-cover animate-fade-in transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-studio-black/80 via-transparent to-studio-black/20 pointer-events-none" />

              {/* Bottom Project Metadata Badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90 pointer-events-none font-mono">
                <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 text-[11px]">
                  SANA Architecture Archive
                </span>
                <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 text-[10px] text-accent-amber font-semibold">
                  {activeStage.pageRef}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
