import { ExternalLink, Github, ArrowUpRight, Sparkles, Code, Database, Layout } from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectCard = ({ title, description, tags, githubUrl, liveUrl, icon: Icon, color }) => (
  <motion.div 
    variants={{
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    }}
    className="group relative"
  >
    <div className={`absolute -inset-0.5 bg-gradient-to-r ${color} rounded-3xl blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200`}></div>
    
    <div className="relative glass-panel rounded-3xl overflow-hidden h-full flex flex-col bg-[#0f172a]/80 backdrop-blur-xl border border-white/5 group-hover:border-white/20 transition-all duration-500">
      {/* Decorative Header */}
      <div className="h-48 relative overflow-hidden flex items-center justify-center border-b border-white/5 bg-slate-900/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_70%)] group-hover:scale-150 transition-transform duration-1000"></div>
        <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="relative z-10 w-24 h-24 rounded-2xl bg-slate-800/80 border border-white/10 flex items-center justify-center shadow-2xl group-hover:shadow-[#38bdf8]/20 transition-all"
        >
          <Icon className="w-12 h-12 text-[#38bdf8] drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
        </motion.div>
      </div>
      
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-black text-white group-hover:text-[#38bdf8] transition-colors tracking-tight">
            {title}
          </h3>
          <div className="flex gap-2">
            {githubUrl && (
              <motion.a 
                whileHover={{ y: -3 }}
                href={githubUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-400 hover:text-white p-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 transition-all"
                title="View Source"
              >
                <Github className="w-5 h-5" />
              </motion.a>
            )}
            {liveUrl && (
              <motion.a 
                whileHover={{ y: -3 }}
                href={liveUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-400 hover:text-[#38bdf8] p-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#38bdf8]/30 transition-all"
                title="Live Demo"
              >
                <ExternalLink className="w-5 h-5" />
              </motion.a>
            )}
          </div>
        </div>
        
        <p className="text-slate-400 text-base leading-relaxed mb-8 flex-1 font-medium">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
          {tags.map(tag => (
            <span key={tag} className="text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-lg bg-slate-800/50 text-[#818cf8] border border-[#818cf8]/10 group-hover:border-[#818cf8]/30 transition-all">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

const Projects = () => {
  const projectsData = [
    {
      title: "PetCare-System",
      description: "A comprehensive management system for 10 pet care centers. Features booking, medical records, e-commerce, and loyalty programs.",
      tags: ["React", "Node.js", "MongoDB", "Auth", "Zustand"],
      githubUrl: "https://github.com/Caubeamap/PetCare-System",
      liveUrl: "#",
      icon: Database,
      color: "from-blue-500 via-cyan-400 to-indigo-500"
    },
    {
      title: "Job-Search Tool",
      description: "A collaborative career networking platform built for Software Engineering studies. Connects candidates with tailored opportunities efficiently.",
      tags: ["JavaScript", "HTML5", "CSS3", "API", "UI/UX"],
      githubUrl: "https://github.com/Caubeamap/Job-Search",
      liveUrl: "#",
      icon: Layout,
      color: "from-emerald-500 via-teal-400 to-cyan-500"
    },
    {
      title: "Teiv Universe",
      description: "A high-end personal portfolio featuring Matter.js physics, Framer Motion animations, and a futuristic data-driven aesthetic.",
      tags: ["React", "Vite", "Tailwind", "Framer Motion", "Physics"],
      githubUrl: "https://github.com/Caubeamap/Portfolio_Teiv",
      liveUrl: "https://caubeamap.github.io/Portfolio_Teiv/", // Guessed or actual
      icon: Code,
      color: "from-purple-500 via-violet-400 to-blue-500"
    }
  ];

  return (
    <section id="projects" className="py-32 relative overflow-hidden bg-[#020617]">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[1000px] bg-[radial-gradient(circle_at_10%_20%,rgba(56,189,248,0.03),transparent_50%)] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-full h-[1000px] bg-[radial-gradient(circle_at_90%_80%,rgba(129,140,248,0.03),transparent_50%)] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-[#38bdf8]"></div>
              <h2 className="text-xs font-bold tracking-[0.5em] text-[#38bdf8] uppercase">Selected Works</h2>
            </div>
            <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
              Building the <span className="text-gradient">Digital.</span>
            </h3>
          </motion.div>
          
          <motion.a 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            href="https://github.com/Caubeamap" 
            target="_blank"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-sm bg-white/5 border border-white/10 hover:border-[#38bdf8]/50 hover:bg-[#38bdf8]/5 transition-all group backdrop-blur-md"
          >
            <span>VIEW GITHUB ECOSYSTEM</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-[#38bdf8]" />
          </motion.a>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } }
          }}
          className="grid lg:grid-cols-3 gap-10"
        >
          {projectsData.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </motion.div>
        
        {/* Subtle Decorative Line */}
        <div className="mt-32 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>
    </section>
  );
};

export default Projects;

