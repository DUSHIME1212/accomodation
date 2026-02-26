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
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    content:
      "My family and I had the most wonderful stay at Silver Horizon Hotel. The apartment was immaculate, with breathtaking sea views. The staff went above and beyond.",
    rating: 5,
  },
  {
    id: 2,
    name: "Marco Rossi",
    location: "Rome, Italy",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    content:
      "Absolutely perfect location, steps away from the beach. The modern amenities combined with the traditional coastal charm created a truly magical experience.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Johnson",
    location: "London, UK",
    avatar:
      "https://images.unsplash.com/photo-1569913486515-b74bf7751574?w=150&h=150&fit=crop",
    content:
      "We spent a wonderful week at this beachfront paradise. The sunrise views from our terrace were worth the trip alone. Exceptionally clean and beautifully designed.",
    rating: 5,
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
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        );
      },
    });

    tl.to(contentRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power3.in",
    });
  };

  const next = () =>
    transitionTestimonial((activeIndex + 1) % testimonials.length);
  const prev = () =>
    transitionTestimonial(
      (activeIndex - 1 + testimonials.length) % testimonials.length,
    );

  return (
    <section className="bg-secondary/10 border-border/10 relative overflow-hidden border-y px-8 py-32 md:px-16 lg:px-32">
      {/* Aesthetic Background Element */}
      <Quote className="text-foreground/[0.03] pointer-events-none absolute top-10 left-10 -z-0 h-64 w-64" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mb-20 text-center">
          <span className="text-primary mb-4 block text-xs font-bold tracking-[0.3em] uppercase">
            Guest Experiences
          </span>
          <h2 className="text-foreground font-serif text-4xl italic md:text-5xl">
            Voices of Silver Horizon
          </h2>
        </div>

        <div className="grid min-h-[400px] grid-cols-1 items-center gap-16 lg:grid-cols-12">
          {/* Image Reveal Section */}
          <div className="flex justify-center lg:col-span-5">
            <div className="relative h-80 w-64 overflow-hidden shadow-2xl grayscale transition-all duration-1000 ease-in-out hover:grayscale-0">
              <img
                src={testimonials[activeIndex]?.avatar}
                alt={testimonials[activeIndex]?.name}
                className="h-full w-full scale-105 transform object-cover"
              />
              <div className="absolute inset-0 m-4 border-[1px] border-white/20" />
            </div>
          </div>

          {/* Text Content Section */}
          <div className="lg:col-span-7" ref={contentRef}>
            <div className="mb-6 flex space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="fill-primary text-primary h-3 w-3" />
              ))}
            </div>

            <blockquote className="text-foreground/80 mb-8 font-serif text-2xl leading-relaxed italic md:text-3xl">
              &ldquo;{testimonials[activeIndex]?.content}&rdquo;
            </blockquote>

            <div>
              <h4 className="text-foreground text-lg font-bold tracking-widest uppercase">
                {testimonials[activeIndex]?.name}
              </h4>
              <p className="text-muted-foreground mt-1 text-sm tracking-widest uppercase">
                {testimonials[activeIndex]?.location}
              </p>
            </div>
          </div>
        </div>

        {/* Custom Navigational Controls */}
        <div className="border-border/10 mt-16 flex items-center justify-between border-t pt-8">
          <div className="flex space-x-4">
            <button
              onClick={prev}
              className="group -full border-border hover:border-foreground flex h-12 w-12 items-center justify-center border transition-all"
            >
              <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            </button>
            <button
              onClick={next}
              className="group -full border-border hover:border-foreground flex h-12 w-12 items-center justify-center border transition-all"
            >
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="hidden items-center space-x-8 md:flex">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => transitionTestimonial(index)}
                className={cn(
                  "text-[10px] font-bold tracking-[0.4em] uppercase transition-all",
                  activeIndex === index
                    ? "text-primary"
                    : "text-muted-foreground/30 hover:text-foreground",
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
