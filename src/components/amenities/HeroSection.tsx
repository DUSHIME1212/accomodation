
import { useLanguage } from "@/components/LanguageContext";

export default function AmenitiesHero() {
  const { t } = useLanguage();
  
  return (
    <section className="relative py-20 bg-[url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&h=600&fit=crop')] bg-cover bg-center">
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 backdrop-blur-sm"></div>
      <div className="px-8 md:px-16 lg:px-32 relative z-10 pt-20">
        <div className="text-center max-w-3xl mx-auto text-white">
          <span className="text-sm text-primary/90 font-medium uppercase tracking-wider bg-white/10 px-3 py-1 -full">
            Silver Horizon Hotel
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-white drop-shadow-md">
            {t.amenitiesPage.title}
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            {t.amenitiesPage.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
