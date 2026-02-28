"use client";

import { useEffect, useState, useRef } from "react";
import { X, ArrowLeft, ArrowRight, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/LanguageContext";
import gsap from "gsap";

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80", alt: "Beachfront view", category: "exterior" },
  { id: 2, src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80", alt: "Luxury suite interior", category: "rooms" },
  { id: 3, src: "https://images.unsplash.com/photo-1584132905271-512c958d674a?w=1200&q=80", alt: "Swimming pool", category: "amenities" },
  { id: 4, src: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200&q=80", alt: "Premium apartment", category: "rooms" },
  { id: 5, src: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&q=80", alt: "Beach sunset", category: "exterior" },
  { id: 6, src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80", alt: "Dining area", category: "amenities" },
  { id: 7, src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80", alt: "Bathroom", category: "rooms" },
  { id: 8, src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80", alt: "Beach pathway", category: "exterior" },
  { id: 9, src: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80", alt: "Restaurant", category: "amenities" },
  { id: 10, src: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=1200&q=80", alt: "Bedroom", category: "rooms" },
  { id: 11, src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80", alt: "Beach umbrellas", category: "exterior" },
  { id: 12, src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80", alt: "Spa", category: "amenities" },
];

export default function Gallery() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const filteredImages = activeFilter === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);

  // Initial Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gallery-item", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
      });
      gsap.from(headerRef.current, {
        y: -30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    });
    return () => ctx.revert();
  }, []);

  // Filter Animation Logic
  useEffect(() => {
    gsap.to(".gallery-item", {
      scale: 0.9,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        gsap.to(".gallery-item", {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "back.out(1.7)"
        });
      }
    });
  }, [activeFilter]);

  const navigateGallery = (direction: "prev" | "next") => {
    if (selectedImage === null) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    let newIndex = direction === "prev" 
      ? (currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1)
      : (currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0);
    setSelectedImage(filteredImages[newIndex]?.id as number);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0a0a0a] transition-colors duration-500">
      <main className="pt-32 pb-24 px-8 md:px-16 lg:px-32">
        
        {/* Cinematic Header */}
        <div ref={headerRef} className="max-w-4xl mx-auto text-center mb-20">
          <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.6em] font-bold mb-6 block">
            Visual Story
          </span>
          <h1 className="text-5xl md:text-7xl font-serif italic text-[#111] dark:text-white mb-8 tracking-tight">
            {t.gallery.title}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm tracking-widest uppercase font-light max-w-xl mx-auto leading-relaxed">
            {t.gallery.subtitle}
          </p>
        </div>

        {/* Minimalist Filter Bar */}
        <div className="flex flex-wrap justify-center gap-12 mb-16 border-b border-black/5 dark:border-white/5 pb-8 animate-fade-in">
          {["all", "exterior", "rooms", "amenities"].map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={cn(
                "relative text-[11px] uppercase tracking-[0.3em] font-bold transition-colors duration-300 pb-2",
                activeFilter === category 
                  ? "text-[#D4AF37]" 
                  : "text-gray-400 hover:text-black dark:hover:text-white"
              )}
            >
              {category}
              {activeFilter === category && (
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37]" />
              )}
            </button>
          ))}
        </div>

        {/* Masonry-Style Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div 
              key={image.id} 
              className="gallery-item relative overflow-hidden aspect-[4/5] cursor-none group bg-muted"
              onClick={() => setSelectedImage(image.id)}
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 group-hover:rotate-1"
              />
              
              {/* Premium Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-[#D4AF37] text-[9px] uppercase tracking-widest font-bold mb-2">
                    {image.category}
                  </p>
                  <h3 className="text-white font-serif italic text-xl">{image.alt}</h3>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500">
                    <Maximize2 className="text-white w-8 h-8 stroke-[1px]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox / Modal */}
        {selectedImage !== null && (
          <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-6 md:p-12">
            <button 
              className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors z-[110]"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-8 w-8 stroke-[1px]" />
            </button>
            
            <button 
              className="absolute left-6 text-white/30 hover:text-white transition-colors"
              onClick={() => navigateGallery("prev")}
            >
              <ArrowLeft className="h-10 w-10 stroke-[1px]" />
            </button>

            <div className="relative w-full h-full flex items-center justify-center">
              {filteredImages.map((img) => (
                <div 
                  key={img.id}
                  className={cn(
                    "absolute transition-all duration-700 ease-in-out max-w-full max-h-full",
                    selectedImage === img.id ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                  )}
                >
                  <img src={img.src} alt={img.alt} className="max-w-full max-h-[80vh] object-contain shadow-2xl" />
                  <p className="text-center text-white/60 font-serif italic mt-8 text-lg">{img.alt}</p>
                </div>
              ))}
            </div>

            <button 
              className="absolute right-6 text-white/30 hover:text-white transition-colors"
              onClick={() => navigateGallery("next")}
            >
              <ArrowRight className="h-10 w-10 stroke-[1px]" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}