"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ApartmentCard, { type ApartmentProps } from "@/components/ApartmentCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useLanguage } from "@/components/LanguageContext";
import { Map, RotateCcw, UsersIcon } from "lucide-react";

// Sample apartments data (will use translations from context)
const allApartments: ApartmentProps[] = [
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

export default function Apartments() {
  const { t } = useLanguage();
  const [filteredApartments, setFilteredApartments] = useState<ApartmentProps[]>(allApartments);
  const [capacityFilter, setCapacityFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number[]>([100, 350]);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  // Apply filters
  useEffect(() => {
    let result = allApartments;
    
    // Filter by capacity
    if (capacityFilter !== "all") {
      const capacity = parseInt(capacityFilter);
      result = result.filter(apt => apt.capacity >= capacity);
    }
    
    // Filter by location
    if (locationFilter !== "all") {
      result = result.filter(apt => apt.location === locationFilter);
    }
    
    // Filter by price range
    result = result.filter(apt => apt.price >= (priceRange?.[0] ?? 0) && apt.price <= (priceRange?.[1] ?? Infinity));
    
    setFilteredApartments(result);
  }, [capacityFilter, locationFilter, priceRange]);
  
  // Get unique locations for filter
  const locations = ["all", ...new Set(allApartments.map(apt => apt.location))];
  
  return (
  <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0a0a0a] transition-colors duration-500">
      
      <main className="flex-1 mt-32">
        {/* --- LUXE HERO SECTION --- */}
        <section className="relative h-[65vh] flex items-center justify-center overflow-hidden border-b border-black/5">
          <div className="absolute inset-0 z-0">
            {/* Soft Grain Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-20 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FAF9F6] dark:to-[#0a0a0a] z-10" />
          </div>
          
          <div className="relative z-20 text-center max-w-4xl px-6">
            <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.6em] mb-6 block font-bold animate-fade-in">
              The Collection
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif italic text-[#111] dark:text-white mb-8 tracking-tight">
              {t.apartments.title}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-light tracking-widest max-w-xl mx-auto uppercase leading-loose">
              {t.apartments.subtitle}
            </p>
          </div>
        </section>

        {/* --- STICKY CONCIERGE FILTER --- */}
        <section className=" z-40 bg-white/70 dark:bg-black/70 backdrop-blur-xl border-y border-black/5 shadow-sm">
          <div className="max-w-7xl mx-auto px-8 py-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              
              <div className="flex flex-wrap items-center gap-10">
                {/* Guests Select */}
                <div className="flex items-center gap-3 group cursor-pointer">
                  <UsersIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <Select value={capacityFilter} onValueChange={setCapacityFilter}>
                    <SelectTrigger className="w-[130px] border-none bg-transparent shadow-none focus:ring-0 text-[11px] uppercase tracking-widest font-bold h-auto p-0">
                      <SelectValue placeholder="Guests" />
                    </SelectTrigger>
                    <SelectContent className="-none border-none shadow-2xl bg-white dark:bg-[#111]">
                      <SelectItem value="all">Any Capacity</SelectItem>
                      <SelectItem value="2">2+ Guests</SelectItem>
                      <SelectItem value="4">4+ Guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location Select */}
                <div className="flex items-center gap-3 group cursor-pointer">
                  <Map className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger className="w-[160px] border-none bg-transparent shadow-none focus:ring-0 text-[11px] uppercase tracking-widest font-bold h-auto p-0">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent className="-none border-none shadow-2xl bg-white dark:bg-[#111]">
                      <SelectItem value="all">All Locations</SelectItem>
                      {locations.filter(l => l !== "all").map(loc => (
                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Slider */}
                <div className="hidden xl:flex items-center gap-8 min-w-[280px]">
                  <span className="text-[11px] uppercase tracking-widest font-bold text-gray-400">
                    Range: ${priceRange[0]} — ${priceRange[1]}
                  </span>
                  <Slider
                    min={100}
                    max={350}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="w-32"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 border-l border-black/5 dark:border-white/5 pl-8">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium">
                  {filteredApartments.length} Stays Available
                </span>
                <button 
                  onClick={() => {
                    setCapacityFilter("all");
                    setLocationFilter("all");
                    setPriceRange([100, 350]);
                  }}
                  className="p-2 hover:bg-black/5 -full transition-colors group"
                >
                  <RotateCcw className="w-4 h-4 text-gray-400 group-hover:rotate-[-45deg] transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* --- GALLERY GRID --- */}
        <section className="max-w-7xl mx-auto px-8 py-24">
          {filteredApartments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
              {filteredApartments.map((apartment, index) => (
                <div 
                  key={apartment.id} 
                  className="animate-fade-in-up" 
                  style={{ animationDelay: `${(index % 3) * 150}ms` }}
                >
                  <ApartmentCard apartment={apartment} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-40 text-center space-y-8 max-w-md mx-auto">
              <h3 className="text-3xl font-serif italic text-gray-300">No rooms match your preference.</h3>
              <p className="text-sm text-gray-400 font-light tracking-wide">Adjust your filters to discover our other exclusive accommodations.</p>
              <Button 
                variant="outline" 
                className="-none border-black dark:border-white uppercase tracking-widest text-[10px] px-10 h-12"
                onClick={() => {
                  setCapacityFilter("all");
                  setLocationFilter("all");
                  setPriceRange([100, 350]);
                }}
              >
                Reset Collection
              </Button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
