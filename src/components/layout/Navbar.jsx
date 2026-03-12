import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-center pt-5">
      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center bg-white/80 backdrop-blur-xl rounded-full px-2 py-2 shadow-lg border border-gray-100">
        {navLinks.map((link) => {
          const sectionId = link.href.replace('#', '');
          const isActive = activeSection === sectionId;
          return (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setActiveSection(sectionId)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-[#1a1a2e] text-white shadow-md'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {link.name}
            </a>
          );
        })}
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden w-full px-4">
        <div className="flex items-center justify-between bg-white/80 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-lg border border-gray-100">
          <span className="text-lg font-bold text-[#1a1a2e]">Portfolio</span>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600 hover:text-gray-900"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        
        {isMobileMenuOpen && (
          <div className="mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100 py-2 px-2">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    setActiveSection(sectionId);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#1a1a2e] text-white'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
