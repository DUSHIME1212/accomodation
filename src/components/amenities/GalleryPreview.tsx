
import { useLanguage } from "@/components/LanguageContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GalleryPreview() {
  const { t } = useLanguage();
  
  return (
    <section className="py-16">
      <div className="px-8 md:px-16 lg:px-32">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {t.gallery.title}
          </h2>
          <p className="text-muted-foreground">
            {t.gallery.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div 
              key={index} 
              className={`aspect-square rounded-lg overflow-hidden group shadow-md transition-transform  ${index === 0 || index === 3 ? 'md:col-span-2 md:row-span-2' : ''}`}
            >
              <img 
                src={`https://images.unsplash.com/photo-1598605272254-16f0c0ecdfa5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cndhbmRhJTIwaG90ZWxzfGVufDB8fDB8fHww`}
                alt={`Amenity ${index + 1}`}
                className="w-full h-full object-cover duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Button asChild variant="outline">
            <Link href="/gallery">{t.amenitiesPage.viewFullGallery}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
