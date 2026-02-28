"use client";

import React, { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/admin/DashboardHeader";
import { StatCard, ActionCard } from "@/components/admin/DashboardCards";
import {
  ArrowRight,
  ArrowLeft,
  Loader2,
  Calendar,
  User,
  Clock,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CheckInSheet } from "@/components/admin/CheckInSheet";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard fetch error:", err);
        setLoading(false);
      });
  }, []);

  const handleQuickAction = (booking: any) => {
    setSelectedBooking({
      id: booking.confirmationNumber || booking.id,
      dbId: booking.id,
      guest: `${booking.guestFirstName} ${booking.guestLastName}`,
      email: booking.guestEmail,
      room: booking.apartment?.name || "TBD",
      type: booking.apartment?.name || "Standard",
      checkIn: new Date(booking.checkInDate).toLocaleDateString(),
      checkOut: new Date(booking.checkOutDate).toLocaleDateString(),
      status: booking.status,
    });
    setIsCheckInOpen(true);
  };

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="text-primary h-10 w-10 animate-spin opacity-20" />
      </div>
    );
  }

  // Map CHART_DATA from bookingStats if available, otherwise use mock for design
  const CHART_DATA = [
    { name: "Mon", revenue: 120 },
    { name: "Tue", revenue: 450 },
    { name: "Wed", revenue: 300 },
    { name: "Thu", revenue: 600 },
    { name: "Fri", revenue: 850 },
    { name: "Sat", revenue: 950 },
    { name: "Sun", revenue: 700 },
  ];

  return (
    <div className="space-y-8 p-8">
      <DashboardHeader
        title="Good Morning, DUSHIME!"
        subtitle="Here's what's happening with your property today."
        showFilters={false}
      />

      <div className="grid grid-cols-1 gap-6 font-sans lg:grid-cols-12">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-4 lg:col-span-4">
          <Link href="/admin/reservations?status=confirmed">
            <ActionCard
              title="Process Check-ins"
              icon={<ArrowRight className="h-6 w-6" />}
              color="bg-[#00303e]"
            />
          </Link>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card border-border flex flex-col justify-between border p-4">
              <p className="text-muted-foreground text-[10px] uppercase">
                Pending Check-ins
              </p>
              <p className="text-3xl font-black">
                {data?.upcomingCheckIns?.length || 0}
              </p>
            </div>
            <div className="bg-card border-border flex flex-col justify-between border p-4">
              <p className="text-muted-foreground text-[10px] uppercase">
                Due Check-outs
              </p>
              <p className="text-3xl font-black">
                {data?.currentGuests?.length || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 lg:col-span-4">
          <StatCard
            title="Total Revenue"
            subtitle="Total earnings from all bookings"
            value={`$${data?.bookingStats?.totalRevenue?.toLocaleString() || "0"}`}
            change="+12.5%"
            isPositive={true}
          />
          <StatCard
            title="Occupancy Rate"
            subtitle="Current occupied apartments"
            value={`${Math.round(((data?.currentGuests?.length || 0) / (data?.apartmentStats?.total || 1)) * 100)}%`}
            change="+5.2%"
            isPositive={true}
          />
        </div>

        {/* Revenue Chart */}
        <div className="border-border bg-card rounded-2xl border p-6 shadow-sm lg:col-span-4">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-muted-foreground text-xs tracking-widest uppercase">
                Revenue Trend
              </h3>
              <p className="text-xl ">Weekly Overview</p>
            </div>
          </div>

          <div className="-ml-4 h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="rgba(0,0,0,0.05)"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#999", fontWeight: "bold" }}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#00303e",
                    border: "none",
                    color: "white",
                    borderRadius: "0",
                  }}
                  itemStyle={{ color: "white" }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0ea5e9"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Recent Reservations Table */}
        <div className="border-border bg-card rounded-2xl border p-8 lg:col-span-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-2xl ">Upcoming Activity</h3>
              <p className="text-muted-foreground mt-1 text-xs uppercase">
                Guest arrivals for the next 7 days
              </p>
            </div>
            <Link
              href="/admin/reservations"
              className="text-primary text-xs tracking-widest uppercase hover:underline"
            >
              View all reservations
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-border text-muted-foreground border-b text-[10px] font-black tracking-tighter uppercase">
                  <th className="pb-4">Booking ID</th>
                  <th className="pb-4">Guest</th>
                  <th className="pb-4">Room</th>
                  <th className="pb-4">Arrival</th>
                  <th className="pb-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-border divide-y">
                {data?.upcomingCheckIns?.length > 0 ? (
                  data.upcomingCheckIns.map((booking: any) => (
                    <tr
                      key={booking.id}
                      className="group hover:bg-muted/30 transition-colors"
                    >
                      <td className="text-muted-foreground py-5 font-mono text-xs">
                        #{booking.confirmationNumber?.slice(0, 8).toUpperCase()}
                      </td>
                      <td className="py-5">
                        <div className="flex items-center gap-3">
                          <div className="bg-muted border-border flex h-8 w-8 items-center justify-center border text-xs">
                            {booking.guestFirstName[0]}
                            {booking.guestLastName[0]}
                          </div>
                          <span className=" ">
                            {booking.guestFirstName} {booking.guestLastName}
                          </span>
                        </div>
                      </td>
                      <td className="text-muted-foreground py-5">
                        {booking.apartment?.name}
                      </td>
                      <td className="py-5 font-medium">
                        {new Date(booking.checkInDate).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric" },
                        )}
                      </td>
                      <td className="py-5 text-right">
                        <button
                          onClick={() => handleQuickAction(booking)}
                          className="bg-[#00303e] px-4 py-1.5 text-xs text-white uppercase transition-all hover:bg-black"
                        >
                          Check In
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-muted-foreground py-12 text-center"
                    >
                      No upcoming check-ins scheduled.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Current Occupancy Quick View */}
        <div className="border-border bg-card rounded-2xl border p-8 lg:col-span-4">
          <h3 className="text-2xl leading-tight">Guest In-house</h3>
          <p className="text-muted-foreground mt-1 text-xs uppercase">
            Currently checked-in guests
          </p>

          <div className="custom-scrollbar mt-8 max-h-[400px] space-y-4 overflow-y-auto pr-2">
            {data?.currentGuests?.length > 0 ? (
              data.currentGuests.map((guest: any) => (
                <div
                  key={guest.id}
                  className="border-border hover:border-primary flex items-center justify-between border p-4 transition-colors"
                >
                  <div className="space-y-1">
                    <p className="text-sm">
                      {guest.guestFirstName} {guest.guestLastName}
                    </p>
                    <div className="text-muted-foreground flex items-center gap-2 text-[10px] uppercase">
                      <span className="text-primary">
                        {guest.apartment?.name}
                      </span>
                      <span>•</span>
                      <span>
                        Out: {new Date(guest.checkOutDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleQuickAction(guest)}
                    className="border-border hover:bg-muted flex h-8 w-8 items-center justify-center border"
                  >
                    <ArrowLeft className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-muted-foreground border-border flex flex-col items-center gap-2 border border-dashed py-12 text-center">
                <User className="h-8 w-8 opacity-20" />
                <p className="text-xs uppercase">
                  No guests currently in-house
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 space-y-3 bg-[#00303e] p-4 text-white">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase opacity-60">Revenue Target</p>
              <p className="text-xs font-black">75%</p>
            </div>
            <div className="h-1 w-full overflow-hidden bg-white/10">
              <div className="bg-primary h-full w-3/4" />
            </div>
          </div>
        </div>
      </div>

      <CheckInSheet
        isOpen={isCheckInOpen}
        onClose={() => setIsCheckInOpen(false)}
        booking={selectedBooking}
        onSuccess={() => {
          // Re-fetch data on success
          fetch("/api/admin/stats")
            .then((r) => r.json())
            .then((d) => setData(d));
        }}
      />
    </div>
  );
}
