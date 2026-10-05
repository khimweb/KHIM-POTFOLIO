import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { Github, ExternalLink } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { ScrollReveal } from '../ui/ScrollReveal';
import { getProjects } from '../../services/api';
import { Project } from '../../types';

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  const filters = ['All', 'Client Project', 'Web', 'Spring Boot'];

  const filteredProjects = projects.filter(p => {
    if (filter === 'All') return true;
    return p.technologies.toLowerCase().includes(filter.toLowerCase()) || p.description.toLowerCase().includes(filter.toLowerCase()) || p.title.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal side="center">
          <SectionTitle 
            title="Featured & Client Projects" 
            subtitle="Real-world production platforms built for clients, alongside advanced software engineering architectures." 
          />
        </ScrollReveal>

        <ScrollReveal side="center" delay={0.08}>
          <div className="flex flex-wrap gap-4 mb-12">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filter === f 
                    ? 'bg-primary text-dark shadow-[0_0_15px_rgba(0,212,255,0.4)]' 
                    : 'glass text-gray-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              const cardSide: 'left' | 'right' = index % 2 === 0 ? 'left' : 'right';
              return (
                <ScrollReveal
                  key={project.id}
                  side={cardSide}
                  delay={(index % 3) * 0.09}
                  distance={80}
                  className="h-full"
                >
                  <motion.div
                    layout
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="h-full"
                  >
                    <Tilt options={{ max: 10, scale: 1.02, speed: 400 }} className="h-full">
                      <div className="glass h-full rounded-2xl overflow-hidden flex flex-col group border-white/5 hover:border-primary/30 transition-colors">
                    
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors z-10" />
                      <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      <div className="absolute top-4 right-4 z-20 flex gap-2">
                        {project.technologies.includes('Client Project') && (
                          <div className="px-3 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold rounded-full shadow-lg border border-purple-400/40">
                            Client Work
                          </div>
                        )}
                        {project.featured && !project.technologies.includes('Client Project') && (
                          <div className="px-3 py-1 bg-primary text-dark text-xs font-bold rounded-full shadow-lg">
                            Featured
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="text-xl font-bold text-white mb-2 font-space group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-6 flex-grow">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.split(',').map(tech => (
                          <span key={tech} className="text-xs font-medium px-2 py-1 bg-white/5 rounded text-gray-300">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-4 pt-4 border-t border-white/10">
                        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                          <Github size={16} /> Code
                        </a>
                        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors ml-auto">
                          <ExternalLink size={16} /> Live Demo
                        </a>
                      </div>
                    </div>
                  </div>
                </Tilt>
                  </motion.div>
                </ScrollReveal>
              );
          })}
        </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
