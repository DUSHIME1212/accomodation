"use client";

import React, { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/admin/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckInSheet } from "@/components/admin/CheckInSheet";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Search,
  Plus,
  Users,
  Calendar,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  UserPlus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const STATUS_FILTERS = [
  { label: "All Guests", value: "all" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Checked In", value: "checked-in" },
  { label: "Checked Out", value: "checked-out" },
  { label: "Pending", value: "pending" },
  { label: "Cancelled", value: "cancelled" },
];

const STATUS_STYLES: Record<string, string> = {
  confirmed: "bg-blue-500/10 text-blue-600",
  "checked-in": "bg-orange-500/10 text-orange-600",
  "checked-out": "bg-zinc-500/10 text-zinc-600",
  pending: "bg-yellow-500/10 text-yellow-700",
  cancelled: "bg-red-500/10 text-red-600",
  completed: "bg-green-500/10 text-green-600",
};

export default function GuestsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);

  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isCheckInSheetOpen, setIsCheckInSheetOpen] = useState(false);
  const [isManualSheetOpen, setIsManualSheetOpen] = useState(false);

  const fetchGuests = () => {
    setLoading(true);
    const params = new URLSearchParams({
      search,
      status: filter,
      page: String(page),
    });
    fetch(`/api/admin/guests?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setBookings(data.bookings || []);
        setTotal(data.total || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchGuests();
  }, [filter, page]);

  useEffect(() => {
    const t = setTimeout(() => fetchGuests(), 400);
    return () => clearTimeout(t);
  }, [search]);

  const handleOpenCheckIn = (booking: any) => {
    setSelectedBooking({
      id: booking.confirmationNumber || booking.id,
      dbId: booking.id,
      guest: `${booking.guestFirstName} ${booking.guestLastName}`,
      email: booking.guestEmail,
      room: booking.assignedRoomNumber || booking.apartment?.name || "TBD",
      type: booking.apartment?.name || "Standard",
      checkIn: new Date(booking.checkInDate).toLocaleDateString(),
      checkOut: new Date(booking.checkOutDate).toLocaleDateString(),
      status: booking.status,
    });
    setIsCheckInSheetOpen(true);
  };

  const totalPages = Math.ceil(total / 20);

  return (
    <div className="space-y-8 p-8">
      <DashboardHeader
        title="Guests"
        subtitle={`${total} total guests across all bookings`}
        showFilters={false}
      />

      {/* Header Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => {
                setFilter(f.value);
                setPage(1);
              }}
              className={cn(
                "border px-4 py-2 rounded-xs text-sm transition-all",
                filter === f.value
                  ? "border-[#00303e] bg-[#00303e] text-white"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <Button
          onClick={() => setIsManualSheetOpen(true)}
          className="gap-2 rounded-2xl bg-[#00303e] text-white"
        >
          <UserPlus className="h-4 w-4" />
          Manual Check-in
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder="Search by name, email or booking ID…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-border bg-card h-12 rounded-2xl pl-10"
        />
      </div>

      {/* Guests Table */}
      <div className="border-border bg-card border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-border text-muted-foreground border-b">
                {[
                  "Booking ID",
                  "Guest Name",
                  "Email",
                  "Room",
                  "Check-in",
                  "Check-out",
                  "Nights",
                  "Total",
                  "Status",
                  "",
                ].map((h) => (
                  <th key={h} className="px-4 py-4 text-left text-xs uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-border/50 divide-y">
              {loading ? (
                <tr>
                  <td
                    colSpan={10}
                    className="text-muted-foreground py-20 text-center"
                  >
                    <div className="flex justify-center">
                      <div className="border-primary h-6 w-6 animate-spin border-2 border-t-transparent" />
                    </div>
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className="text-muted-foreground py-20 text-center"
                  >
                    No guests found.
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr
                    key={b.id}
                    className="hover:bg-muted/30 group transition-colors"
                  >
                    <td className="text-muted-foreground px-4 py-4 font-mono text-xs">
                      {b.confirmationNumber?.slice(0, 8).toUpperCase()}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-muted flex h-8 w-8 shrink-0 items-center justify-center text-xs font-black">
                          {b.guestFirstName?.[0]}
                          {b.guestLastName?.[0]}
                        </div>
                        <span className=" ">
                          {b.guestFirstName} {b.guestLastName}
                        </span>
                      </div>
                    </td>
                    <td className="text-muted-foreground px-4 py-4">
                      {b.guestEmail}
                    </td>
                    <td className="px-4 py-4 font-medium">
                      {b.apartment?.name || "—"}
                    </td>
                    <td className="px-4 py-4 font-medium">
                      {new Date(b.checkInDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 font-medium">
                      {new Date(b.checkOutDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {b.numberOfNights}
                    </td>
                    <td className="px-4 py-4">${b.totalPrice?.toFixed(0)}</td>
                    <td className="px-4 py-4">
                      <span
                        className={cn(
                          "px-2.5 py-1 text-[10px] uppercase",
                          STATUS_STYLES[b.status] ||
                            "bg-zinc-100 text-zinc-600",
                        )}
                      >
                        {b.status?.replace("-", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="hover:bg-muted flex h-8 w-8 items-center justify-center rounded-none">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-48 rounded-none"
                        >
                          {(b.status === "confirmed" ||
                            b.status === "checked-in") && (
                            <DropdownMenuItem
                              className="rounded-2xl py-2"
                              onClick={() => handleOpenCheckIn(b)}
                            >
                              {b.status === "checked-in"
                                ? "Process Checkout"
                                : "Check In Guest"}
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="rounded-2xl py-2">
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive rounded-2xl py-2">
                            Cancel Booking
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="border-border flex items-center justify-between border-t p-4">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm font-medium disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>
            <span className="text-muted-foreground text-sm">
              Page {page} of {totalPages} ({total} guests)
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm font-medium disabled:opacity-40"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Check-in/out Sheet */}
      <CheckInSheet
        booking={selectedBooking}
        isOpen={isCheckInSheetOpen}
        onClose={() => setIsCheckInSheetOpen(false)}
        onSuccess={fetchGuests}
      />

      {/* Manual Check-in Sheet */}
      <ManualCheckInSheet
        isOpen={isManualSheetOpen}
        onClose={() => setIsManualSheetOpen(false)}
        onSuccess={fetchGuests}
      />
    </div>
  );
}

// ─── Manual Check-in Sheet ────────────────────────────────────────────────────
function ManualCheckInSheet({ isOpen, onClose, onSuccess }: any) {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    guestFirstName: "",
    guestLastName: "",
    guestEmail: "",
    guestPhone: "",
    apartmentId: "",
    checkInDate: "",
    checkOutDate: "",
    adults: "1",
    children: "0",
    address: "",
    city: "",
    country: "",
    zipCode: "",
    paymentMethod: "pay-at-property",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetch("/api/admin/rooms")
        .then((r) => r.json())
        .then((data) => {
          if (Array.isArray(data)) setRooms(data);
        });
    }
  }, [isOpen]);

  const set = (k: string, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = async () => {
    if (
      !form.guestFirstName ||
      !form.guestLastName ||
      !form.guestEmail ||
      !form.guestPhone ||
      !form.apartmentId ||
      !form.checkInDate ||
      !form.checkOutDate
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          adults: parseInt(form.adults),
          children: parseInt(form.children),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }
      onSuccess?.();
      onClose();
      setForm({
        guestFirstName: "",
        guestLastName: "",
        guestEmail: "",
        guestPhone: "",
        apartmentId: "",
        checkInDate: "",
        checkOutDate: "",
        adults: "1",
        children: "0",
        address: "",
        city: "",
        country: "",
        zipCode: "",
        paymentMethod: "pay-at-property",
      });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const field = (
    label: string,
    key: string,
    type = "text",
    placeholder = "",
  ) => (
    <div className="space-y-1">
      <Label className="text-muted-foreground text-[10px] uppercase">
        {label}
      </Label>
      <Input
        type={type}
        placeholder={placeholder || label}
        value={(form as any)[key]}
        onChange={(e) => set(key, e.target.value)}
        className="border-border h-11 rounded-none"
      />
    </div>
  );

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="bg-card border-border w-full rounded-2xl border-l p-0 sm:max-w-lg"
      >
        <SheetHeader className="border-border border-b p-8 pb-6">
          <SheetTitle className="flex items-center gap-3 text-2xl">
            <UserPlus className="text-primary h-6 w-6" />
            Manual Check-in
          </SheetTitle>
          <SheetDescription>
            Register a new guest directly at the front desk.
          </SheetDescription>
        </SheetHeader>

        <div
          className="flex-1 space-y-8 overflow-y-auto p-8"
          style={{ maxHeight: "calc(100vh - 200px)" }}
        >
          {error && (
            <div className="border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/20 dark:bg-red-900/10 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-muted-foreground border-border border-b pb-2 text-sm uppercase">
              Guest Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {field("First Name *", "guestFirstName")}
              {field("Last Name *", "guestLastName")}
            </div>
            {field("Email *", "guestEmail", "email")}
            {field("Phone *", "guestPhone", "tel")}
          </div>

          <div className="space-y-4">
            <h3 className="text-muted-foreground border-border border-b pb-2 text-sm uppercase">
              Stay Details
            </h3>
            <div className="space-y-1">
              <Label className="text-muted-foreground text-[10px] uppercase">
                Room / Apartment *
              </Label>
              <select
                value={form.apartmentId}
                onChange={(e) => set("apartmentId", e.target.value)}
                className="border-border bg-background h-11 w-full rounded-2xl border px-3 text-sm"
              >
                <option value="">Select a room…</option>
                {rooms.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} — ${r.rate}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {field("Check-in Date *", "checkInDate", "date")}
              {field("Check-out Date *", "checkOutDate", "date")}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {field("Adults *", "adults", "number")}
              {field("Children", "children", "number")}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-muted-foreground border-border border-b pb-2 text-sm uppercase">
              Payment
            </h3>
            <div className="space-y-1">
              <Label className="text-muted-foreground text-[10px] uppercase">
                Payment Method
              </Label>
              <select
                value={form.paymentMethod}
                onChange={(e) => set("paymentMethod", e.target.value)}
                className="border-border bg-background h-11 w-full rounded-2xl border px-3 text-sm"
              >
                <option value="pay-at-property">Pay at Property</option>
                <option value="credit-card">Credit Card</option>
                <option value="cash">Cash</option>
              </select>
            </div>
          </div>
        </div>

        <SheetFooter className="border-border bg-muted/20 border-t p-8">
          <div className="flex w-full flex-col gap-3">
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="h-14 w-full rounded-2xl bg-[#00303e] text-base text-white hover:bg-[#002530]"
            >
              {loading ? "Creating Booking…" : "Confirm Check-in"}
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="border-border h-12 w-full rounded-2xl"
            >
              Cancel
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
