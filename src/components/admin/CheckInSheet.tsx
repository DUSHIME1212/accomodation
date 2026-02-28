"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  Calendar,
  Home,
  CreditCard,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface CheckInSheetProps {
  booking: any;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CheckInSheet({
  booking,
  isOpen,
  onClose,
  onSuccess,
}: CheckInSheetProps) {
  const [loading, setLoading] = React.useState(false);
  const isCheckOut = booking?.status === "checked-in";

  const handleAction = async () => {
    if (!booking) return;
    setLoading(true);
    try {
      const newStatus = isCheckOut ? "checked-out" : "checked-in";
      const res = await fetch(
        `/api/admin/bookings/${booking.dbId || booking.id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      if (res.ok) {
        toast.success(
          isCheckOut ? "Successfully checked out" : "Successfully checked in",
        );
        onSuccess?.();
        onClose();
      }
    } catch (error) {
      toast.error("Process execution failure");
    } finally {
      setLoading(false);
    }
  };

  if (!booking) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="bg-card border-border w-full rounded-l-[2.5rem] border-l p-0 shadow-2xl sm:max-w-md"
      >
        <SheetHeader className="bg-muted/10 p-10 pb-6">
          <div className="mb-2 flex items-center gap-3">
            <div className="bg-primary h-2 w-10 rounded-full" />
            <span className="text-primary text-[10px] font-medium tracking-[0.2em] uppercase">
              Protocol Authorization
            </span>
          </div>
          <SheetTitle className="text-4xl font-medium tracking-tighter text-[#00303e] uppercase italic">
            {isCheckOut ? "Terminal Exit" : "Access Granted"}
          </SheetTitle>
          <SheetDescription className="text-muted-foreground mt-2 text-xs font-medium tracking-widest uppercase opacity-60">
            Internal ID: {booking.id}
          </SheetDescription>
        </SheetHeader>

        <div className="custom-scrollbar flex-1 space-y-12 overflow-y-auto p-10">
          {/* Guest Info Section */}
          <div className="space-y-8">
            <h3 className="flex items-center gap-3 text-sm font-medium tracking-widest text-[#00303e] uppercase">
              <User className="text-primary h-5 w-5" />
              Intelligence Dossier
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-1">
                <Label className="text-muted-foreground text-[10px] font-medium tracking-widest uppercase opacity-40">
                  Full Name
                </Label>
                <p className="text-2xl font-medium text-[#00303e] uppercase italic">
                  {booking.guest}
                </p>
              </div>
              <div className="space-y-1">
                <Label className="text-muted-foreground text-[10px] font-medium tracking-widest uppercase opacity-40">
                  Secure Channel
                </Label>
                <p className="font-bold opacity-80">{booking.email}</p>
              </div>
            </div>
          </div>

          <div className="border-border/50 space-y-8 border-t pt-12">
            <h3 className="flex items-center gap-3 text-sm font-medium tracking-widest text-[#00303e] uppercase">
              <Home className="text-primary h-5 w-5" />
              Allocation Details
            </h3>
            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-1">
                <Label className="text-muted-foreground text-[10px] font-medium tracking-widest uppercase opacity-40">
                  Operational Unit
                </Label>
                <p className="text-3xl font-medium text-[#00303e] uppercase italic">
                  {booking.room}
                </p>
              </div>
              <div className="space-y-1 text-right">
                <Label className="text-muted-foreground text-[10px] font-medium tracking-widest uppercase opacity-40">
                  Asset Class
                </Label>
                <p className="text-primary text-xl font-medium uppercase italic">
                  {booking.type}
                </p>
              </div>
            </div>

            <div className="bg-muted/30 border-border/50 space-y-5 rounded-[2rem] border p-6 shadow-inner">
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground flex items-center gap-2 text-[10px] font-medium tracking-widest uppercase opacity-60">
                  <Clock className="h-3.5 w-3.5" />
                  INITIATION
                </div>
                <p className="text-sm font-medium text-[#00303e]">
                  {booking.checkIn}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground flex items-center gap-2 text-[10px] font-medium tracking-widest uppercase opacity-60">
                  <Calendar className="h-3.5 w-3.5" />
                  EXPIRATION
                </div>
                <p className="text-sm font-medium text-[#00303e]">
                  {booking.checkOut}
                </p>
              </div>
            </div>
          </div>

          <div className="border-border/50 space-y-8 border-t pt-12">
            <h3 className="flex items-center gap-3 text-sm font-medium tracking-widest text-[#00303e] uppercase">
              <CreditCard className="text-primary h-5 w-5" />
              Financial Clearance
            </h3>
            <div className="flex items-center justify-between rounded-[2rem] border border-emerald-500/20 bg-emerald-500/5 p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                <span className="text-[10px] font-medium tracking-widest text-emerald-600 uppercase">
                  Verified
                </span>
              </div>
              <span className="text-2xl leading-none font-medium text-[#00303e]">
                $450.00
              </span>
            </div>
          </div>
        </div>

        <SheetFooter className="border-border/50 bg-muted/20 border-t p-10">
          <div className="flex w-full flex-col gap-4">
            <Button
              onClick={handleAction}
              disabled={loading}
              className={cn(
                "group relative h-16 w-full overflow-hidden rounded-2xl text-[10px] font-medium tracking-[0.2em] uppercase shadow-2xl transition-all active:scale-95",
                isCheckOut
                  ? "bg-rose-500 text-white shadow-rose-200 hover:bg-rose-600"
                  : "shadow-primary/20 bg-[#00303e] text-white hover:opacity-90",
              )}
            >
              <div className="relative z-10 flex items-center gap-2">
                {loading
                  ? "EXECUTING..."
                  : isCheckOut
                    ? "AUTHORIZE EXIT"
                    : "AUTHORIZE ACCESS"}
                <Zap className="h-3.5 w-3.5 group-hover:animate-bounce" />
              </div>
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="border-border h-16 w-full rounded-2xl text-[10px] font-medium tracking-widest uppercase opacity-40 transition-opacity hover:opacity-100"
            >
              Abeyance
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
