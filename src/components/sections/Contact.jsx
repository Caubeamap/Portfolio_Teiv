import { useEffect, useRef, useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
  Linkedin,
  Facebook,
  ArrowUpRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";

const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || "";

const Field = ({ id, label, value, error, onChange, textarea = false }) => {
  const isActive = value.length > 0;
  const sharedClass =
    "peer w-full bg-white/70 dark:bg-slate-900/60 border rounded-2xl px-4 pt-6 pb-2.5 text-slate-900 dark:text-slate-100 placeholder-transparent focus:outline-none focus:ring-2 transition-all duration-300";
  const borderClass = error
    ? "border-rose-300 focus:border-rose-400 focus:ring-rose-200/60"
    : "border-slate-200 dark:border-slate-700 focus:border-sky-400 focus:ring-sky-200/60";

  return (
    <div>
      <div className="relative">
        {textarea ? (
          <textarea
            id={id}
            rows={5}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={label}
            className={`${sharedClass} ${borderClass} resize-none`}
          />
        ) : (
          <input
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={label}
            className={`${sharedClass} ${borderClass}`}
          />
        )}
        <label
          htmlFor={id}
          className={`absolute left-4 transition-all duration-300 pointer-events-none ${
            isActive
              ? "text-xs top-2 text-sky-700 dark:text-sky-300"
              : "text-sm top-4 text-slate-500 peer-focus:text-xs peer-focus:top-2 peer-focus:text-sky-700 dark:peer-focus:text-sky-300"
          }`}
        >
          {label}
        </label>
      </div>
      {error && <p className="text-xs text-rose-500 mt-1.5">{error}</p>}
    </div>
  );
};

const Contact = () => {
  const sectionRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const validateField = (field, value) => {
    if (field === "name" && value.trim().length < 2) return "Name must be at least 2 characters.";
    if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email.";
    if (field === "message" && value.trim().length < 12) return "Message should be at least 12 characters.";
    return "";
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {
      name: validateField("name", form.name),
      email: validateField("email", form.email),
      message: validateField("message", form.message),
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    if (!CONTACT_ENDPOINT) {
      setStatus({
        type: "error",
        message: "Set VITE_CONTACT_ENDPOINT to enable sending (Formspree/EmailJS backend).",
      });
      return;
    }

    setSending(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio contact from ${form.name}`,
        }),
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus({ type: "success", message: "Message sent successfully. Thank you!" });
      setForm({ name: "", email: "", message: "" });
      setErrors({});
    } catch {
      setStatus({
        type: "error",
        message: "Could not send message. Please try again or email directly.",
      });
    } finally {
      setSending(false);
    }
  };

  const contactCards = [
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "linkedin.com/in/việt-hoàng-075237363",
      href: "https://www.linkedin.com/in/vi%E1%BB%87t-ho%C3%A0ng-075237363/",
      accent: "from-[#0a66c2] to-[#1d9bf0]",
      hoverBg: "hover:bg-[#0a66c2]/10",
      hoverBorder: "hover:border-[#0a66c2]/40",
      hoverText: "group-hover:text-[#0a66c2]",
    },
    {
      icon: Facebook,
      title: "Facebook",
      value: "facebook.com/hoang.usuk",
      href: "https://www.facebook.com/hoang.usuk",
      accent: "from-[#1877f2] to-[#60a5fa]",
      hoverBg: "hover:bg-[#1877f2]/10",
      hoverBorder: "hover:border-[#1877f2]/40",
      hoverText: "group-hover:text-[#1877f2]",
    },
    {
      icon: Mail,
      title: "Gmail",
      value: "vh971190@gmail.com",
      href: "mailto:vh971190@gmail.com",
      accent: "from-[#ea4335] to-[#f59e0b]",
      hoverBg: "hover:bg-[#ea4335]/10",
      hoverBorder: "hover:border-[#ea4335]/40",
      hoverText: "group-hover:text-[#ea4335]",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "0373564697",
      href: "tel:0373564697",
      accent: "from-[#10b981] to-[#14b8a6]",
      hoverBg: "hover:bg-[#10b981]/10",
      hoverBorder: "hover:border-[#10b981]/40",
      hoverText: "group-hover:text-[#059669]",
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-slate-300 to-transparent" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#38bdf8]/14 rounded-full blur-[120px] pointer-events-none transform -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className={`${revealed ? "animate-fade-in-up" : "opacity-0"} text-center mb-14`}>
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#818cf8]" />
            <h2 className="text-xs font-bold tracking-[0.2em] text-[#818cf8] uppercase">Get In Touch</h2>
            <Sparkles className="w-4 h-4 text-[#818cf8]" />
          </div>
          <h3 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-slate-100 mb-5 tracking-tight">
            Let&apos;s connect professionally.
          </h3>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg">
            Software developer based in Ho Chi Minh City, open to internship and early-career opportunities.
          </p>
        </div>

        <div className="grid xl:grid-cols-5 gap-8 items-start">
          <div className={`${revealed ? "animate-fade-in-up-delay-1" : "opacity-0"} xl:col-span-2 space-y-5`}>
            <div className="grid sm:grid-cols-2 xl:grid-cols-1 gap-4">
              {contactCards.map((card) => (
                <a
                  key={card.title}
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : "_self"}
                  rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`group glass-panel rounded-2xl border border-white/70 dark:border-slate-700 p-4 flex items-start gap-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(15,23,42,0.14)] ${card.hoverBg} ${card.hoverBorder}`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.accent} flex items-center justify-center shadow-lg`}>
                    <card.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className={`text-sm font-semibold text-slate-900 dark:text-slate-100 transition-colors ${card.hoverText} flex items-center gap-1.5`}>
                      {card.title}
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                    </p>
                    <p className={`text-sm text-slate-600 dark:text-slate-300 truncate transition-colors ${card.hoverText}`}>
                      {card.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div className="glass-panel rounded-2xl border border-white/70 dark:border-slate-700 p-5">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 mb-2">
                <MapPin className="w-4 h-4 text-sky-600" />
                <p className="text-sm font-semibold">Location</p>
              </div>
              <p className="text-slate-600 dark:text-slate-300">Ho Chi Minh City, Vietnam</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className={`${revealed ? "animate-fade-in-up-delay-2" : "opacity-0"} xl:col-span-3 glass-panel p-7 md:p-8 rounded-3xl border border-white/70 dark:border-slate-700 relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#818cf8]/8 to-transparent pointer-events-none" />

            <div className="relative z-10 space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <Field
                  id="name"
                  label="Name"
                  value={form.name}
                  error={errors.name}
                  onChange={(value) => handleChange("name", value)}
                />
                <Field
                  id="email"
                  label="Email"
                  value={form.email}
                  error={errors.email}
                  onChange={(value) => handleChange("email", value)}
                />
              </div>

              <Field
                id="message"
                label="Message"
                value={form.message}
                error={errors.message}
                onChange={(value) => handleChange("message", value)}
                textarea
              />

              <button
                type="submit"
                disabled={sending}
                className={`w-full rounded-2xl py-3.5 font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                  status.type === "success"
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-900 text-white hover:bg-black hover:scale-[1.01]"
                } ${sending ? "cursor-not-allowed opacity-90" : ""}`}
              >
                {sending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : status.type === "success" ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Sent Successfully
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>

              {status.message && (
                <div
                  className={`rounded-xl px-4 py-3 text-sm ${
                    status.type === "success"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-rose-50 text-rose-700 border border-rose-200"
                  }`}
                >
                  {status.message}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
