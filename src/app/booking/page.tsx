"use client";
import { useEffect, useState, useRef } from "react";
import { addDays, differenceInDays } from "date-fns";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import BookingHeader from "@/components/booking/BookingHeader";
import BookingSteps from "@/components/booking/BookingSteps";
import DateGuestsSelector from "@/components/booking/DateGuestsSelector";
import ApartmentSelector from "@/components/booking/ApartmentSelector";
import GuestInformationForm from "@/components/booking/GuestInformationForm";
import BookingSummary from "@/components/booking/BookingSummary";
import ConfirmationSection from "@/components/booking/ConfirmationSection";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { apartmentsData, type FormData } from "@/lib/booking-data";
import { type ApartmentProps } from "@/components/ApartmentCard";

export default function BookingPage() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(addDays(new Date(), 7));
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [selectedApartment, setSelectedApartment] = useState<ApartmentProps | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  
  const stepContainerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: "", lastName: "", email: "", phone: "", address: "",
    city: "", zipCode: "", country: "", paymentMethod: "credit-card",
    cardName: "", cardNumber: "", cardExpiry: "", cardCvc: "", specialRequests: ""
  });

  // GSAP Step Transition
  useEffect(() => {
    if (stepContainerRef.current) {
      gsap.fromTo(stepContainerRef.current, 
        { opacity: 0, y: 20, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power4.out" }
      );
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const nightsCount = startDate && endDate ? differenceInDays(endDate, startDate) : 0;
  const totalPrice = selectedApartment ? selectedApartment.price * nightsCount : 0;

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBookingConfirmed(true);
    // Add haptic feedback or sound here for true premium feel
  };

  return (
    <div className="min-h-screen bg-[#FCFBFA] dark:bg-[#080808] text-foreground selection:bg-primary selection:text-white">

      
      <main className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-24">
        {/* Cinematic Entrance */}
        <div className="mb-16">
          <BookingHeader />
          <div className="mt-12">
            <BookingSteps currentStep={currentStep} />
          </div>
        </div>

        <div ref={stepContainerRef} className="relative min-h-[60vh]">
          {/* STEP 1: CURATION */}
          {currentStep === 1 && (
            <div className="max-w-5xl mx-auto space-y-16">
              <DateGuestsSelector
                startDate={startDate} endDate={endDate}
                adults={adults} children={children}
                onStartDateChange={setStartDate} onEndDateChange={setEndDate}
                onAdultsChange={setAdults} onChildrenChange={setChildren}
              />
              
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <h2 className="text-[10px] uppercase tracking-[0.5em] font-bold text-primary/60">02 / Selection</h2>
                  <div className="h-px flex-1 bg-black/5 dark:bg-white/5" />
                </div>
                <ApartmentSelector
                  apartments={apartmentsData}
                  selectedApartment={selectedApartment}
                  onSelectApartment={setSelectedApartment}
                />
              </div>

              <div className="flex justify-end pt-12">
                <Button 
                  className="group h-16 px-10 -full bg-primary text-white shadow-2xl shadow-primary/20 hover:scale-105 transition-all duration-500"
                  disabled={!selectedApartment}
                  onClick={handleNext}
                >
                  <span className="text-[11px] uppercase tracking-[0.3em] font-bold">Continue to Details</span>
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: PERSONALIZATION */}
          {currentStep === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-7 space-y-10">
                <div className="space-y-2">
                  <h2 className="text-3xl font-serif italic tracking-tight">Guest Information</h2>
                  <p className="text-muted-foreground text-sm font-light tracking-wide">Please provide the details for your stay.</p>
                </div>
                <GuestInformationForm
                  formData={formData}
                  onInputChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                  onSelectChange={(name, value) => setFormData(prev => ({ ...prev, [name]: value }))}
                />
                
                <div className="flex items-center justify-between pt-10 border-t border-black/5 dark:border-white/5">
                  <Button variant="ghost" onClick={handleBack} className="text-[10px] uppercase tracking-widest font-bold opacity-50 hover:opacity-100">
                    <ArrowLeft className="mr-2 h-3 w-3" /> Go Back
                  </Button>
                  <Button 
                    className="h-16 px-10 -full bg-primary text-white shadow-xl shadow-primary/20"
                    onClick={handleNext}
                  >
                    <span className="text-[11px] uppercase tracking-[0.3em] font-bold">Review Itinerary</span>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="sticky top-32">
                  <BookingSummary
                    apartment={selectedApartment}
                    startDate={startDate} endDate={endDate}
                    adults={adults} children={children}
                    nightsCount={nightsCount} totalPrice={totalPrice}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: FINALIZATION */}
          {currentStep === 3 && (
            <div className="max-w-4xl mx-auto">
              <ConfirmationSection
                isBookingConfirmed={isBookingConfirmed}
                apartment={selectedApartment}
                startDate={startDate} endDate={endDate}
                adults={adults} children={children}
                formData={formData}
                nightsCount={nightsCount} totalPrice={totalPrice}
                onBack={handleBack}
                onSubmitBooking={handleSubmitBooking}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}