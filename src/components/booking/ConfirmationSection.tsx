"use client";
import {
  Check,
  CreditCard,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  MapPin,
  Calendar,
  Users,
} from "lucide-react";
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
  onSubmitBooking,
}: ConfirmationSectionProps) {
  if (isBookingConfirmed) {
    return (
      <div className="animate-in fade-in zoom-in-95 mx-auto max-w-2xl py-12 text-center duration-1000">
        <div className="relative mb-10 inline-block">
          <div className="bg-primary/5 mx-auto flex h-24 w-24 items-center justify-center rounded-full">
            <Check className="text-primary h-10 w-10 stroke-[1.5px]" />
          </div>
          <div className="border-primary/20 absolute inset-0 animate-ping rounded-full border" />
        </div>

        <h2 className="mb-6 font-serif text-4xl tracking-tight italic md:text-5xl">
          Reservation Secured
        </h2>
        <p className="text-muted-foreground mx-auto mb-10 max-w-md text-sm leading-loose font-light tracking-widest uppercase">
          A bespoke digital itinerary has been dispatched to{" "}
          <span className="text-foreground font-bold">{formData.email}</span>.
        </p>

        <div className="bg-secondary/5 border-border/20 mb-12 inline-block rounded-2xl border p-6">
          <p className="text-muted-foreground mb-2 text-[10px] font-bold tracking-[0.4em] uppercase">
            Booking Reference
          </p>
          <p className="text-primary font-mono text-2xl tracking-tighter">
            HB-
            {Math.floor(Math.random() * 100000)
              .toString()
              .padStart(5, "0")}
          </p>
        </div>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            asChild
            variant="outline"
            className="border-border/20 h-14 rounded-full px-10 text-[10px] font-bold tracking-widest uppercase"
          >
            <Link href="/">Return Home</Link>
          </Button>
          <Button className="bg-primary shadow-primary/20 h-14 rounded-full px-10 text-[10px] font-bold tracking-widest text-white uppercase shadow-xl transition-transform hover:scale-105">
            Manage My Stay
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-12 flex items-center gap-4">
        <h2 className="text-primary text-[11px] font-bold tracking-[0.5em] uppercase">
          03 / Final Verification
        </h2>
        <div className="from-primary/20 h-px flex-1 bg-gradient-to-r to-transparent" />
      </div>

      <div className="mb-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left Column: Itinerary Info */}
        <div className="space-y-12 lg:col-span-7">
          {/* Accommodation Brief */}
          <section>
            <h3 className="mb-6 font-serif text-lg italic">
              Accommodation Brief
            </h3>
            {apartment && (
              <div className="group flex flex-col gap-6 p-2 md:flex-row">
                <div className="h-48 w-full overflow-hidden rounded-2xl shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] md:w-48">
                  <img
                    src={apartment.image}
                    alt={apartment.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h4 className="text-foreground text-xl font-medium tracking-tight">
                      {apartment.name}
                    </h4>
                    <div className="text-muted-foreground mt-1 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span className="text-[11px] font-bold tracking-widest uppercase">
                        {apartment.location}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3 pt-2">
                    <SummaryItem
                      icon={<Calendar className="h-3 w-3" />}
                      label="Duration"
                      value={`${startDate && format(startDate, "MMM d")} — ${endDate && format(endDate, "MMM d, yyyy")}`}
                    />
                    <SummaryItem
                      icon={<Users className="h-3 w-3" />}
                      label="Occupancy"
                      value={`${adults} Adults ${children ? `, ${children} Children` : ""}`}
                    />
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Guest Dossier */}
          <section>
            <h3 className="mb-6 font-serif text-lg italic">Guest Dossier</h3>
            <div className="grid grid-cols-1 gap-x-10 gap-y-6 px-2 md:grid-cols-2">
              <DossierItem
                label="Lead Guest"
                value={`${formData.firstName} ${formData.lastName}`}
              />
              <DossierItem label="Electronic Mail" value={formData.email} />
              <DossierItem label="Contact Number" value={formData.phone} />
              <DossierItem
                label="Origin"
                value={`${formData.city}, ${formData.country}`}
              />
              <div className="border-border/10 border-t pt-4 md:col-span-2">
                <DossierItem
                  label="Payment Method"
                  value={
                    formData.paymentMethod === "credit-card"
                      ? `Visa Platinum •••• ${formData.cardNumber.slice(-4)}`
                      : "At Property"
                  }
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Settlement Overiview */}
        <div className="lg:col-span-5">
          <div className="bg-background border-border/20 sticky top-32 rounded-[2.5rem] border p-10 shadow-2xl">
            <div className="mb-8 flex items-center justify-between">
              <h3 className="font-serif text-lg italic">Settlement</h3>
              <Sparkles className="text-primary/40 h-4 w-4" />
            </div>

            <div className="space-y-5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground font-light italic">
                  Accommodation ({nightsCount} nights)
                </span>
                <span className="font-medium tracking-tight">
                  ${apartment?.price ? apartment.price * nightsCount : 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-light italic">
                  Cleaning & Preparation
                </span>
                <span className="font-medium tracking-tight">$50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-light italic">
                  Service & Concierge
                </span>
                <span className="font-medium tracking-tight">$30</span>
              </div>

              <div className="border-border/20 mt-8 border-t-2 border-dashed pt-8">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-primary mb-1 text-[10px] font-black tracking-[0.2em] uppercase">
                      Total Guarantee
                    </p>
                    <p className="font-serif text-4xl tracking-tighter italic">
                      ${totalPrice + 50 + 30}
                    </p>
                  </div>
                  <ShieldCheck className="text-primary/20 h-8 w-8 stroke-[1px]" />
                </div>
              </div>
            </div>

            <div className="mt-10 space-y-6">
              <div className="group flex cursor-pointer items-start gap-3">
                <div className="relative mt-1 flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="terms"
                    className="peer border-border/20 checked:bg-primary h-5 w-5 cursor-pointer appearance-none rounded-full border transition-all"
                  />
                  <Check className="pointer-events-none absolute h-3 w-3 scale-0 text-white transition-transform peer-checked:scale-100" />
                </div>
                <label
                  htmlFor="terms"
                  className="text-muted-foreground group-hover:text-foreground cursor-pointer text-[10px] leading-relaxed tracking-widest uppercase transition-colors"
                >
                  I accept the{" "}
                  <span className="text-primary underline">terms of stay</span>{" "}
                  & privacy policy.
                </label>
              </div>

              <div className="flex flex-col gap-4">
                <Button
                  className="bg-primary hover:bg-primary/90 shadow-primary/30 w-full rounded-full py-8 text-[11px] font-bold tracking-[0.3em] text-white uppercase shadow-2xl transition-all active:scale-[0.98]"
                  onClick={onSubmitBooking}
                >
                  Confirm Reservation
                </Button>
                <Button
                  variant="ghost"
                  onClick={onBack}
                  className="text-muted-foreground hover:text-foreground w-full rounded-full text-[10px] font-bold tracking-widest uppercase"
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
function SummaryItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-primary/60">{icon}</div>
      <div className="flex flex-col">
        <span className="text-muted-foreground/60 text-[9px] font-bold tracking-widest uppercase">
          {label}
        </span>
        <span className="text-xs font-medium">{value}</span>
      </div>
    </div>
  );
}

function DossierItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-muted-foreground/50 text-[9px] font-bold tracking-[0.2em] uppercase">
        {label}
      </p>
      <p className="text-foreground/90 text-sm font-medium tracking-tight">
        {value}
      </p>
    </div>
  );
}
