import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play, Sparkles } from 'lucide-react';
import { STUDIO_INFO } from '../../data/studioData';

interface StageScene {
  id: string;
  title: string;
  category: string;
  location: string;
  slogan: string;
  description: string;
  image: string;
  pageCitation: string;
}

const STAGE_SCENES: StageScene[] = [
  {
    id: 'kishore-residence',
    title: 'Kishore Residence',
    category: '3D Elevation Architecture',
    location: 'Chidambaram, Tamil Nadu',
    slogan: 'Where Contours & Geometry Converge',
    description: 'Rough-cut vertical stone pylons paired with dual geometric jali privacy balconies and photometric night uplighting.',
    image: '/images/projects/page_022.jpg',
    pageCitation: 'PDF Page 22'
  },
  {
    id: 'chengam-residence',
    title: 'Chengam Residence',
    category: '3D Elevation Architecture',
    location: 'Tiruvannamalai, Tamil Nadu',
    slogan: 'Exposed Brick & Circular Apertures',
    description: 'Wire-cut exposed brick pylon featuring circular breeze apertures, horizontal aluminium louvers, and shaded upper pergolas.',
    image: '/images/projects/page_002.jpg',
    pageCitation: 'PDF Page 02'
  },
  {
    id: 'oviya-jewellers',
    title: 'Oviya Jewellers Flagship',
    category: 'Commercial & Retail Architecture',
    location: 'Salem, Tamil Nadu',
    slogan: 'Curved Marble & Gilded Vaults',
    description: 'Bespoke retail architecture featuring carved gold ceiling motifs, curved Italian marble reception, and recessed diamond showcases.',
    image: '/images/projects/page_012.jpg',
    pageCitation: 'PDF Page 12'
  },
  {
    id: 'rasipuram-site-execution',
    title: 'Rasipuram Residence Execution',
    category: 'Completed Physical Execution',
    location: 'Rasipuram, Namakkal District',
    slogan: 'From 3D Simulation to Realized Reality',
    description: 'Real site handover featuring handcrafted Buddha stone waterfall, double-height chandelier hall, and cantilevered timber stair.',
    image: '/images/projects/page_083.jpg',
    pageCitation: 'PDF Page 83'
  },
  {
    id: 'kovalam-coastal-residence',
    title: 'Kovalam Coastal Residence',
    category: 'Completed Physical Execution',
    location: 'Kovalam, Chennai, Tamil Nadu',
    slogan: 'Tactile Charcoal & Floating Volumes',
    description: 'Completed contemporary coastal villa with floating open-riser timber staircase, tactile slatted dividers, and expansive glass portals.',
    image: '/images/projects/page_115.jpg',
    pageCitation: 'PDF Page 115'
  }
];

interface ArchitecturalStage3DProps {
  onExplore: () => void;
  onContact: () => void;
  onSelectProject?: (projectId: string) => void;
}

export const ArchitecturalStage3D: React.FC<ArchitecturalStage3DProps> = ({
  onExplore,
  onContact,
  onSelectProject,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const DURATION_MS = 5500; // 5.5s per scene
  const TICK_INTERVAL_MS = 50;

  // Automated progression timer
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          triggerNext();
          return 0;
        }
        return prev + (TICK_INTERVAL_MS / DURATION_MS) * 100;
      });
    }, TICK_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isPlaying, currentIndex]);

  const triggerNext = () => {
    setIsTransitioning(true);
    setProgress(0);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % STAGE_SCENES.length);
      setIsTransitioning(false);
    }, 400);
  };

  const triggerPrev = () => {
    setIsTransitioning(true);
    setProgress(0);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + STAGE_SCENES.length) % STAGE_SCENES.length);
      setIsTransitioning(false);
    }, 400);
  };

  const jumpTo = (index: number) => {
    if (index === currentIndex) return;
    setIsTransitioning(true);
    setProgress(0);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 300);
  };

  const currentScene = STAGE_SCENES[currentIndex] || STAGE_SCENES[0];
  const touchStartXRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    // Swipe threshold 40px
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        triggerNext();
      } else {
        triggerPrev();
      }
    }
    touchStartXRef.current = null;
  };

  return (
    <section 
      ref={stageRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-screen h-[100dvh] min-h-[580px] sm:min-h-[660px] flex flex-col justify-between overflow-hidden bg-studio-black text-white select-none touch-manipulation"
    >
      {/* Plane 1: Dynamic 3D Layered Background Render */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {STAGE_SCENES.map((scene, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={scene.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
                isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <img
                src={scene.image}
                alt={scene.title}
                className={`w-full h-full object-cover object-center brightness-[0.72] contrast-[1.08] transition-transform duration-[6000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
              {/* Gradient Scrims for Editorial Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-studio-black via-studio-black/40 to-studio-black/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-studio-black/90 via-studio-black/45 to-transparent" />
            </div>
          );
        })}

        {/* Subtle Architectural Blueprint Grid Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035]">
          <div className="w-full h-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>
      </div>

      {/* Plane 2: Top Floating Coordinates & Studio Bar */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 sm:pt-32 pt-[calc(5rem+env(safe-area-inset-top,0px))] flex items-center justify-between text-xs tracking-architectural uppercase">
        <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
          <span className="w-2 h-2 rounded-full bg-accent-amber animate-ping flex-shrink-0" />
          <span className="text-[11px] text-canvas-light font-mono">
            Rasipuram • Salem • {STUDIO_INFO.state}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-[11px] font-mono text-canvas-muted/80">
          <span>11.4582° N, 78.1746° E</span>
          <span className="opacity-30">•</span>
          <span className="text-white/90">{currentScene.pageCitation}</span>
        </div>
      </div>

      {/* Plane 3: Floating 3D Foreground Editorial Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 my-auto py-8">
        <div className="max-w-3xl space-y-5">
          {/* Tagline / Category Reveal */}
          <div className="inline-flex items-center gap-2 text-accent-amber text-xs uppercase tracking-architectural font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="transition-all duration-500">{currentScene.category}</span>
          </div>

          {/* Master Architectural Heading with 3D Depth */}
          <div className="space-y-2">
            <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-sans font-extrabold uppercase tracking-tight text-white leading-[1.05] drop-shadow-md">
              {currentScene.title}
            </h1>
            <p className="text-base sm:text-xl md:text-2xl font-editorial italic font-normal text-canvas-stone/95 transition-all duration-500">
              "{currentScene.slogan}"
            </p>
          </div>

          {/* Architectural Description */}
          <p className="text-xs sm:text-sm md:text-base text-canvas-muted font-light leading-relaxed max-w-xl transition-all duration-500 line-clamp-3 sm:line-clamp-none">
            {currentScene.description}
          </p>

          {/* Action CTAs */}
          <div className="pt-3 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={() => {
                if (onSelectProject) onSelectProject(currentScene.id);
                else onExplore();
              }}
              className="px-6 py-3.5 bg-white text-studio-black text-xs uppercase tracking-architectural font-semibold rounded-sm hover:bg-canvas-stone hover:shadow-[0_8px_24px_rgba(255,255,255,0.2)] transition-all duration-300 flex items-center gap-2 group shadow-xl"
            >
              <span>Explore Commission</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onContact}
              className="px-6 py-3.5 border border-white/30 text-white text-xs uppercase tracking-architectural font-medium rounded-sm hover:bg-white/10 hover:border-white/60 transition-all duration-300 backdrop-blur-sm"
            >
              Enquire Dual Studios
            </button>
          </div>
        </div>
      </div>

      {/* Plane 4: Bottom Kinetic Progress Navigation & Controls */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-6 sm:pb-12 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
          {/* Segmented Stage Steps (01 through 05) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {STAGE_SCENES.map((scene, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={scene.id}
                  onClick={() => jumpTo(idx)}
                  className={`group relative flex flex-col items-start text-left transition-all duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-40 hover:opacity-75'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-xs">
                    <span className={isActive ? 'text-accent-amber font-bold' : 'text-white'}>
                      0{idx + 1}
                    </span>
                    <span className="hidden md:inline uppercase text-[9px] tracking-wider text-canvas-muted truncate max-w-[120px]">
                      {(scene?.title || '').split(' ')[0]}
                    </span>
                  </div>

                  {/* Micro Progress Bar for active step */}
                  <div className="w-12 sm:w-16 md:w-24 h-[2px] bg-white/20 mt-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-accent-terracotta to-accent-amber'
                          : idx < currentIndex
                          ? 'bg-white/60 w-full'
                          : 'w-0'
                      }`}
                      style={{
                        width: isActive ? `${progress}%` : undefined,
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Play/Pause & Arrow Navigators */}
          <div className="flex items-center justify-between sm:justify-end gap-3 text-xs font-mono">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all"
              title={isPlaying ? 'Pause Auto-Rotation' : 'Resume Auto-Rotation'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            <div className="flex items-center gap-1">
              <button
                onClick={triggerPrev}
                className="p-2 rounded border border-white/20 text-white/80 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all"
                title="Previous Scene"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={triggerNext}
                className="p-2 rounded border border-white/20 text-white/80 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all"
                title="Next Scene"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Scroll Indicator */}
            <button
              onClick={onExplore}
              className="hidden lg:flex items-center gap-2 pl-4 text-[10px] uppercase tracking-architectural text-canvas-muted hover:text-white transition-colors"
            >
              <span>Scroll Works</span>
              <div className="w-3 h-3 border-r border-b border-white rotate-45 animate-pulse" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
