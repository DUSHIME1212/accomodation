"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/components/LanguageContext";
import { 
  Users, Maximize, MapPin, Heart, Share, Star, Calendar, 
  ChevronRight, Coffee, Wifi, Tv, AirVent, Bath, BedDouble, 
  Check, ArrowLeft,
  ShieldCheck
} from "lucide-react";
import { type ApartmentProps } from "@/components/ApartmentCard";
import BookingForm from "@/components/BookingForm";
import Link from "next/link";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

// Sample apartments data
const apartmentsData: ApartmentProps[] = [
  {
    id: "1",
    name: "Deluxe Sea View Suite",
    description: "Luxurious suite with panoramic sea views, modern amenities, and a private balcony.",
    price: 180,
    capacity: 2,
    size: 45,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
    location: "Beachfront",
    features: ["Wi-Fi", "Kitchen", "Bathroom", "Air Conditioning", "TV", "Balcony"]
  },
  {
    id: "2",
    name: "Premium Family Apartment",
    description: "Spacious apartment ideal for families, with full kitchen and stunning coastal views.",
    price: 250,
    capacity: 4,
    size: 75,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    location: "Second row",
    features: ["Wi-Fi", "Kitchen", "Bathroom", "Air Conditioning", "TV", "Washing Machine"]
  },
  {
    id: "3",
    name: "Executive Beach Studio",
    description: "Elegant studio with direct beach access, modern design, and premium finishes.",
    price: 150,
    capacity: 2,
    size: 35,
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&h=600&fit=crop",
    location: "Beachfront",
    features: ["Wi-Fi", "Kitchenette", "Bathroom", "Air Conditioning", "TV"]
  },
  {
    id: "4",
    name: "Luxury Penthouse Suite",
    description: "Exclusive top-floor suite with expansive terrace and panoramic sea views.",
    price: 350,
    capacity: 4,
    size: 90,
    image: "https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?w=800&h=600&fit=crop",
    location: "Beachfront",
    features: ["Wi-Fi", "Full Kitchen", "2 Bathrooms", "Air Conditioning", "TV", "Terrace", "Jacuzzi"]
  },
  {
    id: "5",
    name: "Classic Double Room",
    description: "Comfortable hotel room with modern amenities and partial sea views.",
    price: 120,
    capacity: 2,
    size: 28,
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop",
    location: "Hotel building",
    features: ["Wi-Fi", "Bathroom", "Air Conditioning", "TV", "Mini Fridge"]
  },
  {
    id: "6",
    name: "Garden View Apartment",
    description: "Peaceful apartment sur by lush gardens, just a short walk from the beach.",
    price: 160,
    capacity: 3,
    size: 55,
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&h=600&fit=crop",
    location: "Garden area",
    features: ["Wi-Fi", "Kitchen", "Bathroom", "Air Conditioning", "TV", "Terrace"]
  },
];

// Additional Apartment Gallery Images
const apartmentGallery = [
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1560185008-b033106af5c3?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1560184990-4fab2c0a3464?w=800&h=600&fit=crop"
];

// Feature icons mapping
const getFeatureIcon = (feature: string) => {
  switch (feature) {
    case "Wi-Fi":
      return <Wifi className="h-5 w-5" />;
    case "Kitchen":
    case "Kitchenette":
    case "Full Kitchen":
      return <Coffee className="h-5 w-5" />;
    case "Bathroom":
    case "2 Bathrooms":
      return <Bath className="h-5 w-5" />;
    case "Air Conditioning":
      return <AirVent className="h-5 w-5" />;
    case "TV":
      return <Tv className="h-5 w-5" />;
    default:
      return <Check className="h-5 w-5" />;
  }
};

export default function ApartmentDetail() {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const [apartment, setApartment] = useState<ApartmentProps | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundApartment = apartmentsData.find(apt => apt.id === id);
    if (foundApartment) setApartment(foundApartment);

    // GSAP Entrance Animations
    const ctx = gsap.context(() => {
      gsap.from(".reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
      });

      gsap.to(".parallax-img", {
        scrollTrigger: {
          trigger: ".parallax-img",
          start: "top bottom",
          scrub: true
        },
        scale: 1.1,
        ease: "none"
      });
    }, containerRef);

    return () => ctx.revert();
  }, [id]);

  if (!apartment) return null; // Or your notFound state

  const translatedName = language !== 'en' && t.apartmentDescriptions[apartment.id as keyof typeof t.apartmentDescriptions]?.name 
    ? t.apartmentDescriptions[apartment.id as keyof typeof t.apartmentDescriptions].name 
    : apartment.name;

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FCFBFA] dark:bg-[#080808]">
      <Navbar />
      
      <main className="px-6 md:px-12 lg:px-24 pt-28 pb-20">
        
        {/* Navigation & Header */}
        <div className="reveal flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4">
            <Link href="/apartments" className="inline-flex items-center text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-3 w-3 mr-2" />
              {t.apartments.title}
            </Link>
            <h1 className="text-4xl md:text-6xl font-serif italic tracking-tight">{translatedName}</h1>
            <div className="flex items-center space-x-4 text-sm tracking-wide text-muted-foreground">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-primary" />
                <span>Costa Bella, Italy</span>
              </div>
<span className="h-1 w-1 rounded-full bg-border" />
              <div className="flex items-center text-amber-500">
                <Star className="h-4 w-4 fill-current mr-1" />
                <span className="font-semibold">4.9</span>
                <span className="ml-1 text-xs opacity-70">(124 reviews)</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
<Button variant="outline" size="icon" onClick={() => setIsLiked(!isLiked)} className="rounded-full hover:bg-red-50 dark:hover:bg-red-950/20 border-black/5 dark:border-white/5 shadow-sm">
                <Heart className={cn("h-4 w-4 transition-colors", isLiked ? "fill-red-500 text-red-500" : "")} />
             </Button>
             <Button variant="outline" size="icon" className="-full border-black/5 dark:border-white/5 shadow-sm">
                <Share className="h-4 w-4" />
             </Button>
          </div>
        </div>

        {/* Cinematic Gallery Grid */}
        <section className="reveal mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 h-[70vh]">
            <div className="lg:col-span-8 relative -2xl overflow-hidden group">
              <img 
                src={apartmentGallery[selectedImage]} 
                alt={translatedName} 
                className="parallax-img w-full h-full object-cover transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            
            <div className="hidden lg:grid lg:col-span-4 grid-rows-2 gap-3">
              {apartmentGallery.slice(1, 3).map((img, index) => (
                <div key={index} className="relative -2xl overflow-hidden cursor-pointer group" onClick={() => setSelectedImage(index + 1)}>
                  <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Gallery" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Detailed Specs */}
          <div className="lg:col-span-7">
            <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-t border-b border-black/5 dark:border-white/5">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{t.bookingForm.adults}</p>
                <div className="flex items-center font-serif text-xl italic">
                  <Users className="h-4 w-4 mr-2 text-primary" /> {apartment.capacity} Guests
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Living Space</p>
                <div className="flex items-center font-serif text-xl italic">
                  <Maximize className="h-4 w-4 mr-2 text-primary" /> {apartment.size} m²
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Bedrooms</p>
                <div className="flex items-center font-serif text-xl italic">
                  <BedDouble className="h-4 w-4 mr-2 text-primary" /> 2 Master
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Security</p>
                <div className="flex items-center font-serif text-xl italic text-green-600">
                  <ShieldCheck className="h-4 w-4 mr-2" /> Verified
                </div>
              </div>
            </div>

            <Tabs defaultValue="description" className="mt-12 reveal">
              <TabsList className="bg-transparent border-b border-black/5 dark:border-white/5 w-full justify-start -none h-auto p-0 gap-8">
                {["description", "features", "location"].map((tab) => (
                  <TabsTrigger 
                    key={tab} 
                    value={tab} 
                    className="-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-4 text-[11px] uppercase tracking-widest font-bold"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value="description" className="mt-10 leading-relaxed text-muted-foreground space-y-6 max-w-2xl">
                <p className="text-xl text-foreground font-serif italic">Experience unrivaled serenity...</p>
                <p>{apartment.description}</p>
                <p>{t.apartments.detailDescription}</p>
              </TabsContent>

              <TabsContent value="features" className="mt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {apartment.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 -xl bg-white dark:bg-white/5 border border-black/[0.03] dark:border-white/[0.03]">
                      <div className="p-2 bg-primary/5 text-primary -lg">
                        {getFeatureIcon(feature)}
                      </div>
                      <span className="text-sm font-medium tracking-wide">{feature}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Floating Booking Widget */}
          <div className="lg:col-span-5">
            <div className="reveal sticky top-32 p-8 -3xl bg-white dark:bg-[#111] border border-black/5 dark:border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-none">
              <div className="flex justify-between items-baseline mb-8">
                <div>
                  <span className="text-3xl font-serif italic">${apartment.price}</span>
                  <span className="text-muted-foreground text-xs uppercase tracking-tighter ml-1">/ Night</span>
                </div>
                <div className="bg-green-500/10 text-green-600 text-[10px] font-bold px-2 py-1 ">AVAILABLE</div>
              </div>
              
              <BookingForm />
              
              <p className="text-[10px] text-center text-muted-foreground mt-6 tracking-widest uppercase">
                Best price guarantee for direct bookings
              </p>
            </div>
          </div>

        </div>

        {/* Similar Properties - Refined Cards */}
        <section className="mt-32 border-t border-black/5 dark:border-white/5 pt-20">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-4xl font-serif italic">{t.apartments.similarProperties}</h2>
            <Link href="/apartments" className="text-[11px] font-bold uppercase tracking-[0.2em] border-b border-primary pb-1">View All Suites</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {apartmentsData.filter(apt => apt.id !== apartment.id).slice(0, 3).map(apt => (
              <Link href={`/apartments/${apt.id}`} key={apt.id} className="group block space-y-4">
                <div className="aspect-[4/5] overflow-hidden -2xl relative">
                   <img src={apt.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={apt.name} />
                   <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/90 px-3 py-1 -full text-[10px] font-bold tracking-widest">${apt.price}</div>
                </div>
                <div>
                  <h3 className="text-lg font-serif italic group-hover:text-primary transition-colors">{apt.name}</h3>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{apt.location}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}