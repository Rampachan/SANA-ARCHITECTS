import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, MapPin, Maximize2, Layers, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../types/project';
import { LightboxModal } from '../components/common/LightboxModal';

interface ProjectDetailPageProps {
  project: Project;
  allProjects: Project[];
  onBack: () => void;
  onSelectProject: (p: Project) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  allProjects,
  onBack,
  onSelectProject
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Calculate Next & Prev projects
  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="pt-24 sm:pt-28 pb-32 bg-canvas-light text-studio-black">
      {/* Top Breadcrumb & Return Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 flex items-center justify-between border-b border-canvas-stone">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-architectural font-medium text-studio-black hover:text-accent-terracotta transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Works</span>
        </button>

        <div className="flex items-center gap-4 text-xs font-mono text-studio-concrete">
          <span>{project.sourcePages || 'Verified PDF Project'}</span>
          <span>•</span>
          <span>{project.gallery.length} Images</span>
        </div>
      </div>

      {/* Project Hero Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Metadata & Description */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                {project.isExecuted ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-900 text-emerald-200 text-[10px] font-medium tracking-wider uppercase">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Completed Physical Execution</span>
                  </span>
                ) : (
                  <span className="inline-block px-3 py-1 rounded bg-studio-black text-white text-[10px] tracking-architectural uppercase">
                    {project.category}
                  </span>
                )}
                {project.year && (
                  <span className="text-xs font-mono text-studio-concrete">
                    {project.year}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-studio-black uppercase leading-tight">
                {project.title}
              </h1>

              {project.subtitle && (
                <p className="text-base text-studio-concrete font-light">
                  {project.subtitle}
                </p>
              )}

              <div className="flex items-center gap-2 text-sm text-studio-charcoal pt-1">
                <MapPin className="w-4 h-4 text-accent-terracotta flex-shrink-0" />
                <span className="font-medium">{project.location}</span>
              </div>
            </div>

            {/* Narrative Description */}
            <div className="pt-4 border-t border-canvas-stone space-y-3">
              <span className="text-[11px] uppercase tracking-architectural text-studio-concrete font-medium block">
                Architectural Overview
              </span>
              <p className="text-sm sm:text-base text-studio-charcoal font-light leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Scope Tags */}
            {project.scope && project.scope.length > 0 && (
              <div className="pt-4 border-t border-canvas-stone space-y-2">
                <span className="text-[11px] uppercase tracking-architectural text-studio-concrete font-medium block">
                  Disciplines & Scope
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.scope.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 text-[11px] font-mono rounded bg-canvas-off border border-canvas-stone text-studio-charcoal"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Action to Open Gallery */}
            <div className="pt-4">
              <button
                onClick={() => handleOpenLightbox(0)}
                className="w-full py-3 px-4 bg-studio-black text-white text-xs uppercase tracking-architectural font-medium rounded-sm hover:bg-studio-charcoal transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Launch Fullscreen Exhibition ({project.gallery.length} Views)</span>
              </button>
            </div>
          </div>

          {/* Primary Hero Image */}
          <div className="lg:col-span-7 space-y-6">
            <div 
              onClick={() => handleOpenLightbox(0)}
              className="relative w-full aspect-[16/10] rounded-sm overflow-hidden border border-canvas-stone cursor-pointer group shadow-lg bg-studio-charcoal"
            >
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2">
                <Maximize2 className="w-5 h-5" />
                <span className="text-xs uppercase tracking-wider font-medium">Expand Fullscreen</span>
              </div>
            </div>

            {/* Source Page Citation */}
            <div className="p-4 bg-canvas-off rounded border border-canvas-stone text-xs text-studio-concrete flex items-center justify-between">
              <span>Primary Source: SANA Architects Portfolio</span>
              <span className="font-mono font-medium text-studio-black">{project.sourcePages}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Image Exhibition Gallery */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8">
        <div className="pb-8 border-b border-canvas-stone flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-architectural text-accent-terracotta font-medium block">
              Visual Documentation
            </span>
            <h2 className="text-2xl font-sans font-bold text-studio-black uppercase">
              Project Gallery & Details
            </h2>
          </div>
          <span className="text-xs font-mono text-studio-concrete">
            Click any frame to inspect
          </span>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-10">
          {project.gallery.map((imgUrl, idx) => (
            <div
              key={idx}
              onClick={() => handleOpenLightbox(idx)}
              className="group cursor-pointer relative aspect-[16/10] rounded-sm overflow-hidden border border-canvas-stone bg-studio-charcoal/5 shadow-sm hover:shadow-md transition-all"
            >
              <img
                src={imgUrl}
                alt={`${project.title} - View ${idx + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2">
                <Maximize2 className="w-5 h-5" />
                <span className="text-xs uppercase tracking-wider font-medium">View {idx + 1} of {project.gallery.length}</span>
              </div>
              <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-mono">
                Frame {idx + 1}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Navigation Footer (Prev / Next Project) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24">
        <div className="pt-12 border-t border-canvas-stone grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Previous Project */}
          <button
            onClick={() => {
              onSelectProject(prevProject);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-6 bg-canvas-off border border-canvas-stone rounded-sm hover:border-studio-black transition-all text-left group flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-full border border-canvas-stone flex items-center justify-center group-hover:border-studio-black group-hover:bg-studio-black group-hover:text-white transition-all flex-shrink-0">
              <ChevronLeft className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase tracking-architectural text-studio-concrete block">
                Previous Project
              </span>
              <h4 className="font-sans font-bold text-base text-studio-black group-hover:text-accent-terracotta transition-colors line-clamp-1">
                {prevProject.title}
              </h4>
              <p className="text-xs text-studio-concrete line-clamp-1">{prevProject.location}</p>
            </div>
          </button>

          {/* Next Project */}
          <button
            onClick={() => {
              onSelectProject(nextProject);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-6 bg-canvas-off border border-canvas-stone rounded-sm hover:border-studio-black transition-all text-right group flex items-center justify-end gap-4"
          >
            <div className="space-y-0.5 order-1 sm:order-0">
              <span className="text-[10px] uppercase tracking-architectural text-studio-concrete block">
                Next Project
              </span>
              <h4 className="font-sans font-bold text-base text-studio-black group-hover:text-accent-terracotta transition-colors line-clamp-1">
                {nextProject.title}
              </h4>
              <p className="text-xs text-studio-concrete line-clamp-1">{nextProject.location}</p>
            </div>
            <div className="w-10 h-10 rounded-full border border-canvas-stone flex items-center justify-center group-hover:border-studio-black group-hover:bg-studio-black group-hover:text-white transition-all flex-shrink-0 order-0 sm:order-1">
              <ChevronRight className="w-5 h-5" />
            </div>
          </button>
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        images={project.gallery}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setLightboxIndex((lightboxIndex + 1) % project.gallery.length)}
        onPrev={() => setLightboxIndex((lightboxIndex - 1 + project.gallery.length) % project.gallery.length)}
        title={project.title}
        category={project.category}
        location={project.location}
      />
    </div>
  );
};
