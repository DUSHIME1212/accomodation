
import { useLanguage } from "@/components/LanguageContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function CallToAction() {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 bg-primary-foreground text-white">
      <div className="px-8 md:px-16 lg:px-32 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {t.home.cta.title}
        </h2>
        <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
          {t.home.cta.description}
        </p>
        <Button 
          asChild 
          variant="outline" 
          size="lg" 
          className="bg-white text-primary hover:bg-white/90 hover:text-primary -full"
        >
          <Link href="/booking">{t.home.cta.bookNow}</Link>
        </Button>
      </div>
    </section>
  );
}
