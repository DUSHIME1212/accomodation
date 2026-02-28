"use client";

import React, { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/admin/DashboardHeader";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Clock,
  User,
  ExternalLink,
  ChevronDown,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { CheckInSheet } from "@/components/admin/CheckInSheet";
import { toast } from "sonner";

export default function BookedRoomManagement() {
  const [stats, setStats] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleOpenSheet = (booking: any) => {
    const transformed = {
      id: booking.confirmationNumber || booking.id,
      guest: `${booking.guestFirstName} ${booking.guestLastName}`,
      email: booking.guestEmail,
      room:
        booking.assignedRoomNumber ||
        booking.apartment?.sanityId?.split("-").pop()?.toUpperCase() ||
        "N/A",
      type: booking.apartment?.name || "Standard Room",
      checkIn: new Date(booking.checkInDate).toLocaleDateString(),
      checkOut: new Date(booking.checkOutDate).toLocaleDateString(),
      status: booking.status,
      dbId: booking.id,
    };
    setSelectedBooking(transformed);
    setIsSheetOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch stats from a dedicated endpoint or compute them
        const statsRes = await fetch("/api/admin/reservations");
        const reservationsData = await statsRes.json();

        // Mocking stats for now based on reservation data
        const currentBookings = (reservationsData.bookings || []).filter(
          (b: any) => b.status === "confirmed" || b.status === "checked-in",
        );

        setStats({
          occupancyRate: Math.round((currentBookings.length / 50) * 100), // assuming 50 rooms total
          arrivals: currentBookings.filter((b: any) => b.status === "confirmed")
            .length,
          departures: 3, // mock
          overstays: 0,
          pendingCleans: 5,
        });

        setBookings(currentBookings);
      } catch (err) {
        console.error(err);
        toast.error("Failed to sync occupancy data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#00303e] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1600px] space-y-12 p-10">
      <DashboardHeader
        title="Occupancy Intelligence"
        subtitle="Operational command center for real-time room flow and guest logistics."
        showFilters={false}
      />

      {/* Hero Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Real-time Occupancy",
            value: `${stats?.occupancyRate}%`,
            icon: Activity,
            trend: "+2.4%",
            trendUp: true,
            color: "bg-blue-500",
          },
          {
            label: "Incoming Arrivals",
            value: stats?.arrivals || "0",
            icon: ArrowDownRight,
            trend: "Priority",
            trendUp: false,
            color: "bg-emerald-500",
          },
          {
            label: "Scheduled Departures",
            value: stats?.departures || "0",
            icon: ArrowUpRight,
            trend: "Normal",
            trendUp: true,
            color: "bg-amber-500",
          },
          {
            label: "Housekeeping Queue",
            value: stats?.pendingCleans || "0",
            icon: Clock,
            trend: "-12m avg",
            trendUp: false,
            color: "bg-indigo-500",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-card border-border group flex flex-col justify-between rounded-[2.5rem] border p-8 shadow-xl shadow-black/5 transition-all hover:border-[#00303e]"
          >
            <div className="flex items-start justify-between">
              <div
                className={cn(
                  "shadow-primary/10 flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg",
                  stat.color,
                )}
              >
                <stat.icon className="h-7 w-7" />
              </div>
              <div
                className={cn(
                  "rounded-full px-3 py-1 text-[10px] font-medium tracking-widest uppercase",
                  stat.trendUp
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-blue-100 text-blue-700",
                )}
              >
                {stat.trend}
              </div>
            </div>
            <div className="mt-8">
              <p className="text-muted-foreground mb-2 text-xs font-medium tracking-widest uppercase opacity-60">
                {stat.label}
              </p>
              <h4 className="text-5xl font-medium tracking-tight text-[#00303e]">
                {stat.value}
              </h4>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Active Occupancy List */}
        <div className="space-y-8 lg:col-span-8">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-3 text-2xl font-medium tracking-tighter uppercase">
              <div className="h-2 w-8 rounded-full bg-[#00303e]" />
              Active In-House Guests
            </h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-border h-10 rounded-xl px-4 text-[10px] font-medium tracking-widest uppercase"
              >
                <List className="mr-2 h-3.5 w-3.5" /> List
              </Button>
              <Button
                variant="outline"
                className="h-10 rounded-xl border-[#00303e] bg-[#00303e] px-4 text-[10px] font-medium tracking-widest text-white uppercase"
              >
                <LayoutGrid className="mr-2 h-3.5 w-3.5" /> Grid
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <OccupiedRoomCard
                  key={booking.id}
                  room={
                    booking.assignedRoomNumber ||
                    booking.apartment?.sanityId
                      ?.split("-")
                      .pop()
                      ?.toUpperCase() ||
                    "N/A"
                  }
                  guest={`${booking.guestFirstName} ${booking.guestLastName}`}
                  checkIn={new Date(booking.checkInDate).toLocaleDateString()}
                  checkOut={new Date(booking.checkOutDate).toLocaleDateString()}
                  isOverstay={new Date(booking.checkOutDate) < new Date()}
                  onCheckout={() => handleOpenSheet(booking)}
                />
              ))
            ) : (
              <div className="border-border text-muted-foreground col-span-2 flex flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed py-24 opacity-40">
                <User className="mb-4 h-16 w-16" />
                <p className="text-xs font-medium tracking-widest uppercase">
                  Zero In-House Occupancy
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Operational Signals Sidebar */}
        <div className="space-y-8 lg:col-span-4">
          <div className="shadow-primary/20 group relative overflow-hidden rounded-[2.5rem] bg-[#00303e] p-10 text-white shadow-2xl">
            <div className="absolute top-0 right-0 h-40 w-40 translate-x-10 -translate-y-20 rounded-full bg-white/5 transition-transform duration-700 group-hover:scale-150" />
            <div className="relative z-10 space-y-6">
              <div className="space-y-2">
                <p className="text-[10px] font-medium tracking-widest uppercase opacity-60">
                  System Core
                </p>
                <h3 className="text-3xl leading-none font-medium uppercase">
                  Efficiency Index
                </h3>
              </div>
              <div className="flex items-end gap-4">
                <span className="text-7xl leading-none font-medium">
                  {stats?.occupancyRate}%
                </span>
                <div className="mb-1 flex flex-col">
                  <TrendingUp className="h-6 w-6 text-emerald-400" />
                  <span className="text-[10px] font-medium">+4%</span>
                </div>
              </div>
              <p className="text-xs leading-relaxed font-medium opacity-70">
                Property is performing at optimal capacity. Maintain current
                housekeeping cycles to ensure fluid transitions.
              </p>
              <Button className="h-14 w-full rounded-2xl bg-white text-xs font-medium tracking-widest text-[#00303e] uppercase shadow-xl transition-all hover:scale-105 active:scale-95">
                Operational Report
              </Button>
            </div>
          </div>

          <div className="bg-card border-border space-y-6 rounded-[2.5rem] border p-8 shadow-xl shadow-black/5">
            <h4 className="border-border border-b pb-4 text-sm font-medium tracking-widest uppercase">
              Housekeeping Status
            </h4>
            <div className="space-y-4">
              {[
                {
                  label: "DIRTY ROOMS",
                  count: stats?.pendingCleans || 0,
                  color: "bg-rose-500",
                },
                { label: "IN PROGRESS", count: 2, color: "bg-amber-500" },
                { label: "INSPECTION", count: 1, color: "bg-blue-500" },
                { label: "READY", count: 42, color: "bg-emerald-500" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group flex cursor-pointer items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn("h-2.5 w-2.5 rounded-full", item.color)}
                    />
                    <span className="text-[10px] font-medium tracking-widest uppercase opacity-60 transition-opacity group-hover:opacity-100">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-[#00303e]">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <CheckInSheet
        booking={selectedBooking}
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
      />
    </div>
  );
}

function OccupiedRoomCard({
  room,
  guest,
  checkIn,
  checkOut,
  isOverstay,
  onCheckout,
}: any) {
  return (
    <div
      className={cn(
        "bg-card group relative overflow-hidden rounded-[2.5rem] border p-10 shadow-xl transition-all hover:-translate-y-2",
        isOverstay
          ? "border-rose-200 bg-rose-50/10 shadow-rose-500/5"
          : "border-border shadow-black/5 hover:border-[#00303e]",
      )}
    >
      {isOverstay && (
        <div className="absolute top-0 right-0 rounded-bl-3xl bg-rose-500 px-8 py-2 text-[10px] font-medium tracking-widest text-white uppercase shadow-lg">
          Attention Required
        </div>
      )}

      <div className="mb-10 flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-[10px] font-medium tracking-widest uppercase opacity-40">
            Operational Unit
          </p>
          <h4 className="origin-left text-5xl font-medium tracking-tighter text-[#00303e] uppercase transition-transform group-hover:scale-105">
            {room}
          </h4>
        </div>
        <div className="bg-muted/50 border-border flex h-16 w-16 items-center justify-center rounded-2xl border shadow-inner transition-colors duration-500 group-hover:bg-[#00303e] group-hover:text-white">
          <User className="h-8 w-8" />
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-1">
          <p className="text-[10px] font-medium tracking-widest uppercase opacity-40">
            Primary Guest
          </p>
          <p className="truncate text-xl font-medium tracking-tight uppercase">
            {guest}
          </p>
        </div>

        <div className="border-border/50 grid grid-cols-2 gap-4 border-t pt-4">
          <div className="space-y-1">
            <p className="text-[10px] font-medium tracking-widest uppercase opacity-40">
              Arrival
            </p>
            <p className="text-sm font-medium opacity-80">{checkIn}</p>
          </div>
          <div className="space-y-1 text-right">
            <p className="text-[10px] font-medium tracking-widest uppercase opacity-40">
              Departure
            </p>
            <p
              className={cn(
                "text-sm font-medium",
                isOverstay ? "text-rose-500" : "opacity-80",
              )}
            >
              {checkOut}
            </p>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            onClick={onCheckout}
            className={cn(
              "h-14 flex-1 rounded-2xl text-[10px] font-medium tracking-widest uppercase shadow-2xl transition-all active:scale-95",
              isOverstay
                ? "bg-rose-500 text-white shadow-rose-200 hover:bg-rose-600"
                : "shadow-primary/10 bg-[#00303e] text-white hover:opacity-90",
            )}
          >
            {isOverstay ? "Resolve Overstay" : "Initiate Checkout"}
          </Button>
          <Button
            variant="outline"
            className="border-border hover:bg-muted group/btn flex h-14 w-14 items-center justify-center rounded-2xl p-0 transition-all"
          >
            <ArrowUpRight className="h-5 w-5 opacity-40 transition-opacity group-hover/btn:opacity-100" />
          </Button>
        </div>
      </div>
    </div>
  );
}
