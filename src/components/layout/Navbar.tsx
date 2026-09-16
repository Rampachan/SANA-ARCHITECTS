import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ArrowUpRight } from 'lucide-react';
import { STUDIO_INFO } from '../../data/studioData';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Works', path: '/projects' },
    { label: 'Studio', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled 
            ? 'bg-canvas-light/95 backdrop-blur-md border-b border-canvas-stone/60 py-4 shadow-sm' 
            : 'bg-gradient-to-b from-black/60 via-black/20 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => handleNav('/')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-8 h-8 rounded-sm overflow-hidden flex-shrink-0 bg-studio-black shadow-sm">
              <img 
                src="/images/sana-mark.jpg" 
                alt="SANA Architects Logo Mark" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback to geometric mark if image isn't loaded
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <span className={`block font-sans font-bold text-sm tracking-architectural uppercase transition-colors ${
                isScrolled ? 'text-studio-black group-hover:text-accent-terracotta' : 'text-white group-hover:text-canvas-muted'
              }`}>
                SANA ARCHITECTS
              </span>
              <span className={`block text-[10px] tracking-widest uppercase transition-colors ${
                isScrolled ? 'text-studio-concrete' : 'text-white/70'
              }`}>
                Rasipuram • Salem • Tamil Nadu
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`text-xs uppercase tracking-architectural font-medium transition-all duration-300 relative py-1 ${
                    isScrolled
                      ? isActive 
                        ? 'text-studio-black font-semibold' 
                        : 'text-studio-concrete hover:text-studio-black'
                      : isActive 
                        ? 'text-white font-semibold' 
                        : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className={`absolute bottom-0 left-0 w-full h-[1.5px] ${
                      isScrolled ? 'bg-studio-black' : 'bg-white'
                    }`} />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href={`tel:${STUDIO_INFO.phone}`}
              className={`flex items-center gap-2 text-xs font-medium tracking-wide transition-colors ${
                isScrolled ? 'text-studio-black hover:text-accent-terracotta' : 'text-white/90 hover:text-white'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{STUDIO_INFO.phone}</span>
            </a>
            <button
              onClick={() => handleNav('/contact')}
              className={`px-4 py-2 text-xs tracking-editorial uppercase transition-all duration-300 flex items-center gap-1.5 rounded-sm ${
                isScrolled 
                  ? 'bg-studio-black text-canvas-light hover:bg-studio-charcoal' 
                  : 'bg-white text-studio-black hover:bg-canvas-stone'
              }`}
            >
              <span>Enquire</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className={`md:hidden p-2 rounded transition-colors ${
              isScrolled ? 'text-studio-black' : 'text-white'
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-studio-black/95 backdrop-blur-xl flex flex-col justify-between p-8 pt-28 text-canvas-light animate-fade-in md:hidden">
          <div className="space-y-6">
            <span className="text-[11px] uppercase tracking-architectural text-canvas-muted block">
              Menu
            </span>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleNav('/')}
                className="text-2xl font-serif text-left py-2 border-b border-white/10 hover:text-canvas-muted transition-colors"
              >
                Home
              </button>
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className="text-2xl font-serif text-left py-2 border-b border-white/10 hover:text-canvas-muted transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-50" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/15">
            <div className="space-y-2">
              <p className="text-[10px] text-canvas-muted uppercase tracking-widest font-mono">
                Offices: Rasipuram & Salem
              </p>
              <div className="text-xs text-white/80 font-light space-y-1">
                <p><span className="font-medium text-white">Rasipuram (Head Office):</span> 51 B, Gandhi Salai, Pattanam Rd</p>
                <p><span className="font-medium text-white">Salem (City Office):</span> KPR Complex, Gr. Floor, Cherry Rd, Hasthampatti</p>
              </div>
            </div>
            <div className="flex gap-4 pt-2">
              <a
                href={`tel:${STUDIO_INFO.phone}`}
                className="flex-1 py-3 px-4 bg-white text-studio-black text-center text-xs tracking-editorial uppercase font-medium rounded-sm flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Studio</span>
              </a>
              <button
                onClick={() => handleNav('/contact')}
                className="flex-1 py-3 px-4 border border-white/30 text-white text-center text-xs tracking-editorial uppercase font-medium rounded-sm"
              >
                Inquire
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
