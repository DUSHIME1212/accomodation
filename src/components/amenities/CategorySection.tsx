
import { useLanguage } from "@/components/LanguageContext";
import { 
  Heart, Dumbbell, Droplets, HeartPulse, 
  Utensils, Wine, Coffee, Clock,
  Car, Plane, MapPin, 
  Waves, Users, Music, BookOpen,
  BedDouble, Tv, Wifi, Bath
} from "lucide-react";

interface CategorySectionProps {
  category: string;
  index: number;
}

export default function CategorySection({ category, index }: CategorySectionProps) {
  const { t } = useLanguage();
  const isEven = index % 2 === 0;
  const categoryData = t.amenitiesPage.categories[category as keyof typeof t.amenitiesPage.categories];
  
  // Helper function to get the appropriate icon for each amenity
  const getIcon = (categoryName: string, index: number) => {
    const icons = {
      wellness: [<Heart key={0} />, <Dumbbell key={1} />, <Droplets key={2} />, <HeartPulse key={3} />],
      dining: [<Utensils key={0} />, <Coffee key={1} />, <Wine key={2} />, <Clock key={3} />],
      services: [<Clock key={0} />, <Plane key={1} />, <Car key={2} />, <MapPin key={3} />],
      entertainment: [<Waves key={0} />, <Users key={1} />, <Music key={2} />, <BookOpen key={3} />],
      room: [<BedDouble key={0} />, <Tv key={1} />, <Wifi key={2} />, <Bath key={3} />]
    };
    
    return icons[categoryName as keyof typeof icons]?.[index] ?? <Coffee />;
  };
  
  return (
    <section 
      className={`py-16 ${isEven ? '' : 'bg-card'}`}
      style={{ 
        backgroundImage: isEven ? `url('https://images.unsplash.com/photo-${1560184990 + index * 100}?w=1920&auto=format&fit=crop')` : '',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative'
      }}
    >
      {isEven && <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>}
      <div className=" px-8 md:px-16 lg:px-32 relative z-10">
        <div className={`text-center max-w-3xl mx-auto mb-12 ${isEven ? 'text-white' : ''}`}>
          <h2 className="text-3xl font-bold mb-4">
            {categoryData.title}
          </h2>
          <p className={isEven ? 'text-white/80' : 'text-muted-foreground'}>
            {categoryData.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categoryData.items.map((item, idx) => (
            <div 
              key={idx} 
              className={`glass-card p-6 -xl flex flex-col items-center text-center animate-fade-in ${isEven ? 'bg-black/40 backdrop-blur-lg border-white/10' : ''}`}
              style={{ animationDelay: `${(idx + 1) * 100}ms` }}
            >
              <div className="mb-4 p-3 -full bg-primary/10 text-primary">
                {getIcon(category, idx)}
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isEven ? 'text-white' : ''}`}>
                {item.title}
              </h3>
              <p className={isEven ? 'text-white/80' : 'text-muted-foreground'}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
