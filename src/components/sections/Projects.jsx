import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

const ProjectCard = ({ title, description, tags, githubUrl, liveUrl }) => (
  <div className="group glass-panel rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-500">
    {/* Image Placeholder - Abstract representation of data/code */}
    <div className="aspect-video relative overflow-hidden flex items-center justify-center border-b border-slate-700/50 bg-slate-800/30">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] opacity-30 group-hover:opacity-60 transition-opacity duration-700 group-hover:scale-110"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
      <span className="text-slate-300 font-medium tracking-wide text-sm relative z-10 glass-panel px-4 py-2 rounded-full border-slate-600/50">Project Preview</span>
    </div>
    
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white group-hover:text-[#38bdf8] transition-colors">
          {title}
        </h3>
        <div className="flex gap-3">
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white hover:scale-110 transition-all bg-slate-800/50 p-2 rounded-lg border border-slate-700/50 hover:border-slate-500">
              <Github className="w-4 h-4" />
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#38bdf8] hover:scale-110 transition-all bg-slate-800/50 p-2 rounded-lg border border-slate-700/50 hover:border-[#38bdf8]/50">
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
      
      <p className="text-slate-400 text-sm leading-relaxed mb-6 h-10 line-clamp-2">{description}</p>
      
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-slate-800/50 text-[#818cf8] border border-[#818cf8]/20 group-hover:border-[#818cf8]/40 transition-colors">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const Projects = () => {
  const projectsData = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with Next.js, featuring server-side rendering, stripe integration, and a modern dashboard.",
      tags: ["Next.js", "TypeScript", "Tailwind", "Stripe"],
      githubUrl: "#",
      liveUrl: "#"
    },
    {
      title: "Task Management App",
      description: "Real-time task management application with drag-and-drop functionality, workspaces, and team collaboration features.",
      tags: ["React", "Node.js", "Socket.io", "MongoDB"],
      githubUrl: "#",
      liveUrl: "#"
    },
    {
      title: "AI Image Generator",
      description: "An interface for generating images using AI. Includes features for saving history, favoriting styles, and user authentication.",
      tags: ["Vue", "Firebase", "OpenAI API", "CSS"],
      githubUrl: "#",
      liveUrl: "#"
    }
  ];

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-[#38bdf8]"></span>
              <h2 className="text-xs font-bold tracking-[0.2em] text-[#38bdf8] uppercase">Featured Work</h2>
            </div>
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">Some things <span className="text-gradient">I've built.</span></h3>
          </div>
          <a href="#" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-slate-300 hover:text-white font-semibold text-sm group transition-all glass-panel hover:border-[#38bdf8]/50">
            View all projects
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#38bdf8]" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <a href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-slate-300 hover:text-white font-semibold text-sm group transition-all glass-panel hover:border-[#38bdf8]/50">
            View all projects
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#38bdf8]" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
