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
      gsap.fromTo(
        bgRef.current,
        { scale: 1.1 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-primary relative flex items-center justify-center overflow-hidden py-32 md:py-48"
    >
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 hidden">
        <img
          ref={bgRef}
          src="https://images.unsplash.com/photo-1578683010236-d716f9759678?w=1920&q=80"
          className="h-full w-full object-cover opacity-50 brightness-[0.4]"
          alt="Luxury Suite View"
        />
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center md:px-12">
        {/* Editorial Label */}
        <div className="mb-10 flex flex-col items-center gap-4 overflow-hidden">
          <span className="animate-in fade-in slide-in-from-bottom-2 block text-[10px] font-bold tracking-[0.6em] text-white/40 uppercase duration-1000">
            Reservations
          </span>
          <div className="h-12 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </div>

        {/* Headline: Serif and Spacious */}
        <h2 className="mb-8 font-serif text-4xl leading-[1.1] tracking-tighter text-white italic md:text-6xl lg:text-7xl">
          Ready to experience <br />
          <span className="opacity-60">the horizon?</span>
        </h2>

        {/* Minimalist Subtext */}
        <p className="mx-auto mb-14 max-w-lg text-xs leading-relaxed font-light tracking-[0.3em] text-white/50 uppercase md:text-sm">
          {t.home.cta.description ||
            "Limited seasonal availability. Secure your coastal sanctuary today."}
        </p>

        {/* Luxury Action: The Custom Button */}
        <div className="group flex justify-center">
          <Link href="/booking" className="relative">
            <div className="flex flex-col items-center gap-4 transition-transform duration-700 group-hover:-translate-y-2">
              <div className="-full text-secondary flex h-20 w-20 items-center justify-center rounded-none border border-white/20 transition-all duration-700 group-hover:border-white group-hover:bg-white group-hover:text-black">
                <ArrowRight className="h-6 w-6 stroke-[1px]" />
              </div>
              <span className="group-hover:text-secondary text-[11px] font-black tracking-[0.4em] text-white uppercase transition-colors">
                {t.home.cta.bookNow}
              </span>
            </div>

            {/* The "Orbit" Ring - Decorative circle around button */}
            <div className="-full absolute inset-[-15px] scale-90 rounded-none border border-white/5 opacity-0 transition-all duration-1000 group-hover:scale-100 group-hover:opacity-100" />
          </Link>
        </div>
      </div>
    </section>
  );
}
