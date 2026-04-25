import { Calendar, GraduationCap, School, Trophy, BookOpen, Sparkles } from "lucide-react";
import campusImage from "../../assets/khtn.jpg";

const Education = () => {
  const timelineItems = [
    {
      label: "Started",
      value: "2023",
      note: "Began Bachelor’s in Information Systems",
    },
    {
      label: "Current",
      value: "Third-year Student",
      note: "Focused on Data Engineering and Analytics",
    },
    {
      label: "Expected Graduation",
      value: "2027",
      note: "Target completion year",
    },
  ];

  return (
    <section id="education" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute -top-20 right-10 w-72 h-72 bg-sky-300/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-indigo-300/20 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="mb-10 sm:mb-14 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white/75 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-sky-600" />
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-slate-600">Education</span>
          </div>
          <h3 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900">
            Academic Journey
          </h3>
          <p className="mt-4 text-slate-600 max-w-2xl">
            A structured snapshot of my current university path, with focus areas and room to
            highlight GPA, coursework, and achievements.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <article className="lg:col-span-3 glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-white/70 shadow-[0_18px_45px_rgba(15,23,42,0.12)] animate-fade-in-up">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-sky-100 border border-sky-200 flex shrink-0 items-center justify-center">
                <School className="w-6 h-6 text-sky-700" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500 font-semibold">University</p>
                <h4 className="text-xl sm:text-3xl font-black text-slate-900 mt-1">
                  University of Science (VNU-HCM)
                </h4>
              </div>
            </div>

            <div className="mt-7 grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/80 border border-slate-200 p-4 hover:-translate-y-1 transition-all duration-300">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold">Degree</p>
                <p className="mt-2 text-lg font-bold text-slate-900">Bachelor’s in Information Systems</p>
              </div>
              <div className="rounded-2xl bg-white/80 border border-slate-200 p-4 hover:-translate-y-1 transition-all duration-300">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold">Duration</p>
                <p className="mt-2 text-lg font-bold text-slate-900">2023 - Present</p>
              </div>
              <div className="rounded-2xl bg-white/80 border border-slate-200 p-4 hover:-translate-y-1 transition-all duration-300">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold">Current Status</p>
                <p className="mt-2 text-lg font-bold text-sky-700">Third-year Student</p>
              </div>
              <div className="rounded-2xl bg-white/80 border border-slate-200 p-4 hover:-translate-y-1 transition-all duration-300">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold">Expected Graduation</p>
                <p className="mt-2 text-lg font-bold text-slate-900">2027</p>
              </div>
            </div>

            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-dashed border-slate-300 bg-white/70 p-4">
                <div className="flex items-center gap-2 text-slate-600">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold">GPA</span>
                </div>
                <p className="mt-2 text-slate-900 text-sm font-semibold">3.70 / 4.00</p>
              </div>
              <div className="rounded-xl border border-dashed border-slate-300 bg-white/70 p-4">
                <div className="flex items-center gap-2 text-slate-600">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold">Coursework</span>
                </div>
                <p className="mt-2 text-slate-400 text-sm">Data Structures, DBMS, Statistics...</p>
              </div>
              <div className="rounded-xl border border-dashed border-slate-300 bg-white/70 p-4">
                <div className="flex items-center gap-2 text-slate-600">
                  <Trophy className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold">Achievements</span>
                </div>
                <p className="mt-2 text-slate-400 text-sm">Scholarship / Awards / Activities</p>
              </div>
            </div>
          </article>

          <aside className="lg:col-span-2 flex flex-col gap-6">
              <div className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/70 animate-fade-in-up-delay-1">
              <div className="flex items-center gap-2 mb-5">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold">Timeline</p>
              </div>
              <ol className="space-y-5">
                {timelineItems.map((item, index) => (
                  <li key={item.label} className="relative pl-7">
                    <span className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-gradient-to-br from-sky-500 to-indigo-500" />
                    {index < timelineItems.length - 1 && (
                      <span className="absolute left-[5px] top-5 w-[2px] h-[calc(100%+10px)] bg-slate-200" />
                    )}
                    <p className="text-sm text-slate-500">{item.label}</p>
                    <p className="font-bold text-slate-900">{item.value}</p>
                    <p className="text-sm text-slate-500 mt-1">{item.note}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="glass-panel rounded-2xl sm:rounded-3xl overflow-hidden border border-white/70 animate-fade-in-up-delay-2">
              <img
                src={campusImage}
                alt="University of Science VNU-HCM campus"
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold">Campus</p>
                <p className="mt-2 text-slate-700 text-sm">
                  University of Science, Vietnam National University - Ho Chi Minh City.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Education;
