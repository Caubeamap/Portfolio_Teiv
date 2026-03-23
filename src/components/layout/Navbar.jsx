import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef(null);
  const linksRef = useRef({});

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' },
  ];

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Scroll spy
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

  // Sliding indicator position
  useEffect(() => {
    const updateIndicator = () => {
      const activeEl = linksRef.current[activeSection];
      const navEl = navRef.current;
      if (activeEl && navEl) {
        const navRect = navEl.getBoundingClientRect();
        const elRect = activeEl.getBoundingClientRect();
        setIndicatorStyle({
          left: elRect.left - navRect.left,
          width: elRect.width,
        });
      }
    };
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeSection]);

  return (
    <nav
      className={`fixed top-0 w-full lg:w-2/3 mx-auto z-50 flex justify-center pt-6 px-4 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
      }`}
    >
      {/* ─── Desktop Navbar ─── */}
      <div
        ref={navRef}
        className="hidden lg:flex items-center relative glass-panel rounded-[16px] px-1.5 py-1.5"
        style={{ borderRadius: '100px' }}
      >
        {/* Sliding pill indicator */}
        <div
          className="absolute top-1.5 rounded-[12px] z-0"
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
            height: 'calc(100% - 12px)',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transition: 'left 0.35s cubic-bezier(0.4, 0, 0.2, 1), width 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 0 20px rgba(255,255,255,0.1)',
            borderRadius: '100px',
          }}
        />

        {navLinks.map((link) => {
          const sectionId = link.href.replace('#', '');
          const isActive = activeSection === sectionId;
          return (
            <a
              key={link.name}
              href={link.href}
              ref={(el) => (linksRef.current[sectionId] = el)}
              onClick={(e) => {
                e.preventDefault();
                setActiveSection(sectionId);
                document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`relative z-10 px-5 py-2.5 rounded-[12px] text-[13px] font-semibold whitespace-nowrap select-none transition-colors duration-300 ${
                isActive
                  ? 'text-white text-glow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {link.name}
            </a>
          );
        })}
      </div>

      {/* ─── Mobile Navbar ─── */}
      <div className="lg:hidden w-full">
        <div
          className="flex items-center justify-between glass-panel rounded-2xl px-6 py-4"
        >
          <span className="text-lg font-black text-white tracking-tight">Việt <span className="text-gradient">Hoàng.</span></span>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative w-9 h-9 flex items-center justify-center rounded-[10px] bg-slate-800 hover:bg-slate-700 text-slate-100 hover:text-white transition-all"
          >
            <span className={`transition-all duration-300 absolute ${isMobileMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}>
              <Menu size={18} />
            </span>
            <span className={`transition-all duration-300 absolute ${isMobileMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}>
              <X size={18} />
            </span>
          </button>
        </div>

        {/* Mobile dropdown */}
        <div
          className="overflow-hidden transition-all duration-400 ease-out"
          style={{
            maxHeight: isMobileMenuOpen ? '420px' : '0px',
            opacity: isMobileMenuOpen ? 1 : 0,
            marginTop: isMobileMenuOpen ? '8px' : '0px',
            transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease, margin-top 0.3s ease',
          }}
        >
          <div
            className="glass-panel rounded-[16px] py-2 px-2"
          >
            {navLinks.map((link, index) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection(sectionId);
                    setIsMobileMenuOpen(false);
                    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`flex items-center px-4 py-3 rounded-[10px] text-[13px] font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-slate-800/50 text-white shadow-md border border-slate-700/50'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
                  }`}
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${index * 30}ms` : '0ms',
                  }}
                >
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
