"use client";
import { useLanguage } from "@/components/LanguageContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function CallToAction() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle scale-down effect on scroll for the background
      gsap.fromTo(bgRef.current, 
        { scale: 1.1 },
        { 
          scale: 1, 
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 md:py-48 overflow-hidden bg-primary flex items-center justify-center"
    >
      {/* Cinematic Background */}
      <div className="absolute hidden inset-0 z-0">
        <img 
          ref={bgRef}
          src="https://images.unsplash.com/photo-1578683010236-d716f9759678?w=1920&q=80" 
          className="w-full h-full object-cover opacity-50 brightness-[0.4]"
          alt="Luxury Suite View"
        />
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
      </div>

      <div className="relative z-10 px-6 md:px-12 text-center max-w-4xl mx-auto">
        {/* Editorial Label */}
        <div className="flex flex-col items-center gap-4 mb-10 overflow-hidden">
          <span className="text-[10px] uppercase tracking-[0.6em] text-white/40 font-bold block animate-in fade-in slide-in-from-bottom-2 duration-1000">
            Reservations
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </div>

        {/* Headline: Serif and Spacious */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif italic text-white leading-[1.1] mb-8 tracking-tighter">
          Ready to experience <br /> 
          <span className="opacity-60">the horizon?</span>
        </h2>

        {/* Minimalist Subtext */}
        <p className="text-white/50 text-xs md:text-sm uppercase tracking-[0.3em] font-light max-w-lg mx-auto mb-14 leading-relaxed">
          {t.home.cta.description || "Limited seasonal availability. Secure your coastal sanctuary today."}
        </p>
        
        {/* Luxury Action: The Custom Button */}
        <div className="flex justify-center group">
          <Link href="/booking" className="relative">
            <div className="flex flex-col items-center gap-4 transition-transform duration-700 group-hover:-translate-y-2">
              <div className="w-20 h-20 rounded-full text-secondary border border-white/20 flex items-center justify-center transition-all duration-700 group-hover:border-white group-hover:bg-white group-hover:text-black">
                <ArrowRight className="w-6 h-6 stroke-[1px]" />
              </div>
              <span className="text-[11px] uppercase tracking-[0.4em] font-black text-white group-hover:text-secondary transition-colors">
                {t.home.cta.bookNow}
              </span>
            </div>
            
            {/* The "Orbit" Ring - Decorative circle around button */}
            <div className="absolute inset-[-15px] border border-white/5 rounded-full scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-1000" />
          </Link>
        </div>
      </div>
    </section>
  );
}