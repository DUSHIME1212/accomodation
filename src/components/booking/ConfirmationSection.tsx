"use client";
import { Check, CreditCard, ArrowLeft, ShieldCheck, Sparkles, MapPin, Calendar, Users } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { type ApartmentProps } from "@/components/ApartmentCard";
import { type FormData } from "@/lib/booking-data";
import { cn } from "@/lib/utils";

interface ConfirmationSectionProps {
  isBookingConfirmed: boolean;
  apartment: ApartmentProps | null;
  startDate: Date | undefined;
  endDate: Date | undefined;
  adults: string;
  children: string;
  formData: FormData;
  nightsCount: number;
  totalPrice: number;
  onBack: () => void;
  onSubmitBooking: (e: React.FormEvent) => void;
}

export default function ConfirmationSection({
  isBookingConfirmed,
  apartment,
  startDate,
  endDate,
  adults,
  children,
  formData,
  nightsCount,
  totalPrice,
  onBack,
  onSubmitBooking
}: ConfirmationSectionProps) {
  
  if (isBookingConfirmed) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center animate-in fade-in zoom-in-95 duration-1000">
        <div className="relative inline-block mb-10">
          <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto">
            <Check className="h-10 w-10 text-primary stroke-[1.5px]" />
          </div>
          <div className="absolute inset-0 border border-primary/20 rounded-full animate-ping" />
        </div>
        
        <h2 className="text-4xl md:text-5xl font-serif italic mb-6 tracking-tight">Reservation Secured</h2>
        <p className="text-muted-foreground text-sm tracking-widest uppercase font-light max-w-md mx-auto leading-loose mb-10">
          A bespoke digital itinerary has been dispatched to <span className="text-foreground font-bold">{formData.email}</span>.
        </p>
        
<div className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-2xl p-6 mb-12 inline-block">
          <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-2 font-bold">Booking Reference</p>
          <p className="text-2xl font-mono tracking-tighter text-primary">
            HB-{Math.floor(Math.random() * 100000).toString().padStart(5, '0')}
          </p>
        </div>

<div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline" className="rounded-full px-10 h-14 border-black/10 dark:border-white/10 uppercase text-[10px] tracking-widest font-bold">
            <Link href="/">Return Home</Link>
          </Button>
          <Button className="rounded-full px-10 h-14 bg-primary text-white uppercase text-[10px] tracking-widest font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
            Manage My Stay
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-[11px] uppercase tracking-[0.5em] font-bold text-primary">03 / Final Verification</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
        {/* Left Column: Itinerary Info */}
        <div className="lg:col-span-7 space-y-12">
          
          {/* Accommodation Brief */}
          <section>
            <h3 className="text-lg font-serif italic mb-6">Accommodation Brief</h3>
            {apartment && (
              <div className="flex flex-col md:flex-row gap-6 p-2 group">
<div className="w-full md:w-48 h-48 rounded-2xl overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                  <img src={apartment.image} alt={apartment.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h4 className="text-xl font-medium tracking-tight">{apartment.name}</h4>
                    <div className="flex items-center text-muted-foreground gap-1 mt-1">
                       <MapPin className="w-3 h-3" />
                       <span className="text-[11px] uppercase tracking-widest font-bold">{apartment.location}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3 pt-2">
                    <SummaryItem icon={<Calendar className="w-3 h-3"/>} label="Duration" value={`${startDate && format(startDate, "MMM d")} — ${endDate && format(endDate, "MMM d, yyyy")}`} />
                    <SummaryItem icon={<Users className="w-3 h-3"/>} label="Occupancy" value={`${adults} Adults ${children ? `, ${children} Children` : ""}`} />
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Guest Dossier */}
          <section>
            <h3 className="text-lg font-serif italic mb-6">Guest Dossier</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 px-2">
              <DossierItem label="Lead Guest" value={`${formData.firstName} ${formData.lastName}`} />
              <DossierItem label="Electronic Mail" value={formData.email} />
              <DossierItem label="Contact Number" value={formData.phone} />
              <DossierItem label="Origin" value={`${formData.city}, ${formData.country}`} />
              <div className="md:col-span-2 border-t border-black/[0.03] dark:border-white/[0.03] pt-4">
                <DossierItem label="Payment Method" value={formData.paymentMethod === "credit-card" ? `Visa Platinum •••• ${formData.cardNumber.slice(-4)}` : "At Property"} />
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Settlement Overiview */}
        <div className="lg:col-span-5">
<div className="sticky top-32 bg-white dark:bg-[#111] rounded-[2.5rem] p-10 border border-black/[0.03] dark:border-white/[0.05] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-serif italic">Settlement</h3>
               <Sparkles className="w-4 h-4 text-primary/40" />
            </div>
            
            <div className="space-y-5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground italic font-light">Accommodation ({nightsCount} nights)</span>
                <span className="font-medium tracking-tight">${apartment?.price ? apartment.price * nightsCount : 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground italic font-light">Cleaning & Preparation</span>
                <span className="font-medium tracking-tight">$50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground italic font-light">Service & Concierge</span>
                <span className="font-medium tracking-tight">$30</span>
              </div>
              
              <div className="pt-8 mt-8 border-t-2 border-dashed border-black/5 dark:border-white/10">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-black text-primary mb-1">Total Guarantee</p>
                    <p className="text-4xl font-serif italic tracking-tighter">${totalPrice + 50 + 30}</p>
                  </div>
                  <ShieldCheck className="w-8 h-8 text-primary/20 stroke-[1px]" />
                </div>
              </div>
            </div>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-3 group cursor-pointer">
                <div className="relative flex items-center justify-center mt-1">
                  <input type="checkbox" id="terms" className="peer appearance-none h-5 w-5 border border-black/10 dark:border-white/20 rounded-full checked:bg-primary transition-all cursor-pointer" />
                  <Check className="absolute h-3 w-3 text-white scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
                </div>
                <label htmlFor="terms" className="text-[10px] leading-relaxed text-muted-foreground uppercase tracking-widest cursor-pointer group-hover:text-foreground transition-colors">
                  I accept the <span className="text-primary underline">terms of stay</span> & privacy policy.
                </label>
              </div>

              <div className="flex flex-col gap-4">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-8 text-[11px] uppercase tracking-[0.3em] font-bold shadow-2xl shadow-primary/30 active:scale-[0.98] transition-all"
                  onClick={onSubmitBooking}
                >
                  Confirm Reservation
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={onBack}
                  className="w-full rounded-full text-[10px] uppercase tracking-widest font-bold text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="mr-2 h-3 w-3" /> Edit Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Reusable Sub-components for Clean Premium UI */
function SummaryItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-primary/60">{icon}</div>
      <div className="flex flex-col">
        <span className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground/60">{label}</span>
        <span className="text-xs font-medium">{value}</span>
      </div>
    </div>
  );
}

function DossierItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-muted-foreground/50">{label}</p>
      <p className="text-sm font-medium tracking-tight text-foreground/90">{value}</p>
    </div>
  );
}