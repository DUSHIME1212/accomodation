"use client";
import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, Send, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/components/LanguageContext";
import { cn } from "@/lib/utils";

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFocused, setIsFocused] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0a0a0a] transition-colors duration-500">
      <main className="flex-1">
        {/* --- LUXE HERO HEADER --- */}
        <section className="relative pt-32 pb-20  border-b border-black/5 dark:border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="max-w-2xl animate-fade-in">
              <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.5em] font-bold mb-4 block">
                {t.contact.getInTouch}
              </span>
              <h1 className="text-5xl md:text-7xl font-serif italic text-[#111] dark:text-white mb-6 tracking-tight">
                {t.contact.title}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-lg font-light max-w-lg leading-relaxed">
                {t.contact.subtitle}
              </p>
            </div>
            <div className="hidden lg:block text-right pb-2">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Available 24/7</p>
              <p className="text-sm font-light italic font-serif text-[#D4AF37]">The Horizon Concierge</p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
            
            {/* --- CONTACT INFO (Side Gallery Style) --- */}
            <div className="lg:col-span-4 space-y-16 animate-fade-in [animation-delay:200ms]">
              <div className="space-y-10">
                <ContactInfoItem 
                  icon={<MapPin className="w-4 h-4" />} 
                  title={t.contact.address}
                  content={<>123 Seaside Boulevard<br />Costa Bella, 12345, Italy</>}
                />
                <ContactInfoItem 
                  icon={<Phone className="w-4 h-4" />} 
                  title={t.contact.phone}
                  content={<>+39 123 4567 890<br /><span className="text-[10px] opacity-60 italic">Direct Concierge Line</span></>}
                />
                <ContactInfoItem 
                  icon={<Mail className="w-4 h-4" />} 
                  title={t.contact.email}
                  content="reservations@silverhorizon.com"
                />
                <ContactInfoItem 
                  icon={<Clock className="w-4 h-4" />} 
                  title={t.contact.receptionHours}
                  content={<>{t.contact.checkInTime}<br />{t.contact.checkOutTime}</>}
                />
              </div>

              {/* Minimalist Map UI */}
              <div className="group relative aspect-square w-full grayscale hover:grayscale-0 transition-all duration-1000 overflow-hidden -sm border border-black/5">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1993.7132169085899!2d30.112374073944085!3d-1.9840520222091094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2srw!4v1746106914467!5m2!1sen!2srw"
                  className="w-full h-full object-cover"
                  style={{ border: 0 }} 
                  loading="lazy"
                  title="Hotel Map"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent pointer-events-none transition-colors" />
              </div>
            </div>

            {/* --- REFINED CONTACT FORM --- */}
            <div className="lg:col-span-8 animate-fade-in [animation-delay:400ms]">
              <div className="bg-white dark:bg-[#111] p-10 md:p-16 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-none border border-black/5 dark:border-white/5 relative overflow-hidden">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <FloatingInput 
                        label={t.contact.fullName}
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => setIsFocused('name')}
                        onBlur={() => setIsFocused(null)}
                      />
                      <FloatingInput 
                        label={t.contact.email}
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setIsFocused('email')}
                        onBlur={() => setIsFocused(null)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <FloatingInput 
                        label={t.contact.phoneNumber}
                        id="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onFocus={() => setIsFocused('phone')}
                        onBlur={() => setIsFocused(null)}
                      />
                      <FloatingInput 
                        label={t.contact.subject}
                        id="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        onFocus={() => setIsFocused('subject')}
                        onBlur={() => setIsFocused(null)}
                      />
                    </div>

                    <div className="relative pt-4">
                      <Label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-4 block">
                        {t.contact.message}
                      </Label>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={t.contact.howCanWeHelp}
                        className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-4 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none min-h-[120px] font-light italic font-serif text-lg"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full h-16 bg-black dark:bg-white text-white dark:text-black -none group overflow-hidden relative">
                      <span className="relative z-10 text-[11px] uppercase tracking-[0.3em] font-bold flex items-center justify-center">
                        {t.contact.send}
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Button>
                  </form>
                ) : (
                  <div className="py-20 text-center space-y-6">
                    <div className="w-16 h-16 border border-[#D4AF37] -full flex items-center justify-center mx-auto mb-8">
                      <Check className="w-6 h-6 text-[#D4AF37] animate-pulse" />
                    </div>
                    <h3 className="text-3xl font-serif italic">{t.contact.messageSent}</h3>
                    <p className="text-gray-400 font-light max-w-xs mx-auto text-sm tracking-wide">
                      {t.contact.thankYou}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

/* --- HELPER COMPONENTS --- */

function ContactInfoItem({ icon, title, content }: { icon: any, title: string, content: any }) {
  return (
    <div className="group space-y-3">
      <div className="flex items-center gap-3">
        <div className="text-[#D4AF37] group-hover:scale-110 transition-transform duration-500">
          {icon}
        </div>
        <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">{title}</h3>
      </div>
      <p className="text-[#111] dark:text-gray-300 font-serif italic text-lg leading-relaxed pl-7">
        {content}
      </p>
    </div>
  );
}

function FloatingInput({ label, id, type = "text", value, onChange, onFocus, onBlur }: any) {
  return (
    <div className="relative space-y-2">
      <Label htmlFor={id} className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 block">
        {label}
      </Label>
      <Input 
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className="bg-transparent border-0 border-b border-black/10 dark:border-white/10 -none px-0 h-12 focus-visible:ring-0 focus-visible:border-[#D4AF37] transition-colors font-light text-base"
        required
      />
    </div>
  );
}