"use client";
import { CalendarIcon, Users, ChevronDown, Sparkles } from "lucide-react";
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

interface DateGuestsSelectorProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  adults: string;
  children: string;
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
  onAdultsChange: (value: string) => void;
  onChildrenChange: (value: string) => void;
}

export default function DateGuestsSelector({
  startDate,
  endDate,
  adults,
  children,
  onStartDateChange,
  onEndDateChange,
  onAdultsChange,
  onChildrenChange
}: DateGuestsSelectorProps) {
  return (
    <div className="space-y-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Editorial Header */}
      <div className="flex items-end justify-between border-b border-black/[0.03] dark:border-white/[0.03] pb-4">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary">01 / Timing & Company</p>
          <h2 className="text-3xl font-serif italic tracking-tight">Plan Your Arrival</h2>
        </div>
        <Sparkles className="w-5 h-5 text-primary/20 mb-1" />
      </div>

      <div className="bg-white dark:bg-[#0c0c0c] border border-black/[0.03] dark:border-white/[0.05] -[2rem] p-2 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center">
          
          {/* Arrival Date */}
          <div className="relative group p-6">
            <label className="text-[9px] uppercase tracking-[0.2em] font-black text-muted-foreground/60 mb-2 block ml-1 transition-colors group-hover:text-primary">
              Arrival
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center w-full text-left outline-none">
                  <span className={cn(
                    "text-lg font-medium tracking-tight",
                    !startDate && "text-muted-foreground/40 font-light italic"
                  )}>
                    {startDate ? format(startDate, "MMMM dd") : "Select date"}
                  </span>
                  <CalendarIcon className="ml-auto h-4 w-4 text-primary/30" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-4 -3xl border-black/5 dark:border-white/10 shadow-2xl backdrop-blur-xl bg-white/90 dark:bg-black/90" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={onStartDateChange}
                  disabled={(date) => date < new Date()}
                  className="-2xl"
                />
              </PopoverContent>
            </Popover>
            <div className="hidden lg:block absolute right-0 top-1/4 bottom-1/4 w-px bg-black/[0.03] dark:bg-white/[0.05]" />
          </div>

          {/* Departure Date */}
          <div className="relative group p-6">
            <label className="text-[9px] uppercase tracking-[0.2em] font-black text-muted-foreground/60 mb-2 block ml-1 transition-colors group-hover:text-primary">
              Departure
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center w-full text-left outline-none">
                  <span className={cn(
                    "text-lg font-medium tracking-tight",
                    !endDate && "text-muted-foreground/40 font-light italic"
                  )}>
                    {endDate ? format(endDate, "MMMM dd") : "Select date"}
                  </span>
                  <CalendarIcon className="ml-auto h-4 w-4 text-primary/30" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-4 -3xl border-black/5 dark:border-white/10 shadow-2xl backdrop-blur-xl bg-white/90 dark:bg-black/90" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={onEndDateChange}
                  disabled={(date) => date < (startDate ?? new Date())}
                  className="-2xl"
                />
              </PopoverContent>
            </Popover>
            <div className="hidden lg:block absolute right-0 top-1/4 bottom-1/4 w-px bg-black/[0.03] dark:bg-white/[0.05]" />
          </div>

          {/* Adults Selection */}
          <div className="relative group p-6">
            <label className="text-[9px] uppercase tracking-[0.2em] font-black text-muted-foreground/60 mb-2 block ml-1 transition-colors group-hover:text-primary">
              Adults
            </label>
            <Select value={adults} onValueChange={onAdultsChange}>
              <SelectTrigger className="border-0 p-0 h-auto bg-transparent focus:ring-0 text-lg font-medium tracking-tight">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="-2xl border-black/5 dark:border-white/10 shadow-2xl">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={num.toString()} className="-lg">
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="hidden lg:block absolute right-0 top-1/4 bottom-1/4 w-px bg-black/[0.03] dark:bg-white/[0.05]" />
          </div>

          {/* Children Selection */}
          <div className="group p-6">
            <label className="text-[9px] uppercase tracking-[0.2em] font-black text-muted-foreground/60 mb-2 block ml-1 transition-colors group-hover:text-primary">
              Children
            </label>
            <Select value={children} onValueChange={onChildrenChange}>
              <SelectTrigger className="border-0 p-0 h-auto bg-transparent focus:ring-0 text-lg font-medium tracking-tight">
                <SelectValue placeholder="None" />
              </SelectTrigger>
              <SelectContent className="-2xl border-black/5 dark:border-white/10 shadow-2xl">
                {[0, 1, 2, 3, 4].map((num) => (
                  <SelectItem key={num} value={num.toString()} className="-lg">
                    {num === 0 ? "No Children" : `${num} ${num === 1 ? "Child" : "Children"}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Quick Summary / Status */}
      <div className="flex items-center justify-center gap-8 text-[10px] uppercase tracking-widest text-muted-foreground/50 font-bold">
        <div className="flex items-center gap-2">
          <div className={cn("w-1.5 h-1.5 -full", startDate && endDate ? "bg-green-500" : "bg-primary/20")} />
          <span>Validity Period</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-3 h-3" />
          <span>Bespoke Occupancy</span>
        </div>
      </div>
    </div>
  );
}