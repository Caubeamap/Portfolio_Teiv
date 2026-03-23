import { Compass, Phone, MapPin, GraduationCap, ArrowRight, Sparkles } from "lucide-react";
import Lanyard from "./Lanyard";
import StudentCard from "./StudentCard";
import ParticleText from "./ParticleText";

const Hero = () => {
  const badges = [
    {
      icon: Compass,
      text: "Seeking Internship",
      color: "text-[#38bdf8]",
      border: "border-[#38bdf8]/30",
      bg: "bg-[#38bdf8]/10",
      dot: true,
      dotColor: "bg-[#38bdf8]"
    },
    { 
      icon: GraduationCap, 
      text: "K23FIT @ HCMUS",
      color: "text-[#818cf8]",
      border: "border-[#818cf8]/20",
      bg: "bg-[#818cf8]/10" 
    },
    { 
      icon: MapPin, 
      text: "Ho Chi Minh City",
      color: "text-slate-300",
      border: "border-slate-700",
      bg: "bg-slate-800/50" 
    },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-24 pb-12 relative overflow-hidden"
    >
      {/* Background ambient blobs for deep space effect */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#38bdf8] rounded-full mix-blend-screen blob" style={{ animationDelay: "0s" }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-[#818cf8] rounded-full mix-blend-screen blob" style={{ animationDelay: "2s" }}></div>

      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch">
          {/* Left - Glass Panel 2/3 */}
          <div className="lg:basis-2/3 w-full animate-slide-in-left">
            <div className="glass-panel rounded-3xl px-8 sm:px-10 lg:px-12 py-10 sm:py-12 lg:py-14 h-full flex flex-col justify-between relative overflow-hidden group">
              
              {/* Subtle grid on the glass card */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>

              <div className="space-y-8 text-center lg:text-left relative z-10">
                {/* Intro Tag */}
                <div className="animate-fade-in-up flex justify-center lg:justify-start">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700/50 bg-slate-800/50 backdrop-blur-md">
                    <Sparkles className="w-4 h-4 text-[#38bdf8]" />
                    <span className="text-xs font-medium text-slate-300 tracking-wider uppercase">Welcome to my universe</span>
                  </div>
                </div>

                {/* Name */}
                <div className="animate-fade-in-up-delay-1 w-full lg:w-auto -ml-3">
                  <ParticleText />
                </div>

                {/* Role */}
                <div className="animate-fade-in-up-delay-2">
                  <p className="text-xl sm:text-2xl font-medium text-slate-300">
                    Data Engineer
                    <span className="text-slate-600 font-light mx-4">|</span>
                    <span className="text-slate-400 font-light">
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
                      <span className="text-slate-200">{badge.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start animate-fade-in-up-delay-4 relative z-10">
                <a
                  href="#projects"
                  className="group relative flex items-center gap-2 px-8 py-4 bg-white text-[#020617] rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] w-full sm:w-auto justify-center"
                >
                  <span>EXPLORE WORK</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#contact"
                  className="group flex items-center gap-2 px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 text-white rounded-full font-semibold text-sm transition-all duration-300 border border-slate-600 hover:border-slate-400 backdrop-blur-md w-full sm:w-auto justify-center hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  <Phone className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                  <span>CONTACT ME</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right - Interactive Lanyard Card (1/3) */}
          <div className="lg:basis-1/3 w-full animate-slide-in-right min-h-[500px] lg:min-h-0 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[#38bdf8]/10 to-[#818cf8]/10 rounded-3xl blur-xl opacity-50"></div>
            <div className="glass-panel rounded-3xl h-full overflow-hidden relative z-10">
              <Lanyard>
                <StudentCard />
              </Lanyard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
