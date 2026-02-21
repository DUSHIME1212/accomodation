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
      { y: 0, opacity: 1, duration: 1.2, delay: 0.2 },
    ).fromTo(
      subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.8",
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-background relative overflow-hidden pt-24 pb-16"
    >
      {/* Background Subtle Texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <div className="relative z-10 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl">
          {/* Section Indicator */}
          <div className="mb-8 flex items-center gap-3 overflow-hidden">
            <div className="bg-primary/40 h-[1px] w-8" />
            <span className="text-primary/60 text-[10px] font-bold tracking-[0.5em] uppercase italic">
              Guest Services
            </span>
          </div>

          <h1
            ref={titleRef}
            className="text-foreground font-serif text-5xl leading-[1.1] tracking-tighter italic md:text-7xl lg:text-8xl"
          >
            Refining Your <br />
            <span className="text-primary/90">Experience.</span>
          </h1>

          <div className="mt-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <p
              ref={subtitleRef}
              className="text-muted-foreground max-w-md text-sm leading-relaxed font-light tracking-wide md:text-base"
            >
              Our reservation process is meticulously designed to anticipate
              your needs. Complete the following details to secure your curated
              stay at our premier residences.
            </p>

            {/* Aesthetic Detail: Coordinates or Data Stamp */}
            <div className="hidden text-right md:block">
              <p className="text-muted-foreground/40 font-mono text-[9px] tracking-[0.3em] uppercase">
                Lat: 40.7128° N <br /> Long: 74.0060° W
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modernist Abstract Decor */}
      <div className="-full border-primary/5 pointer-events-none absolute top-1/2 -right-20 h-96 w-96 scale-150 border dark:border-white/5" />
      <div className="from-primary/[0.02] pointer-events-none absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l to-transparent" />
    </section>
  );
}
