"use client";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function GalleryPreview() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal images on scroll with a staggered "rise"
      gsap.fromTo(".gallery-item", 
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          stagger: 0.1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Custom heights for an editorial feel
  const images = [
    { span: "md:col-span-2 md:row-span-2", height: "aspect-[4/5] md:aspect-auto" }, // Large Feature
    { span: "md:col-span-1 md:row-span-1", height: "aspect-square" },
    { span: "md:col-span-1 md:row-span-1", height: "aspect-square" },
    { span: "md:col-span-2 md:row-span-1", height: "aspect-video" }, // Wide Feature
    { span: "md:col-span-1 md:row-span-2", height: "aspect-[3/5] md:aspect-auto" }, // Tall Detail
    { span: "md:col-span-1 md:row-span-1", height: "aspect-square" },
  ];

  return (
    <section ref={sectionRef} className="py-32 bg-[#FAF9F6] dark:bg-[#080808] overflow-hidden">
      <div className="px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
        
        {/* Header: Offset Layout */}
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-20 border-b border-black/[0.05] dark:border-white/[0.05] pb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-primary/60 italic">Visions</span>
              <div className="h-px w-12 bg-primary/30" />
            </div>
            <h2 className="text-5xl md:text-7xl font-serif italic tracking-tighter leading-none mb-6">
              {t.gallery.title}
            </h2>
          </div>
          <p className="max-w-xs text-muted-foreground text-xs md:text-sm font-light leading-relaxed tracking-wide uppercase">
            {t.gallery.subtitle || "A visual journey through our meticulously crafted spaces."}
          </p>
        </div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {images.map((item, index) => (
            <div 
              key={index} 
              className={cn(
                "gallery-item relative overflow-hidden group bg-muted transition-all duration-1000",
                item.span,
                item.height
              )}
            >
              {/* Overlay Label for Hover */}
              <div className="absolute inset-0 z-10 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <span className="text-white text-[10px] uppercase tracking-[0.3em] font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                  Enlarge Detail
                </span>
              </div>

              <img 
                src={`https://images.unsplash.com/photo-1598605272254-16f0c0ecdfa5?w=1200&q=80`}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
              />
            </div>
          ))}
        </div>

        {/* Action: Circular Aesthetic Link */}
        <div className="mt-20 flex flex-col items-center">
          <Link 
            href="/gallery" 
            className="group flex flex-col items-center gap-4"
          >
            <div className="w-20 h-20 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-700">
              <ArrowRight className="w-6 h-6 stroke-[1px]" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.5em] font-black text-muted-foreground group-hover:text-foreground transition-colors">
               {t.amenitiesPage.viewFullGallery}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

