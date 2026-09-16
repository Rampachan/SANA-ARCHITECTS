import React from 'react';
import { ArrowUp, Phone, Mail, MapPin, ExternalLink, Navigation } from 'lucide-react';
import { STUDIO_INFO } from '../../data/studioData';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-studio-black text-canvas-light pt-20 pb-12 border-t border-studio-charcoal">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-studio-slate/40">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] tracking-architectural uppercase text-canvas-muted block">
                Studio Practice
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-white">
                SANA ARCHITECTS
              </h2>
              <p className="text-xs uppercase tracking-editorial text-studio-concrete">
                {STUDIO_INFO.tagline}
              </p>
            </div>
            <p className="text-sm text-canvas-stone/80 font-light leading-relaxed max-w-md">
              Contemporary architectural design, residential elevations, bespoke interiors, and photorealistic 3D visualization rooted in the cultural landscape of Rasipuram and Tamil Nadu.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-canvas-muted">
                Accepting new commissions across Tamil Nadu & South India
              </span>
            </div>
          </div>

          {/* Quick Nav Col */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-[11px] tracking-architectural uppercase text-canvas-muted block">
              Navigation
            </span>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => navigate('/')} 
                  className="text-canvas-stone hover:text-white transition-colors"
                >
                  Home Showcase
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/projects')} 
                  className="text-canvas-stone hover:text-white transition-colors"
                >
                  Completed Works (21 Projects)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/about')} 
                  className="text-canvas-stone hover:text-white transition-colors"
                >
                  About the Studio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/services')} 
                  className="text-canvas-stone hover:text-white transition-colors"
                >
                  Design & Elevation Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/contact')} 
                  className="text-canvas-stone hover:text-white transition-colors"
                >
                  Project Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-[11px] tracking-architectural uppercase text-canvas-muted block">
              Studio Locations
            </span>
            <div className="space-y-4 text-sm text-canvas-stone font-light">
              {/* Rasipuram Office */}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-accent-amber flex-shrink-0" />
                <div className="space-y-0.5">
                  <p className="font-semibold text-white text-xs uppercase tracking-wider">Rasipuram (Head Office)</p>
                  <p className="text-xs">{STUDIO_INFO.address}</p>
                  <p className="text-[11px] text-studio-concrete">({STUDIO_INFO.landmark})</p>
                  <p className="text-xs">{STUDIO_INFO.city}, Namakkal Dt. - {STUDIO_INFO.pincode}</p>
                </div>
              </div>

              {/* Salem Office */}
              <div className="flex items-start gap-3 pt-1 border-t border-studio-slate/40">
                <MapPin className="w-4 h-4 mt-1 text-accent-amber flex-shrink-0" />
                <div className="space-y-0.5">
                  <p className="font-semibold text-white text-xs uppercase tracking-wider">Salem (City Office)</p>
                  <p className="text-xs">KPR Complex, Ground Floor</p>
                  <p className="text-xs">Cherry Road, Hasthampatti</p>
                  <p className="text-xs">Salem, Tamil Nadu - 636 007</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-studio-slate/40">
                <Phone className="w-4 h-4 text-accent-amber flex-shrink-0" />
                <a 
                  href={`tel:${STUDIO_INFO.phone}`} 
                  className="hover:text-white font-mono text-xs transition-colors"
                >
                  {STUDIO_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent-amber flex-shrink-0" />
                <a 
                  href={`mailto:${STUDIO_INFO.email}`} 
                  className="hover:text-white text-xs transition-colors"
                >
                  {STUDIO_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Dual Office Map Layout */}
        <div className="py-12 border-b border-studio-slate/40 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-widest text-accent-amber block">
                Office Locations & Maps
              </span>
              <h3 className="text-xl sm:text-2xl font-sans font-bold text-white uppercase tracking-tight">
                Visit SANA Architects Studios
              </h3>
            </div>
            <span className="text-xs text-studio-concrete font-light">
              Rasipuram (Head Office) • Salem (City Office)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Rasipuram Map Card */}
            <div className="bg-studio-dark/90 border border-studio-slate/50 rounded-sm overflow-hidden flex flex-col justify-between group hover:border-studio-slate transition-colors shadow-lg">
              <div className="p-4 sm:p-5 flex items-start justify-between gap-3 border-b border-studio-slate/40">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent-amber" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-accent-amber font-semibold">Head Office</span>
                  </div>
                  <h4 className="text-base font-bold text-white">Rasipuram Studio</h4>
                  <p className="text-xs text-canvas-stone/80 font-light">
                    51 B, Gandhi Salai, Pattanam Road (Opp. to Vijayalakshmi Theatre), Rasipuram - 637408
                  </p>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=SANA+Architects+51B+Gandhi+Salai+Rasipuram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded bg-studio-charcoal text-white hover:bg-white hover:text-studio-black transition-colors flex-shrink-0"
                  title="Open in Google Maps"
                >
                  <Navigation className="w-4 h-4" />
                </a>
              </div>
              <div className="relative w-full h-48 sm:h-52 bg-studio-charcoal">
                <iframe
                  title="SANA Architects Rasipuram Office Map"
                  src="https://maps.google.com/maps?q=51+B+Gandhi+Salai+Rasipuram+Tamil+Nadu&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 grayscale contrast-125 opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
              <div className="p-3.5 bg-studio-black/80 flex items-center justify-between text-xs text-studio-concrete">
                <span>Namakkal District, Tamil Nadu</span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=SANA+Architects+51B+Gandhi+Salai+Rasipuram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-white/90 hover:text-accent-amber transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Get Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Salem Map Card */}
            <div className="bg-studio-dark/90 border border-studio-slate/50 rounded-sm overflow-hidden flex flex-col justify-between group hover:border-studio-slate transition-colors shadow-lg">
              <div className="p-4 sm:p-5 flex items-start justify-between gap-3 border-b border-studio-slate/40">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent-amber" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-accent-amber font-semibold">City Office</span>
                  </div>
                  <h4 className="text-base font-bold text-white">Salem Studio</h4>
                  <p className="text-xs text-canvas-stone/80 font-light">
                    KPR Complex, Ground Floor, Cherry Road, Hasthampatti, Salem - 636 007
                  </p>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=KPR+Complex+Cherry+Road+Hasthampatti+Salem+636007"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded bg-studio-charcoal text-white hover:bg-white hover:text-studio-black transition-colors flex-shrink-0"
                  title="Open in Google Maps"
                >
                  <Navigation className="w-4 h-4" />
                </a>
              </div>
              <div className="relative w-full h-48 sm:h-52 bg-studio-charcoal">
                <iframe
                  title="SANA Architects Salem Office Map"
                  src="https://maps.google.com/maps?q=KPR+Complex+Cherry+Road+Hasthampatti+Salem+636007&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 grayscale contrast-125 opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
              <div className="p-3.5 bg-studio-black/80 flex items-center justify-between text-xs text-studio-concrete">
                <span>Salem City, Tamil Nadu</span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=KPR+Complex+Cherry+Road+Hasthampatti+Salem+636007"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-white/90 hover:text-accent-amber transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Get Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-studio-concrete">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} SANA Architects. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline font-mono text-[11px]">
              {STUDIO_INFO.coordinates.lat}° N, {STUDIO_INFO.coordinates.lng}° E
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-white transition-colors group"
          >
            <span className="text-[11px] uppercase tracking-wider">Back to Top</span>
            <div className="w-7 h-7 rounded-full border border-studio-slate flex items-center justify-center group-hover:border-white transition-colors">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
