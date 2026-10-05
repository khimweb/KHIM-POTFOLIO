import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { getSkills } from '../../services/api';
import { Skill } from '../../types';
import { TechIcon } from '../ui/TechIcon';
import { Code2, Layers, Cpu, Database, Sparkles, X, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { scrollToSection } from '../../hooks/useLenis';
import { ScrollReveal } from '../ui/ScrollReveal';
import { GradientBorderCard } from '../ui/GradientBorderCard';
import { GradientBorderButton } from '../ui/GradientBorderButton';

interface Ripple {
  id: number;
  x: number;
  y: number;
  color: string;
}

const skillDescriptions: Record<string, { summary: string; tags: string[]; experience: string }> = {
  'Java': {
    summary: 'Enterprise backend development with OOP architecture, memory management, and robust Spring ecosystems.',
    tags: ['Spring Boot', 'Hibernate', 'OOP', 'JPA'],
    experience: '3+ Years Academic & Projects',
  },
  'Python': {
    summary: 'Data processing, scripting, automated workflows, and high-speed API development.',
    tags: ['FastAPI', 'Automation', 'Data Structures', 'Scripting'],
    experience: '2+ Years',
  },
  'JavaScript/TypeScript': {
    summary: 'Modern full-stack web engineering with type-safe design, ESNext patterns, and reactive state.',
    tags: ['TypeScript', 'ES6+', 'Async/Await', 'Type Safety'],
    experience: '3+ Years Production',
  },
  'C++': {
    summary: 'Low-level systems programming, data structures, algorithm design, and pointer arithmetic.',
    tags: ['Algorithms', 'Data Structures', 'Memory Optimization'],
    experience: '2 Years Academic',
  },
  'SQL': {
    summary: 'Relational database schema modeling, complex query joins, indexing, and transactional integrity.',
    tags: ['Schema Design', 'Queries', 'Indexing', 'Transactions'],
    experience: '3+ Years',
  },
  'Spring Boot': {
    summary: 'Enterprise-grade RESTful APIs, Spring Data JPA, SQLite/MySQL persistence, and secure architecture.',
    tags: ['REST API', 'Spring Data', 'Actuator', 'Security'],
    experience: 'Core Backend Focus',
  },
  'React': {
    summary: 'Component-driven interactive SPAs, hooks, custom state management, Three.js 3D canvas, and animations.',
    tags: ['React 18', 'Hooks', 'Three.js', 'Framer Motion'],
    experience: 'Core Frontend Focus',
  },
  'Node.js': {
    summary: 'Asynchronous event-driven backend services, Express routing, and full-stack integrations.',
    tags: ['Express', 'REST API', 'NPM', 'Event Loop'],
    experience: '2+ Years',
  },
  'FastAPI': {
    summary: 'High-performance asynchronous Python REST services with automatic OpenAPI Swagger documentation.',
    tags: ['AsyncIO', 'Pydantic', 'Swagger', 'REST'],
    experience: '1+ Years',
  },
  'Git': {
    summary: 'Distributed version control, branching strategies, collaborative workflows, and merge conflict resolution.',
    tags: ['GitHub', 'Git Flow', 'Rebase', 'Version Control'],
    experience: 'Daily Workflow',
  },
  'Docker': {
    summary: 'Application containerization, reproducible multi-stage builds, and deployment standardization.',
    tags: ['Containers', 'Dockerfiles', 'Microservices', 'Deployment'],
    experience: '2 Years',
  },
  'AWS': {
    summary: 'Cloud infrastructure, asset hosting with S3, deployment configuration, and scalable services.',
    tags: ['S3', 'EC2', 'Cloud Deployment'],
    experience: '1+ Years',
  },
  'Figma': {
    summary: 'Interactive UI/UX design, modern dark-mode aesthetic, design systems, and responsive wireframing.',
    tags: ['UI/UX', 'Design Systems', 'Wireframing', 'Prototyping'],
    experience: 'Design & Prototyping',
  },
  'MySQL': {
    summary: 'ACID-compliant relational database management, performance tuning, and foreign key relations.',
    tags: ['Relational DBMS', 'Transactions', 'Normalization'],
    experience: '2+ Years',
  },
  'PostgreSQL': {
    summary: 'Advanced open-source relational database with robust data integrity, JSONB support, and indexing.',
    tags: ['PostgreSQL', 'Complex Queries', 'Data Integrity'],
    experience: '2 Years',
  },
  'MongoDB': {
    summary: 'Document-oriented NoSQL storage for flexible unstructured JSON data and fast query performance.',
    tags: ['NoSQL', 'Mongoose', 'Aggregations', 'Documents'],
    experience: '2 Years',
  },
  'SQLite': {
    summary: 'Lightweight zero-configuration serverless database powering this portfolio with Hibernate SQLite dialect.',
    tags: ['Serverless', 'Embedded', 'Zero-config', 'Fast'],
    experience: 'Embedded Systems',
  },
};

const categoryMeta = {
  LANGUAGE: {
    title: 'Languages',
    icon: <Code2 className="w-5 h-5 text-cyan-400" />,
    gradient: 'from-cyan-500/20 to-blue-500/10',
    border: 'hover:border-cyan-400/40',
    color: '#00D4FF',
    secondaryColor: '#3B82F6',
  },
  FRAMEWORK: {
    title: 'Frameworks',
    icon: <Layers className="w-5 h-5 text-purple-400" />,
    gradient: 'from-purple-500/20 to-indigo-500/10',
    border: 'hover:border-purple-400/40',
    color: '#A855F7',
    secondaryColor: '#EC4899',
  },
  TOOL: {
    title: 'Tools & DevOps',
    icon: <Cpu className="w-5 h-5 text-emerald-400" />,
    gradient: 'from-emerald-500/20 to-teal-500/10',
    border: 'hover:border-emerald-400/40',
    color: '#10B981',
    secondaryColor: '#06B6D4',
  },
  DATABASE: {
    title: 'Databases',
    icon: <Database className="w-5 h-5 text-amber-400" />,
    gradient: 'from-amber-500/20 to-orange-500/10',
    border: 'hover:border-amber-400/40',
    color: '#F59E0B',
    secondaryColor: '#EF4444',
  },
};

export const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    getSkills().then(setSkills);
  }, []);

  const triggerRipple = (e: React.MouseEvent<HTMLElement>, color = '#00D4FF') => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now() + Math.random();

    setRipples((prev) => [...prev.slice(-3), { id, x, y, color }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 700);
  };

  const handleSkillClick = (skill: Skill, e: React.MouseEvent<HTMLElement>) => {
    triggerRipple(e, categoryMeta[skill.category]?.color || '#00D4FF');
    setSelectedSkill(selectedSkill?.id === skill.id ? null : skill);
  };

  const categories = ['LANGUAGE', 'FRAMEWORK', 'TOOL', 'DATABASE'] as const;

  const filterCategories = [
    { key: 'ALL', label: 'All Skills', count: skills.length },
    { key: 'LANGUAGE', label: 'Languages', count: skills.filter((s) => s.category === 'LANGUAGE').length },
    { key: 'FRAMEWORK', label: 'Frameworks', count: skills.filter((s) => s.category === 'FRAMEWORK').length },
    { key: 'TOOL', label: 'Tools', count: skills.filter((s) => s.category === 'TOOL').length },
    { key: 'DATABASE', label: 'Databases', count: skills.filter((s) => s.category === 'DATABASE').length },
  ];

  const visibleCategories =
    selectedCategory === 'ALL'
      ? categories
      : categories.filter((c) => c === selectedCategory);

  return (
    <section id="skills" className="py-28 relative z-10 overflow-hidden">
      {/* Background ambient neon glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <ScrollReveal side="center">
          <SectionTitle
            title="Skills & Technologies"
            subtitle="Explore the languages, frameworks, cloud tools, and databases I leverage to craft performant platforms."
          />
        </ScrollReveal>

        {/* Filter Navigation Tabs */}
        <ScrollReveal side="center" delay={0.08}>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-10 mb-12">
            {filterCategories.map((tab) => {
              const isActive = selectedCategory === tab.key;
              return (
                <GradientBorderButton
                  key={tab.key}
                  label={tab.label}
                  count={tab.count}
                  isActive={isActive}
                  layoutId="activeSkillCategoryPill"
                  onClick={() => setSelectedCategory(tab.key)}
                />
              );
            })}
          </div>
        </ScrollReveal>

        {/* Categories Grid with Smooth Layout Animations */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          <AnimatePresence mode="popLayout">
            {visibleCategories.map((category, index) => {
              const categorySkills = skills.filter((s) => s.category === category);
              if (categorySkills.length === 0) return null;

              const meta = categoryMeta[category];
              const cardSide: 'left' | 'right' = index < 2 ? 'left' : 'right';
              const cardDelay = (index % 2) * 0.1;

              return (
                <ScrollReveal
                  key={category}
                  side={cardSide}
                  delay={cardDelay}
                  distance={85}
                  className="h-full flex flex-col"
                >
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.92, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: -20 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full"
                  >
                    <GradientBorderCard
                      color={meta.color}
                      secondaryColor={meta.secondaryColor}
                      className="h-full"
                    >
                      {/* Subtle card top gradient accent */}
                      <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${meta.gradient}`} />

                      <div>
                        {/* Category Header */}
                        <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/5">
                          <div className="flex items-center gap-2.5">
                            <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                              {meta.icon}
                            </div>
                            <h3 className="text-base font-bold text-white font-space tracking-wide">
                              {meta.title}
                            </h3>
                          </div>
                          <span className="text-[11px] font-medium text-gray-400 px-2 py-0.5 rounded-full bg-white/5 border border-white/5">
                            {categorySkills.length} Tech
                          </span>
                        </div>

                        {/* Skill Badges inside Card */}
                        <div className="flex flex-wrap gap-2.5">
                          {categorySkills.map((skill) => {
                            const isSelected = selectedSkill?.id === skill.id;

                            return (
                              <motion.button
                                key={skill.id}
                                onClick={(e) => handleSkillClick(skill, e)}
                                whileHover={{ scale: 1.07, y: -2 }}
                                whileTap={{ scale: 0.93 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                                className={`relative px-3 py-2 rounded-xl border flex items-center gap-2 text-left cursor-pointer transition-all duration-200 select-none overflow-hidden ${
                                  isSelected
                                    ? 'bg-primary/25 border-primary shadow-[0_0_20px_rgba(0,212,255,0.45)] text-white'
                                    : 'bg-white/[0.04] border-white/10 hover:border-primary/40 hover:bg-white/[0.08] text-gray-300 hover:text-white shadow-sm'
                                }`}
                              >
                                {/* Crisp Authentic Vector SVG Brand Icon */}
                                <TechIcon name={skill.name} size={18} className="shrink-0" />

                                <span className="text-xs font-semibold font-space tracking-tight">
                                  {skill.name}
                                </span>

                                {/* Mini Proficiency Dot / Ring */}
                                <span
                                  className="w-1.5 h-1.5 rounded-full shrink-0"
                                  style={{
                                    backgroundColor: isSelected ? '#00D4FF' : 'rgba(255,255,255,0.3)',
                                    boxShadow: isSelected ? '0 0 8px #00D4FF' : 'none',
                                  }}
                                />
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Card Footer Hint */}
                      <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500">
                        <span>Click any skill to inspect</span>
                        <Sparkles size={12} className="text-primary/70" />
                      </div>
                    </GradientBorderCard>
                  </motion.div>
              </ScrollReveal>
            );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Interactive Selected Skill Spotlight Card */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 rounded-2xl glass border border-primary/40 p-6 md:p-8 shadow-[0_0_40px_rgba(0,212,255,0.25)] relative overflow-hidden"
            >
              {/* Glowing Background Radial */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-primary/15 via-secondary/10 to-transparent rounded-full blur-2xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedSkill(null)}
                className="absolute top-4 right-4 p-2 rounded-full glass border border-white/10 text-gray-400 hover:text-white hover:border-primary/40 transition-colors cursor-pointer"
                aria-label="Close details"
              >
                <X size={18} />
              </button>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                {/* Tech Icon & Name Header */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl glass border border-primary/50 flex items-center justify-center p-3 shadow-[0_0_25px_rgba(0,212,255,0.4)]">
                    <TechIcon name={selectedSkill.name} size={36} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs uppercase tracking-widest font-semibold text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/30">
                        {selectedSkill.category}
                      </span>
                      <span className="text-xs text-gray-400">
                        {skillDescriptions[selectedSkill.name]?.experience || 'Production Ready'}
                      </span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-white font-space">
                      {selectedSkill.name}
                    </h3>
                  </div>
                </div>

                {/* Animated Proficiency Bar */}
                <div className="w-full md:w-80">
                  <div className="flex justify-between items-center text-xs font-semibold mb-2">
                    <span className="text-gray-300 flex items-center gap-1.5">
                      <Zap size={14} className="text-primary fill-primary" /> Mastery Level
                    </span>
                    <span className="text-primary font-space font-bold text-sm">
                      {selectedSkill.proficiency}%
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden p-0.5 border border-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedSkill.proficiency}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-primary via-purple-500 to-cyan-300 shadow-[0_0_12px_#00D4FF]"
                    />
                  </div>
                </div>
              </div>

              {/* Description & Tags */}
              <div className="mt-6 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <p className="text-gray-300 text-sm md:text-base max-w-2xl leading-relaxed">
                  {skillDescriptions[selectedSkill.name]?.summary ||
                    `Utilized in high-performance production workflows with clean patterns and optimized performance.`}
                </p>

                {/* Action button to view relevant projects */}
                <motion.button
                  onClick={() => scrollToSection('#projects', 1.4)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(0,212,255,0.4)] cursor-pointer shrink-0"
                >
                  <span>Explore Projects</span>
                  <ArrowRight size={14} />
                </motion.button>
              </div>

              {/* Tag Badges */}
              {skillDescriptions[selectedSkill.name]?.tags && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {skillDescriptions[selectedSkill.name]?.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300 flex items-center gap-1"
                    >
                      <CheckCircle2 size={12} className="text-emerald-400" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Click Shockwave Ripples */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.85 }}
          animate={{ scale: 4.5, opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="fixed rounded-full pointer-events-none blur-sm -z-10"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 24,
            height: 24,
            background: `radial-gradient(circle, ${ripple.color} 0%, rgba(168,85,247,0.4) 60%, transparent 100%)`,
          }}
        />
      ))}
    </section>
  );
};

