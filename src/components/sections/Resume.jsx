import { useEffect, useRef, useState } from "react";
import {
  Download,
  Briefcase,
  GraduationCap,
  Trophy,
  Code2,
  Database,
  ShieldCheck,
  Radio,
  Calendar,
  ChevronRight,
} from "lucide-react";

const Counter = ({ value, suffix = "", active }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame;
    const duration = 900;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(value * progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, value]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
};

const Resume = () => {
  const sectionRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const skillLevels = [
    { name: "React + Tailwind", level: 86, icon: Code2 },
    { name: "Node.js + Express APIs", level: 84, icon: Database },
    { name: "Auth & Security (JWT/OAuth)", level: 78, icon: ShieldCheck },
    { name: "Real-time Features (Socket.io)", level: 76, icon: Radio },
  ];

  return (
    <section
      id="resume"
      ref={sectionRef}
      className="py-20 sm:py-28 relative overflow-hidden"
    >
      <div className="absolute -top-10 left-0 w-72 h-72 bg-indigo-300/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-sky-300/20 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div
          className={`${revealed ? "animate-fade-in-up" : "opacity-0"} mb-14`}
        >
          <p className="text-xs uppercase tracking-[0.25em] font-semibold text-indigo-600 dark:text-indigo-300">
            Resume Snapshot
          </p>
          <div className="mt-4 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-slate-100">
              Professional Highlights
            </h3>
            <a
              href="/gnoah_teiv_cv.pdf"
              download="Hoang_Quoc_Viet_CV.pdf"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white hover:bg-black transition-all duration-300 hover:scale-[1.02] w-full sm:w-fit"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm font-semibold">Download CV</span>
            </a>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-7">
          <div className="lg:col-span-8 space-y-7">
            <article
              className={`${revealed ? "animate-fade-in-up-delay-1" : "opacity-0"} glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-white/70 dark:border-slate-700`}
            >
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-sky-600" />
                <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Project Experience
                </h4>
              </div>

              <div className="mt-6 space-y-6">
                <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 p-4 sm:p-5 hover:-translate-y-1 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <h5 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                        PetCareX System
                      </h5>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Backend Developer & UI Support · Team size: 5
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">
                      Dec 2025 - Jan 2026
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    <li className="flex gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-sky-600" />
                      Built over 20 APIs with Node.js and Express for customers,
                      products, and booking flows.
                    </li>
                    <li className="flex gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-sky-600" />
                      Implemented JWT login and Zustand-based state management
                      for smooth app-wide data control.
                    </li>
                    <li className="flex gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-sky-600" />
                      Designed core dashboard UI using React.js and Tailwind
                      CSS.
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 p-4 sm:p-5 hover:-translate-y-1 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <h5 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                        Job Search System
                      </h5>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Backend Developer & UI Developer · Team size: 5
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">
                      Nov 2025 - Jan 2026
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    <li className="flex gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-sky-600" />
                      Built real-time notification workflows using Socket.io.
                    </li>
                    <li className="flex gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-sky-600" />
                      Developed profile and resume APIs and integrated Supabase
                      for secure data storage.
                    </li>
                    <li className="flex gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-sky-600" />
                      Added Google and Facebook login to improve signup
                      experience.
                    </li>
                  </ul>
                </div>
              </div>
            </article>

            <article
              className={`${revealed ? "animate-fade-in-up-delay-2" : "opacity-0"} glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-white/70 dark:border-slate-700`}
            >
              <div className="flex items-center gap-3 mb-5">
                <Code2 className="w-5 h-5 text-indigo-600" />
                <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Skill Indicators
                </h4>
              </div>
              <div className="space-y-4">
                {skillLevels.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <skill.icon className="w-4 h-4 text-sky-600" />
                        <span>{skill.name}</span>
                      </div>
                      <span className="font-semibold text-slate-600 dark:text-slate-300">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 transition-all duration-1000"
                        style={{ width: revealed ? `${skill.level}%` : "0%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <aside className="lg:col-span-4 space-y-7">
            <div
              className={`${revealed ? "animate-fade-in-up-delay-1" : "opacity-0"} glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/70 dark:border-slate-700`}
            >
              <div className="flex items-center gap-2 mb-5">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Key Metrics
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 p-4">
                  <p className="text-xs text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                    Projects
                  </p>
                  <p className="mt-2 text-2xl font-black text-slate-900 dark:text-slate-100">
                    <Counter value={2} suffix="+" active={revealed} />
                  </p>
                </div>
                <div className="rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 p-4">
                  <p className="text-xs text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                    APIs Built
                  </p>
                  <p className="mt-2 text-2xl font-black text-slate-900 dark:text-slate-100">
                    <Counter value={20} suffix="+" active={revealed} />
                  </p>
                </div>
                <div className="rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 p-4">
                  <p className="text-xs text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                    Core Tech
                  </p>
                  <p className="mt-2 text-2xl font-black text-slate-900 dark:text-slate-100">
                    <Counter value={8} suffix="+" active={revealed} />
                  </p>
                </div>
                <div className="rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 p-4">
                  <p className="text-xs text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                    GPA
                  </p>
                  <p className="mt-2 text-2xl font-black text-slate-900 dark:text-slate-100">
                    3.70
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`${revealed ? "animate-fade-in-up-delay-2" : "opacity-0"} glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/70 dark:border-slate-700`}
            >
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-5 h-5 text-indigo-600" />
                <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Education
                </h4>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                University of Science - VNUHCM
              </p>
              <p className="mt-1 font-semibold text-slate-900 dark:text-slate-100">
                Bachelor’s in Information Systems
              </p>
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200 text-xs font-semibold">
                <Calendar className="w-3.5 h-3.5" />
                Oct 2023 - Present
              </div>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                Current status:{" "}
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  Third-year student
                </span>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Resume;
