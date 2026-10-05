import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { Github, ExternalLink } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { ScrollReveal } from '../ui/ScrollReveal';
import { GradientBorderCard } from '../ui/GradientBorderCard';
import { GradientBorderButton } from '../ui/GradientBorderButton';
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
    return (
      p.technologies.toLowerCase().includes(filter.toLowerCase()) ||
      p.description.toLowerCase().includes(filter.toLowerCase()) ||
      p.title.toLowerCase().includes(filter.toLowerCase())
    );
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

        {/* Filter Navigation Menu */}
        <ScrollReveal side="center" delay={0.08}>
          <div className="flex flex-wrap items-center gap-3.5 mb-12">
            {filters.map((f) => {
              const isClientFilter = f === 'Client Project';
              return (
                <GradientBorderButton
                  key={f}
                  label={f}
                  isActive={filter === f}
                  layoutId="activeProjectFilterPill"
                  onClick={() => setFilter(f)}
                  color={isClientFilter ? '#A855F7' : '#00D4FF'}
                  secondaryColor={isClientFilter ? '#3B82F6' : '#A855F7'}
                />
              );
            })}
          </div>
        </ScrollReveal>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              const cardSide: 'left' | 'right' = index % 2 === 0 ? 'left' : 'right';
              const isClientWork = project.technologies.includes('Client Project');

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
                      <GradientBorderCard
                        color={isClientWork ? '#A855F7' : '#00D4FF'}
                        secondaryColor={isClientWork ? '#3B82F6' : '#A855F7'}
                        className="h-full"
                        innerClassName="h-full p-0 flex flex-col"
                      >
                        <div className="relative h-48 overflow-hidden rounded-t-[14px]">
                          <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors z-10" />
                          <img 
                            src={project.imageUrl} 
                            alt={project.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                          />
                          
                          <div className="absolute top-4 right-4 z-20 flex gap-2">
                            {isClientWork && (
                              <div className="px-3 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold rounded-full shadow-lg border border-purple-400/40">
                                Client Work
                              </div>
                            )}
                            {project.featured && !isClientWork && (
                              <div className="px-3 py-1 bg-primary text-dark text-xs font-bold rounded-full shadow-lg">
                                Featured
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="p-6 flex-grow flex flex-col justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-2 font-space group-hover:text-primary transition-colors">
                              {project.title}
                            </h3>
                            <p className="text-gray-400 text-sm mb-6">
                              {project.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-2 mb-6">
                              {project.technologies.split(',').map(tech => (
                                <span key={tech} className="text-xs font-medium px-2 py-1 bg-white/5 rounded text-gray-300">
                                  {tech.trim()}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-4 pt-4 border-t border-white/10 mt-auto">
                            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                              <Github size={16} /> Code
                            </a>
                            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors ml-auto">
                              <ExternalLink size={16} /> Live Demo
                            </a>
                          </div>
                        </div>
                      </GradientBorderCard>
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
