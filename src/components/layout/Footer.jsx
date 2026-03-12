import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <span className="text-xl font-black text-[#1a1a2e]">Portfolio</span>
            <p className="text-gray-400 mt-1 text-sm">Built with React & TailwindCSS</p>
          </div>
          
          <div className="flex space-x-5">
            <a href="#" className="text-gray-300 hover:text-[#1a1a2e] transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-300 hover:text-[#1a1a2e] transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:hello@example.com" className="text-gray-300 hover:text-[#1a1a2e] transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-50 text-center">
          <p className="text-gray-400 text-xs">
            &copy; {new Date().getFullYear()} Việt Hoàng. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
