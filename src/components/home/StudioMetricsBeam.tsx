import React, { useState, useEffect, useRef } from 'react';
import { Layers, MapPin, Sparkles, Compass } from 'lucide-react';

interface MetricItem {
  id: string;
  targetValue: number;
  suffix: string;
  label: string;
  subtitle: string;
  icon: React.ElementType;
}

const METRICS: MetricItem[] = [
  {
    id: 'pages',
    targetValue: 130,
    suffix: '+',
    label: 'Archive Project Pages',
    subtitle: 'High-definition residential elevations, retail masterplans & interior joinery blueprints cataloged from official folio.',
    icon: Layers,
  },
  {
    id: 'studios',
    targetValue: 2,
    suffix: '',
    label: 'Dedicated Studios',
    subtitle: 'Rasipuram Head Office (Gandhi Salai) & Salem City Office (Cherry Road) providing local and regional execution.',
    icon: MapPin,
  },
  {
    id: 'disciplines',
    targetValue: 4,
    suffix: '',
    label: 'Core Disciplines',
    subtitle: '3D Elevation Design, Photometric Light Simulation, Luxury Interior Joinery, and Turnkey On-Site Execution.',
    icon: Compass,
  },
  {
    id: 'customization',
    targetValue: 100,
    suffix: '%',
    label: 'Bespoke Customization',
    subtitle: 'Zero generic templates—every facade is modeled from scratch to client topography, sunlight paths, and privacy needs.',
    icon: Sparkles,
  },
];

export const StudioMetricsBeam: React.FC = () => {
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    pages: 0,
    studios: 0,
    disciplines: 0,
    customization: 0,
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          startCounting();
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const startCounting = () => {
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const updateCounters = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);

      const newCounts: { [key: string]: number } = {};
      METRICS.forEach((m) => {
        newCounts[m.id] = Math.floor(m.targetValue * ease);
      });

      setCounts(newCounts);

      if (progress < 1) {
        requestAnimationFrame(updateCounters);
      } else {
        const finalCounts: { [key: string]: number } = {};
        METRICS.forEach((m) => {
          finalCounts[m.id] = m.targetValue;
        });
        setCounts(finalCounts);
      }
    };

    requestAnimationFrame(updateCounters);
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-28 bg-studio-black text-canvas-light relative overflow-hidden border-y border-white/10"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="w-full h-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent-amber text-[11px] font-mono uppercase tracking-architectural">
            <span>Verified Architectural Record</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight uppercase text-white">
            Studio Scale & Practice Foundations
          </h2>
          <p className="text-sm text-canvas-muted font-light">
            Rooted in Rasipuram and Salem, serving clients across Tamil Nadu, Karnataka, and beyond with strict architectural fidelity.
          </p>
        </div>

        {/* 4 Kinetic Metric Cards with Animated Border Glow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {METRICS.map((metric) => {
            const Icon = metric.icon;
            const currentVal = counts[metric.id] ?? 0;

            return (
              <div
                key={metric.id}
                className="group relative p-6 sm:p-8 rounded-sm bg-studio-charcoal/80 border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-accent-amber/50 hover:shadow-2xl hover:shadow-accent-amber/10 hover:-translate-y-1"
              >
                {/* Luminous Warm Backlight Glow on Hover */}
                <div className="absolute -inset-1 rounded-[inherit] bg-gradient-to-r from-accent-terracotta/20 to-accent-amber/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10 space-y-4">
                  {/* Top Icon & Metric Category */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-accent-amber group-hover:border-accent-amber/40 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-studio-concrete">
                      Verified
                    </span>
                  </div>

                  {/* Animated Big Number */}
                  <div className="pt-2">
                    <span className="font-sans text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                      {currentVal}
                    </span>
                    <span className="font-sans text-3xl sm:text-4xl font-bold text-accent-amber ml-0.5">
                      {metric.suffix}
                    </span>
                  </div>

                  {/* Metric Title & Description */}
                  <div className="space-y-1.5 pt-1">
                    <h3 className="font-sans text-base font-semibold text-white tracking-tight">
                      {metric.label}
                    </h3>
                    <p className="text-xs text-canvas-muted/80 font-light leading-relaxed">
                      {metric.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
