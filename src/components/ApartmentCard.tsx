"use client";
import { useState } from "react";
import { Users, Maximize, MapPin, Bath, Coffee, Wifi, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "./LanguageContext";
import Link from "next/link";
import Image from "next/image";

export interface ApartmentProps {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  size: number;
  image: string;
  location: string;
  features: string[];
}

export default function ApartmentCard({ apartment }: { apartment: ApartmentProps }) {
  const { t, language } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  const translatedName =
    language !== "en" &&
    t.apartmentDescriptions[apartment.id as keyof typeof t.apartmentDescriptions]?.name
      ? t.apartmentDescriptions[apartment.id as keyof typeof t.apartmentDescriptions].name
      : apartment.name;

  const translatedDescription =
    language !== "en" &&
    t.apartmentDescriptions[apartment.id as keyof typeof t.apartmentDescriptions]?.description
      ? t.apartmentDescriptions[apartment.id as keyof typeof t.apartmentDescriptions].description
      : apartment.description;

  return (
    <div
      className="group relative bg-transparent overflow-hidden transition-all duration-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Aspect Ratio */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={apartment.image}
          alt={translatedName}
          className={cn(
            "w-full h-full object-cover transition-transform duration-[1.5s] ease-out",
            isHovered ? "scale-110" : "scale-100"
          )}
        />
        
        {/* Subtle Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        {/* Top Badge: Price */}
        <div className="absolute top-6 left-0 z-10">
            <div className="bg-white/90 dark:bg-[#111]/90 backdrop-blur-md px-6 py-2 shadow-sm">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-black dark:text-white">
                    ${apartment.price} <span className="text-gray-400 font-light ml-1">/ {t.booking.summary.night}</span>
                </p>
            </div>
        </div>

        {/* Content Over Image */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
          <div className="space-y-2 transform transition-transform duration-500 group-hover:-translate-y-4">
            <p className="text-[#D4AF37] text-[9px] uppercase tracking-[0.4em] font-bold">
              {apartment.location}
            </p>
            <h3 className="text-3xl font-serif italic leading-tight">
              {translatedName}
            </h3>
            
            {/* Hidden details revealed on hover */}
            <div className={cn(
                "overflow-hidden transition-all duration-500 ease-in-out max-h-0 opacity-0",
                isHovered ? "max-h-24 opacity-100 mt-4" : "max-h-0 opacity-0"
            )}>
                <p className="text-xs text-white/70 font-light leading-relaxed line-clamp-2">
                    {translatedDescription}
                </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Specs Bar */}
      <div className="flex items-center justify-between py-6 border-b border-black/5 dark:border-white/5">
        <div className="flex gap-6">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
            <Users className="h-3 w-3 stroke-[1.5px]" />
            <span>{apartment.capacity} {t.apartments.filters.guests}</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
            <Maximize className="h-3 w-3 stroke-[1.5px]" />
            <span>{apartment.size} m²</span>
          </div>
        </div>

        <Link 
            href={`/apartments/${apartment.id}`}
            className="group/link flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-black dark:text-white"
        >
            {t.apartments.filters.viewDetails}
            <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}