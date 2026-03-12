import { Compass, Phone, MapPin, GraduationCap } from 'lucide-react';

const IDCard = () => (
  <div className="animate-swing">
    {/* Lanyard Strap */}
    <div className="flex flex-col items-center">
      {/* Clip */}
      <div className="w-6 h-3 bg-gray-400 rounded-t-sm relative z-10" />
      {/* Rope */}
      <div className="w-0.5 h-16 bg-gray-800" />
      {/* Card */}
      <div className="w-64 bg-[#1a1a2e] rounded-2xl overflow-hidden shadow-2xl border border-gray-700 relative">
        {/* Top bar */}
        <div className="px-5 pt-5 pb-3 flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">FIT@HCMUS</span>
          <div className="w-2 h-2 rounded-full bg-red-500" />
        </div>

        {/* Photo */}
        <div className="flex justify-center py-3">
          <div className="w-24 h-24 rounded-full bg-gray-600 border-2 border-gray-500 flex items-center justify-center overflow-hidden">
            <span className="text-gray-400 text-xs text-center">Your Photo</span>
          </div>
        </div>

        {/* Info */}
        <div className="text-center px-5 pb-2">
          <p className="text-white text-2xl font-black leading-tight tracking-tight">VIỆT</p>
          <p className="text-white text-2xl font-black leading-tight tracking-tight">HOÀNG</p>
          <p className="text-blue-400 text-[10px] font-bold tracking-[0.2em] mt-1 uppercase">Software Developer</p>
        </div>

        {/* Bottom section */}
        <div className="mt-3 bg-[#252545] px-5 py-4 flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Intern</span>
          {/* QR placeholder */}
          <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center">
            <div className="grid grid-cols-3 gap-0.5 w-7 h-7">
              {[...Array(9)].map((_, i) => (
                <div key={i} className={`${Math.random() > 0.4 ? 'bg-gray-900' : 'bg-white'} rounded-[1px]`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Hero = () => {
  const badges = [
    { icon: Compass, text: 'Seeking Internship', color: 'text-green-600', dot: true },
    { icon: GraduationCap, text: 'K23FIT@HCMUS' },
    { icon: MapPin, text: 'Ho Chi Minh City' },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Left Content */}
          <div className="flex-1 max-w-2xl space-y-8 text-center lg:text-left">
            {/* Name */}
            <div className="animate-fade-in-up">
              <h1 className="text-7xl sm:text-8xl lg:text-9xl font-black text-[#1a1a2e] tracking-tighter leading-[0.85]">
                Việt
                <br />
                Hoàng
              </h1>
            </div>

            {/* Role */}
            <div className="animate-fade-in-up-delay-1">
              <p className="text-xl sm:text-2xl font-semibold text-[#1a1a2e]">
                Software Developer
                <span className="text-gray-400 font-light mx-3">·</span>
                <span className="text-gray-400 font-light">Tech Enthusiast</span>
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start animate-fade-in-up-delay-2">
              {badges.map((badge, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-600"
                >
                  {badge.dot && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                  )}
                  <badge.icon className="w-4 h-4 text-gray-400" />
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4 justify-center lg:justify-start animate-fade-in-up-delay-3">
              <a
                href="#projects"
                className="group flex items-center gap-2 px-7 py-3.5 bg-[#1a1a2e] hover:bg-[#2a2a4e] text-white rounded-full font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-gray-300/30"
              >
                <Compass className="w-4 h-4" />
                <span>EXPLORE</span>
              </a>
              <a
                href="#contact"
                className="group flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-gray-50 text-[#1a1a2e] rounded-full font-semibold text-sm transition-all duration-300 border-2 border-gray-200 hover:border-gray-300"
              >
                <Phone className="w-4 h-4" />
                <span>CONTACT</span>
              </a>
            </div>
          </div>

          {/* Right - ID Card */}
          <div className="flex-shrink-0 animate-fade-in-up-delay-4 hidden lg:block">
            <IDCard />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
