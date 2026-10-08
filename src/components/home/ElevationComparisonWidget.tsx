import React, { useState, useRef, useEffect, MouseEvent, TouchEvent } from 'react';
import { Sparkles, SlidersHorizontal, CheckCircle2, Layers } from 'lucide-react';

interface ComparisonPair {
  id: string;
  title: string;
  location: string;
  description: string;
  renderImage: string;
  renderLabel: string;
  renderRef: string;
  siteImage: string;
  siteLabel: string;
  siteRef: string;
  annotations: string[];
}

const COMPARISON_PAIRS: ComparisonPair[] = [
  {
    id: 'rasipuram-residence',
    title: 'Rasipuram Contemporary Residence',
    location: '51 B, Gandhi Salai, Rasipuram',
    description: 'Direct comparison between the photorealistic twilight 3D digital elevation study and the actual completed physical execution featuring the handcrafted Buddha stone water wall.',
    renderImage: '/images/projects/page_066.jpg',
    renderLabel: '3D Elevation Simulation',
    renderRef: 'PDF Page 66',
    siteImage: '/images/projects/page_083.jpg',
    siteLabel: 'Completed Site Execution',
    siteRef: 'PDF Page 83',
    annotations: ['Stone Cladding Alignment', 'Photometric Night Lighting', 'Natural Water Feature Integration']
  },
  {
    id: 'chengam-residence',
    title: 'Chengam Brick & Louver Elevation',
    location: 'Chengam, Tiruvannamalai',
    description: 'Sculptural wire-cut brick pylon with circular aperture window and horizontal privacy louvers modeled in 3D and translated into detailed execution drawings.',
    renderImage: '/images/projects/page_002.jpg',
    renderLabel: '3D Digital Elevation',
    renderRef: 'PDF Page 02',
    siteImage: '/images/projects/page_063.jpg',
    siteLabel: 'Architectural Massing Study',
    siteRef: 'PDF Page 63',
    annotations: ['Circular Breeze Aperture', 'Exposed Wire-Cut Brickwork', 'Upper Terrace Pergola Framing']
  },
  {
    id: 'kovalam-residence',
    title: 'Kovalam Contemporary Villa',
    location: 'Kovalam, Chennai',
    description: 'Digital volumetric modeling compared against the real physical luxury villa handover with tactile charcoal feature walls and cantilevered floating timber stairs.',
    renderImage: '/images/projects/page_005.jpg',
    renderLabel: '3D Volumetric Study',
    renderRef: 'PDF Page 05',
    siteImage: '/images/projects/page_115.jpg',
    siteLabel: 'Completed Villa Handover',
    siteRef: 'PDF Page 115',
    annotations: ['Tactile Charcoal Feature Wall', 'Floating Open-Riser Staircase', 'Full-Height Glass Portals']
  }
];

export const ElevationComparisonWidget: React.FC = () => {
  const [selectedPairIndex, setSelectedPairIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isInteracting, setIsInteracting] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track container width accurately across device rotations & resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Automated gentle breathing scan when idle
  useEffect(() => {
    if (isInteracting) return;

    let startTime = performance.now();
    let animId: number;

    const animateIdle = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      // Gentle sine oscillation between 42% and 58% over 6 seconds
      const pos = 50 + Math.sin(elapsed * 1.2) * 10;
      setSliderPosition(pos);
      animId = requestAnimationFrame(animateIdle);
    };

    animId = requestAnimationFrame(animateIdle);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isInteracting]);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(clampedPercent);
  };

  const handleMouseDown = () => setIsInteracting(true);
  const handleMouseUp = () => {
    // Resume auto oscillation after 4 seconds of inactivity
    setTimeout(() => setIsInteracting(false), 4000);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isInteracting) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    setIsInteracting(true);
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const currentPair = COMPARISON_PAIRS[selectedPairIndex];

  return (
    <section className="py-24 sm:py-32 bg-canvas-light text-studio-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-canvas-stone">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-accent-terracotta text-xs uppercase tracking-architectural font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Duality of Practice</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight uppercase">
              3D Simulation vs Physical Reality
            </h2>
            <p className="text-sm text-studio-concrete max-w-xl font-light">
              Slide horizontally to witness how SANA Architects faithfully translates photometric 3D elevation renders into completed physical architecture.
            </p>
          </div>

          {/* Project Switcher Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {COMPARISON_PAIRS.map((pair, idx) => (
              <button
                key={pair.id}
                onClick={() => setSelectedPairIndex(idx)}
                className={`px-3.5 py-1.5 rounded-sm text-xs font-mono tracking-wider uppercase transition-all ${
                  idx === selectedPairIndex
                    ? 'bg-studio-black text-white shadow-md'
                    : 'bg-canvas-stone/50 text-studio-concrete hover:bg-canvas-stone hover:text-studio-black'
                }`}
              >
                0{idx + 1} {pair.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Split Comparison Canvas */}
        <div className="pt-10">
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsInteracting(true)}
            onTouchEnd={handleMouseUp}
            onTouchMove={handleTouchMove}
            className="relative w-full aspect-[16/10] sm:aspect-[21/9] min-h-[260px] sm:min-h-[340px] md:min-h-[380px] max-h-[640px] rounded-sm overflow-hidden border border-canvas-stone/80 shadow-2xl select-none cursor-ew-resize group bg-studio-charcoal touch-pan-y"
            style={{ touchAction: 'pan-y' }}
          >
            {/* Layer A (Right Base): Physical Completed Execution */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={currentPair.siteImage}
                alt={currentPair.siteLabel}
                className="w-full h-full object-cover object-center"
              />
              {/* Right Tag */}
              <div className="absolute top-4 right-4 z-10 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-studio-black/85 text-emerald-400 text-[10px] sm:text-xs font-mono uppercase tracking-wider backdrop-blur-md border border-emerald-500/20 shadow-lg">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{currentPair.siteLabel}</span>
                  <span className="text-canvas-muted text-[9px] opacity-70">({currentPair.siteRef})</span>
                </span>
              </div>
            </div>

            {/* Layer B (Left Overlaid): 3D Digital Elevation Simulation (Clipped by sliderPosition) */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={currentPair.renderImage}
                alt={currentPair.renderLabel}
                className="absolute inset-0 w-full h-full object-cover object-center max-w-none"
                style={{
                  width: containerWidth > 0 ? `${containerWidth}px` : '100%',
                }}
              />
              {/* Left Tag */}
              <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-studio-black/85 text-accent-amber text-[10px] sm:text-xs font-mono uppercase tracking-wider backdrop-blur-md border border-accent-amber/30 shadow-lg">
                  <Layers className="w-3.5 h-3.5" />
                  <span>{currentPair.renderLabel}</span>
                  <span className="text-canvas-muted text-[9px] opacity-70">({currentPair.renderRef})</span>
                </span>
              </div>
            </div>

            {/* Vertical Divider Line & Interactive Handle */}
            <div
              className="absolute top-0 bottom-0 z-20 pointer-events-none flex items-center justify-center -ml-[1px]"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Architectural Hairline Divider */}
              <div className="w-[2px] h-full bg-white shadow-[0_0_12px_rgba(0,0,0,0.8)]" />

              {/* Draggable Center Badge Handle */}
              <div className="absolute w-10 h-10 rounded-full bg-studio-black text-white border-2 border-white shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <SlidersHorizontal className="w-4 h-4 text-accent-amber" />
              </div>
            </div>

            {/* Micro Interaction Prompt */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-studio-black/75 text-white/90 text-[10px] font-mono uppercase tracking-widest backdrop-blur-md border border-white/10 shadow">
                Drag to compare 3D vs Site
              </span>
            </div>
          </div>

          {/* Bottom Context Details & Annotations */}
          <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-sm bg-canvas-off border border-canvas-stone">
            <div className="space-y-1">
              <h4 className="text-base font-semibold text-studio-black">
                {currentPair.title} &nbsp;•&nbsp; <span className="font-light text-studio-concrete text-sm">{currentPair.location}</span>
              </h4>
              <p className="text-xs text-studio-concrete font-light max-w-2xl">
                {currentPair.description}
              </p>
            </div>

            {/* Technical Annotation Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {currentPair.annotations.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded bg-white text-studio-black border border-canvas-stone text-[10px] font-mono tracking-wider uppercase"
                >
                  ✓ {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
