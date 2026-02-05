"use client";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/components/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AmenitiesHero() {
  const { t } = useLanguage();
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Parallax effect on the background image
    gsap.to(imageRef.current, {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: "#amenities-hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Subtle entrance for typography
    gsap.fromTo(
      ".reveal-item",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power4.out" }
    );
  }, []);

  return (
    <section 
      id="amenities-hero"
      className="relative h-[100vh] min-h-[500px] overflow-hidden bg-black flex items-center"
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0">
        <img 
          ref={imageRef}
          src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=80" 
          className="w-full h-[120%] object-cover opacity-60 scale-105"
          alt="Luxury Resort"
        />
        {/* Advanced Gradient: From bottom and left to create a "Stage" for text */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-primary/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FAF9F6] dark:to-[#080808] opacity-100 h-32 bottom-0" />
      </div>

      <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 xl:px-32">
        <div className="max-w-4xl" ref={textRef}>
          {/* Tagline with Line */}
          <div className="flex items-center gap-4 mb-8 reveal-item">
            <div className="h-px w-12 bg-primary/60" />
            <span className="text-[10px] uppercase tracking-[0.5em] font-black text-white italic">
              The Collection
            </span>
          </div>

          {/* Headline: Serif, Massively Scaled, Tracking Tight */}
          <h1 className="reveal-item text-6xl md:text-8xl lg:text-9xl font-serif text-primary leading-[0.85] tracking-tighter mb-10">
            Curation <br />
            <span className="italic font-light text-white/60">of Comfort.</span>
          </h1>

          {/* Subtitle: High Contrast & Narrower column */}
          <div className="reveal-item flex flex-col md:flex-row md:items-end gap-8">
            <p className="max-w-md text-white/60 text-sm md:text-lg font-light leading-relaxed tracking-wide border-l border-white/10 pl-6">
              {t.amenitiesPage.subtitle || "A meticulous selection of world-class facilities designed for the discerning traveler."}
            </p>
            
            {/* Aesthetic Coordinate Label */}
            <span className="hidden lg:block text-[9px] uppercase tracking-[0.4em] text-white/20 font-mono">
              Luxury Refined / Amenity Suite 04
            </span>
          </div>
        </div>
      </div>

      {/* Modernist Vertical Scroll Indicator */}
      <div className="absolute right-12 bottom-12 hidden lg:flex flex-col items-center gap-6">
        <span className="[writing-mode:vertical-lr] text-[9px] uppercase tracking-[0.5em] text-white/40 font-bold">
          Scroll to explore
        </span>
        <div className="w-px h-24 bg-gradient-to-b from-primary/60 to-transparent" />
      </div>
    </section>
  );
}