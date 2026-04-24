import { Github, Linkedin, Mail, Heart, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative border-t border-slate-800/50 py-12 overflow-hidden">
      {/* Subtle glow on top edge */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#38bdf8]/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              Việt <span className="text-gradient">Hoàng.</span>
            </span>
            <p className="text-slate-400 mt-2 text-sm flex items-center justify-center md:justify-start gap-1.5">
              Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" /> & TailwindCSS
            </p>
          </div>
          
          <div className="flex gap-4">
            <a
              href="https://github.com/Caubeamap"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-11 h-11 rounded-full glass-panel flex items-center justify-center text-slate-500 hover:text-[#0284c7] hover:bg-[#38bdf8]/10 hover:border-[#38bdf8]/50 hover:shadow-[0_0_18px_rgba(56,189,248,0.25)] hover:-translate-y-1 transition-all"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4 transition-colors duration-300 group-hover:text-[#0284c7]" />
              <span className="absolute -bottom-8 whitespace-nowrap text-[11px] px-2 py-0.5 rounded-md bg-slate-900 text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                GitHub
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/vi%E1%BB%87t-ho%C3%A0ng-075237363/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-11 h-11 rounded-full glass-panel flex items-center justify-center text-slate-500 hover:text-[#4f46e5] hover:bg-[#818cf8]/10 hover:border-[#818cf8]/50 hover:shadow-[0_0_18px_rgba(129,140,248,0.25)] hover:-translate-y-1 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4 transition-colors duration-300 group-hover:text-[#4f46e5]" />
              <span className="absolute -bottom-8 whitespace-nowrap text-[11px] px-2 py-0.5 rounded-md bg-slate-900 text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                LinkedIn
              </span>
            </a>
            <a
              href="https://www.facebook.com/hoang.usuk"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-11 h-11 rounded-full glass-panel flex items-center justify-center text-slate-500 hover:text-[#1877f2] hover:bg-[#1877f2]/10 hover:border-[#1877f2]/50 hover:shadow-[0_0_18px_rgba(24,119,242,0.25)] hover:-translate-y-1 transition-all"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4 transition-colors duration-300 group-hover:text-[#1877f2]" />
              <span className="absolute -bottom-8 whitespace-nowrap text-[11px] px-2 py-0.5 rounded-md bg-slate-900 text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Facebook
              </span>
            </a>
            <div
              className="group relative w-11 h-11 rounded-full glass-panel flex items-center justify-center text-slate-500 hover:text-[#059669] hover:bg-emerald-100/60 hover:border-emerald-400/50 hover:shadow-[0_0_18px_rgba(52,211,153,0.25)] hover:-translate-y-1 transition-all cursor-default"
              aria-label="Gmail"
            >
              <Mail className="h-4 w-4 transition-colors duration-300 group-hover:text-[#059669]" />
              <span className="absolute -bottom-8 whitespace-nowrap text-[11px] px-2 py-0.5 rounded-md bg-slate-900 text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                vh971190@gmail.com
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-slate-800/50 text-center flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Việt Hoàng. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
