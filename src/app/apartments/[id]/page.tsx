"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/components/LanguageContext";
import { 
  Users, Maximize, MapPin, Heart, Share, Star, Calendar, 
  ChevronRight, Coffee, Wifi, Tv, AirVent, Bath, BedDouble, 
  Check, ArrowLeft
} from "lucide-react";
import { type ApartmentProps } from "@/components/ApartmentCard";
import BookingForm from "@/components/BookingForm";
import Link from "next/link";
import { useParams } from "next/navigation";

// Sample apartments data
const apartmentsData: ApartmentProps[] = [
  {
    id: "1",
    name: "Deluxe Sea View Suite",
    description: "Luxurious suite with panoramic sea views, modern amenities, and a private balcony.",
    price: 180,
    capacity: 2,
    size: 45,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
    location: "Beachfront",
    features: ["Wi-Fi", "Kitchen", "Bathroom", "Air Conditioning", "TV", "Balcony"]
  },
  {
    id: "2",
    name: "Premium Family Apartment",
    description: "Spacious apartment ideal for families, with full kitchen and stunning coastal views.",
    price: 250,
    capacity: 4,
    size: 75,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    location: "Second row",
    features: ["Wi-Fi", "Kitchen", "Bathroom", "Air Conditioning", "TV", "Washing Machine"]
  },
  {
    id: "3",
    name: "Executive Beach Studio",
    description: "Elegant studio with direct beach access, modern design, and premium finishes.",
    price: 150,
    capacity: 2,
    size: 35,
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&h=600&fit=crop",
    location: "Beachfront",
    features: ["Wi-Fi", "Kitchenette", "Bathroom", "Air Conditioning", "TV"]
  },
  {
    id: "4",
    name: "Luxury Penthouse Suite",
    description: "Exclusive top-floor suite with expansive terrace and panoramic sea views.",
    price: 350,
    capacity: 4,
    size: 90,
    image: "https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?w=800&h=600&fit=crop",
    location: "Beachfront",
    features: ["Wi-Fi", "Full Kitchen", "2 Bathrooms", "Air Conditioning", "TV", "Terrace", "Jacuzzi"]
  },
  {
    id: "5",
    name: "Classic Double Room",
    description: "Comfortable hotel room with modern amenities and partial sea views.",
    price: 120,
    capacity: 2,
    size: 28,
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop",
    location: "Hotel building",
    features: ["Wi-Fi", "Bathroom", "Air Conditioning", "TV", "Mini Fridge"]
  },
  {
    id: "6",
    name: "Garden View Apartment",
    description: "Peaceful apartment surrounded by lush gardens, just a short walk from the beach.",
    price: 160,
    capacity: 3,
    size: 55,
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&h=600&fit=crop",
    location: "Garden area",
    features: ["Wi-Fi", "Kitchen", "Bathroom", "Air Conditioning", "TV", "Terrace"]
  },
];

// Additional Apartment Gallery Images
const apartmentGallery = [
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1560185008-b033106af5c3?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1560184990-4fab2c0a3464?w=800&h=600&fit=crop"
];

// Feature icons mapping
const getFeatureIcon = (feature: string) => {
  switch (feature) {
    case "Wi-Fi":
      return <Wifi className="h-5 w-5" />;
    case "Kitchen":
    case "Kitchenette":
    case "Full Kitchen":
      return <Coffee className="h-5 w-5" />;
    case "Bathroom":
    case "2 Bathrooms":
      return <Bath className="h-5 w-5" />;
    case "Air Conditioning":
      return <AirVent className="h-5 w-5" />;
    case "TV":
      return <Tv className="h-5 w-5" />;
    default:
      return <Check className="h-5 w-5" />;
  }
};

export default function ApartmentDetail() {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const [apartment, setApartment] = useState<ApartmentProps | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Find apartment by id
    const foundApartment = apartmentsData.find(apt => apt.id === id);
    if (foundApartment) {
      setApartment(foundApartment);
    }
  }, [id]);
  
  if (!apartment) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">{t.notFound.title}</h1>
            <p className="mt-2 text-muted-foreground mb-4">{t.notFound.description}</p>
            <Button asChild>
              <Link href="/apartments">{t.notFound.returnHome}</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Use translated name and description if available
  const translatedName = language !== 'en' && t.apartmentDescriptions[apartment.id as keyof typeof t.apartmentDescriptions]?.name 
    ? t.apartmentDescriptions[apartment.id as keyof typeof t.apartmentDescriptions].name 
    : apartment.name;
    
  const translatedDescription = language !== 'en' && t.apartmentDescriptions[apartment.id as keyof typeof t.apartmentDescriptions]?.description 
    ? t.apartmentDescriptions[apartment.id as keyof typeof t.apartmentDescriptions].description 
    : apartment.description;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 px-8 md:px-16 lg:px-32 pt-20">
        {/* Back button */}
        <div className=" py-4">
          <Button variant="ghost" size="sm" asChild className="flex size-fit items-center p-2">
            <Link href="/apartments">
              <ArrowLeft className="h-4 w-4 mr-1" />
              {t.apartments.title}
            </Link>
          </Button>
        </div>
        
        {/* Gallery Section */}
        <section className=" pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Main Image */}
            <div className="lg:col-span-3 rounded-xl overflow-hidden">
              <img 
                src={apartmentGallery[selectedImage]} 
                alt={translatedName} 
                className="w-full h-[450px] object-cover transition-all duration-500 hover:scale-105"
              />
            </div>
            
            {/* Side Images */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              {apartmentGallery.slice(1, 5).map((img, index) => (
                <div 
                  key={index} 
                  className="relative rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImage(index + 1)}
                >
                  <img 
                    src={img} 
                    alt={`${translatedName} view ${index + 2}`} 
                    className="w-full h-[215px] object-cover transition-all duration-500 hover:scale-105"
                  />
                  {index === 3 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-medium">
                      +10 {t.gallery.title}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className=" py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Apartment Details */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {apartment.location}
                    </span>
                    <div className="flex items-center text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 font-medium">4.9</span>
                      <span className="text-muted-foreground text-sm ml-1">(124 reviews)</span>
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold mb-1">{translatedName}</h1>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>Costa Bella, Italy</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline" 
                    size="icon"
                    onClick={() => setIsLiked(!isLiked)}
                    className={`rounded-full ${isLiked ? 'text-red-500' : ''}`}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                    <span className="sr-only">Like</span>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Share className="h-5 w-5" />
                    <span className="sr-only">Share</span>
                  </Button>
                </div>
              </div>
              
              {/* Key features */}
              <div className="flex flex-wrap gap-4 py-4 border-t border-b my-4">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>{apartment.capacity} {apartment.capacity === 1 ? t.bookingForm.adult : t.bookingForm.adults}</span>
                </div>
                <div className="flex items-center">
                  <BedDouble className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>{apartment.capacity <= 2 ? 1 : 2} {apartment.capacity <= 2 ? t.booking.accommodationSelect.bed : t.booking.accommodationSelect.beds}</span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>1 {t.booking.accommodationSelect.bath}</span>
                </div>
                <div className="flex items-center">
                  <Maximize className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>{apartment.size} m²</span>
                </div>
              </div>
              
              {/* Tabs for details */}
              <Tabs defaultValue="description" className="mt-8">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">{t.apartments.tabs.description}</TabsTrigger>
                  <TabsTrigger value="features">{t.apartments.tabs.features}</TabsTrigger>
                  <TabsTrigger value="location">{t.apartments.tabs.location}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="mt-6">
                  <div className="space-y-4">
                    <p className="text-lg">{translatedDescription}</p>
                    <p className="text-muted-foreground">
                      {t.apartments.detailDescription}
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="features" className="mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {apartment.features.map((feature, index) => (
                      <div key={index} className="flex items-center p-3 rounded-lg border">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary mr-3">
                          {getFeatureIcon(feature)}
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="location" className="mt-6">
                  <div className="space-y-4">
                    <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.67890!2d12.3456789!3d43.2109876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDA1JzI0LjAiTiAxMsKwMTInMDYuMCJF!5e0!3m2!1sen!2sit!4v1629789012345!5m2!1sen!2sit" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen={true} 
                        loading="lazy"
                      ></iframe>
                    </div>
                    <p className="text-muted-foreground">
                      {t.apartments.locationDescription}
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
              
              {/* Reviews preview */}
              <div className="mt-10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">{t.apartments.reviews.title}</h3>
                  <Button variant="outline" className="text-sm">
                    {t.apartments.reviews.seeAll}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {/* Sample review */}
                  <div className="p-6 rounded-xl bg-card border">
                    <div className="flex items-start">
                      <div className="mr-4 flex-shrink-0">
                        <div className="h-12 w-12 rounded-full overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces" 
                            alt="Reviewer" 
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-semibold">Sophie Martinez</h4>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className="h-4 w-4 fill-amber-500 text-amber-500" 
                              />
                            ))}
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">June 12, 2023</p>
                        <p className="text-muted-foreground">
                          {t.apartments.reviews.sampleReview}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Booking Widget */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 glass-card p-6 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-2xl font-bold">${apartment.price}</span>
                    <span className="text-muted-foreground"> / {t.booking.summary.night}</span>
                  </div>
                  <div className="flex items-center text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 font-medium">4.9</span>
                  </div>
                </div>
                
                <BookingForm />
              </div>
            </div>
          </div>
        </section>
        
        {/* Similar apartments */}
        <section className="py-12 border-t mt-12">
          <h2 className="text-2xl font-bold mb-6">{t.apartments.similarProperties}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apartmentsData
              .filter(apt => apt.id !== apartment.id)
              .slice(0, 3)
              .map(apt => (
                <div key={apt.id} className="group rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition-all duration-300">
                  <Link href={`/apartments/${apt.id}`} className="block">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={apt.image} 
                        alt={apt.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                        <h3 className="font-bold">{apt.name}</h3>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{apt.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{apt.capacity}</span>
                          </div>
                          <div className="flex items-center">
                            <Maximize className="h-4 w-4 mr-1" />
                            <span>{apt.size} m²</span>
                          </div>
                        </div>
                        <div>
                          <span className="font-bold">${apt.price}</span>
                          <span className="text-muted-foreground text-sm"> / {t.booking.summary.night}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            }
          </div>
        </section>
      </main>
    </div>
  );
}
