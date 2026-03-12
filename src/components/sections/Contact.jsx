import { Mail, MapPin, Phone, Send } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-3">Get In Touch</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-[#1a1a2e] mb-4">Let's work together.</h3>
          <p className="text-gray-500 max-w-xl mx-auto">
            I'm currently looking for internship opportunities. Whether you have a question or just want to say hi, feel free to reach out!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-[#1a1a2e]">Contact Information</h4>
            {[
              { icon: Mail, text: 'hello@example.com', href: 'mailto:hello@example.com' },
              { icon: Phone, text: '+84 123 456 789', href: 'tel:+84123456789' },
              { icon: MapPin, text: 'Ho Chi Minh City, Vietnam' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className="w-11 h-11 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100 group-hover:bg-white group-hover:shadow-sm transition-all">
                  <item.icon className="w-5 h-5 text-gray-400" />
                </div>
                {item.href ? (
                  <a href={item.href} className="text-gray-600 font-medium hover:text-[#1a1a2e] transition-colors">{item.text}</a>
                ) : (
                  <span className="text-gray-600 font-medium">{item.text}</span>
                )}
              </div>
            ))}
          </div>

          <form className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-600" htmlFor="name">Name</label>
                <input type="text" id="name"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#1a1a2e] placeholder-gray-300 focus:outline-none focus:border-[#1a1a2e] focus:ring-1 focus:ring-[#1a1a2e] transition-all text-sm"
                  placeholder="Your name" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-600" htmlFor="email">Email</label>
                <input type="email" id="email"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#1a1a2e] placeholder-gray-300 focus:outline-none focus:border-[#1a1a2e] focus:ring-1 focus:ring-[#1a1a2e] transition-all text-sm"
                  placeholder="your@email.com" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-600" htmlFor="subject">Subject</label>
              <input type="text" id="subject"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#1a1a2e] placeholder-gray-300 focus:outline-none focus:border-[#1a1a2e] focus:ring-1 focus:ring-[#1a1a2e] transition-all text-sm"
                placeholder="Project Inquiry" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-600" htmlFor="message">Message</label>
              <textarea id="message" rows="4"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#1a1a2e] placeholder-gray-300 focus:outline-none focus:border-[#1a1a2e] focus:ring-1 focus:ring-[#1a1a2e] transition-all resize-none text-sm"
                placeholder="Hello, I'd like to talk about..." />
            </div>
            <button type="button"
              className="w-full bg-[#1a1a2e] hover:bg-[#2a2a4e] text-white rounded-xl py-3.5 font-semibold text-sm transition-all flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl">
              <span>Send Message</span>
              <Send className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
