"use client";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/components/LanguageContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const { t } = useLanguage();
  const location = usePathname();
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gentle floating animation for the entire content block
      gsap.to(".floating-content", {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // Staggered reveal
      gsap.from(".reveal", {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "power4.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-[#FAF9F6] dark:bg-[#080808] overflow-hidden px-6"
    >
      {/* --- BACKGROUND DECOR --- */}
      {/* Large, Faded "404" acting as a watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <h1 className="text-[30vw] font-serif italic text-black/[0.02] dark:text-white/[0.02] leading-none">
          404
        </h1>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="floating-content relative z-10 max-w-2xl w-full text-center">
        
        {/* Aesthetic Marker */}
        <div className="reveal flex flex-col items-center gap-4 mb-12">
          <span className="text-[10px] uppercase tracking-[0.6em] text-primary/60 font-bold italic">
            Unexpected Journey
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-primary/40 to-transparent" />
        </div>

        {/* Title: Sophisticated Serif */}
        <h2 className="reveal text-5xl md:text-7xl font-serif italic tracking-tighter text-foreground leading-tight mb-8">
          A moment <br /> 
          <span className="text-muted-foreground/40 font-light">out of time.</span>
        </h2>

        {/* Description: Wide spacing, light weight */}
        <p className="reveal text-muted-foreground/70 text-xs md:text-sm uppercase tracking-[0.3em] font-light max-w-md mx-auto mb-16 leading-relaxed">
          {t.notFound.description || "The path you seek has drifted into the horizon. Let us guide you back to your sanctuary."}
        </p>

        {/* Action: The Luxury Back-Link */}
        <div className="reveal flex justify-center">
          <Link 
            href="/" 
            className="group relative flex flex-col items-center gap-6"
          >
            <div className="w-16 h-16 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-700">
              <ArrowLeft className="w-5 h-5 stroke-[1.25px]" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-muted-foreground group-hover:text-foreground transition-colors">
              {t.notFound.returnHome}
            </span>
          </Link>
        </div>
      </div>

      {/* --- AMBIENT DECOR --- */}
      {/* Abstract drifting circles */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
};

export default NotFound;