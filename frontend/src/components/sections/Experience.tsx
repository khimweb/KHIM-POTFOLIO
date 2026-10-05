import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { ScrollReveal } from '../ui/ScrollReveal';
import { GradientBorderCard } from '../ui/GradientBorderCard';
import { getExperiences } from '../../services/api';
import { Experience as ExpType } from '../../types';
import { Briefcase } from 'lucide-react';

export const Experience = () => {
  const [experiences, setExperiences] = useState<ExpType[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    getExperiences().then(setExperiences);
  }, []);

  return (
    <section id="experience" className="py-24 relative z-10 bg-black/20">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal side="center">
          <SectionTitle title="Experience" subtitle="My professional journey and internships." />
        </ScrollReveal>

        <div className="relative mt-16" ref={containerRef}>
          {/* Vertical Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 transform md:-translate-x-1/2">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary to-secondary origin-top"
              style={{ scaleY }}
            />
          </div>

          <div className="space-y-12 md:space-y-24">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div key={exp.id} className={`relative flex flex-col md:flex-row items-start ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-[20px] md:left-1/2 transform -translate-x-1/2 flex items-center justify-center mt-6">
                    <div className="w-10 h-10 rounded-full bg-dark border-2 border-primary flex items-center justify-center z-10 shadow-[0_0_15px_rgba(0,212,255,0.3)]">
                      <Briefcase size={16} className="text-primary" />
                    </div>
                  </div>

                  {/* Empty space for alignment */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Content Card */}
                  <ScrollReveal 
                    side={isLeft ? 'left' : 'right'}
                    distance={85}
                    delay={0.08}
                    className={`w-full md:w-1/2 pl-16 md:pl-12 ${isLeft ? 'md:pr-12 md:pl-0 text-left md:text-right' : ''}`}
                  >
                    <GradientBorderCard
                      color={index === 0 ? '#00D4FF' : index === 1 ? '#A855F7' : '#10B981'}
                      secondaryColor={index === 0 ? '#3B82F6' : index === 1 ? '#EC4899' : '#06B6D4'}
                      className="w-full"
                      innerClassName={`p-8 flex flex-col justify-between ${isLeft ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}`}
                    >
                      <div className={`flex flex-col ${isLeft ? 'md:items-end' : 'md:items-start'} mb-4`}>
                        <span className="text-primary font-space text-sm font-bold tracking-wider mb-2">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </span>
                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
                          {exp.position}
                        </h3>
                        <h4 className="text-lg text-gray-400 font-medium">{exp.company}</h4>
                      </div>
                      
                      <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        {exp.description}
                      </p>
                      
                      <div className={`flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : 'justify-start'}`}>
                        {exp.technologies.split(',').map(tech => (
                          <span key={tech} className="text-xs font-medium px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300 group-hover:border-primary/30 transition-colors">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    </GradientBorderCard>
                  </ScrollReveal>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
