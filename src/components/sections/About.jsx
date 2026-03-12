import { useEffect, useRef, useState } from "react";
import { Code, Server, MonitorSmartphone } from "lucide-react";

const ServiceCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:-translate-x-1 group">
    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-gray-100">
      <Icon className="text-[#111827] w-6 h-6" />
    </div>
    <h3 className="text-lg font-bold text-[#111827] mb-2">{title}</h3>
    <p className="text-gray-500 leading-relaxed text-sm">{description}</p>
  </div>
);

const TypewriterLine = ({
  text,
  active,
  onComplete,
  delay = 0,
  className = "",
  as: Component = "p",
}) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const onCompleteRef = useRef(onComplete);
  const doneRef = useRef(false);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    if (!active) return;

    doneRef.current = false;
    let intervalId;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setVisibleCount((prev) => {
          const next = prev + 1;
          if (next >= text.length) {
            clearInterval(intervalId);
            if (!doneRef.current) {
              doneRef.current = true;
              setTimeout(() => onCompleteRef.current?.(), 0);
            }
            return text.length;
          }
          return next;
        });
      }, 10);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [active, text, delay]);

  return (
    <Component className={className}>{text.slice(0, visibleCount)}</Component>
  );
};

const About = () => {
  const [hasRevealed, setHasRevealed] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRevealed(true);
          setLineIndex(1);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const next = (n) => () => setLineIndex((prev) => Math.max(prev, n));

  const services = [
    {
      icon: Server,
      title: "Data Engineering Foundations",
      description:
        "Working with relational databases, SQL, and Python to clean, transform, and prepare data for analysis and downstream systems.",
    },
    {
      icon: Code,
      title: "Analytics & Visualization",
      description:
        "Exploring datasets, building reports, and turning raw numbers into clear insights using charts, dashboards, and analytical thinking.",
    },
    {
      icon: MonitorSmartphone,
      title: "Web for Data Products",
      description:
        "Using modern web technologies to build simple, clean interfaces that present data in an accessible and user-friendly way.",
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <h2 className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-3">
              About Me
            </h2>
            <TypewriterLine
              as="h3"
              text="Third-year data-driven student at HCMUS."
              active={lineIndex >= 1}
              onComplete={next(2)}
              delay={100}
              className="text-3xl md:text-4xl font-bold text-[#111827] mb-6"
            />
            <div className="space-y-4 text-gray-600 text-base leading-relaxed">
              <TypewriterLine
                text="I'm a third-year student at HCMUS, focusing on data engineering and analytics. Since 2023, I have been learning how to work with data and how to build web applications that present information clearly."
                active={lineIndex >= 2}
                onComplete={next(3)}
                className="about-line-visible"
              />
              <TypewriterLine
                text="I've completed foundational subjects and self-study on databases, data processing, and web development, and I enjoy connecting those skills to solve practical problems."
                active={lineIndex >= 3}
                onComplete={next(4)}
                className="about-line-visible"
              />
              <TypewriterLine
                text="Right now I'm actively looking for a data engineer or data analyst internship, and I'm also open to suitable fresher opportunities where I can learn from real projects, contribute to the team, and grow my career in the data field."
                active={lineIndex >= 4}
                onComplete={next(5)}
                className="about-line-visible"
              />
            </div>
          </div>

          <div
            className={
              hasRevealed
                ? "grid grid-cols-2 gap-4 animate-fade-in-up-delay-1"
                : "grid grid-cols-2 gap-4 opacity-0 translate-y-6 transition-all duration-500"
            }
          >
            {[
              { num: "3", label: "Year student at HCMUS" },
              { num: "2023", label: "Year I started coding" },
              { num: "3", label: "Personal projects completed" },
              { num: "100%", label: "Energy to learn & grow" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-gray-200"
              >
                <h4 className="text-3xl font-black text-[#111827] mb-1">
                  {stat.num}
                </h4>
                <p className="text-gray-500 text-sm font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className={
            hasRevealed
              ? "grid md:grid-cols-3 gap-6 animate-fade-in-up-delay-2"
              : "grid md:grid-cols-3 gap-6 opacity-0 translate-y-6 transition-all duration-500"
          }
        >
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
