"use client";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import Link from "next/link";

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#111111] text-white pt-24 pb-12 px-8 md:px-16 lg:px-32">
      <div className="max-w-7xl mx-auto">
        {/* --- TOP SECTION: BRANDING --- */}
        <div className="mb-20">
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white/10 leading-none select-none">
            Silver Horizon
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          {/* Mission & Social */}
          <div className="md:col-span-4 space-y-8">
            <h4 className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em]">
              The Vision
            </h4>
            <p className="text-white/60 font-light leading-relaxed text-lg">
              {t.footer.description}
            </p>
            <div className="flex space-x-6 text-white">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" }
              ].map((social) => (
                <a 
                  key={social.label}
                  href="#" 
                  className="text-white hover:text-[#D4AF37] transition-all duration-500 flex items-center gap-1 group"
                >
                  <social.Icon size={16} strokeWidth={1.5} />
                  <span className="text-[10px] uppercase tracking-widest hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity">
                    {social.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Navigation */}
          <div className="md:col-span-2 space-y-8">
            <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">
              Explore
            </h4>
            <ul className="space-y-4">
              {[
                { name: t.nav.home, path: "/" },
                { name: t.nav.apartments, path: "/apartments" },
                { name: t.nav.amenities, path: "/amenities" },
                { name: t.nav.gallery, path: "/gallery" },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.path} 
                    className="text-white/70 hover:text-white transition-colors text-sm font-light flex items-center group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 ml-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3 space-y-8">
            <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">
              Inquiries
            </h4>
            <ul className="space-y-6 text-sm font-light text-white/70">
              <li className="flex gap-4">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>123 Coastal Avenue<br />Kigali, Rwanda</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>+250 782 454 192</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="border-b border-white/10 hover:border-[#D4AF37] transition-colors cursor-pointer">
                  concierge@silverhorizon.com
                </span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="md:col-span-3 space-y-8">
            <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">
              The Journal
            </h4>
            <p className="text-white/50 text-xs font-light leading-relaxed">
              Join our curated list for exclusive seasonal offers and coastal insights.
            </p>
            <form className="relative group">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-transparent border-b border-white/20 py-3 text-[10px] tracking-[0.2em] outline-none focus:border-[#D4AF37] transition-colors placeholder:text-white/20"
                required 
              />
              <button 
                type="submit" 
                className="absolute right-0 bottom-3 text-white/40 hover:text-white transition-colors"
              >
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
        
        {/* --- BOTTOM BAR --- */}
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
            &copy; {currentYear} Silver Horizon Luxury Hotel Group
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-white/30">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}