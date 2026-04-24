import { Sparkles, Code2, Database, Globe, Cpu, GitBranch, Layout, Server, Gauge } from 'lucide-react';
import { motion } from 'framer-motion';

// Import available logos
import jsLogo from '../../assets/javascript.jpg';
import pythonLogo from '../../assets/python.png';
import nodeLogo from '../../assets/nodejs.jpg';
import expressLogo from '../../assets/express.jpg';
import reactLogo from '../../assets/react.jpg';
import mongoLogo from '../../assets/mongoDB.png';
import psqlLogo from '../../assets/postgresql.png';
import tailwindLogo from '../../assets/tailwindcss.jpg';
import cppLogo from '../../assets/c++.jpg';

const Skills = () => {
  // Top row - Focus on Languages & Core
  const row1 = [
    { name: "JavaScript", logo: jsLogo, color: "from-yellow-400/20 to-yellow-600/10", border: "border-yellow-500/20" },
    { name: "Python", logo: pythonLogo, color: "from-blue-400/20 to-blue-600/10", border: "border-blue-500/20" },
    { name: "SQL", icon: Database, color: "from-emerald-400/20 to-emerald-600/10", border: "border-emerald-500/20" },
    { name: "HTML/CSS", icon: Globe, color: "from-orange-400/20 to-orange-600/10", border: "border-orange-500/20" },
    { name: "C++", logo: cppLogo, color: "from-indigo-400/20 to-indigo-600/10", border: "border-indigo-500/20" },
    { name: "Git", icon: GitBranch, color: "from-red-400/20 to-red-600/10", border: "border-red-500/20" },
    { name: "TypeScript", icon: Code2, color: "from-blue-500/20 to-blue-700/10", border: "border-blue-600/20" },
  ];

  // Bottom row - Focus on Frameworks & Tools
  const row2 = [
    { name: "React", logo: reactLogo, color: "from-cyan-400/20 to-cyan-600/10", border: "border-cyan-500/20" },
    { name: "Next.js", icon: Layout, color: "from-slate-400/20 to-slate-600/10", border: "border-slate-500/20" },
    { name: "TailwindCSS", logo: tailwindLogo, color: "from-teal-400/20 to-teal-600/10", border: "border-teal-500/20" },
    { name: "Node.js", logo: nodeLogo, color: "from-green-400/20 to-green-600/10", border: "border-green-500/20" },
    { name: "Express", logo: expressLogo, color: "from-slate-300/20 to-slate-500/10", border: "border-slate-400/20" },
    { name: "PostgreSQL", logo: psqlLogo, color: "from-blue-500/20 to-blue-700/10", border: "border-blue-600/20" },
    { name: "MongoDB", logo: mongoLogo, color: "from-green-500/20 to-green-700/10", border: "border-green-600/20" },
    { name: "Vite", icon: Gauge, color: "from-purple-400/20 to-purple-600/10", border: "border-purple-500/20" },
  ];

  const SkillCard = ({ skill }) => (
    <div className={`flex items-center gap-4 px-6 py-4 rounded-2xl glass-panel group min-w-[200px] relative overflow-hidden transition-all duration-500 border ${skill.border} hover:border-indigo-300`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      <div className="w-10 h-10 flex items-center justify-center relative z-10">
        {skill.logo ? (
          <img src={skill.logo} alt={skill.name} className="w-9 h-9 object-contain rounded-lg group-hover:scale-110 transition-transform duration-500" />
        ) : (
          <skill.icon className="w-7 h-7 text-slate-500 group-hover:text-slate-900 transition-colors" />
        )}
      </div>
      <span className="text-lg font-bold text-slate-700 group-hover:text-slate-900 transition-colors relative z-10 uppercase tracking-wide">
        {skill.name}
      </span>
    </div>
  );

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Decorative center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#38bdf8]/15 rounded-full blur-[150px] pointer-events-none opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 mb-20 relative z-10">
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#38bdf8]" />
            <h2 className="text-xs font-bold tracking-[0.3em] text-[#0284c7] uppercase">Skills & Mastery</h2>
          </div>
          <h3 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
            My Technological <span className="text-gradient">Arsenal.</span>
          </h3>
          <p className="mt-6 text-slate-600 max-w-2xl text-lg font-medium leading-relaxed">
            I specialize in bridging the gap between <span className="text-[#38bdf8]">robust data engineering</span> and <span className="text-[#818cf8]">dynamic frontend experiences.</span>
          </p>
        </div>
      </div>

      <div className="relative space-y-8 flex flex-col items-center">
        {/* Row 1: Left moving */}
        <div className="w-full flex overflow-hidden mask-fade mask-x group">
          <motion.div 
            className="flex gap-8 py-4 px-4 whitespace-nowrap"
            animate={{ x: [0, -1920] }}
            transition={{ 
              x: { duration: 35, repeat: Infinity, ease: "linear" }
            }}
          >
            {[...row1, ...row1, ...row1].map((skill, idx) => (
              <SkillCard key={`r1-${idx}`} skill={skill} />
            ))}
          </motion.div>
        </div>

        {/* Row 2: Right moving */}
        <div className="w-full flex overflow-hidden mask-fade mask-x group">
          <motion.div 
            className="flex gap-8 py-4 px-4 whitespace-nowrap"
            animate={{ x: [-1920, 0] }}
            transition={{ 
              x: { duration: 40, repeat: Infinity, ease: "linear" }
            }}
          >
            {[...row2, ...row2, ...row2].map((skill, idx) => (
              <SkillCard key={`r2-${idx}`} skill={skill} />
            ))}
          </motion.div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .mask-fade {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}} />
    </section>
  );
};

export default Skills;

