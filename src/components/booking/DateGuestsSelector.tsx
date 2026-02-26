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
  onChildrenChange,
}: DateGuestsSelectorProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mb-12 space-y-8 duration-1000">
      {/* Editorial Header */}
      <div className="flex items-end justify-between border-b border-black/[0.03] pb-4 dark:border-white/[0.03]">
        <div className="space-y-1">
          <p className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase">
            01 / Timing & Company
          </p>
          <h2 className="font-serif text-3xl tracking-tight italic">
            Plan Your Arrival
          </h2>
        </div>
        <Sparkles className="text-primary/20 mb-1 h-5 w-5" />
      </div>

      <div className="bg-background border-border/20 rounded-[2rem] border p-2 shadow-2xl">
        <div className="grid grid-cols-1 items-center md:grid-cols-2 lg:grid-cols-4">
          {/* Arrival Date */}
          <div className="group relative p-6">
            <label className="text-muted-foreground/60 group-hover:text-primary mb-2 ml-1 block text-[9px] font-black tracking-[0.2em] uppercase transition-colors">
              Arrival
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-foreground flex w-full items-center text-left outline-none">
                  <span
                    className={cn(
                      "text-lg font-medium tracking-tight",
                      !startDate &&
                        "text-muted-foreground/40 font-light italic",
                    )}
                  >
                    {startDate ? format(startDate, "MMMM dd") : "Select date"}
                  </span>
                  <CalendarIcon className="text-primary/30 ml-auto h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="border-border bg-background/90 w-auto rounded-3xl border p-4 shadow-2xl backdrop-blur-xl"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={onStartDateChange}
                  disabled={(date) => date < new Date()}
                  className="rounded-2xl"
                />
              </PopoverContent>
            </Popover>
            <div className="bg-border/40 absolute top-1/4 right-0 bottom-1/4 hidden w-px lg:block" />
          </div>

          {/* Departure Date */}
          <div className="group relative p-6">
            <label className="text-muted-foreground/60 group-hover:text-primary mb-2 ml-1 block text-[9px] font-black tracking-[0.2em] uppercase transition-colors">
              Departure
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-foreground flex w-full items-center text-left outline-none">
                  <span
                    className={cn(
                      "text-lg font-medium tracking-tight",
                      !endDate && "text-muted-foreground/40 font-light italic",
                    )}
                  >
                    {endDate ? format(endDate, "MMMM dd") : "Select date"}
                  </span>
                  <CalendarIcon className="text-primary/30 ml-auto h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="border-border bg-background/90 w-auto rounded-3xl border p-4 shadow-2xl backdrop-blur-xl"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={onEndDateChange}
                  disabled={(date) => date < (startDate ?? new Date())}
                  className="rounded-2xl"
                />
              </PopoverContent>
            </Popover>
            <div className="bg-border/40 absolute top-1/4 right-0 bottom-1/4 hidden w-px lg:block" />
          </div>

          {/* Adults Selection */}
          <div className="group relative p-6">
            <label className="text-muted-foreground/60 group-hover:text-primary mb-2 ml-1 block text-[9px] font-black tracking-[0.2em] uppercase transition-colors">
              Adults
            </label>
            <Select value={adults} onValueChange={onAdultsChange}>
              <SelectTrigger className="text-foreground h-auto border-0 bg-transparent p-0 text-lg font-medium tracking-tight focus:ring-0">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="border-border bg-background rounded-2xl border shadow-2xl">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem
                    key={num}
                    value={num.toString()}
                    className="rounded-lg"
                  >
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="bg-border/40 absolute top-1/4 right-0 bottom-1/4 hidden w-px lg:block" />
          </div>

          {/* Children Selection */}
          <div className="group p-6">
            <label className="text-muted-foreground/60 group-hover:text-primary mb-2 ml-1 block text-[9px] font-black tracking-[0.2em] uppercase transition-colors">
              Children
            </label>
            <Select value={children} onValueChange={onChildrenChange}>
              <SelectTrigger className="text-foreground h-auto border-0 bg-transparent p-0 text-lg font-medium tracking-tight focus:ring-0">
                <SelectValue placeholder="None" />
              </SelectTrigger>
              <SelectContent className="border-border bg-background rounded-2xl border shadow-2xl">
                {[0, 1, 2, 3, 4].map((num) => (
                  <SelectItem
                    key={num}
                    value={num.toString()}
                    className="rounded-lg"
                  >
                    {num === 0
                      ? "No Children"
                      : `${num} ${num === 1 ? "Child" : "Children"}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Quick Summary / Status */}
      <div className="text-muted-foreground/50 flex items-center justify-center gap-8 text-[10px] font-bold tracking-widest uppercase">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              startDate && endDate ? "bg-green-500" : "bg-primary/20",
            )}
          />
          <span>Validity Period</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-3 w-3" />
          <span>Bespoke Occupancy</span>
        </div>
      </div>
    </div>
  );
}
