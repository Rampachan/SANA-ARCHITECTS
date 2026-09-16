import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface NotFoundPageProps {
  navigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ navigate }) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center pt-32 pb-24 bg-canvas-light text-studio-black px-6">
      <div className="text-center space-y-6 max-w-md">
        <span className="font-mono text-xs uppercase tracking-architectural text-accent-terracotta block">
          404 Error
        </span>
        <h1 className="text-4xl sm:text-5xl font-sans font-bold tracking-tight uppercase">
          Structure Not Found
        </h1>
        <p className="text-sm text-studio-concrete font-light leading-relaxed">
          The architectural record or page you are attempting to access does not exist or has been relocated within the SANA Architects archive.
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-studio-black text-white text-xs uppercase tracking-architectural font-medium rounded-sm hover:bg-studio-charcoal transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </button>
      </div>
    </div>
  );
};
