
import { useLanguage } from "@/components/LanguageContext";
import { Button } from "@/components/ui/button";
import { 
  BedDouble, Tv, Wifi, Bath, AirVent, 
  Coffee, Key, HeartPulse, Clock
} from "lucide-react";
import Link from "next/link";

export default function RoomAmenities() {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 bg-card px-8 md:px-16 lg:px-32">
      <div className="px-8 md:px-16 lg:px-32">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {t.amenitiesPage.roomAmenities}
          </h2>
          <p className="text-muted-foreground">
            {t.amenitiesPage.roomDescription}
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-8">
          {[
            { icon: <BedDouble />, name: t.amenitiesPage.roomItems.bedding },
            { icon: <AirVent />, name: t.amenitiesPage.roomItems.airConditioning },
            { icon: <Tv />, name: t.amenitiesPage.roomItems.flatScreenTv },
            { icon: <Wifi />, name: t.amenitiesPage.roomItems.highSpeedWifi },
            { icon: <Bath />, name: t.amenitiesPage.roomItems.luxuryToiletries },
            { icon: <Coffee />, name: t.amenitiesPage.roomItems.coffeeMaker },
            { icon: <Key />, name: t.amenitiesPage.roomItems.safeBox },
            { icon: <HeartPulse />, name: t.amenitiesPage.roomItems.firstAidKit },
            { icon: <Clock />, name: t.amenitiesPage.roomItems.wakeUpService },
          ].map((item, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center p-4 -xl text-center animate-fade-in"
              style={{ animationDelay: `${(index + 1) * 50}ms` }}
            >
              <div className="mb-3 p-3 -full bg-primary/10 text-primary">
                {item.icon}
              </div>
              <h3 className="text-sm font-medium">{item.name}</h3>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Button asChild className="btn-primary">
            <Link href="/apartments">{t.amenitiesPage.browseApartments}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
