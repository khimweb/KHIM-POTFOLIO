import { GraduationCap, Award, BookOpen } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { ScrollReveal } from '../ui/ScrollReveal';

export const Education = () => {
  return (
    <section id="education" className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal side="center">
          <SectionTitle title="Education & Certifications" subtitle="Academic foundation and continuous technical certifications." />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          
          {/* LEFT ITEM — Glides from LEFT */}
          <ScrollReveal side="left" distance={90}>
            <div className="glass p-8 rounded-3xl border-primary/30 relative overflow-hidden group shadow-[0_0_30px_rgba(0,212,255,0.1)] h-full">
              <div className="absolute top-0 right-0 w-36 h-36 bg-primary/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-13 h-13 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary p-3">
                  <GraduationCap size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white font-space">B.S. Software Engineering</h3>
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
            </div>
          </ScrollReveal>

          {/* RIGHT ITEM — Glides from RIGHT */}
          <ScrollReveal side="right" distance={90} delay={0.12}>
            <div className="h-full">
              <h3 className="text-2xl font-bold text-white mb-6 font-space flex items-center gap-3">
                <Award className="text-secondary" /> Certifications & Achievements
              </h3>
              
              <div className="space-y-4">
                {[
                  { title: "Advanced Software Engineering Principles", issuer: "BELTEI International University", date: "2024", badge: "Academic" },
                  { title: "Full Stack Web Development & Microservices", issuer: "Client Systems Engineering", date: "2024", badge: "Professional" },
                  { title: "Production Application Deployment & DevOps", issuer: "Cloud Platforms (Render/Vercel)", date: "2023", badge: "Certified" },
                  { title: "Interactive 3D Graphics & WebGL Systems", issuer: "Three.js & Modern UI Architecture", date: "2023", badge: "Specialist" }
                ].map((cert, i) => (
                  <div key={i} className="glass p-5 rounded-2xl hover:border-secondary/40 transition-all border-white/5 group">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-base font-bold text-white group-hover:text-primary transition-colors">{cert.title}</h4>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-secondary/15 text-secondary border border-secondary/30">
                        {cert.badge}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                      <span>{cert.issuer}</span>
                      <span className="text-primary font-semibold">{cert.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};
