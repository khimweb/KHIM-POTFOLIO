import { useState } from 'react';
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle, Github } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { ScrollReveal } from '../ui/ScrollReveal';
import { submitContact } from '../../services/api';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await submitContact(formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-24 relative z-10 bg-black/30">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal side="center">
          <SectionTitle title="Get In Touch" subtitle="Have a project in mind or just want to say hi? Let's connect!" />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12">
          
          <ScrollReveal side="left" distance={90}>
            <h3 className="text-3xl font-bold text-white mb-6 font-space">Let's build something amazing together.</h3>
            <p className="text-gray-400 mb-10 text-lg">
              I'm currently looking for new opportunities and my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>

            <div className="space-y-5">
              {[
                { icon: <Send className="text-primary" size={24} />, title: "Telegram", info: "@phornsokkhim", href: "https://t.me/phornsokkhim", target: "_blank" },
                { icon: <Phone className="text-secondary" size={24} />, title: "Phone", info: "096 666 0019", href: "tel:0966660019" },
                { icon: <Mail className="text-primary" size={24} />, title: "Email", info: "sokkhim519@gmail.com", href: "mailto:sokkhim519@gmail.com" },
                { icon: <Github className="text-secondary" size={24} />, title: "GitHub", info: "github.com/khimweb", href: "https://github.com/khimweb", target: "_blank" },
                { icon: <MapPin className="text-primary" size={24} />, title: "University & Location", info: "BELTEI International University · Phnom Penh, Cambodia", href: "#" }
              ].map((item, i) => (
                <a key={i} href={item.href} target={item.target} rel="noreferrer" className="flex items-center gap-4 group">
                  <div className="w-13 h-13 p-3.5 rounded-xl glass flex items-center justify-center group-hover:scale-110 group-hover:border-primary/50 transition-all shadow-sm">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-xs uppercase tracking-wider">{item.title}</h4>
                    <p className="text-white font-medium text-base group-hover:text-primary transition-colors">{item.info}</p>
                  </div>
                </a>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal side="right" distance={90} delay={0.12}>
            <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Your Email</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
                <input required type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="Project Discussion" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea required name="message" value={formData.message} onChange={handleChange} rows={5} className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors resize-none" placeholder="Tell me about your project..." />
              </div>
              <button 
                disabled={status === 'loading'}
                className="w-full py-4 bg-gradient-to-r from-primary to-secondary rounded-xl text-dark font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-70"
              >
                {status === 'loading' ? <Loader2 className="animate-spin" /> : 
                 status === 'success' ? <><CheckCircle /> Sent Successfully!</> : 
                 <><Send size={20} /> Send Message</>}
              </button>
            </form>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};
