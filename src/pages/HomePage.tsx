import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedWorks } from '../components/home/FeaturedWorks';
import { ElevationComparisonWidget } from '../components/home/ElevationComparisonWidget';
import { PracticeLifecycleWidget } from '../components/home/PracticeLifecycleWidget';
import { StudioMetricsBeam } from '../components/home/StudioMetricsBeam';
import { StudioVignette } from '../components/home/StudioVignette';
import { ServicesOverview } from '../components/home/ServicesOverview';
import { Project } from '../types/project';

interface HomePageProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  navigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  projects,
  onSelectProject,
  navigate,
}) => {
  return (
    <div className="space-y-0">
      {/* 1. Monumental Architectural Hero Stage (SANA ARCHITECTS + Ethos & Le Corbusier Quote) */}
      <HeroSection
        onExplore={() => {
          const el = document.getElementById('selected-works');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onContact={() => navigate('/contact')}
      />

      {/* 2. Kinetic Studio Scale & Archive Metrics Beam */}
      <StudioMetricsBeam />

      {/* 3. Selected Works Editorial Section (Enhanced with 3D Perspective Tilt Cards) */}
      <FeaturedWorks
        projects={projects}
        onSelectProject={onSelectProject}
        onViewAll={() => navigate('/projects')}
      />

      {/* 4. Interactive "3D Render <-> Real Site Execution" Split Comparison Widget */}
      <ElevationComparisonWidget />

      {/* 5. Automated 5-Stage Practice Lifecycle Flow */}
      <PracticeLifecycleWidget
        onStartProject={() => navigate('/contact')}
      />

      {/* 6. Studio Profile & Rasipuram Ethos */}
      <StudioVignette
        onLearnMore={() => navigate('/about')}
      />

      {/* 7. Core Capabilities & Services */}
      <ServicesOverview
        onExploreServices={() => navigate('/services')}
        onContact={() => navigate('/contact')}
      />
    </div>
  );
};
