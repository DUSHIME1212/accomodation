"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { useLanguage } from "./LanguageContext";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sophia Martinez",
    location: "New York, USA",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    content: "My family and I had the most wonderful stay at Silver Horizon Hotel. The apartment was immaculate, with breathtaking sea views. The staff went above and beyond.",
    rating: 5
  },
  {
    id: 2,
    name: "Marco Rossi",
    location: "Rome, Italy",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    content: "Absolutely perfect location, steps away from the beach. The modern amenities combined with the traditional coastal charm created a truly magical experience.",
    rating: 5
  },
  {
    id: 3,
    name: "Emma Johnson",
    location: "London, UK",
    avatar: "https://images.unsplash.com/photo-1569913486515-b74bf7751574?w=150&h=150&fit=crop",
    content: "We spent a wonderful week at this beachfront paradise. The sunrise views from our terrace were worth the trip alone. Exceptionally clean and beautifully designed.",
    rating: 5
  },
];

export default function TestimonialsSection() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // High-end transition logic using GSAP
  const transitionTestimonial = (nextIndex: number) => {
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveIndex(nextIndex);
        gsap.fromTo(contentRef.current, 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
      }
    });

    tl.to(contentRef.current, { opacity: 0, y: -20, duration: 0.4, ease: "power3.in" });
  };

  const next = () => transitionTestimonial((activeIndex + 1) % testimonials.length);
  const prev = () => transitionTestimonial((activeIndex - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] py-32 px-8 md:px-16 lg:px-32 border-y border-black/5">
      {/* Aesthetic Background Element */}
      <Quote className="absolute top-10 left-10 w-64 h-64 text-black/[0.02] -z-0 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
            Guest Experiences
          </span>
          <h2 className="text-4xl md:text-5xl font-serif italic text-[#111111]">
            Voices of Silver Horizon
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center min-h-[400px]">
          {/* Image Reveal Section */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-80 overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out shadow-2xl">
              <img
                src={testimonials[activeIndex]?.avatar}
                alt={testimonials[activeIndex]?.name}
                className="w-full h-full object-cover transform scale-105"
              />
              <div className="absolute inset-0 border-[1px] border-white/20 m-4" />
            </div>
          </div>

          {/* Text Content Section */}
          <div className="lg:col-span-7" ref={contentRef}>
            <div className="flex mb-6 space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-[#D4AF37] text-[#D4AF37]" />
              ))}
            </div>

            <blockquote className="text-2xl md:text-3xl font-serif leading-relaxed text-[#333] mb-8 italic">
              &ldquo;{testimonials[activeIndex]?.content}&rdquo;
            </blockquote>

            <div>
              <h4 className="text-lg font-bold tracking-widest uppercase text-[#111111]">
                {testimonials[activeIndex]?.name}
              </h4>
              <p className="text-sm text-gray-400 uppercase tracking-widest mt-1">
                {testimonials[activeIndex]?.location}
              </p>
            </div>
          </div>
        </div>

        {/* Custom Navigational Controls */}
        <div className="flex items-center justify-between mt-16 pt-8 border-t border-black/5">
          <div className="flex space-x-4">
            <button
              onClick={prev}
              className="group flex items-center justify-center w-12 h-12 -full border border-black/10 hover:border-black transition-all"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={next}
              className="group flex items-center justify-center w-12 h-12 -full border border-black/10 hover:border-black transition-all"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => transitionTestimonial(index)}
                className={cn(
                  "text-[10px] uppercase tracking-[0.4em] font-bold transition-all",
                  activeIndex === index ? "text-[#D4AF37]" : "text-gray-300 hover:text-gray-500"
                )}
              >
                0{index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}