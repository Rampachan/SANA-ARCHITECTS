import React from 'react';
import { ArrowUpRight, MapPin, Layers, CheckCircle2 } from 'lucide-react';
import { Project } from '../../types/project';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  aspect?: 'wide' | 'tall' | 'standard';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  onSelect,
  aspect = 'standard'
}) => {
  const aspectClass = {
    wide: 'aspect-[16/10] sm:aspect-[16/9]',
    tall: 'aspect-[3/4] sm:aspect-[4/5]',
    standard: 'aspect-[16/10]'
  }[aspect];

  return (
    <div 
      onClick={() => onSelect(project)}
      data-cursor="VIEW"
      className="group cursor-pointer flex flex-col space-y-3.5 select-none"
    >
      {/* Image Container */}
      <div className={`relative w-full ${aspectClass} overflow-hidden rounded-sm bg-studio-charcoal/5 border border-canvas-stone/60 transition-all duration-500 group-hover:border-studio-black/40 group-hover:shadow-lg`}>
        <img
          src={project.coverImage}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        {/* Subtle Dark Vignette Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
          {project.isExecuted ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-950/80 text-emerald-300 text-[10px] font-medium tracking-wider uppercase backdrop-blur-md border border-emerald-500/20">
              <CheckCircle2 className="w-3 h-3" />
              <span>Executed Site</span>
            </span>
          ) : (
            <span className="inline-block px-2.5 py-1 rounded bg-black/60 text-white/90 text-[10px] tracking-architectural uppercase backdrop-blur-md border border-white/10">
              {project.category}
            </span>
          )}

          {project.gallery.length > 1 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/60 text-white/90 text-[10px] font-mono backdrop-blur-md border border-white/10">
              <Layers className="w-3 h-3" />
              <span>{project.gallery.length}</span>
            </span>
          )}
        </div>

        {/* Bottom Metadata Reveal on Hover */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none flex items-center justify-between text-white">
          <span className="text-[11px] tracking-wide text-white/90">
            View Project Gallery & Details
          </span>
          <div className="w-6 h-6 rounded-full bg-white text-studio-black flex items-center justify-center shadow">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Card Info */}
      <div className="flex items-start justify-between gap-3 pt-1">
        <div className="space-y-1">
          <h3 className="font-sans text-base sm:text-lg font-semibold text-studio-black tracking-tight group-hover:text-accent-terracotta transition-colors">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="text-xs text-studio-concrete font-light line-clamp-1">
              {project.subtitle}
            </p>
          )}
          <div className="flex items-center gap-1.5 text-xs text-studio-concrete pt-0.5">
            <MapPin className="w-3 h-3 text-accent-terracotta flex-shrink-0" />
            <span>{project.location}</span>
          </div>
        </div>

        <div className="flex-shrink-0 mt-1">
          <span className="text-[10px] uppercase font-mono tracking-wider text-studio-concrete/80 border border-canvas-stone px-2 py-0.5 rounded">
            {project.sourcePages?.split(',')[0] || 'PDF'}
          </span>
        </div>
      </div>
    </div>
  );
};
