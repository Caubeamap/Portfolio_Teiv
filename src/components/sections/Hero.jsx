import { Compass, Phone, MapPin, GraduationCap } from 'lucide-react';
import teivPhoto from '../../assets/teiv.jpg';

const Hero = () => {
  const badges = [
    { icon: Compass, text: 'Seeking Internship', color: 'text-green-600', dot: true },
    { icon: GraduationCap, text: 'K23FIT@HCMUS' },
    { icon: MapPin, text: 'Ho Chi Minh City' },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 pb-12 relative overflow-hidden bg-slate-950"
    >
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch">
          {/* Left - White card 2/3 */}
          <div className="lg:basis-2/3 w-full animate-slide-in-left">
            <div className="bg-white rounded-3xl shadow-2xl px-8 sm:px-10 lg:px-12 py-10 sm:py-12 lg:py-14 h-full flex flex-col justify-between">
              <div className="space-y-8 text-center lg:text-left">
                {/* Name */}
                <div className="animate-fade-in-up">
                  <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-[#1a1a2e] tracking-tighter leading-[0.85]">
                    Việt
                    <br />
                    Hoàng
                  </h1>
                </div>

                {/* Role */}
                <div className="animate-fade-in-up-delay-1">
                  <p className="text-xl sm:text-2xl font-semibold text-[#020617]">
                    Data Engineer
                    <span className="text-gray-400 font-light mx-3">·</span>
                    <span className="text-gray-400 font-light">Data Analyst Enthusiast</span>
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
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                        </span>
                      )}
                      <badge.icon className="w-4 h-4 text-gray-400" />
                      <span>{badge.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-10 flex items-center gap-4 justify-center lg:justify-start animate-fade-in-up-delay-3">
                <a
                  href="#projects"
                  className="group flex items-center gap-2 px-7 py-3.5 bg-[#111827] hover:bg-black text-white rounded-full font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-slate-400/40"
                >
                  <Compass className="w-4 h-4" />
                  <span>EXPLORE</span>
                </a>
                <a
                  href="#contact"
                  className="group flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-gray-50 text-[#111827] rounded-full font-semibold text-sm transition-all duration-300 border-2 border-gray-200 hover:border-gray-300"
                >
                  <Phone className="w-4 h-4" />
                  <span>CONTACT</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right - FIT@HCMUS style card with your photo, 1/3 */}
          <div className="lg:basis-1/3 w-full animate-slide-in-right">
            <div className="bg-[#111827] rounded-3xl shadow-2xl h-full flex items-center justify-center overflow-hidden relative border border-slate-800">
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-r from-slate-900 to-slate-700 opacity-80 pointer-events-none" />
              <div className="relative flex flex-col items-center gap-6 px-8 py-10">
                <div className="text-xs font-bold tracking-[0.35em] text-gray-300 uppercase mb-1">
                  FIT@HCMUS
                </div>
                <div className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full border-4 border-white shadow-xl overflow-hidden">
                  <img
                    src={teivPhoto}
                    alt="Teiv portrait"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium tracking-[0.25em] uppercase text-gray-400">
                    Data Engineer · Analyst
                  </p>
                  <p className="mt-2 text-2xl font-bold text-white tracking-tight">
                    Việt Hoàng
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
