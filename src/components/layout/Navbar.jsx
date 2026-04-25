import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Resume', href: '#resume' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef(null);
  const linksRef = useRef({});

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map(link => link.href.replace('#', ''));
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
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 sm:pt-6 px-3 sm:px-4 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
      }`}
      aria-label="Primary navigation"
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
            background: 'rgba(99, 102, 241, 0.12)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            transition: 'left 0.35s cubic-bezier(0.4, 0, 0.2, 1), width 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 8px 20px rgba(99,102,241,0.2)',
            borderRadius: '100px',
          }}
        />

        {NAV_LINKS.map((link) => {
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
                  ? 'text-slate-900'
                  : 'text-slate-500 hover:text-slate-900'
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
          className="flex items-center justify-between glass-panel rounded-2xl px-4 py-3.5 sm:px-6 sm:py-4"
        >
          <span className="text-lg font-black text-slate-900 tracking-tight">Việt <span className="text-gradient-primary">Hoàng.</span></span>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            className="relative w-9 h-9 flex items-center justify-center rounded-[10px] bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-all"
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
          id="mobile-navigation-menu"
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
            {NAV_LINKS.map((link, index) => {
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
                      ? 'bg-indigo-100 text-slate-900 shadow-md border border-indigo-200'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
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
