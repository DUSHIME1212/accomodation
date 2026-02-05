"use client";
import { useLanguage } from "@/components/LanguageContext";
import { 
  BedDouble, Tv, Wifi, Bath, AirVent, 
  Coffee, Key, HeartPulse, Clock, ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";

export default function RoomAmenities() {
  const { t } = useLanguage();
  
  const amenities = [
    { icon: <BedDouble className="w-5 h-5 stroke-[1px]" />, name: t.amenitiesPage.roomItems.bedding },
    { icon: <AirVent className="w-5 h-5 stroke-[1px]" />, name: t.amenitiesPage.roomItems.airConditioning },
    { icon: <Tv className="w-5 h-5 stroke-[1px]" />, name: t.amenitiesPage.roomItems.flatScreenTv },
    { icon: <Wifi className="w-5 h-5 stroke-[1px]" />, name: t.amenitiesPage.roomItems.highSpeedWifi },
    { icon: <Bath className="w-5 h-5 stroke-[1px]" />, name: t.amenitiesPage.roomItems.luxuryToiletries },
    { icon: <Coffee className="w-5 h-5 stroke-[1px]" />, name: t.amenitiesPage.roomItems.coffeeMaker },
    { icon: <Key className="w-5 h-5 stroke-[1px]" />, name: t.amenitiesPage.roomItems.safeBox },
    { icon: <HeartPulse className="w-5 h-5 stroke-[1px]" />, name: t.amenitiesPage.roomItems.firstAidKit },
    { icon: <Clock className="w-5 h-5 stroke-[1px]" />, name: t.amenitiesPage.roomItems.wakeUpService },
  ];

  return (
    <section className="py-24 bg-[#FCFBFA] dark:bg-[#080808] px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header: Left Aligned with a Technical "Index" Feel */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary/60 italic">Features</span>
              <div className="h-px w-8 bg-primary/30" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic tracking-tighter text-foreground">
              {t.amenitiesPage.roomAmenities}
            </h2>
            <p className="text-muted-foreground/80 font-light leading-relaxed max-w-md">
              {t.amenitiesPage.roomDescription || "Every detail is a testament to our commitment to your absolute comfort."}
            </p>
          </div>
          
          <div className="hidden md:block">
            <p className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground/40 font-mono text-right">
              Ref. Index: AM-2026 <br /> Standard Inclusion
            </p>
          </div>
        </div>
        
        {/* Grid: Bordered List style instead of Floating Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-black/[0.06] dark:border-white/[0.06]">
          {amenities.map((item, index) => (
            <div 
              key={index} 
              className="group relative flex flex-col justify-between p-10 border-r border-b border-black/[0.06] dark:border-white/[0.06] hover:bg-black/[0.02] dark:hover:bg-white/[0.01] transition-colors duration-500 overflow-hidden"
            >
              {/* Subtle Numbering */}
              <span className="absolute top-6 right-8 text-[9px] font-mono text-muted-foreground/20 group-hover:text-primary/40 transition-colors">
                0{index + 1}
              </span>

              <div className="space-y-6">
                <div className="text-muted-foreground/60 group-hover:text-primary transition-all duration-500 group-hover:scale-110 origin-left">
                  {item.icon}
                </div>
                <h3 className="text-[11px] uppercase tracking-[0.25em] font-bold text-foreground/70 group-hover:text-foreground transition-colors">
                  {item.name}
                </h3>
              </div>

              {/* Decorative Corner Element that appears on hover */}
              <div className="absolute -bottom-2 -right-2 opacity-0 group-hover:opacity-10 scale-50 group-hover:scale-100 transition-all duration-700 pointer-events-none">
                 {item.icon}
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA: Minimalist and integrated */}
        <div className="mt-20 flex justify-center">
          <Link 
            href="/apartments" 
            className="group flex items-center gap-6 text-[10px] uppercase tracking-[0.4em] font-black"
          >
            <span className="text-muted-foreground group-hover:text-foreground transition-colors">
               {t.amenitiesPage.browseApartments}
            </span>
            <div className="w-12 h-12 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-500">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}