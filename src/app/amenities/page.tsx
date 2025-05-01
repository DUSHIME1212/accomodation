"use client";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageContext";
import AmenitiesHero from "@/components/amenities/HeroSection";
import RoomAmenities from "@/components/amenities/RoomAmenities";
import CategorySection from "@/components/amenities/CategorySection";
import CallToAction from "@/components/amenities/CallToAction";
import GalleryPreview from "@/components/amenities/GalleryPreview";

export default function Amenities() {
  const { t } = useLanguage();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen  flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <AmenitiesHero />
        
        {/* Description Section */}
        <section className="py-16 ">
          <div className="">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-muted-foreground">
                {t.amenitiesPage.description}
              </p>
            </div>
          </div>
        </section>
        
        <RoomAmenities />
        
        {/* Categories Sections */}
        {Object.keys(t.amenitiesPage.categories).map((category, categoryIndex) => (
          <CategorySection 
            key={category}
            category={category}
            index={categoryIndex}
          />
        ))}
        
        <CallToAction />
        
        <GalleryPreview />
      </main>
      
      <Footer />
    </div>
  );
}
