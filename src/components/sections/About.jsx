import { Code, Server, MonitorSmartphone } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white border border-gray-100 p-6 rounded-2xl hover:shadow-lg transition-all group">
    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-gray-100">
      <Icon className="text-[#1a1a2e] w-6 h-6" />
    </div>
    <h3 className="text-lg font-bold text-[#1a1a2e] mb-2">{title}</h3>
    <p className="text-gray-500 leading-relaxed text-sm">{description}</p>
  </div>
);

const About = () => {
  const services = [
    {
      icon: MonitorSmartphone,
      title: 'Frontend Development',
      description: 'Building responsive, high-performance web applications using React, Next.js, and modern CSS frameworks.'
    },
    {
      icon: Server,
      title: 'Backend Integration',
      description: 'Connecting seamless user interfaces with robust backend APIs, databases, and third-party services.'
    },
    {
      icon: Code,
      title: 'Clean Architecture',
      description: 'Writing maintainable, scalable, and well-documented code following best practices.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <h2 className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-3">About Me</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-6">
              A passionate developer crafting digital experiences.
            </h3>
            <div className="space-y-4 text-gray-500 text-base leading-relaxed">
              <p>
                Hello! I'm a software engineering student at HCMUS, passionate about
                creating clean, efficient digital products. I love turning complex problems
                into elegant, intuitive designs.
              </p>
              <p>
                Currently seeking internship opportunities to apply my skills in real-world
                projects and grow as a developer.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: '3+', label: 'Years Learning' },
              { num: '10+', label: 'Projects Built' },
              { num: '5+', label: 'Technologies' },
              { num: '100%', label: 'Commitment' }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h4 className="text-3xl font-black text-[#1a1a2e] mb-1">{stat.num}</h4>
                <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
