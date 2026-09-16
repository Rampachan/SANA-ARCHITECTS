import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Project } from '../../types/project';
import { ProjectCard } from '../projects/ProjectCard';

interface FeaturedWorksProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onViewAll: () => void;
}

export const FeaturedWorks: React.FC<FeaturedWorksProps> = ({
  projects,
  onSelectProject,
  onViewAll
}) => {
  const featuredProjects = projects.filter(p => p.featured).slice(0, 6);

  return (
    <section id="selected-works" className="py-24 sm:py-32 bg-canvas-light text-studio-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 border-b border-canvas-stone">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-accent-terracotta text-xs uppercase tracking-architectural font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Authoritative Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-studio-black uppercase">
              Selected Works
            </h2>
            <p className="text-sm text-studio-concrete max-w-md font-light">
              A curated exhibition of recent residential elevations, commercial showrooms, and executed site architecture across Tamil Nadu & India.
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 border border-studio-black text-studio-black text-xs uppercase tracking-architectural font-medium rounded-sm hover:bg-studio-black hover:text-white transition-all duration-300"
          >
            <span>View All ({projects.length} Works)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Editorial Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 pt-14">
          {featuredProjects.map((project, idx) => {
            // Apply asymmetric aspect ratios for editorial feel
            const aspect = idx === 0 || idx === 3 ? 'wide' : 'standard';
            return (
              <div 
                key={project.id} 
                className={idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''}
              >
                <ProjectCard
                  project={project}
                  onSelect={onSelectProject}
                  aspect={aspect}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 sm:p-12 rounded-sm bg-studio-charcoal text-canvas-light flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[11px] uppercase tracking-architectural text-canvas-muted block">
              Architectural Rigor
            </span>
            <h3 className="text-xl sm:text-2xl font-sans font-bold">
              Explore the Complete SANA Archive
            </h3>
            <p className="text-xs sm:text-sm text-canvas-stone/80 font-light max-w-xl">
              All 21 projects from the official portfolio—including the full Oviya Jewellers interior suite, Mr. Ranjith Residence, and completed execution site photography.
            </p>
          </div>
          <button
            onClick={onViewAll}
            className="px-6 py-3 bg-white text-studio-black text-xs uppercase tracking-architectural font-medium rounded-sm hover:bg-canvas-stone transition-colors flex-shrink-0"
          >
            Explore Complete Archive
          </button>
        </div>
      </div>
    </section>
  );
};
