import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PROJECTS_DATA } from './data/projectsData';
import { Project } from './types/project';

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const hash = window.location.hash.replace(/^#/, '');
    return hash || '/';
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(() => {
    const hash = window.location.hash.replace(/^#/, '');
    if (hash.startsWith('/projects/')) {
      const id = hash.replace('/projects/', '');
      return PROJECTS_DATA.find(p => p.id === id) || null;
    }
    return null;
  });

  // Listen to hash change for browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, '') || '/';
      setCurrentPath(hash);
      if (hash.startsWith('/projects/')) {
        const id = hash.replace('/projects/', '');
        const found = PROJECTS_DATA.find(p => p.id === id);
        setSelectedProject(found || null);
      } else {
        setSelectedProject(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
    if (path.startsWith('/projects/')) {
      const id = path.replace('/projects/', '');
      const found = PROJECTS_DATA.find(p => p.id === id);
      setSelectedProject(found || null);
    } else {
      setSelectedProject(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (project: Project) => {
    navigate(`/projects/${project.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas-light text-studio-black selection:bg-studio-black selection:text-canvas-light">
      <Navbar currentPath={currentPath} navigate={navigate} />

      <main className="flex-1">
        {selectedProject ? (
          <ProjectDetailPage
            project={selectedProject}
            allProjects={PROJECTS_DATA}
            onBack={() => navigate('/projects')}
            onSelectProject={handleSelectProject}
          />
        ) : currentPath === '/' ? (
          <HomePage
            projects={PROJECTS_DATA}
            onSelectProject={handleSelectProject}
            navigate={navigate}
          />
        ) : currentPath === '/projects' ? (
          <ProjectsPage
            projects={PROJECTS_DATA}
            onSelectProject={handleSelectProject}
          />
        ) : currentPath === '/about' ? (
          <AboutPage navigate={navigate} />
        ) : currentPath === '/services' ? (
          <ServicesPage navigate={navigate} />
        ) : currentPath === '/contact' ? (
          <ContactPage />
        ) : (
          <NotFoundPage navigate={navigate} />
        )}
      </main>

      <Footer navigate={navigate} />
    </div>
  );
}

export default App;
