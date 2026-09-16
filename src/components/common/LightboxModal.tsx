import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface LightboxModalProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  title?: string;
  category?: string;
  location?: string;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
  title,
  category,
  location
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    },
    [isOpen, onClose, onNext, onPrev]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between select-none animate-fade-in">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 text-white">
        <div>
          {title && (
            <h3 className="text-sm font-medium tracking-wide">
              {title}
            </h3>
          )}
          <div className="flex items-center gap-3 text-xs text-neutral-400">
            {category && <span>{category}</span>}
            {location && <span>• {location}</span>}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-neutral-400">
            {currentIndex + 1} / {images.length}
          </span>
          <button
            onClick={onClose}
            aria-label="Close Lightbox"
            className="p-2 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
        {images.length > 1 && (
          <button
            onClick={onPrev}
            aria-label="Previous Image"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white border border-white/10 backdrop-blur-sm transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <div className="max-w-6xl max-h-[82vh] flex items-center justify-center">
          <img
            src={currentImage}
            alt={title || "Architectural Gallery View"}
            className="max-w-full max-h-[82vh] object-contain rounded-sm shadow-2xl transition-opacity duration-300"
          />
        </div>

        {images.length > 1 && (
          <button
            onClick={onNext}
            aria-label="Next Image"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white border border-white/10 backdrop-blur-sm transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnails Strip */}
      {images.length > 1 && (
        <div className="px-6 py-3 border-t border-white/10 bg-black/50 overflow-x-auto flex items-center justify-center gap-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (idx !== currentIndex) {
                  // Jump to index
                  const diff = idx - currentIndex;
                  if (diff > 0) {
                    for (let i = 0; i < diff; i++) onNext();
                  } else {
                    for (let i = 0; i < Math.abs(diff); i++) onPrev();
                  }
                }
              }}
              className={`relative w-14 h-10 rounded overflow-hidden flex-shrink-0 transition-all ${
                idx === currentIndex
                  ? 'ring-2 ring-white scale-105 opacity-100'
                  : 'opacity-40 hover:opacity-80'
              }`}
            >
              <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
