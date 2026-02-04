"use client";
import { format } from "date-fns";
import { type ApartmentProps } from "@/components/ApartmentCard";
import { Calendar, Users, ShieldCheck, MapPin, ArrowRight } from "lucide-react";

interface BookingSummaryProps {
  apartment: ApartmentProps | null;
  startDate: Date | undefined;
  endDate: Date | undefined;
  adults: string;
  children: string;
  nightsCount: number;
  totalPrice: number;
}

export default function BookingSummary({
  apartment,
  startDate,
  endDate,
  adults,
  children,
  nightsCount,
  totalPrice
}: BookingSummaryProps) {
  if (!apartment) return null;

  return (
    <div className="bg-white dark:bg-[#0A0A0A] -sm p-12 sticky top-24 border border-black/[0.06] dark:border-white/[0.06] shadow-sm overflow-hidden">
      {/* Property Header - Minimalist approach */}
      <div className="pb-12 space-y-6">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.3em] font-medium text-black/40 dark:text-white/40">Residence</p>
          <h3 className="font-serif italic text-4xl tracking-tighter text-black/90 dark:text-white/90">
            {apartment.name}
          </h3>
        </div>
        <div className="flex items-center gap-2 text-black/40 dark:text-white/30">
          <MapPin className="w-3 h-3 stroke-[1.5px]" />
          <p className="text-[9px] uppercase tracking-[0.2em] font-semibold">
            {apartment.location}
          </p>
        </div>
      </div>

      {/* Itinerary - Borrowing the thin line and circular motifs from your image */}
      <div className="py-10 border-t border-black/[0.06] dark:border-white/10 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-black/30 dark:text-white/30">Timeline</span>
            <div className="flex items-center gap-3">
               <p className="text-sm font-medium tracking-tight">
                {startDate ? format(startDate, "MMM dd") : "—"}
              </p>
              <ArrowRight className="w-3 h-3 text-black/20" />
              <p className="text-sm font-medium tracking-tight">
                {endDate ? format(endDate, "MMM dd, yyyy") : "—"}
              </p>
            </div>
          </div>
          <div className="h-10 w-10 -full border border-black/10 dark:border-white/10 flex items-center justify-center">
            <span className="text-[10px] font-medium">{nightsCount}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-black/30 dark:text-white/30">Occupancy</span>
            <p className="text-sm font-medium tracking-tight">
              {adults} Adults {parseInt(children) > 0 && `+ ${children} Children`}
            </p>
          </div>
          <Users className="w-4 h-4 text-black/20 stroke-[1.5px]" />
        </div>
      </div>

      {/* Financial Ledger - High contrast vertical rhythm */}
      <div className="py-10 border-t border-black/[0.06] dark:border-white/10 space-y-5">
        <Row label="Base Rate" value={`$${apartment.price * nightsCount}`} />
        <Row label="Amenities & Prep" value="$50" />
        <Row label="Service" value="$30" />
      </div>

      {/* Total Amount - Echoing the "02" circle style from your image */}
      <div className="pt-10 border-t border-black/90 dark:border-white/90">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-black/40 dark:text-white/40">Total Amount</p>
            <span className="text-5xl font-serif italic tracking-tighter text-black/90 dark:text-white/90">
              ${totalPrice + 50 + 30}
            </span>
          </div>
          <div className="h-14 w-14 -full border border-black/[0.08] dark:border-white/[0.08] flex items-center justify-center group hover:border-black/40 transition-colors">
            <ShieldCheck className="w-6 h-6 text-black/20 group-hover:text-black/60 transition-colors stroke-[1px]" />
          </div>
        </div>
        
        <p className="mt-12 text-[8px] text-center text-black/30 dark:text-white/20 uppercase tracking-[0.4em] font-bold">
          Non-Refundable Standard Rate
        </p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-baseline">
      <span className="text-[10px] uppercase tracking-widest text-black/40 dark:text-white/40 font-medium">{label}</span>
      <div className="flex-1 border-b border-black/[0.04] dark:border-white/[0.04] mx-4 translate-y-[-4px]" />
      <span className="text-sm font-medium tabular-nums text-black/70 dark:text-white/70">{value}</span>
    </div>
  );
}