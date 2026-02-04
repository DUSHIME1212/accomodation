"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  ArrowRight, 
  ChevronDown, 
  Wifi, 
  Utensils, 
  Waves, 
  LifeBuoy, 
  MapPin, 
  Coffee 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import ApartmentCard from "@/components/ApartmentCard";
import BookingForm from "@/components/BookingForm";
import TestimonialsSection from "@/components/TestimonialsSection";
import { useLanguage } from "@/components/LanguageContext";
import Hero from "@/components/Hero/Hero";

// Registration for GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const featuredApartments = [
  {
    id: "1",
    name: "Deluxe Sea View Suite",
    location: "Beachfront",
    price: 180,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    description: "Panoramic sea views with private sanctuary terrace."
  },
  {
    id: "2",
    name: "Premium Family Apartment",
    location: "Coastal Row",
    price: 250,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    description: "Spacious multi-room luxury for the modern family."
  },
  {
    id: "3",
    name: "Executive Beach Studio",
    location: "Private Bay",
    price: 150,
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80",
    description: "Sleek minimalism meets direct ocean access."
  },
];

export default function HomePage() {
  const { t } = useLanguage();
  const mainRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. HERO ANIMATION: Cinematic text reveal
    const tl = gsap.timeline();
    tl.from(".hero-sub", { opacity: 0, y: 30, duration: 1, delay: 0.3 })
      .from(".hero-title", { opacity: 0, y: 50, duration: 1.2, ease: "power4.out" }, "-=0.7")
      .from(".hero-desc", { opacity: 0, duration: 1 }, "-=0.5")
      .from(".hero-btns", { opacity: 0, y: 20, duration: 0.8 }, "-=0.8");

    // 2. PARALLAX EFFECT: Hero background
    gsap.to(".hero-bg", {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // 3. REVEAL ANIMATIONS: Staggered entry for all sections
    const reveals = gsap.utils.toArray(".reveal");
    reveals.forEach((it: any) => {
      gsap.from(it, {
        y: 80,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: it,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // 4. IMAGE ZOOM: Feature images
    gsap.utils.toArray(".zoom-img-container").forEach((container: any) => {
      const img = container.querySelector("img");
      gsap.to(img, {
        scale: 1.2,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          scrub: true,
          start: "top bottom",
          end: "bottom top",
        },
      });
    });
  }, { scope: mainRef });

  return (
    <div ref={mainRef} className="bg-[#FAF9F6] text-[#111111] overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <Hero t={
        t
      } />

      {/* --- WELCOME SECTION (Editorial Layout) --- */}
      <section id="welcome" className="py-24 px-8 md:px-16 lg:px-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 reveal">
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] mb-4 block">
              {t.home.welcome.subtitle}
            </span>
            <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-[1.1]">
              {t.home.welcome.title}
            </h2>
            <div className="space-y-6 text-gray-600 leading-relaxed text-lg font-light">
              <p>{t.home.welcome.description1}</p>
              <p>{t.home.welcome.description2}</p>
            </div>
            <Button asChild className="mt-10  group px-8 w-fit hover:no-underline">
              <Link href="/about" className="flex w-full lg:w-fit items-center gap-4 uppercase tracking-[0.2em] text-xs font-bold">
                Our Heritage <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="lg:col-span-7 relative grid grid-cols-2 gap-4">
            <div className="zoom-img-container aspect-[3/4] overflow-hidden reveal">
              <img src="https://images.unsplash.com/photo-1519046904884-53103b34b206" className="w-full h-full object-cover" alt="Luxury" />
            </div>
            <div className="zoom-img-container aspect-[3/4] overflow-hidden mt-12 reveal">
              <img src="https://images.unsplash.com/photo-1545579133-99bb5ab189bd" className="w-full h-full object-cover" alt="Interior" />
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURED UNITS (Horizontal Card Aesthetic) --- */}
      <section className="py-24 bg-white">
        <div className="px-8 md:px-16 lg:px-32 mb-16 flex justify-between items-end">
          <div className="reveal">
            <span className="text-gray-400 text-xs uppercase tracking-[0.3em] mb-2 block">The Collection</span>
            <h2 className="text-4xl font-serif italic">Featured Suites</h2>
          </div>
          <Link href="/apartments" className="reveal text-xs uppercase tracking-widest border-b border-black pb-1 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors">
            View All Units
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 px-4 lg:px-8">
          {featuredApartments.map((apt) => (
            <div key={apt.id} className="reveal group cursor-pointer bg-[#FAF9F6] p-6 transition-colors duration-500 hover:bg-white">
              <div className="relative overflow-hidden aspect-[4/5] mb-6">
                <img 
                  src={apt.image} 
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                  alt={apt.name} 
                />
              </div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">{apt.location}</p>
              <h3 className="text-2xl font-serif mb-4">{apt.name}</h3>
              <p className="text-sm text-gray-500 font-light mb-6 line-clamp-2">{apt.description}</p>
              <p className="font-serif text-lg">From ${apt.price}<span className="text-xs text-gray-400 font-sans uppercase ml-1">/ Night</span></p>
            </div>
          ))}
        </div>
      </section>

      {/* --- BOOKING SECTION (Clean & Focused) --- */}
      <section className="py-32 px-8 lg:px-32 bg-[#111111] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
           <img src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6" className="w-full h-full object-cover" />
        </div>
        <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="reveal">
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Reserve Your <br/><span className="italic">Experience</span></h2>
            <ul className="space-y-6">
              {t.home.booking.benefits.map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-white/70 font-light">
                  <div className="w-1.5 h-1.5 -full bg-[#D4AF37]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal">
             <div className="bg-white p-1 -none">
                <BookingForm />
             </div>
          </div>
        </div>
      </section>

      {/* --- AMENITIES --- */}
      <section className="py-24 px-8 lg:px-32 bg-[#FAF9F6]">
        <div className="text-center mb-20 reveal">
          <h2 className="text-4xl font-serif">Refined Amenities</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12">
          {[
            { icon: <Waves />, label: "Beach" },
            { icon: <LifeBuoy />, label: "Pool" },
            { icon: <Utensils />, label: "Dining" },
            { icon: <Wifi />, label: "Wi-Fi" },
            { icon: <Coffee />, label: "Lounge" },
            { icon: <MapPin />, label: "Guides" }
          ].map((item, i) => (
            <div key={i} className="reveal flex flex-col items-center gap-4 group">
              <div className="w-12 h-12 flex items-center justify-center border border-black/10 -full group-hover:border-[#D4AF37] group-hover:text-[#D4AF37] transition-all duration-500">
                {item.icon}
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <TestimonialsSection />
      
    </div>
  );
}