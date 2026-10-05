import { GraduationCap, Award, BookOpen } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { ScrollReveal } from '../ui/ScrollReveal';
import { GradientBorderCard } from '../ui/GradientBorderCard';

export const Education = () => {
  return (
    <section id="education" className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal side="center">
          <SectionTitle title="Education & Certifications" subtitle="Academic foundation and continuous technical certifications." />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          
          {/* LEFT ITEM — Degree Card */}
          <ScrollReveal side="left" distance={90} className="h-full">
            <GradientBorderCard
              color="#00D4FF"
              secondaryColor="#A855F7"
              className="h-full"
              innerClassName="p-8 h-full flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-primary/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110 pointer-events-none" />
              
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-13 h-13 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary p-3">
                    <GraduationCap size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white font-space group-hover:text-primary transition-colors">
                      B.S. Software Engineering
                    </h3>
                    <p className="text-primary font-medium text-sm">BELTEI International University</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-gray-300">
                      Year 3 · Semester 2
                    </span>
                    <span className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-xs font-semibold text-primary">
                      Advance Skill Major
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Specializing in full-stack architecture, software modeling, 3D web engines, and scalable distributed databases. Combining classroom excellence with active production client platform delivery.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-white text-sm font-semibold mb-3 flex items-center gap-2">
                  <BookOpen size={16} className="text-primary" /> Key Academic Disciplines:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Data Structures & Algorithms', 'Modern Web Architecture', 'Object-Oriented Programming (Java)', 'Relational Databases (SQL/SQLite)', 'Cloud Services & APIs', 'Software Project Management'].map(course => (
                    <span key={course} className="text-xs px-3 py-1.5 glass rounded-lg text-gray-300 border border-white/5 hover:border-primary/40 transition-colors">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </GradientBorderCard>
          </ScrollReveal>

          {/* RIGHT ITEM — Certifications */}
          <ScrollReveal side="right" distance={90} delay={0.12} className="h-full">
            <div className="h-full flex flex-col justify-between">
              <h3 className="text-2xl font-bold text-white mb-6 font-space flex items-center gap-3">
                <Award className="text-secondary" /> Certifications &amp; Achievements
              </h3>
              
              <div className="space-y-4 flex-grow flex flex-col justify-between">
                {[
                  {
                    title: "Advanced Software Engineering Principles",
                    issuer: "BELTEI International University",
                    date: "2024",
                    badge: "Academic",
                    color: "#00D4FF",
                    secondaryColor: "#3B82F6",
                    badgeColor: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
                  },
                  {
                    title: "Full Stack Web Development & Microservices",
                    issuer: "Client Systems Engineering",
                    date: "2024",
                    badge: "Professional",
                    color: "#A855F7",
                    secondaryColor: "#EC4899",
                    badgeColor: "bg-purple-500/15 text-purple-400 border-purple-500/30",
                  },
                  {
                    title: "Production Application Deployment & DevOps",
                    issuer: "Cloud Platforms (Render/Vercel)",
                    date: "2023",
                    badge: "Certified",
                    color: "#10B981",
                    secondaryColor: "#06B6D4",
                    badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
                  },
                  {
                    title: "Interactive 3D Graphics & WebGL Systems",
                    issuer: "Three.js & Modern UI Architecture",
                    date: "2023",
                    badge: "Specialist",
                    color: "#F59E0B",
                    secondaryColor: "#A855F7",
                    badgeColor: "bg-amber-500/15 text-amber-400 border-amber-500/30",
                  },
                ].map((cert, i) => (
                  <GradientBorderCard
                    key={i}
                    color={cert.color}
                    secondaryColor={cert.secondaryColor}
                    className="w-full"
                    innerClassName="p-5 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-1 gap-2">
                      <h4 className="text-base font-bold text-white group-hover:text-primary transition-colors">
                        {cert.title}
                      </h4>
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border shrink-0 ${cert.badgeColor}`}>
                        {cert.badge}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                      <span>{cert.issuer}</span>
                      <span className="text-primary font-semibold">{cert.date}</span>
                    </div>
                  </GradientBorderCard>
                ))}
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};
