"use client";

import React, { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/admin/DashboardHeader";
import {
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Calendar,
  User,
  Mail,
  Home,
  Plus,
  Loader2,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckInSheet } from "@/components/admin/CheckInSheet";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ReservationsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);

  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);

  // New Booking Form State
  const [rooms, setRooms] = useState<any[]>([]);
  const [form, setForm] = useState({
    guestFirstName: "",
    guestLastName: "",
    guestEmail: "",
    apartmentId: "",
    checkInDate: "",
    checkOutDate: "",
    adults: "1",
    children: "0",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        search,
        status: filter,
        page: String(page),
      });
      const res = await fetch(`/api/admin/reservations?${params}`);
      const data = await res.json();
      setBookings(data.bookings || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter, page]);

  useEffect(() => {
    const t = setTimeout(() => fetchData(), 400);
    return () => clearTimeout(t);
  }, [search]);

  // Fetch rooms for new booking
  useEffect(() => {
    if (isNewBookingOpen) {
      fetch("/api/admin/rooms")
        .then((r) => r.json())
        .then((data) => Array.isArray(data) && setRooms(data));
    }
  }, [isNewBookingOpen]);

  const handleOpenSheet = (booking: any) => {
    setSelectedBooking({
      id: booking.confirmationNumber || booking.id,
      dbId: booking.id,
      guest: `${booking.guestFirstName} ${booking.guestLastName}`,
      email: booking.guestEmail,
      room: booking.apartment?.name || "N/A",
      type: booking.apartment?.name || "Standard",
      checkIn: new Date(booking.checkInDate).toLocaleDateString(),
      checkOut: new Date(booking.checkOutDate).toLocaleDateString(),
      status: booking.status,
    });
    setIsSheetOpen(true);
  };

  const handleCreateBooking = async () => {
    try {
      const res = await fetch("/api/admin/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Reservation created");
        setIsNewBookingOpen(false);
        fetchData();
      } else {
        toast.error("Failed to create reservation");
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  const totalPages = Math.ceil(total / 20);

  return (
    <div className="space-y-8 p-8">
      <DashboardHeader
        title="Reservations"
        subtitle="Manage live guest bookings and stay statuses from your database."
      />

      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-md flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search by name or confirmation..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-card border-border h-12 rounded-2xl pl-11"
          />
        </div>
        <Button
          onClick={() => setIsNewBookingOpen(true)}
          className="shadow-primary/20 h-12 gap-2 rounded-2xl bg-[#00303e] px-6 font-bold text-white shadow-lg"
        >
          <Plus className="h-4 w-4" />
          New Reservation
        </Button>
      </div>

      <div className="border-border bg-card overflow-hidden rounded-2xl border shadow-sm">
        <div className="flex items-center justify-between p-8 pb-4">
          <div>
            <h2 className="text-2xl ">BOOKING LOG</h2>
            <p className="text-muted-foreground mt-1 text-[10px] font-bold tracking-widest uppercase">
              Live database stream
            </p>
          </div>
          <div className="bg-muted/50 flex items-center gap-1 rounded-2xl p-1 shadow-inner">
            {["all", "confirmed", "checked-in", "checked-out", "cancelled"].map(
              (s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={cn(
                    "rounded-xl px-5 py-2 text-[10px] tracking-widest uppercase transition-all",
                    filter === s
                      ? "shadow-primary/20 bg-[#00303e] text-white shadow-md"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {s}
                </button>
              ),
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-border text-muted-foreground bg-muted/20 border-b">
                <th className="px-8 py-6 text-[10px] tracking-widest uppercase">
                  Conf. #
                </th>
                <th className="py-6 text-[10px] tracking-widest uppercase">
                  Guest
                </th>
                <th className="py-6 text-[10px] tracking-widest uppercase">
                  Room
                </th>
                <th className="py-6 text-[10px] tracking-widest uppercase">
                  Stay Period
                </th>
                <th className="px-8 py-6 text-right text-[10px] tracking-widest uppercase">
                  Status
                </th>
                <th className="px-8 py-6"></th>
              </tr>
            </thead>
            <tbody className="divide-border/50 divide-y">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center">
                    <div className="text-muted-foreground flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span className="text-xs tracking-widest uppercase">
                        Accessing records...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-muted-foreground py-20 text-center font-bold"
                  >
                    No matching reservations found.
                  </td>
                </tr>
              ) : (
                bookings.map((res) => (
                  <tr
                    key={res.id}
                    className="group hover:bg-muted/30 transition-colors"
                  >
                    <td className="text-muted-foreground px-8 py-6 font-mono text-xs font-bold uppercase">
                      {res.confirmationNumber?.slice(0, 8) ||
                        res.id.slice(0, 8)}
                    </td>
                    <td className="py-6">
                      <div className="flex flex-col">
                        <span className="text-primary font-black">
                          {res.guestFirstName} {res.guestLastName}
                        </span>
                        <span className="text-muted-foreground text-[10px] font-bold">
                          {res.guestEmail}
                        </span>
                      </div>
                    </td>
                    <td className="py-6">
                      <div className="flex flex-col">
                        <span className="font-bold">
                          {res.apartment?.name || "Unassigned"}
                        </span>
                        <span className="text-muted-foreground text-[10px] font-black tracking-tighter uppercase">
                          SKU:{" "}
                          {res.apartment?.sanityId?.split("-").pop() || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="py-6 text-xs font-bold">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">
                          {new Date(res.checkInDate).toLocaleDateString()}
                        </span>
                        <ChevronRight className="h-3 w-3 opacity-20" />
                        <span>
                          {new Date(res.checkOutDate).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <StatusBadge status={res.status} />
                    </td>
                    <td className="px-8 py-6 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="hover:bg-muted flex h-10 w-10 items-center justify-center rounded-full transition-colors">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="border-border w-56 rounded-2xl p-2"
                        >
                          <DropdownMenuItem className="rounded-xl py-2.5 text-xs font-bold tracking-widest uppercase">
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="rounded-xl py-2.5 text-xs font-bold tracking-widest uppercase"
                            onClick={() => handleOpenSheet(res)}
                          >
                            Check in guest
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="rounded-xl py-2.5 text-xs font-bold tracking-widest uppercase"
                            onClick={() => handleOpenSheet(res)}
                          >
                            Check out guest
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive rounded-xl py-2.5 text-xs font-bold tracking-widest uppercase hover:bg-red-50">
                            Cancel booking
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="border-border mt-4 flex items-center justify-between border-t p-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-xs font-black tracking-widest uppercase disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={cn(
                    "flex h-8 min-w-[32px] items-center justify-center rounded-xl text-xs font-black transition-colors",
                    page === i + 1
                      ? "bg-[#00303e] text-white"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-xs font-black tracking-widest uppercase disabled:opacity-30"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <CheckInSheet
        booking={selectedBooking}
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onSuccess={fetchData}
      />

      {/* New Reservation Modal */}
      <Dialog open={isNewBookingOpen} onOpenChange={setIsNewBookingOpen}>
        <DialogContent className="border-border bg-card rounded-3xl p-8 sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="decoration-primary/20 text-3xl font-black tracking-tighter uppercase underline decoration-8 underline-offset-[-2px]">
              New Reservation
            </DialogTitle>
            <p className="text-muted-foreground mt-2 text-[10px] font-black tracking-widest uppercase">
              Manual administration booking entry
            </p>
          </DialogHeader>
          <div className="grid gap-6 py-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label className="text-muted-foreground text-[10px] font-black uppercase">
                  Guest First Name
                </Label>
                <Input
                  value={form.guestFirstName}
                  onChange={(e) =>
                    setForm({ ...form, guestFirstName: e.target.value })
                  }
                  className="border-border h-12 rounded-2xl font-bold"
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-muted-foreground text-[10px] font-black uppercase">
                  Guest Last Name
                </Label>
                <Input
                  value={form.guestLastName}
                  onChange={(e) =>
                    setForm({ ...form, guestLastName: e.target.value })
                  }
                  className="border-border h-12 rounded-2xl font-bold"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label className="text-muted-foreground text-[10px] font-black uppercase">
                Email Address
              </Label>
              <Input
                type="email"
                value={form.guestEmail}
                onChange={(e) =>
                  setForm({ ...form, guestEmail: e.target.value })
                }
                className="border-border h-12 rounded-2xl font-bold"
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-muted-foreground text-[10px] font-black uppercase">
                Room Assignment
              </Label>
              <select
                value={form.apartmentId}
                onChange={(e) =>
                  setForm({ ...form, apartmentId: e.target.value })
                }
                className="border-border bg-background h-12 w-full rounded-2xl border px-4 text-sm font-bold"
              >
                <option value="">Select a room...</option>
                {rooms.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label className="text-muted-foreground text-[10px] font-black uppercase">
                  Check-in
                </Label>
                <Input
                  type="date"
                  value={form.checkInDate}
                  onChange={(e) =>
                    setForm({ ...form, checkInDate: e.target.value })
                  }
                  className="border-border h-12 rounded-2xl font-bold"
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-muted-foreground text-[10px] font-black uppercase">
                  Check-out
                </Label>
                <Input
                  type="date"
                  value={form.checkOutDate}
                  onChange={(e) =>
                    setForm({ ...form, checkOutDate: e.target.value })
                  }
                  className="border-border h-12 rounded-2xl font-bold"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleCreateBooking}
              className="h-14 w-full rounded-2xl bg-[#00303e] text-lg font-black text-white uppercase shadow-2xl"
            >
              Confirm Reservation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    new: "bg-green-500 text-white shadow-green-500/20",
    confirmed: "bg-purple-500 text-white shadow-purple-500/20",
    "checked-in": "bg-orange-500 text-white shadow-orange-500/20",
    "checked-out": "bg-blue-500 text-white shadow-blue-500/20",
    completed: "bg-zinc-400 text-white shadow-zinc-400/20",
    cancelled: "bg-red-500 text-white shadow-red-500/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-4 py-1.5 text-[10px] font-black tracking-widest uppercase shadow-lg",
        styles[status] || "bg-zinc-200 text-zinc-700",
      )}
    >
      {status.replace("-", " ")}
    </span>
  );
}
