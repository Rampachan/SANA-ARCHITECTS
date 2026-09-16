import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { SERVICES_DATA } from '../../data/studioData';

interface ServicesOverviewProps {
  onExploreServices: () => void;
  onContact: () => void;
}

export const ServicesOverview: React.FC<ServicesOverviewProps> = ({ 
  onExploreServices,
  onContact
}) => {
  return (
    <section className="py-24 sm:py-32 bg-canvas-light text-studio-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-canvas-stone">
          <div className="space-y-3">
            <span className="text-[11px] tracking-architectural uppercase text-accent-terracotta font-medium block">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-studio-black uppercase">
              Disciplines & Services
            </h2>
            <p className="text-sm text-studio-concrete max-w-md font-light">
              Verified architectural design, 3D visualization, and interior space planning services tailored to individual spatial briefs.
            </p>
          </div>

          <button
            onClick={onExploreServices}
            className="self-start md:self-auto inline-flex items-center gap-2 text-xs uppercase tracking-architectural font-medium text-studio-black hover:text-accent-terracotta transition-colors"
          >
            <span>View All Detailed Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Services List with Numbers */}
        <div className="divide-y divide-canvas-stone">
          {SERVICES_DATA.map((service) => (
            <div 
              key={service.id}
              className="py-10 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start group hover:bg-canvas-off/60 transition-colors px-4 -mx-4 rounded-sm"
            >
              {/* Number */}
              <div className="lg:col-span-2">
                <span className="font-mono text-2xl sm:text-3xl font-light text-studio-concrete group-hover:text-studio-black transition-colors">
                  {service.number}
                </span>
              </div>

              {/* Title & Description */}
              <div className="lg:col-span-5 space-y-2">
                <h3 className="text-xl sm:text-2xl font-sans font-bold text-studio-black tracking-tight group-hover:text-accent-terracotta transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs uppercase tracking-editorial text-studio-concrete">
                  {service.subtitle}
                </p>
                <p className="text-sm text-studio-charcoal/80 font-light leading-relaxed pt-2">
                  {service.description}
                </p>
              </div>

              {/* Deliverables */}
              <div className="lg:col-span-5 space-y-2 lg:pl-6 border-l lg:border-canvas-stone/80">
                <span className="text-[10px] uppercase tracking-architectural text-studio-concrete font-medium block">
                  Key Scope
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-studio-charcoal">
                  {service.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-accent-terracotta flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Direct CTA */}
        <div className="mt-16 text-center pt-10 border-t border-canvas-stone">
          <p className="text-sm text-studio-concrete font-light mb-4">
            Have a residential or commercial site ready for planning?
          </p>
          <button
            onClick={onContact}
            className="px-8 py-3.5 bg-studio-black text-canvas-light text-xs uppercase tracking-architectural font-medium rounded-sm hover:bg-studio-charcoal transition-all shadow-md inline-flex items-center gap-2"
          >
            <span>Request Architectural Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
