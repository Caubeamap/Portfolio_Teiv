const Skills = () => {
  const skillCategories = [
    {
      title: "Languages",
      skills: ["JavaScript", "TypeScript", "Python", "SQL", "HTML/CSS"]
    },
    {
      title: "Frontend",
      skills: ["React", "Next.js", "TailwindCSS", "Redux", "Framer Motion"]
    },
    {
      title: "Backend & DB",
      skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs"]
    },
    {
      title: "Tools & DevOps",
      skills: ["Git", "Docker", "CI/CD", "Vite", "Linux"]
    }
  ];

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mb-16">
          <h2 className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-3">Skills & Expertise</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] max-w-xl">
            Technologies I use to build modern solutions.
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          {skillCategories.map((category, index) => (
            <div key={index} className="space-y-4">
              <h4 className="text-lg font-bold text-[#1a1a2e] border-b border-gray-200 pb-3">
                {category.title}
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map(skill => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-gray-50 hover:bg-[#1a1a2e] hover:text-white border border-gray-200 hover:border-transparent rounded-full text-sm font-medium text-gray-600 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
