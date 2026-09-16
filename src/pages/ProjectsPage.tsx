import React, { useState, useMemo } from 'react';
import { Project, ProjectCategory } from '../types/project';
import { ProjectCard } from '../components/projects/ProjectCard';
import { Sparkles, SlidersHorizontal, CheckCircle2 } from 'lucide-react';

interface ProjectsPageProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ projects, onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showOnlyExecuted, setShowOnlyExecuted] = useState<boolean>(false);

  const categories: string[] = [
    'All',
    'Architecture & 3D Elevation',
    'Interior Design',
    'Commercial & Retail',
    'Completed Execution'
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCategory = 
        selectedCategory === 'All' 
          ? true 
          : p.category === selectedCategory;
      const matchExecuted = showOnlyExecuted ? p.isExecuted : true;
      return matchCategory && matchExecuted;
    });
  }, [projects, selectedCategory, showOnlyExecuted]);

  return (
    <div className="pt-28 sm:pt-36 pb-24 sm:pb-32 bg-canvas-light text-studio-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Page Header */}
        <div className="space-y-4 max-w-3xl pb-12 border-b border-canvas-stone">
          <div className="flex items-center gap-2 text-accent-terracotta text-xs uppercase tracking-architectural font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Project Archive</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-studio-black uppercase">
            Works & Portfolio
          </h1>
          <p className="text-sm sm:text-base text-studio-charcoal/80 font-light leading-relaxed">
            A comprehensive catalog of {projects.length} verified projects extracted directly from the SANA Architects portfolio. Encompassing residential elevations, luxury commercial showrooms, bespoke interiors, and physically completed site execution across Tamil Nadu.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-canvas-stone/60">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    if (cat === 'Completed Execution') setShowOnlyExecuted(false);
                  }}
                  className={`px-4 py-2 text-xs uppercase tracking-editorial font-medium rounded-full transition-all duration-300 flex-shrink-0 ${
                    isActive
                      ? 'bg-studio-black text-white shadow-sm'
                      : 'bg-canvas-off text-studio-concrete hover:text-studio-black hover:bg-canvas-stone'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Executed Site Quick Filter Toggle */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <button
              onClick={() => setShowOnlyExecuted(!showOnlyExecuted)}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all border ${
                showOnlyExecuted
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500/30'
                  : 'bg-white text-studio-concrete border-canvas-stone hover:text-studio-black'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Real Site Executions Only</span>
            </button>
            <span className="text-xs font-mono text-studio-concrete">
              ({filteredProjects.length})
            </span>
          </div>
        </div>

        {/* Portfolio Masonry / Asymmetric Grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <p className="text-base text-studio-concrete font-light">
              No projects found for the selected filter criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setShowOnlyExecuted(false);
              }}
              className="text-xs uppercase tracking-wider text-accent-terracotta underline font-medium"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 pt-12">
            {filteredProjects.map((project, idx) => {
              // Asymmetric editorial rhythm
              const isWide = idx % 5 === 0;
              return (
                <div 
                  key={project.id} 
                  className={isWide ? 'md:col-span-2 lg:col-span-2' : ''}
                >
                  <ProjectCard
                    project={project}
                    onSelect={onSelectProject}
                    aspect={isWide ? 'wide' : 'standard'}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
