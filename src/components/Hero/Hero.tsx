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
      tl.fromTo(
        revealRef.current,
        { scaleX: 1 },
        { scaleX: 0, transformOrigin: "right", duration: 1.5, delay: 0.5 },
      )
        .from(
          ".hero-content > *",
          {
            y: 30,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
          },
          "-=0.8",
        )
        .from(
          ".hero-image",
          {
            scale: 1.2,
            duration: 2,
            ease: "power2.out",
          },
          0,
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-background relative grid min-h-screen grid-cols-1 overflow-hidden lg:grid-cols-12"
    >
      {/* --- TEXT SIDE (Left) --- */}
      <div className="z-10 flex flex-col justify-center px-8 pt-20 md:px-16 lg:col-span-5 lg:px-24">
        <div className="hero-content space-y-8">
          <div className="flex items-center gap-4">
            <div className="bg-border h-px w-12" />
            <span className="text-primary text-[10px] font-bold tracking-[0.5em] uppercase italic">
              Est. 2026
            </span>
          </div>

          <h1 className="text-foreground font-serif text-6xl leading-[0.9] tracking-tighter md:text-7xl xl:text-8xl">
            The <span className="italic">Pure</span> <br />
            Essence of <br />
            Respite.
          </h1>

          <p className="text-muted-foreground max-w-sm text-sm leading-relaxed font-light tracking-wide md:text-base">
            {t.hero.description}
          </p>

          <div className="flex flex-col gap-4 pt-6">
            <Link
              href="/booking"
              className="group text-foreground flex items-center gap-4 text-[11px] font-bold tracking-[0.3em] uppercase"
            >
              <div className="-full border-border group-hover:bg-foreground group-hover:text-background flex h-12 w-12 items-center justify-center border transition-all duration-500">
                <div className="-full h-2 w-2 bg-current" />
              </div>
              {t.hero.bookStay}
            </Link>
          </div>
        </div>
      </div>

      {/* --- IMAGE SIDE (Right) --- */}
      <div className="relative h-[60vh] overflow-hidden lg:col-span-7 lg:h-full">
        {/* The Reveal Curtain */}
        <div ref={revealRef} className="bg-background absolute inset-0 z-20" />

        <img
          src="https://pbs.twimg.com/media/Gpzz3OUWIAAmWOd?format=jpg&name=4096x4096"
          className="hero-image h-full w-full object-cover contrast-[1.05] grayscale-[20%]"
          alt="Luxury Interior"
        />
        {/* Floating Stat/Detail */}
        <div className="border-border bg-background absolute right-12 bottom-12 z-30 hidden border p-6 backdrop-blur-md md:block">
          <p className="text-foreground/60 mb-1 text-[9px] tracking-[0.4em] uppercase">
            Location
          </p>
          <p className="text-foreground text-xs font-medium tracking-widest uppercase">
            Amalfi Coast, Italy
          </p>
        </div>
      </div>

      {/* Aesthetic Coordinates Decor */}
      <div className="absolute top-1/2 left-4 hidden -translate-y-1/2 xl:block">
        <p className="vertical-text text-foreground/20 py-12 text-[8px] tracking-[0.6em] uppercase">
          40.6333° N, 14.6027° E
        </p>
      </div>
    </section>
  );
}
