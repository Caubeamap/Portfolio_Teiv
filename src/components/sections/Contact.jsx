import { Mail, MapPin, Phone, Send, Sparkles } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-slate-700/50 to-transparent"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#38bdf8]/5 rounded-full blur-[120px] pointer-events-none transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#818cf8]" />
            <h2 className="text-xs font-bold tracking-[0.2em] text-[#818cf8] uppercase">Get In Touch</h2>
            <Sparkles className="w-4 h-4 text-[#818cf8]" />
          </div>
          <h3 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Let's work <span className="text-gradient">together.</span></h3>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            I'm currently looking for internship opportunities. Whether you have a question or just want to say hi, feel free to reach out!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <h4 className="text-2xl font-bold text-white mb-8">Contact Information</h4>
            {[
              { icon: Mail, text: 'vh971190@gmail.com', href: 'mailto:vh971190@gmail.com' },
              { icon: Phone, text: '+84 373564697', href: 'tel:+84373564697' },
              { icon: MapPin, text: 'Ho Chi Minh City, Vietnam' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-6 p-4 rounded-2xl transition-all group hover:bg-slate-800/30">
                <div className="w-14 h-14 glass-panel rounded-full flex items-center justify-center group-hover:scale-110 group-hover:border-[#38bdf8]/50 transition-all group-hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]">
                  <item.icon className="w-6 h-6 text-[#38bdf8] group-hover:text-white transition-colors" />
                </div>
                {item.href ? (
                  <a href={item.href} className="text-slate-300 font-medium text-lg hover:text-white transition-colors hover:translate-x-1 block duration-300">{item.text}</a>
                ) : (
                  <span className="text-slate-300 font-medium text-lg">{item.text}</span>
                )}
              </div>
            ))}
          </div>

          <form className="glass-panel p-8 md:p-10 rounded-3xl space-y-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#818cf8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div className="grid sm:grid-cols-2 gap-6 relative z-10">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300" htmlFor="name">Name</label>
                <input type="text" id="name"
                  className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#38bdf8]/50 focus:ring-1 focus:ring-[#38bdf8]/50 transition-all bg-clip-padding backdrop-filter backdrop-blur-sm"
                  placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300" htmlFor="email">Email</label>
                <input type="email" id="email"
                  className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#38bdf8]/50 focus:ring-1 focus:ring-[#38bdf8]/50 transition-all bg-clip-padding backdrop-filter backdrop-blur-sm"
                  placeholder="your@email.com" />
              </div>
            </div>
            <div className="space-y-2 relative z-10">
              <label className="text-sm font-semibold text-slate-300" htmlFor="subject">Subject</label>
              <input type="text" id="subject"
                className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#38bdf8]/50 focus:ring-1 focus:ring-[#38bdf8]/50 transition-all bg-clip-padding backdrop-filter backdrop-blur-sm"
                placeholder="Project Inquiry" />
            </div>
            <div className="space-y-2 relative z-10">
              <label className="text-sm font-semibold text-slate-300" htmlFor="message">Message</label>
              <textarea id="message" rows="4"
                className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#38bdf8]/50 focus:ring-1 focus:ring-[#38bdf8]/50 transition-all resize-none bg-clip-padding backdrop-filter backdrop-blur-sm"
                placeholder="Hello, I'd like to talk about..." />
            </div>
            <button type="button"
              className="w-full relative overflow-hidden bg-white hover:scale-[1.02] text-[#020617] rounded-xl py-4 font-bold text-base transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] z-10">
              <span>Send Message</span>
              <Send className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
