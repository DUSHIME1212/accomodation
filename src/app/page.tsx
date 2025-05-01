"use client";
import type { ApartmentProps } from "@/components/ApartmentCard";
import ApartmentCard from "@/components/ApartmentCard";
import BookingForm from "@/components/BookingForm";
import { useLanguage } from "@/components/LanguageContext";
import TestimonialsSection from "@/components/TestimonialsSection";
import { Button } from "@/components/ui/button";
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
import Link from "next/link";
import { useEffect, useState } from "react";

const featuredApartments: ApartmentProps[] = [
  {
    id: "1",
    name: "Deluxe Sea View Suite",
    description:
      "Luxurious suite with panoramic sea views, modern amenities, and a private balcony.",
    price: 180,
    capacity: 2,
    size: 45,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
    location: "Beachfront",
    features: [
      "Wi-Fi",
      "Kitchen",
      "Bathroom",
      "Air Conditioning",
      "TV",
      "Balcony",
    ],
  },
  {
    id: "2",
    name: "Premium Family Apartment",
    description:
      "Spacious apartment ideal for families, with full kitchen and stunning coastal views.",
    price: 250,
    capacity: 4,
    size: 75,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    location: "Second row",
    features: [
      "Wi-Fi",
      "Kitchen",
      "Bathroom",
      "Air Conditioning",
      "TV",
      "Washing Machine",
    ],
  },
  {
    id: "3",
    name: "Executive Beach Studio",
    description:
      "Elegant studio with direct beach access, modern design, and premium finishes.",
    price: 150,
    capacity: 2,
    size: 35,
    image:
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&h=600&fit=crop",
    location: "Beachfront",
    features: ["Wi-Fi", "Kitchenette", "Bathroom", "Air Conditioning", "TV"],
  },
];

export default function HomePage() {
  const { t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: <Waves className="text-primary h-8 w-8" />,
      title: t.home.amenities.features.beachfront.title,
      description: t.home.amenities.features.beachfront.description,
    },
    {
      icon: <LifeBuoy className="text-primary h-8 w-8" />,
      title: t.home.amenities.features.pools.title,
      description: t.home.amenities.features.pools.description,
    },
    {
      icon: <Utensils className="text-primary h-8 w-8" />,
      title: t.home.amenities.features.restaurant.title,
      description: t.home.amenities.features.restaurant.description,
    },
    {
      icon: <Wifi className="text-primary h-8 w-8" />,
      title: t.home.amenities.features.wifi.title,
      description: t.home.amenities.features.wifi.description,
    },
    {
      icon: <Coffee className="text-primary h-8 w-8" />,
      title: t.home.amenities.features.bar.title,
      description: t.home.amenities.features.bar.description,
    },
    {
      icon: <MapPin className="text-primary h-8 w-8" />,
      title: t.home.amenities.features.location.title,
      description: t.home.amenities.features.location.description,
    },
  ];

  // Calculate parallax effect
  const backgroundY = scrollY * 0.5;
  const contentY = scrollY * 0.2;
  return (
    <div className="">
      <section className="relative h-screen overflow-hidden">
        {/* Background image with parallax */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1615571022219-eb45cf7faa9d?q=80&w=1920&auto=format&fit=crop')",
            transform: `translateY(${backgroundY}px)`,
            backgroundPosition: `center ${50 + scrollY * 0.05}%`,
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />

        {/* Content */}
        <div
          className="relative flex h-full flex-col items-center justify-center px-4 text-center"
          style={{ transform: `translateY(${contentY}px)` }}
        >
          <div className="animate-fade-in max-w-3xl">
            <span className="mb-4 inline-block border-b border-white/30 pb-2 text-lg tracking-wide text-white/90">
              {t.hero.subtitle}
            </span>
            <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              {t.hero.title}
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
              {t.hero.description}
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                variant="heroSolid"
                className="min-w-[200px] transform rounded-full transition-all duration-300 hover:translate-y-[-2px]"
              >
                <Link href="/booking">{t.hero.bookStay}</Link>
              </Button>
              <Button
                asChild
                variant="hero"
                size="lg"
                className="min-w-[200px] transform rounded-full transition-all duration-300 hover:translate-y-[-2px]"
              >
                <Link href="/apartments">{t.hero.exploreApartments}</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 transform animate-bounce text-white">
          <a
            href="#welcome"
            className="flex flex-col items-center opacity-70 transition-opacity hover:opacity-100"
          >
            <span className="mb-2 text-sm">{t.hero.scrollDown}</span>
            <ChevronDown className="h-6 w-6" />
          </a>
        </div>

        {/* Animated wave */}
        <div className="absolute right-0 bottom-0 left-0 h-24 overflow-hidden">
          <svg
            className="dark:fill-background absolute bottom-0 h-24 w-full fill-white"
            preserveAspectRatio="none"
            viewBox="0 0 1440 74"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,37.1L40,34.5C80,32,160,27,240,29.6C320,32,400,42,480,42.9C560,44,640,35,720,32.1C800,30,880,34,960,40.8C1040,47,1120,56,1200,56.6C1280,57,1360,48,1400,43.3L1440,39.1L1440,74L1400,74C1360,74,1280,74,1200,74C1120,74,1040,74,960,74C880,74,800,74,720,74C640,74,560,74,480,74C400,74,320,74,240,74C160,74,80,74,40,74L0,74Z"
              className="animate-wave opacity-50"
            />
            <path
              d="M0,37.1L40,34.5C80,32,160,27,240,29.6C320,32,400,42,480,42.9C560,44,640,35,720,32.1C800,30,880,34,960,40.8C1040,47,1120,56,1200,56.6C1280,57,1360,48,1400,43.3L1440,39.1L1440,74L1400,74C1360,74,1280,74,1200,74C1120,74,1040,74,960,74C880,74,800,74,720,74C640,74,560,74,480,74C400,74,320,74,240,74C160,74,80,74,40,74L0,74Z"
              className="animate-wave opacity-100 [animation-delay:-4s]"
            />
          </svg>
        </div>
      </section>

      {/* Welcome Section */}
      <section
        id="welcome"
        className="bg-background px-8 py-16 md:px-16 lg:px-32"
      >
        <div className="">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="animate-fade-in [animation-delay:100ms]">
              <span className="text-primary text-sm font-medium tracking-wider uppercase">
                {t.home.welcome.subtitle}
              </span>
              <h2 className="mt-2 mb-6 text-3xl font-bold md:text-4xl">
                {t.home.welcome.title}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t.home.welcome.description1}
              </p>
              <p className="text-muted-foreground mb-8">
                {t.home.welcome.description2}
              </p>
              <Button asChild className="btn-primary">
                <Link href="/about">
                  {t.home.welcome.learnMore}{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="animate-fade-in relative [animation-delay:300ms]">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=600&fit=crop"
                  alt="Seaside view"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-2/3 overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1545579133-99bb5ab189bd?w=400&h=300&fit=crop"
                  alt="Luxury apartment interior"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-1/2 overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=300&fit=crop"
                  alt="Pool view"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="from-sea-light dark:from-sea-dark dark:to-background relative overflow-hidden bg-gradient-to-r to-white px-8 py-20 md:px-16 lg:px-32">
        <div className="relative z-10">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="animate-fade-in">
              <span className="text-primary text-sm font-medium tracking-wider uppercase">
                {t.home.booking.subtitle}
              </span>
              <h2 className="mt-2 mb-6 text-3xl font-bold md:text-4xl">
                {t.home.booking.title}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t.home.booking.description}
              </p>
              <ul className="mb-8 space-y-3">
                {t.home.booking.benefits.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <div className="bg-primary/10 text-primary mr-3 flex h-5 w-5 items-center justify-center rounded-full">
                      <ArrowRight className="h-3 w-3" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <BookingForm />
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 h-full w-1/3 opacity-10">
          <div className="bg-primary/50 absolute top-10 right-10 h-64 w-64 rounded-full blur-3xl" />
          <div className="bg-sea-light absolute right-40 bottom-10 h-48 w-48 rounded-full blur-3xl" />
        </div>
      </section>
      {/* Featured Apartments */}
      <section className="section px-8 md:px-16 lg:px-32">
        <div className="">
          <div className="animate-fade-in mx-auto mb-12 max-w-3xl text-center">
            <span className="text-primary text-sm font-medium tracking-wider uppercase">
              {t.home.featuredApartments.subtitle}
            </span>
            <h2 className="mt-2 mb-4 text-3xl font-bold md:text-4xl">
              {t.home.featuredApartments.title}
            </h2>
            <p className="text-muted-foreground">
              {t.home.featuredApartments.description}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredApartments.map((apartment, index) => (
              <div
                key={apartment.id}
                className="animate-fade-in"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <ApartmentCard apartment={apartment} />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild className="btn-primary">
              <Link href="/apartments">
                {t.home.featuredApartments.viewAll}{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />
      {/* Features Section */}
      <section className="section bg-card px-8 md:px-16 lg:px-32">
        <div className="">
          <div className="animate-fade-in mx-auto mb-12 max-w-3xl text-center">
            <span className="text-primary text-sm font-medium tracking-wider uppercase">
              {t.home.amenities.subtitle}
            </span>
            <h2 className="mt-2 mb-4 text-3xl font-bold md:text-4xl">
              {t.home.amenities.title}
            </h2>
            <p className="text-muted-foreground">
              {t.home.amenities.description}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-card animate-fade-in flex flex-col items-center rounded-xl p-6 text-center"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="bg-primary/10 mb-4 rounded-full p-3">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
             {/* CTA Section */}
             <section className="relative py-24 px-8 md:px-16 lg:px-32 bg-primary/5">
          <div className="">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t.home.cta.title}
              </h2>
              <p className="text-muted-foreground mb-8">
                {t.home.cta.description}
              </p>
              <Button asChild size="lg" className="btn-primary">
                <Link href="/booking">{t.home.cta.bookNow}</Link>
              </Button>
            </div>
          </div>
          
          {/* Decorative waves */}
          <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
            <svg 
              className="absolute bottom-0 w-full h-24 fill-background"
              preserveAspectRatio="none"
              viewBox="0 0 1440 74"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M0,37.1L40,34.5C80,32,160,27,240,29.6C320,32,400,42,480,42.9C560,44,640,35,720,32.1C800,30,880,34,960,40.8C1040,47,1120,56,1200,56.6C1280,57,1360,48,1400,43.3L1440,39.1L1440,74L1400,74C1360,74,1280,74,1200,74C1120,74,1040,74,960,74C880,74,800,74,720,74C640,74,560,74,480,74C400,74,320,74,240,74C160,74,80,74,40,74L0,74Z"
                className="animate-wave opacity-50"
              />
              <path 
                d="M0,37.1L40,34.5C80,32,160,27,240,29.6C320,32,400,42,480,42.9C560,44,640,35,720,32.1C800,30,880,34,960,40.8C1040,47,1120,56,1200,56.6C1280,57,1360,48,1400,43.3L1440,39.1L1440,74L1400,74C1360,74,1280,74,1200,74C1120,74,1040,74,960,74C880,74,800,74,720,74C640,74,560,74,480,74C400,74,320,74,240,74C160,74,80,74,40,74L0,74Z"
                className="animate-wave opacity-100 [animation-delay:-4s]"
              />
            </svg>
          </div>
        </section>
    </div>
  );
}
