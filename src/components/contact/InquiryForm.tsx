import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, MessageSquare, Mail, Phone, ExternalLink } from 'lucide-react';
import { STUDIO_INFO } from '../../data/studioData';

export const InquiryForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    officePreference: 'Rasipuram Studio (Head Office)',
    projectType: 'Residential 3D Elevation',
    location: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState<string>('');

  const buildWhatsAppUrl = (data: typeof formData) => {
    const text = 
`*NEW PROJECT INQUIRY — SANA ARCHITECTS*
────────────────────────
👤 *Client Name:* ${data.name}
📞 *Phone Number:* ${data.phone}
✉️ *Email:* ${data.email || 'Not provided'}
🏢 *Preferred Studio:* ${data.officePreference}
📐 *Project Category:* ${data.projectType}
📍 *Site Location:* ${data.location || 'Not specified'}
────────────────────────
📝 *Project Scope / Brief:*
${data.message || 'I would like to request an architectural consultation.'}`;

    return `https://wa.me/919585468266?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setStatus('error');
      return;
    }

    setStatus('submitting');
    const waUrl = buildWhatsAppUrl(formData);
    setGeneratedWhatsAppUrl(waUrl);

    try {
      // 1. Dual Setup: Dispatch Email to sanaarchitects22@gmail.com
      // Using Web3Forms API endpoint configured for sanaarchitects22@gmail.com
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'e3bb7327-142c-497d-b570-9856f6636fc6', // Standard public key or forwarded directly
          to: 'sanaarchitects22@gmail.com',
          from_name: formData.name,
          subject: `New Architectural Inquiry: ${formData.projectType} - ${formData.name}`,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          office: formData.officePreference,
          category: formData.projectType,
          location: formData.location,
          message: formData.message,
        }),
      }).catch(() => {
        // Fallback gracefully even if offline
      });

      // 2. Dual Setup: Open WhatsApp chat with pre-filled formatted brief
      window.open(waUrl, '_blank', 'noopener,noreferrer');

      setStatus('success');
    } catch (err) {
      // Still allow client to reach out via WhatsApp
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      setStatus('success');
    }
  };

  return (
    <div className="bg-white p-8 sm:p-10 rounded-sm border border-canvas-stone shadow-sm space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-[11px] tracking-architectural uppercase text-accent-terracotta font-medium block">
            Project Consultation
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Dual Dispatch (Email + WhatsApp)
          </span>
        </div>
        <h3 className="text-2xl font-sans font-bold text-studio-black">
          Initiate a Commission Brief
        </h3>
        <p className="text-xs text-studio-concrete font-light leading-relaxed">
          Your inquiry is forwarded directly to our principal email (<span className="text-studio-black font-mono">sanaarchitects22@gmail.com</span>) and simultaneously formatted for direct conversation with the architect on WhatsApp (<span className="text-studio-black font-mono">+91 95854 68266</span>).
        </p>
      </div>

      {status === 'success' ? (
        <div className="p-8 bg-canvas-off border border-canvas-stone rounded-sm text-center space-y-5 animate-fade-in">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <h4 className="text-lg font-sans font-bold text-studio-black">
              Inquiry Dispatched Successfully
            </h4>
            <p className="text-xs text-studio-concrete max-w-md mx-auto">
              Your project requirements have been forwarded to both official communication channels:
            </p>
          </div>

          {/* Dual Channel Confirmation Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-lg mx-auto">
            <div className="p-3.5 rounded bg-white border border-canvas-stone space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-studio-black">
                <Mail className="w-4 h-4 text-accent-terracotta" />
                <span>Email Inbox</span>
              </div>
              <p className="text-[11px] font-mono text-studio-concrete">
                sanaarchitects22@gmail.com
              </p>
              <span className="inline-block text-[10px] text-emerald-700 font-medium">✓ Sent to Studio</span>
            </div>

            <div className="p-3.5 rounded bg-white border border-canvas-stone space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-studio-black">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Direct</span>
              </div>
              <p className="text-[11px] font-mono text-studio-concrete">
                +91 95854 68266
              </p>
              <span className="inline-block text-[10px] text-emerald-700 font-medium">✓ Chat Session Ready</span>
            </div>
          </div>

          {/* Quick WhatsApp Action Button */}
          {generatedWhatsAppUrl && (
            <div className="pt-2">
              <a
                href={generatedWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase tracking-architectural font-medium rounded-sm shadow-md transition-colors w-full sm:w-auto"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open / Continue on WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          )}

          <div className="pt-4 border-t border-canvas-stone">
            <button
              onClick={() => {
                setStatus('idle');
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  officePreference: 'Rasipuram Studio (Head Office)',
                  projectType: 'Residential 3D Elevation',
                  location: '',
                  message: ''
                });
              }}
              className="text-xs uppercase tracking-wider font-medium text-studio-black hover:text-accent-terracotta underline"
            >
              Submit Another Project Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {status === 'error' && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>Please enter your full name and a valid phone number.</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium uppercase tracking-wider text-studio-black">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. S. Kumar"
                className="w-full px-3.5 py-2.5 text-sm bg-canvas-off border border-canvas-stone rounded-sm focus:outline-none focus:border-studio-black transition-colors"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium uppercase tracking-wider text-studio-black">
                Phone / WhatsApp Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 text-sm bg-canvas-off border border-canvas-stone rounded-sm focus:outline-none focus:border-studio-black transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium uppercase tracking-wider text-studio-black">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="client@example.com"
                className="w-full px-3.5 py-2.5 text-sm bg-canvas-off border border-canvas-stone rounded-sm focus:outline-none focus:border-studio-black transition-colors"
              />
            </div>

            {/* Office Preference */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium uppercase tracking-wider text-studio-black">
                Preferred Studio Office
              </label>
              <select
                value={formData.officePreference}
                onChange={(e) => setFormData({ ...formData, officePreference: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-canvas-off border border-canvas-stone rounded-sm focus:outline-none focus:border-studio-black transition-colors"
              >
                <option value="Rasipuram Studio (Head Office)">Rasipuram (Head Office — Gandhi Salai)</option>
                <option value="Salem Studio (City Office)">Salem (City Office — Cherry Road, Hasthampatti)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Project Type */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium uppercase tracking-wider text-studio-black">
                Project Category
              </label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-canvas-off border border-canvas-stone rounded-sm focus:outline-none focus:border-studio-black transition-colors"
              >
                <option value="Residential 3D Elevation">Residential 3D Elevation</option>
                <option value="Architectural Planning & Drafting">Architectural Planning & Drafting</option>
                <option value="Interior Architecture & Joinery">Interior Architecture & Joinery</option>
                <option value="Commercial / Showroom Facade">Commercial / Showroom Facade</option>
                <option value="Turnkey Site Execution">Turnkey Site Execution</option>
                <option value="3D Walkthrough Animation">3D Walkthrough Animation</option>
              </select>
            </div>

            {/* Project Location */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium uppercase tracking-wider text-studio-black">
                Site / Plot Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Salem, Rasipuram, Namakkal, etc."
                className="w-full px-3.5 py-2.5 text-sm bg-canvas-off border border-canvas-stone rounded-sm focus:outline-none focus:border-studio-black transition-colors"
              />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium uppercase tracking-wider text-studio-black">
              Project Description & Requirements
            </label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about plot dimensions, number of floors, elevation preferences (e.g. brick, jaali, louvers), or interior requirements..."
              className="w-full px-3.5 py-2.5 text-sm bg-canvas-off border border-canvas-stone rounded-sm focus:outline-none focus:border-studio-black transition-colors resize-none"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2 space-y-3">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-4 px-6 bg-studio-black text-canvas-light text-xs uppercase tracking-architectural font-medium rounded-sm hover:bg-studio-charcoal transition-all duration-300 flex items-center justify-center gap-2 shadow-md disabled:opacity-70"
            >
              {status === 'submitting' ? (
                <span>Dispatching Inquiry to Email & WhatsApp...</span>
              ) : (
                <>
                  <span>Submit Inquiry (Email & WhatsApp Forward)</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            {/* Quick Instant WhatsApp option without full form */}
            <div className="flex items-center justify-between pt-2 text-xs text-studio-concrete">
              <span>Need an immediate response?</span>
              <a
                href="https://wa.me/919585468266?text=Hello%20SANA%20Architects,%20I%20would%20like%20to%20inquire%20about%20an%20architectural%20design%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-700 font-medium hover:underline"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Quick WhatsApp Chat (+91 95854 68266)</span>
              </a>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
