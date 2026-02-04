"use client";
import { useState, useRef } from "react";
import { Check, CalendarIcon, Users, ArrowRight, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "./LanguageContext";
import gsap from "gsap";

export default function BookingForm() {
  const { t } = useLanguage();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const formRef = useRef(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Luxury delay to simulate "bespoke searching"
    setTimeout(() => {
      console.log("Booking submitted:", { startDate, endDate, adults, children });
      setStatus("success");
      
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    }, 1500);
  };

  return (
    <form 
      ref={formRef}
      onSubmit={handleSubmit} 
      className="relative bg-white dark:bg-[#111] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.1)] space-y-10 border border-black/5"
    >
      <div className="space-y-2 text-center">
        <h3 className="text-3xl font-serif italic text-[#111] dark:text-white">
          {t.bookingForm.title}
        </h3>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">
          Bespoke Reservation Service
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-10">
        {/* Date Selection Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group space-y-2 relative">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
              {t.bookingForm.checkIn}
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="w-full flex items-center justify-between py-4 border-b border-black/10 group-hover:border-[#D4AF37] transition-colors duration-500 text-left"
                >
                  <span className={cn("text-lg font-light", !startDate && "text-gray-300")}>
                    {startDate ? format(startDate, "dd MMM yyyy") : t.bookingForm.selectDate}
                  </span>
                  <CalendarIcon className="h-4 w-4 text-gray-400" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 border-none shadow-2xl" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  disabled={(date) => date < new Date()}
                  className="bg-white dark:bg-black p-4"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="group space-y-2 relative">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
              {t.bookingForm.checkOut}
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="w-full flex items-center justify-between py-4 border-b border-black/10 group-hover:border-[#D4AF37] transition-colors duration-500 text-left"
                >
                  <span className={cn("text-lg font-light", !endDate && "text-gray-300")}>
                    {endDate ? format(endDate, "dd MMM yyyy") : t.bookingForm.selectDate}
                  </span>
                  <CalendarIcon className="h-4 w-4 text-gray-400" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 border-none shadow-2xl" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  disabled={(date) => date < (startDate ?? new Date())}
                  className="bg-white dark:bg-black p-4"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        {/* Guests Selection Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2 group">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
              {t.bookingForm.adults}
            </label>
            <Select value={adults} onValueChange={setAdults}>
              <SelectTrigger className="h-auto py-4 -none border-x-0 border-t-0 border-b border-black/10 focus:ring-0 bg-transparent text-lg font-light group-hover:border-[#D4AF37] transition-all">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="-none border-none shadow-xl">
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()} className="focus:bg-[#FAF9F6] py-3">
                    {num} {num === 1 ? t.bookingForm.adult : t.bookingForm.adults}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2 group">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
              {t.bookingForm.children}
            </label>
            <Select value={children} onValueChange={setChildren}>
              <SelectTrigger className="h-auto py-4 -none border-x-0 border-t-0 border-b border-black/10 focus:ring-0 bg-transparent text-lg font-light group-hover:border-[#D4AF37] transition-all">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="-none border-none shadow-xl">
                {[0, 1, 2, 3, 4].map((num) => (
                  <SelectItem key={num} value={num.toString()} className="focus:bg-[#FAF9F6] py-3">
                    {num} {num === 1 ? t.bookingForm.child : t.bookingForm.children}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <Button 
        type="submit" 
        disabled={status === "loading"}
        className={cn(
          "w-full h-16 -none uppercase tracking-[0.3em] text-[11px] font-bold transition-all duration-700",
          status === "success" 
            ? "bg-green-600 text-white" 
            : "bg-[#111] dark:bg-white dark:text-black text-white hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] dark:hover:text-white"
        )}
      >
        {status === "loading" ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : status === "success" ? (
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4" />
            {t.bookingForm.bookingConfirmed}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {t.bookingForm.checkAvailability}
            <ArrowRight className="h-4 w-4" />
          </div>
        )}
      </Button>

      <p className="text-center text-[9px] text-gray-400 uppercase tracking-widest">
        Best Price Guaranteed for Direct Reservations
      </p>
    </form>
  );
}