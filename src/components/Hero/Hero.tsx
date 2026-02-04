"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function Hero({ t }: { t: any }) {
  const containerRef = useRef(null);
  const revealRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Curtain reveal for the image
      tl.fromTo(revealRef.current, 
        { scaleX: 1 }, 
        { scaleX: 0, transformOrigin: "right", duration: 1.5, delay: 0.5 }
      )
      .from(".hero-content > *", {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 1
      }, "-=0.8")
      .from(".hero-image", {
        scale: 1.2,
        duration: 2,
        ease: "power2.out"
      }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#FAF9F6] dark:bg-[#0c0c0c] overflow-hidden"
    >
      {/* --- TEXT SIDE (Left) --- */}
      <div className="lg:col-span-5 flex flex-col justify-center px-8 md:px-16 lg:px-24 z-10 pt-20">
        <div className="hero-content space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-black/20 dark:bg-white/20" />
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-primary/60 italic">
              Est. 2026
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl xl:text-8xl font-serif leading-[0.9] tracking-tighter">
            The <span className="italic">Pure</span> <br />
            Essence of <br />
            Respite.
          </h1>

          <p className="max-w-sm text-muted-foreground text-sm md:text-base font-light leading-relaxed tracking-wide">
            {t.hero.description}
          </p>

          <div className="pt-6 flex flex-col gap-4">
            <Link 
              href="/booking" 
              className="group flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] font-bold"
            >
              <div className="w-12 h-12 -full border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-500">
                <div className="w-2 h-2 bg-current -full" />
              </div>
              {t.hero.bookStay}
            </Link>
          </div>
        </div>
      </div>

      {/* --- IMAGE SIDE (Right) --- */}
      <div className="lg:col-span-7 relative h-[60vh] lg:h-full overflow-hidden">
        {/* The Reveal Curtain */}
        <div 
          ref={revealRef} 
          className="absolute inset-0 bg-[#FAF9F6] dark:bg-[#0c0c0c] z-20" 
        />
        
        <img 
          src="https://pbs.twimg.com/media/Gpzz3OUWIAAmWOd?format=jpg&name=4096x4096" 
          className="hero-image w-full h-full object-cover grayscale-[20%] contrast-[1.05]"
          alt="Luxury Interior"
        />
        
        {/* Floating Stat/Detail */}
        <div className="absolute bottom-12 right-12 z-30 bg-white/10 backdrop-blur-md p-6 border border-white/20 hidden md:block">
          <p className="text-[9px] uppercase tracking-[0.4em] text-white/60 mb-1">Location</p>
          <p className="text-xs text-white tracking-widest font-medium uppercase">Amalfi Coast, Italy</p>
        </div>
      </div>

      {/* Aesthetic Coordinates Decor */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2 hidden xl:block">
        <p className="text-[8px] uppercase tracking-[0.6em] text-black/20 dark:text-white/20 vertical-text py-12">
          40.6333° N, 14.6027° E
        </p>
      </div>
    </section>
  );
}