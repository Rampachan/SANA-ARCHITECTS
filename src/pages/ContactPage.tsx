import React from 'react';
import { InquiryForm } from '../components/contact/InquiryForm';
import { MapSection } from '../components/contact/MapSection';
import { Phone, Mail, MapPin, Sparkles } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioData';

export const ContactPage: React.FC = () => {
  return (
    <div className="pt-28 sm:pt-36 pb-32 bg-canvas-light text-studio-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Page Header */}
        <div className="space-y-4 max-w-3xl pb-16 border-b border-canvas-stone">
          <div className="flex items-center gap-2 text-accent-terracotta text-xs uppercase tracking-architectural font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connect with Studio</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-studio-black uppercase">
            Project Inquiries
          </h1>
          <p className="text-base sm:text-lg text-studio-charcoal font-light leading-relaxed">
            Reach out directly to SANA Architects for new residential elevations, commercial showroom designs, interior masterplans, and site consultations in Rasipuram and across Tamil Nadu.
          </p>
        </div>

        {/* Form and Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-14">
          {/* Inquiry Form Column */}
          <div className="lg:col-span-7">
            <InquiryForm />
          </div>

          {/* Studio Map and Location Details */}
          <div className="lg:col-span-5">
            <MapSection />
          </div>
        </div>
      </div>
    </div>
  );
};
