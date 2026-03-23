import { Sparkles } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Languages",
      skills: ["JavaScript", "TypeScript", "Python", "SQL", "HTML/CSS"]
    },
    {
      title: "Frontend",
      skills: ["React", "Next.js", "TailwindCSS", "Redux", "Framer Motion"]
    },
    {
      title: "Backend & DB",
      skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs"]
    },
    {
      title: "Tools & DevOps",
      skills: ["Git", "Docker", "CI/CD", "Vite", "Linux"]
    }
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#38bdf8]/5 rounded-full blur-[100px] pointer-events-none transform -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#38bdf8]" />
            <h2 className="text-xs font-bold tracking-[0.2em] text-[#38bdf8] uppercase">Skills & Expertise</h2>
          </div>
          <h3 className="text-4xl md:text-5xl font-black text-white max-w-xl tracking-tight">
            Tools for <span className="text-gradient">creation.</span>
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {skillCategories.map((category, index) => (
            <div key={index} className="space-y-6">
              <h4 className="text-xl font-bold text-white border-b border-slate-700/50 pb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#38bdf8] shadow-[0_0_10px_rgba(56,189,248,0.8)]"></span>
                {category.title}
              </h4>
              <div className="flex flex-wrap gap-3">
                {category.skills.map(skill => (
                  <span
                    key={skill}
                    className="px-4 py-2 glass-panel rounded-full text-sm font-medium text-slate-300 transition-all duration-300 hover:text-white hover:-translate-y-1 hover:border-[#38bdf8]/50 hover:shadow-[0_0_15px_rgba(56,189,248,0.2)] cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
