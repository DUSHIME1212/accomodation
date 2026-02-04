"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function BookingHeader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      titleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.2 }
    ).fromTo(
      subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.8"
    );
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative pt-24 pb-16 overflow-hidden bg-[#FCFBFA] dark:bg-[#080808]"
    >
      {/* Background Subtle Texture */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <div className="relative z-10 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl">
          {/* Section Indicator */}
          <div className="flex items-center gap-3 mb-8 overflow-hidden">
            <div className="h-[1px] w-8 bg-primary/40" />
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-primary/60 italic">
              Guest Services
            </span>
          </div>

          <h1 
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-serif italic tracking-tighter text-foreground leading-[1.1]"
          >
            Refining Your <br />
            <span className="text-primary/90">Experience.</span>
          </h1>

          <div className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <p 
              ref={subtitleRef}
              className="max-w-md text-muted-foreground text-sm md:text-base font-light leading-relaxed tracking-wide"
            >
              Our reservation process is meticulously designed to anticipate 
              your needs. Complete the following details to secure your 
              curated stay at our premier residences.
            </p>

            {/* Aesthetic Detail: Coordinates or Data Stamp */}
            <div className="hidden md:block text-right">
              <p className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground/40 font-mono">
                Lat: 40.7128° N <br /> Long: 74.0060° W
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modernist Abstract Decor */}
      <div className="absolute top-1/2 -right-20 w-96 h-96 -full border border-primary/5 dark:border-white/5 pointer-events-none scale-150" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/[0.02] to-transparent pointer-events-none" />
    </section>
  );
}