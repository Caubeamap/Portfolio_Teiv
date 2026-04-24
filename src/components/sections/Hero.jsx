import { Compass, Phone, MapPin, GraduationCap, ArrowRight, Sparkles } from "lucide-react";
import StudentCard from "./StudentCard";
import ParticleText from "./ParticleText";

const Hero = () => {
  const badges = [
    {
      icon: Compass,
      text: "Seeking Internship",
      color: "text-[#0369a1]",
      border: "border-[#38bdf8]/30",
      bg: "bg-[#38bdf8]/15",
      dot: true,
      dotColor: "bg-[#38bdf8]"
    },
    { 
      icon: GraduationCap, 
      text: "K23FIT @ HCMUS",
      color: "text-[#4f46e5]",
      border: "border-[#818cf8]/20",
      bg: "bg-[#818cf8]/12" 
    },
    { 
      icon: MapPin, 
      text: "Ho Chi Minh City",
      color: "text-slate-600",
      border: "border-slate-300",
      bg: "bg-white/60" 
    },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-24 pb-12 relative overflow-hidden"
    >
      {/* Background ambient blobs for deep space effect */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#38bdf8] rounded-full mix-blend-multiply blob" style={{ animationDelay: "0s" }} />
      <div className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-[#818cf8] rounded-full mix-blend-multiply blob" style={{ animationDelay: "2s" }} />

      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch">
          {/* Left - Glass Panel 2/3 */}
          <div className="lg:basis-2/3 w-full animate-slide-in-left">
            <div className="glass-panel rounded-3xl px-8 sm:px-10 lg:px-12 py-10 sm:py-12 lg:py-14 h-full flex flex-col justify-between relative overflow-hidden group">
              
              {/* Subtle grid on the glass card */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 group-hover:opacity-50 transition-opacity duration-700" />

              <div className="space-y-8 text-center lg:text-left relative z-10">
                {/* Intro Tag */}
                <div className="animate-fade-in-up flex justify-center lg:justify-start">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-200 bg-white/80 backdrop-blur-md">
                    <Sparkles className="w-4 h-4 text-[#38bdf8]" />
                    <span className="text-xs font-medium text-slate-700 tracking-wider uppercase">Welcome to my universe</span>
                  </div>
                </div>

                {/* Name */}
                <div className="animate-fade-in-up-delay-1 w-full lg:w-auto -ml-3">
                  <ParticleText />
                </div>

                {/* Role */}
                <div className="animate-fade-in-up-delay-2">
                  <p className="text-xl sm:text-2xl font-medium text-slate-700">
                    Data Engineer
                    <span className="text-slate-400 font-light mx-4">|</span>
                    <span className="text-slate-500 font-light">
                      Data Analyst Enthusiast
                    </span>
                  </p>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start animate-fade-in-up-delay-3">
                  {badges.map((badge, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${badge.bg} ${badge.border} ${badge.color}`}
                    >
                      {badge.dot && (
                        <span className="relative flex h-2 w-2">
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${badge.dotColor}`} />
                          <span className={`relative inline-flex rounded-full h-2 w-2 ${badge.dotColor}`} />
                        </span>
                      )}
                      <badge.icon className="w-4 h-4 opacity-80" />
                      <span className="text-slate-700">{badge.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start animate-fade-in-up-delay-4 relative z-10">
                <a
                  href="#projects"
                  className="group relative flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_28px_rgba(99,102,241,0.35)] w-full sm:w-auto justify-center"
                >
                  <span>EXPLORE WORK</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#contact"
                  className="group flex items-center gap-2 px-8 py-4 bg-white/80 hover:bg-white text-slate-800 rounded-full font-semibold text-sm transition-all duration-300 border border-slate-200 hover:border-indigo-300 backdrop-blur-md w-full sm:w-auto justify-center hover:shadow-[0_0_20px_rgba(99,102,241,0.16)]"
                >
                  <Phone className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                  <span>CONTACT ME</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right - Profile Card (1/3) */}
          <div className="lg:basis-1/3 w-full animate-slide-in-right min-h-[400px] lg:min-h-0 relative flex items-center justify-center perspective-[1000px]">
            {/* Ambient glowing backdrop */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#38bdf8]/20 via-transparent to-[#818cf8]/20 rounded-full blur-3xl opacity-60 blob" style={{ animationDuration: "6s" }}></div>
            
            {/* The Floating UI Element */}
            <div className="relative w-full max-w-[320px] h-[480px] animate-float group z-10 mx-auto">
              {/* Subtle backglow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#38bdf8] to-[#818cf8] rounded-[26px] blur opacity-30 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none" />
              
              <div className="w-full h-full relative z-10 transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:-rotate-2 shadow-2xl">
                <StudentCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
