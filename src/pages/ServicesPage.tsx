import React from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { SERVICES_DATA, STUDIO_INFO } from '../data/studioData';
import { ServiceItem } from '../types/project';

interface ServicesPageProps {
  navigate: (path: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ navigate }) => {
  return (
    <div className="pt-28 sm:pt-36 pb-32 bg-canvas-light text-studio-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Page Header */}
        <div className="space-y-4 max-w-3xl pb-16 border-b border-canvas-stone">
          <div className="flex items-center gap-2 text-accent-terracotta text-xs uppercase tracking-architectural font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studio Offerings</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-studio-black uppercase">
            Architectural Services
          </h1>
          <p className="text-base sm:text-lg text-studio-charcoal font-light leading-relaxed">
            Verified disciplines offered by SANA Architects. Each service combines digital 3D precision with on-site technical expertise across Tamil Nadu.
          </p>
        </div>

        {/* Services In-Depth List */}
        <div className="divide-y divide-canvas-stone pt-8">
          {SERVICES_DATA.map((service: ServiceItem) => (
            <div 
              key={service.id}
              className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
            >
              {/* Left Column: Number & Description */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-3xl sm:text-4xl font-light text-studio-concrete">
                    {service.number}
                  </span>
                  <span className="h-[1px] w-12 bg-canvas-stone" />
                  <span className="text-xs uppercase tracking-architectural text-accent-terracotta font-medium">
                    {service.subtitle}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-sans font-bold text-studio-black tracking-tight uppercase">
                  {service.title}
                </h2>

                <p className="text-sm sm:text-base text-studio-charcoal font-light leading-relaxed">
                  {service.description}
                </p>

                {/* Deliverables List */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs uppercase tracking-architectural text-studio-black font-semibold block">
                    Deliverables & Technical Output:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {service.deliverables.map((item: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-studio-charcoal">
                        <Check className="w-4 h-4 text-accent-terracotta flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => navigate('/contact')}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-architectural font-medium text-studio-black hover:text-accent-terracotta transition-colors group"
                  >
                    <span>Inquire About {service.title}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>

              {/* Right Column: Visual Reference */}
              <div className="lg:col-span-5">
                <div className="relative aspect-[16/10] rounded-sm overflow-hidden border border-canvas-stone shadow-md group">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-mono backdrop-blur-sm">
                    Verified Portfolio Case
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Contact Callout */}
        <div className="mt-20 p-8 sm:p-12 rounded-sm bg-canvas-off border border-canvas-stone text-center space-y-4">
          <h3 className="text-2xl font-sans font-bold text-studio-black">
            Ready to initiate an architectural commission?
          </h3>
          <p className="text-sm text-studio-concrete max-w-xl mx-auto font-light">
            Contact our Rasipuram studio to discuss site zoning, floor plans, 3D elevation modeling, or interior fit-outs.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-3.5 bg-studio-black text-canvas-light text-xs uppercase tracking-architectural font-medium rounded-sm hover:bg-studio-charcoal transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Contact SANA Architects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
