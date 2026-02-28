"use client";

import React from "react";
import { DashboardHeader } from "@/components/admin/DashboardHeader";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckInSheet } from "@/components/admin/CheckInSheet";
import {
  Bed,
  Wifi,
  Star,
  Settings,
  CheckCircle2,
  Clock,
  Users,
  Calendar,
  Home,
  DollarSign,
  ArrowLeft,
  Hash,
  Activity,
} from "lucide-react";
import Link from "next/link";

export default function RoomDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = React.useState<string | null>(null);
  const [room, setRoom] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState("overview");
  const [selectedBooking, setSelectedBooking] = React.useState<any>(null);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  // Resolve async params
  React.useEffect(() => {
    params.then((p) => setId(p.id));
  }, [params]);

  React.useEffect(() => {
    if (!id) return;
    fetch(`/api/admin/rooms/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRoom(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleCheckIn = (booking: any) => {
    const transformed = {
      id: booking.confirmationNumber || booking.id,
      dbId: booking.id,
      guest: `${booking.guestFirstName} ${booking.guestLastName}`,
      email: booking.guestEmail,
      room: booking.assignedRoomNumber || room?.number || "N/A",
      type: room?.name || "Standard Room",
      checkIn: new Date(booking.checkInDate).toLocaleDateString(),
      checkOut: new Date(booking.checkOutDate).toLocaleDateString(),
      status: booking.status,
    };
    setSelectedBooking(transformed);
    setIsSheetOpen(true);
  };

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-2xl border-4 border-t-transparent" />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center gap-4">
        <Home className="text-muted-foreground h-12 w-12" />
        <p className="text-xl font-bold">Room not found</p>
        <Link href="/admin/rooms">
          <Button variant="outline" className="rounded-none">
            Back to Rooms
          </Button>
        </Link>
      </div>
    );
  }

  const statusColor: Record<string, string> = {
    available: "bg-green-500/10 text-green-600 border-green-500/20",
    occupied: "bg-orange-500/10 text-orange-600 border-orange-500/20",
    confirmed: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    maintenance: "bg-red-500/10 text-red-600 border-red-500/20",
    blocked: "bg-zinc-500/10 text-zinc-600 border-zinc-500/20",
  };

  const tabs = ["Overview", "Bookings", "Amenities", "History"];

  return (
    <div className="space-y-0">
      {/* Header */}
      <div className="p-8 pb-0">
        <Link
          href="/admin/rooms"
          className="text-muted-foreground hover:text-foreground mb-4 flex items-center gap-2 text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Rooms
        </Link>
        <DashboardHeader
          title={room.name}
          subtitle={`Rooms › ${room.name} › Details`}
          showFilters={false}
        />
      </div>

      <div className="space-y-8 p-8">
        {/* Top Stats Bar */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            {
              label: "Nightly Rate",
              value: `$${room.basePrice}`,
              icon: DollarSign,
              color: "text-green-600",
            },
            {
              label: "Capacity",
              value: `${room.capacity} guests`,
              icon: Users,
              color: "text-blue-600",
            },
            {
              label: "Room Size",
              value: room.size ? `${room.size} m²` : "N/A",
              icon: Home,
              color: "text-purple-600",
            },
            {
              label: "Current Status",
              value: room.status,
              icon: Activity,
              color:
                room.status === "available"
                  ? "text-green-600"
                  : "text-orange-600",
            },
          ].map((stat, i) => (
            <div key={i} className="border-border bg-card border p-6">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-xs font-bold uppercase">
                  {stat.label}
                </p>
                <stat.icon className={cn("h-4 w-4", stat.color)} />
              </div>
              <p
                className={cn(
                  "mt-2 text-2xl font-medium capitalize",
                  stat.color,
                )}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-8">
            {/* Image Gallery */}
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-7 aspect-[4/3] overflow-hidden">
                <img
                  src={
                    room.image ||
                    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1974"
                  }
                  className="h-full w-full object-cover"
                  alt={room.name}
                />
              </div>
              <div className="col-span-5 grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square overflow-hidden">
                    <img
                      src={
                        room.image ||
                        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1974"
                      }
                      className="h-full w-full object-cover"
                      alt={`${room.name} view ${i}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-border border-b">
              <div className="flex gap-0">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={cn(
                      "-mb-px border-b-2 px-6 py-4 text-sm font-bold transition-all",
                      activeTab === tab.toLowerCase()
                        ? "border-primary text-primary"
                        : "text-muted-foreground hover:text-foreground border-transparent",
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "border px-3 py-1 text-[10px] font-bold uppercase",
                      statusColor[room.status] || statusColor.available,
                    )}
                  >
                    {room.status}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    Room #{room.number}
                  </span>
                </div>
                <h2 className="text-3xl font-bold">{room.name}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {room.description ||
                    "A premium room designed for ultimate comfort and relaxation. Features modern decor, plush furnishings, and carefully curated amenities to ensure an exceptional stay experience."}
                </p>
                {room.location && (
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Home className="h-4 w-4" />
                    {room.location}
                  </div>
                )}
                <div className="border-border grid grid-cols-3 gap-4 border-t pt-6">
                  <div>
                    <p className="text-muted-foreground text-xs">Min Stay</p>
                    <p className="font-bold">{room.minNights} nights</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Max Stay</p>
                    <p className="font-bold">{room.maxNights} nights</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">
                      Booking Buffer
                    </p>
                    <p className="font-bold">{room.bookingBuffer} days</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "bookings" && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold">
                  Booking History ({room.bookings?.length || 0})
                </h3>
                {room.bookings?.length > 0 ? (
                  <div className="divide-border divide-y">
                    {room.bookings.map((b: any, i: number) => {
                      const isActive = b.status === "checked-in";
                      const nights = Math.ceil(
                        (new Date(b.checkOutDate).getTime() -
                          new Date(b.checkInDate).getTime()) /
                          (1000 * 60 * 60 * 24),
                      );
                      return (
                        <div
                          key={i}
                          className="flex items-center justify-between py-4"
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={cn(
                                "flex h-10 w-10 items-center justify-center text-xs font-medium",
                                isActive
                                  ? "bg-orange-500 text-white"
                                  : "bg-muted text-muted-foreground",
                              )}
                            >
                              {b.guestFirstName?.[0]}
                              {b.guestLastName?.[0]}
                            </div>
                            <div>
                              <p className="font-bold">
                                {b.guestFirstName} {b.guestLastName}
                              </p>
                              <p className="text-muted-foreground text-xs">
                                {b.guestEmail}
                              </p>
                              <p className="text-muted-foreground text-xs">
                                {new Date(b.checkInDate).toLocaleDateString()} →{" "}
                                {new Date(b.checkOutDate).toLocaleDateString()}{" "}
                                · {nights} nights
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p className="font-bold">${b.totalPrice}</p>
                              <span
                                className={cn(
                                  "px-2 py-0.5 text-[10px] font-bold uppercase",
                                  {
                                    "bg-green-500/10 text-green-600":
                                      b.status === "confirmed",
                                    "bg-orange-500/10 text-orange-600":
                                      b.status === "checked-in",
                                    "bg-zinc-500/10 text-zinc-600":
                                      b.status === "checked-out" ||
                                      b.status === "completed",
                                    "bg-blue-500/10 text-blue-600":
                                      b.status === "pending",
                                    "bg-red-500/10 text-red-600":
                                      b.status === "cancelled",
                                  },
                                )}
                              >
                                {b.status}
                              </span>
                            </div>
                            {(b.status === "confirmed" ||
                              b.status === "checked-in") && (
                              <Button
                                onClick={() => handleCheckIn(b)}
                                size="sm"
                                className="rounded-2xl bg-[#00303e] text-xs text-white"
                              >
                                {b.status === "checked-in"
                                  ? "Check Out"
                                  : "Check In"}
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-muted-foreground border-border border border-dashed py-12 text-center">
                    No bookings found for this room.
                  </div>
                )}
              </div>
            )}

            {activeTab === "amenities" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold">Room Amenities</h3>
                {room.features?.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {room.features.map((f: string, i: number) => (
                      <div
                        key={i}
                        className="border-border flex items-center gap-3 border p-4"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
                        <span className="text-sm font-medium">{f}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    No specific amenities listed.
                  </p>
                )}
              </div>
            )}

            {activeTab === "history" && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold">
                  Availability & Maintenance History
                </h3>
                {room.history?.length > 0 ? (
                  <div className="space-y-3">
                    {room.history.map((h: any, i: number) => (
                      <div
                        key={i}
                        className="border-border flex items-center justify-between border p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "h-2 w-2 shrink-0",
                              i === 0 ? "bg-primary" : "bg-muted-foreground/30",
                            )}
                          />
                          <div>
                            <p className="text-sm font-bold">{h.type}</p>
                            {h.reason && (
                              <p className="text-muted-foreground text-xs">
                                {h.reason}
                              </p>
                            )}
                          </div>
                        </div>
                        <span className="text-muted-foreground text-xs">
                          {new Date(h.date).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-muted-foreground border-border border border-dashed py-12 text-center">
                    No maintenance or availability history.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:col-span-4">
            {/* Room Info Card */}
            <div className="border-border bg-card space-y-5 border p-6">
              <h3 className="text-lg font-bold">Room Details</h3>
              <div className="space-y-3">
                {[
                  { label: "Room ID", value: room.number, icon: Hash },
                  {
                    label: "Base Price",
                    value: `$${room.basePrice}/night`,
                    icon: DollarSign,
                  },
                  {
                    label: "Capacity",
                    value: `${room.capacity} guests`,
                    icon: Users,
                  },
                  {
                    label: "Size",
                    value: room.size ? `${room.size} m²` : "Not specified",
                    icon: Home,
                  },
                  {
                    label: "Min Nights",
                    value: `${room.minNights} nights`,
                    icon: Calendar,
                  },
                  {
                    label: "Max Nights",
                    value: `${room.maxNights} nights`,
                    icon: Calendar,
                  },
                  { label: "Status", value: room.status, icon: Activity },
                ].map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="border-border flex items-center justify-between border-b py-2 last:border-0"
                  >
                    <div className="text-muted-foreground flex items-center gap-2 text-xs">
                      <Icon className="h-3.5 w-3.5" />
                      {label}
                    </div>
                    <p className="text-sm font-bold capitalize">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Booking */}
            {room.currentBooking && (
              <div className="space-y-4 border border-orange-200 bg-orange-50/50 p-6 dark:border-orange-900/20 dark:bg-orange-900/5">
                <h3 className="text-sm font-bold text-orange-600 uppercase">
                  Currently Occupied
                </h3>
                <div>
                  <p className="text-xl font-bold">
                    {room.currentBooking.guestFirstName}{" "}
                    {room.currentBooking.guestLastName}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {room.currentBooking.guestEmail}
                  </p>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Check-in</span>{" "}
                    <span className="font-medium">
                      {new Date(
                        room.currentBooking.checkInDate,
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Check-out</span>{" "}
                    <span className="font-medium">
                      {new Date(
                        room.currentBooking.checkOutDate,
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={() => handleCheckIn(room.currentBooking)}
                  className="w-full rounded-2xl bg-[#00303e] font-bold text-white"
                >
                  Process Checkout
                </Button>
              </div>
            )}

            {/* Quick Stats */}
            <div className="border-border bg-card space-y-4 border p-6">
              <h3 className="text-lg font-bold">Booking Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/40 p-3 text-center">
                  <p className="text-3xl font-medium">
                    {room.bookings?.length || 0}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Total Bookings
                  </p>
                </div>
                <div className="bg-muted/40 p-3 text-center">
                  <p className="text-3xl font-medium text-green-600">
                    $
                    {room.bookings
                      ?.reduce(
                        (sum: number, b: any) => sum + (b.totalPrice || 0),
                        0,
                      )
                      .toFixed(0) || 0}
                  </p>
                  <p className="text-muted-foreground text-xs">Total Revenue</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CheckInSheet
        booking={selectedBooking}
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onSuccess={() => {
          if (id) {
            fetch(`/api/admin/rooms/${id}`)
              .then((r) => r.json())
              .then(setRoom);
          }
        }}
      />
    </div>
  );
}
