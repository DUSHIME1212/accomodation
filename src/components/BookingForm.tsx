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
      console.log("Booking submitted:", {
        startDate,
        endDate,
        adults,
        children,
      });
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
      className="bg-background border-border relative space-y-10 border p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] md:p-12"
    >
      <div className="space-y-2 text-center">
        <h3 className="text-foreground font-serif text-3xl italic">
          {t.bookingForm.title}
        </h3>
        <p className="text-muted-foreground text-[10px] font-bold tracking-[0.3em] uppercase">
          Bespoke Reservation Service
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10">
        {/* Date Selection Row */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="group relative space-y-2">
            <label className="text-muted-foreground ml-1 text-[10px] font-bold tracking-widest uppercase">
              {t.bookingForm.checkIn}
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="border-border group-hover:border-primary flex w-full items-center justify-between border-b py-4 text-left transition-colors duration-500"
                >
                  <span
                    className={cn(
                      "text-foreground text-lg font-light",
                      !startDate && "text-muted-foreground/30",
                    )}
                  >
                    {startDate
                      ? format(startDate, "dd MMM yyyy")
                      : t.bookingForm.selectDate}
                  </span>
                  <CalendarIcon className="text-muted-foreground/40 h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto border-none p-0 shadow-2xl"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  disabled={(date) => date < new Date()}
                  className="bg-background border-border border p-4"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="group relative space-y-2">
            <label className="text-muted-foreground ml-1 text-[10px] font-bold tracking-widest uppercase">
              {t.bookingForm.checkOut}
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="border-border group-hover:border-primary flex w-full items-center justify-between border-b py-4 text-left transition-colors duration-500"
                >
                  <span
                    className={cn(
                      "text-foreground text-lg font-light",
                      !endDate && "text-muted-foreground/30",
                    )}
                  >
                    {endDate
                      ? format(endDate, "dd MMM yyyy")
                      : t.bookingForm.selectDate}
                  </span>
                  <CalendarIcon className="text-muted-foreground/40 h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto border-none p-0 shadow-2xl"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  disabled={(date) => date < (startDate ?? new Date())}
                  className="bg-background border-border border p-4"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Guests Selection Row */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="group space-y-2">
            <label className="text-muted-foreground ml-1 text-[10px] font-bold tracking-widest uppercase">
              {t.bookingForm.adults}
            </label>
            <Select value={adults} onValueChange={setAdults}>
              <SelectTrigger className="border-border group-hover:border-primary text-foreground h-auto w-full rounded-none border-x-0 border-t-0 border-b bg-transparent py-4 text-lg font-light transition-all focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-border bg-background rounded-none shadow-xl">
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem
                    key={num}
                    value={num.toString()}
                    className="focus:bg-secondary/20 py-3"
                  >
                    {num}{" "}
                    {num === 1 ? t.bookingForm.adult : t.bookingForm.adults}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="group space-y-2">
            <label className="text-muted-foreground ml-1 text-[10px] font-bold tracking-widest uppercase">
              {t.bookingForm.children}
            </label>
            <Select value={children} onValueChange={setChildren}>
              <SelectTrigger className="border-border group-hover:border-primary text-foreground h-auto w-full rounded-none border-x-0 border-t-0 border-b bg-transparent py-4 text-lg font-light transition-all focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-border bg-background rounded-none shadow-xl">
                {[0, 1, 2, 3, 4].map((num) => (
                  <SelectItem
                    key={num}
                    value={num.toString()}
                    className="focus:bg-secondary/20 py-3"
                  >
                    {num}{" "}
                    {num === 1 ? t.bookingForm.child : t.bookingForm.children}
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
          "h-16 w-full rounded-none text-[11px] font-bold tracking-[0.3em] uppercase transition-all duration-700",
          status === "success"
            ? "bg-green-600 text-white"
            : "bg-foreground text-background hover:bg-primary hover:text-white",
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

      <p className="text-muted-foreground/60 text-center text-[9px] tracking-widest uppercase">
        Best Price Guaranteed for Direct Reservations
      </p>
    </form>
  );
}
