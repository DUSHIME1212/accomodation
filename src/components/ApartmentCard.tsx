"use client";
import { useState } from "react";
import {
  Users,
  Maximize,
  MapPin,
  Bath,
  Coffee,
  Wifi,
  ArrowRight,
} from "lucide-react";
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

export default function ApartmentCard({
  apartment,
}: {
  apartment: ApartmentProps;
}) {
  const { t, language } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  const translatedName =
    language !== "en" &&
    t.apartmentDescriptions[
      apartment.id as keyof typeof t.apartmentDescriptions
    ]?.name
      ? t.apartmentDescriptions[
          apartment.id as keyof typeof t.apartmentDescriptions
        ].name
      : apartment.name;

  const translatedDescription =
    language !== "en" &&
    t.apartmentDescriptions[
      apartment.id as keyof typeof t.apartmentDescriptions
    ]?.description
      ? t.apartmentDescriptions[
          apartment.id as keyof typeof t.apartmentDescriptions
        ].description
      : apartment.description;

  return (
    <div
      className="group relative overflow-hidden bg-transparent transition-all duration-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Aspect Ratio */}
      <div className="bg-muted relative aspect-[4/5] overflow-hidden">
        <img
          src={apartment.image}
          alt={translatedName}
          className={cn(
            "h-full w-full object-cover transition-transform duration-[1.5s] ease-out",
            isHovered ? "scale-110" : "scale-100",
          )}
        />

        {/* Subtle Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

        {/* Top Badge: Price */}
        <div className="absolute top-6 left-0 z-10">
          <div className="bg-background/90 border-border/20 border-y border-r px-6 py-2 shadow-sm backdrop-blur-md">
            <p className="text-foreground text-[10px] font-bold tracking-[0.2em] uppercase">
              ${apartment.price}{" "}
              <span className="text-muted-foreground ml-1 font-light">
                / {t.booking.summary.night}
              </span>
            </p>
          </div>
        </div>

        {/* Content Over Image */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
          <div className="transform space-y-2 transition-transform duration-500 group-hover:-translate-y-4">
            <p className="text-primary text-[9px] font-bold tracking-[0.4em] uppercase">
              {apartment.location}
            </p>
            <h3 className="font-serif text-3xl leading-tight italic">
              {translatedName}
            </h3>

            {/* Hidden details revealed on hover */}
            <div
              className={cn(
                "max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-in-out",
                isHovered ? "mt-4 max-h-24 opacity-100" : "max-h-0 opacity-0",
              )}
            >
              <p className="line-clamp-2 text-xs leading-relaxed font-light text-white/70">
                {translatedDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Specs Bar */}
      <div className="border-border/50 flex items-center justify-between border-b py-6">
        <div className="flex gap-6">
          <div className="text-muted-foreground flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase">
            <Users className="h-3 w-3 stroke-[1.5px]" />
            <span>
              {apartment.capacity} {t.apartments.filters.guests}
            </span>
          </div>
          <div className="text-muted-foreground flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase">
            <Maximize className="h-3 w-3 stroke-[1.5px]" />
            <span>{apartment.size} m²</span>
          </div>
        </div>

        <Link
          href={`/apartments/${apartment.id}`}
          className="group/link text-foreground flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase"
        >
          {t.apartments.filters.viewDetails}
          <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
