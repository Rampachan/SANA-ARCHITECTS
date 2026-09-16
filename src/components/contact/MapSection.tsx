import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink, Building2 } from 'lucide-react';
import { STUDIO_INFO } from '../../data/studioData';

export const MapSection: React.FC = () => {
  const [activeOfficeId, setActiveOfficeId] = useState<string>('rasipuram-head-office');

  const activeOffice = STUDIO_INFO.offices.find(o => o.id === activeOfficeId) || STUDIO_INFO.offices[0];

  return (
    <div className="space-y-6">
      {/* Studio Location Card */}
      <div className="bg-canvas-off p-6 sm:p-8 rounded-sm border border-canvas-stone space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] tracking-architectural uppercase text-accent-terracotta font-medium block">
              Studio Locations
            </span>
            <h4 className="text-xl font-sans font-bold text-studio-black">
              {STUDIO_INFO.name}
            </h4>
          </div>

          <span className="px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase rounded bg-canvas-stone/60 text-studio-charcoal">
            2 Regional Offices
          </span>
        </div>

        {/* Office Tab Switcher */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-canvas-stone/40 rounded">
          {STUDIO_INFO.offices.map((office) => {
            const isActive = office.id === activeOfficeId;
            return (
              <button
                key={office.id}
                onClick={() => setActiveOfficeId(office.id)}
                className={`py-2 px-3 text-xs font-medium rounded transition-all text-center ${
                  isActive 
                    ? 'bg-studio-black text-white shadow-sm' 
                    : 'text-studio-charcoal hover:text-studio-black hover:bg-canvas-stone/70'
                }`}
              >
                <div className="text-[10px] opacity-70 font-mono uppercase tracking-wider">{office.type}</div>
                <div className="font-semibold truncate">{office.city}</div>
              </button>
            );
          })}
        </div>

        {/* Active Office Address Details */}
        <div className="space-y-4 text-sm font-light text-studio-charcoal animate-fade-in key={activeOffice.id}">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-accent-terracotta mt-0.5 flex-shrink-0" />
            <div className="space-y-0.5">
              <p className="font-medium text-studio-black text-base">{activeOffice.name}</p>
              <p>{activeOffice.building}</p>
              {activeOffice.landmark && (
                <p className="text-xs text-studio-concrete">({activeOffice.landmark})</p>
              )}
              {activeOffice.street && activeOffice.street !== activeOffice.building && (
                <p className="text-xs text-studio-concrete">{activeOffice.street}</p>
              )}
              <p className="font-medium text-studio-black">
                {activeOffice.city}, {activeOffice.state} - {activeOffice.pincode}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2 border-t border-canvas-stone/60">
            <Phone className="w-4 h-4 text-accent-terracotta flex-shrink-0" />
            <div>
              <p className="text-xs text-studio-concrete">Direct Line / WhatsApp</p>
              <a 
                href={`tel:${activeOffice.phone}`} 
                className="font-mono font-medium text-studio-black hover:text-accent-terracotta transition-colors"
              >
                {activeOffice.phone}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-accent-terracotta flex-shrink-0" />
            <div>
              <p className="text-xs text-studio-concrete">Project Correspondence</p>
              <a 
                href={`mailto:${activeOffice.email || STUDIO_INFO.email}`} 
                className="font-mono text-xs font-medium text-studio-black hover:text-accent-terracotta transition-colors"
              >
                {activeOffice.email || STUDIO_INFO.email}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-accent-terracotta flex-shrink-0" />
            <div>
              <p className="text-xs text-studio-concrete">Consultation Hours</p>
              <p className="text-xs text-studio-black">{STUDIO_INFO.hours}</p>
            </div>
          </div>
        </div>

        {/* Mobile Call Action */}
        <div className="pt-2">
          <a
            href={`tel:${activeOffice.phone}`}
            className="w-full py-3 px-4 bg-studio-black text-white text-xs uppercase tracking-architectural font-medium rounded-sm flex items-center justify-center gap-2 hover:bg-studio-charcoal transition-colors sm:hidden"
          >
            <Phone className="w-4 h-4" />
            <span>Call {activeOffice.city} Studio</span>
          </a>
        </div>
      </div>

      {/* Embedded Google Map Frame for Selected Office */}
      <div className="relative w-full h-72 sm:h-80 rounded-sm overflow-hidden border border-canvas-stone shadow-sm bg-canvas-stone">
        <iframe
          key={activeOffice.id}
          title={`${activeOffice.name} Location Map`}
          src={activeOffice.mapEmbedUrl}
          className="w-full h-full border-0 grayscale contrast-125 opacity-90 hover:grayscale-0 transition-all duration-500"
          loading="lazy"
          allowFullScreen
        />
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeOffice.mapQuery)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-3 px-3 py-1.5 bg-white/95 backdrop-blur-md text-[11px] font-medium tracking-wide text-studio-black rounded shadow flex items-center gap-1.5 hover:bg-white transition-colors"
        >
          <span>Open {activeOffice.city} in Google Maps</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
