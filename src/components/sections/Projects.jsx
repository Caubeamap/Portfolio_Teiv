import { ExternalLink, Github } from 'lucide-react';

const ProjectCard = ({ title, description, tags, githubUrl, liveUrl }) => (
  <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
    {/* Image Placeholder */}
    <div className="aspect-video bg-gray-50 relative overflow-hidden flex items-center justify-center border-b border-gray-100">
      <span className="text-gray-300 font-medium tracking-wide text-sm">Project Preview</span>
    </div>
    
    <div className="p-6">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold text-[#111827] group-hover:text-slate-700 transition-colors">
          {title}
        </h3>
        <div className="flex gap-2.5">
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#111827] transition-colors">
              <Github className="w-4.5 h-4.5" />
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#111827] transition-colors">
              <ExternalLink className="w-4.5 h-4.5" />
            </a>
          )}
        </div>
      </div>
      
      <p className="text-gray-500 text-sm leading-relaxed mb-4">{description}</p>
      
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-50 text-gray-500 border border-gray-100">
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
    <section id="projects" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase mb-3">Featured Work</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-50">Some things I've built.</h3>
          </div>
          <a href="#" className="hidden md:inline-flex items-center text-slate-400 hover:text-white font-medium text-sm group transition-colors">
            View all
            <ExternalLink className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
