import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedWorks } from '../components/home/FeaturedWorks';
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
  navigate
}) => {
  return (
    <div className="space-y-0">
      {/* 1. Immersive Hero Section */}
      <HeroSection
        onExplore={() => {
          const el = document.getElementById('selected-works');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onContact={() => navigate('/contact')}
      />

      {/* 2. Selected Works Editorial Section */}
      <FeaturedWorks
        projects={projects}
        onSelectProject={onSelectProject}
        onViewAll={() => navigate('/projects')}
      />

      {/* 3. Studio Profile & Rasipuram Ethos */}
      <StudioVignette
        onLearnMore={() => navigate('/about')}
      />

      {/* 4. Core Capabilities & Services */}
      <ServicesOverview
        onExploreServices={() => navigate('/services')}
        onContact={() => navigate('/contact')}
      />
    </div>
  );
};
