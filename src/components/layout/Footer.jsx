import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative border-t border-slate-800/50 py-12 overflow-hidden">
      {/* Subtle glow on top edge */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#38bdf8]/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <span className="text-2xl font-black text-white tracking-tight">
              Việt <span className="text-gradient">Hoàng.</span>
            </span>
            <p className="text-slate-400 mt-2 text-sm flex items-center justify-center md:justify-start gap-1.5">
              Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" /> & TailwindCSS
            </p>
          </div>
          
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-white hover:border-[#38bdf8]/50 hover:shadow-[0_0_15px_rgba(56,189,248,0.2)] hover:-translate-y-1 transition-all">
              <Github className="h-4 w-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-white hover:border-[#818cf8]/50 hover:shadow-[0_0_15px_rgba(129,140,248,0.2)] hover:-translate-y-1 transition-all">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="mailto:vh971190@gmail.com" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-white hover:border-emerald-400/50 hover:shadow-[0_0_15px_rgba(52,211,153,0.2)] hover:-translate-y-1 transition-all">
              <Mail className="h-4 w-4" />
            </a>
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
