"use client";
import { useLanguage } from "@/components/LanguageContext";
import { 
  Heart, Dumbbell, Droplets, HeartPulse, 
  Utensils, Wine, Coffee, Clock,
  Car, Plane, MapPin, 
  Waves, Users, Music, BookOpen,
  BedDouble, Tv, Wifi, Bath, ArrowUpRight
} from "lucide-react";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface CategorySectionProps {
  category: string;
  index: number;
}

export default function CategorySection({ category, index }: CategorySectionProps) {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  
  const isEven = index % 2 === 0;
  const categoryData = t.amenitiesPage.categories[category as keyof typeof t.amenitiesPage.categories];
  
  const getIcon = (categoryName: string, idx: number) => {
    const icons = {
      wellness: [<Heart />, <Dumbbell />, <Droplets />, <HeartPulse />],
      dining: [<Utensils />, <Coffee />, <Wine />, <Clock />],
      services: [<Clock />, <Plane />, <Car />, <MapPin />],
      entertainment: [<Waves />, <Users />, <Music />, <BookOpen />],
      room: [<BedDouble />, <Tv />, <Wifi />, <Bath />]
    };
    return icons[categoryName as keyof typeof icons]?.[idx] ?? <Coffee />;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".amenity-card", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });
      
      // Parallax for the background image
      gsap.to(imageRef.current, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: true
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#FAF9F6] dark:bg-[#0A0A0A]">
      <div className={cn(
        "flex flex-col lg:flex-row min-h-[80vh]",
        !isEven && "lg:flex-row-reverse"
      )}>
        
        {/* --- IMAGE SIDE: The "Atmosphere" --- */}
        <div className="relative w-full lg:w-5/12 h-[400px] lg:h-auto overflow-hidden">
          <img 
            ref={imageRef}
            src={`https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
            className="w-full h-[120%] object-cover absolute top-[-10%] grayscale-[20%] contrast-[1.1]"
            alt={categoryData.title}
          />
          <div className="absolute inset-0 bg-black/10" />
          
          {/* Subtle Label on Image */}
          <div className={cn(
            "absolute bottom-12 z-20 px-10 hidden lg:block",
            isEven ? "right-0" : "left-0"
          )}>
            <p className="text-[10px] uppercase tracking-[0.5em] text-white/60 font-mono">
              Volume {index + 1} // {category.toUpperCase()}
            </p>
          </div>
        </div>

        {/* --- CONTENT SIDE: The "Details" --- */}
        <div className="w-full lg:w-7/12 flex flex-col justify-center py-20 px-8 md:px-16 lg:px-24">
          <div className="max-w-2xl space-y-12">
            
            {/* Category Header */}
            <header className="space-y-4">
              <div className="flex items-center gap-4 text-primary/60">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Category</span>
                <div className="h-px w-8 bg-current" />
              </div>
              <h2 className="text-5xl md:text-7xl font-serif italic tracking-tighter text-foreground">
                {categoryData.title}
              </h2>
              <p className="text-muted-foreground/80 font-light leading-relaxed text-sm md:text-base max-w-md border-l-2 border-primary/10 pl-6">
                {categoryData.description}
              </p>
            </header>

            {/* Amenity Grid: Minimalist List-style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
              {categoryData.items.map((item, idx) => (
                <div key={idx} className="amenity-card group flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full border border-black/5 dark:border-white/5 flex items-center justify-center text-muted-foreground/40 group-hover:text-primary group-hover:border-primary/20 transition-all duration-500">
                    {/* Cloned icon with custom stroke */}
                    {Object.assign({}, getIcon(category, idx), {
                      props: { ...getIcon(category, idx).props, className: "w-4 h-4 stroke-[1.25px]" }
                    })}
                  </div>
                  
                  <div className="space-y-1 pt-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-foreground/80">
                        {item.title}
                      </h3>
                      <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-40 -translate-y-1 translate-x-1 transition-all" />
                    </div>
                    <p className="text-[12px] text-muted-foreground/70 font-light leading-snug">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Visual Separator for the next section */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/5 dark:via-white/5 to-transparent" />
    </section>
  );
}

