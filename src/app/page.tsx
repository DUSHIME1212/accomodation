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
  Coffee,
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
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    description: "Panoramic sea views with private sanctuary terrace.",
  },
  {
    id: "2",
    name: "Premium Family Apartment",
    location: "Coastal Row",
    price: 250,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    description: "Spacious multi-room luxury for the modern family.",
  },
  {
    id: "3",
    name: "Executive Beach Studio",
    location: "Private Bay",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80",
    description: "Sleek minimalism meets direct ocean access.",
  },
];

export default function HomePage() {
  const { t } = useLanguage();
  const mainRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. HERO ANIMATION: Cinematic text reveal
      const tl = gsap.timeline();
      tl.from(".hero-sub", { opacity: 0, y: 30, duration: 1, delay: 0.3 })
        .from(
          ".hero-title",
          { opacity: 0, y: 50, duration: 1.2, ease: "power4.out" },
          "-=0.7",
        )
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
    },
    { scope: mainRef },
  );

  return (
    <div
      ref={mainRef}
      className="bg-background text-foreground overflow-hidden"
    >
      {/* --- HERO SECTION --- */}
      <Hero t={t} />

      {/* --- WELCOME SECTION (Editorial Layout) --- */}
      <section
        id="welcome"
        className="border-border/10 border-b px-8 py-24 md:px-16 lg:px-32"
      >
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
          <div className="reveal lg:col-span-5">
            <span className="text-primary mb-4 block text-xs font-bold tracking-[0.2em] uppercase">
              {t.home.welcome.subtitle}
            </span>
            <h2 className="mb-8 font-serif text-4xl leading-[1.1] md:text-6xl">
              {t.home.welcome.title}
            </h2>
            <div className="text-muted-foreground space-y-6 text-lg leading-relaxed font-light">
              <p>{t.home.welcome.description1}</p>
              <p>{t.home.welcome.description2}</p>
            </div>
            <Button
              asChild
              className="group bg-primary text-primary-foreground mt-10 w-fit px-8 hover:brightness-110"
            >
              <Link
                href="/about"
                className="flex w-full items-center gap-4 text-[10px] font-bold tracking-[0.2em] uppercase lg:w-fit"
              >
                Our Heritage{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
              </Link>
            </Button>
          </div>

          <div className="relative grid grid-cols-2 gap-4 lg:col-span-7">
            <div className="zoom-img-container reveal aspect-[3/4] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1519046904884-53103b34b206"
                className="h-full w-full object-cover"
                alt="Luxury"
              />
            </div>
            <div className="zoom-img-container reveal mt-12 aspect-[3/4] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1545579133-99bb5ab189bd"
                className="h-full w-full object-cover"
                alt="Interior"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURED UNITS (Horizontal Card Aesthetic) --- */}
      <section className="bg-secondary/10 py-24">
        <div className="mb-16 flex items-end justify-between px-8 md:px-16 lg:px-32">
          <div className="reveal">
            <span className="text-muted-foreground mb-2 block text-xs tracking-[0.3em] uppercase">
              The Collection
            </span>
            <h2 className="font-serif text-4xl italic">Featured Suites</h2>
          </div>
          <Link
            href="/apartments"
            className="reveal border-foreground hover:text-primary hover:border-primary border-b pb-1 text-xs tracking-widest uppercase transition-colors"
          >
            View All Units
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 px-8 md:grid-cols-3 lg:px-32">
          {featuredApartments.map((apt) => (
            <div
              key={apt.id}
              className="reveal group bg-background border-border/10 hover:border-border/50 cursor-pointer border p-6 transition-all duration-500 hover:shadow-xl"
            >
              <div className="relative mb-6 aspect-[4/5] overflow-hidden">
                <img
                  src={apt.image}
                  className="h-full w-full object-cover grayscale-[20%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  alt={apt.name}
                />
              </div>
              <p className="text-muted-foreground mb-2 text-[10px] tracking-widest uppercase">
                {apt.location}
              </p>
              <h3 className="mb-4 font-serif text-2xl">{apt.name}</h3>
              <p className="text-muted-foreground mb-6 line-clamp-2 text-sm font-light">
                {apt.description}
              </p>
              <p className="font-serif text-lg">
                From ${apt.price}
                <span className="text-muted-foreground ml-1 font-sans text-xs uppercase">
                  / Night
                </span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- BOOKING SECTION (Clean & Focused) --- */}
      <section className="bg-secondary/5 text-foreground border-border/10 relative overflow-hidden border-y px-8 py-32 lg:px-32">
        <div className="pointer-events-none absolute top-0 right-0 h-full w-1/2 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative z-10 grid items-center gap-20 lg:grid-cols-2">
          <div className="reveal">
            <h2 className="mb-8 font-serif text-4xl leading-tight md:text-5xl">
              Reserve Your <br />
              <span className="italic">Experience</span>
            </h2>
            <ul className="space-y-6">
              {t.home.booking.benefits.map((item, i) => (
                <li
                  key={i}
                  className="text-muted-foreground flex items-center gap-4 font-light"
                >
                  <div className="-full bg-primary h-1.5 w-1.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal">
            <div className="bg-background border-border/20 border p-1 shadow-2xl">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      {/* --- AMENITIES --- */}
      <section className="bg-background px-8 py-24 lg:px-32">
        <div className="reveal mb-20 text-center">
          <h2 className="font-serif text-4xl">Refined Amenities</h2>
        </div>
        <div className="grid grid-cols-2 gap-12 md:grid-cols-3 lg:grid-cols-6">
          {[
            { icon: <Waves />, label: "Beach" },
            { icon: <LifeBuoy />, label: "Pool" },
            { icon: <Utensils />, label: "Dining" },
            { icon: <Wifi />, label: "Wi-Fi" },
            { icon: <Coffee />, label: "Lounge" },
            { icon: <MapPin />, label: "Guides" },
          ].map((item, i) => (
            <div
              key={i}
              className="reveal group flex flex-col items-center gap-4"
            >
              <div className="border-border -full group-hover:border-primary group-hover:text-primary flex h-12 w-12 items-center justify-center border transition-all duration-500">
                {item.icon}
              </div>
              <span className="text-foreground/70 text-[10px] font-bold tracking-widest uppercase">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <TestimonialsSection />
    </div>
  );
}
