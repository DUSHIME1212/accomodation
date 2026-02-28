"use client";

import React, { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/admin/DashboardHeader";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  MoreVertical,
  Bed,
  Check,
  Loader2,
  User,
  Hammer,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export default function RoomsPage() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  const fetchData = async () => {
    try {
      const [roomsRes, staffRes] = await Promise.all([
        fetch("/api/admin/rooms"),
        fetch("/api/admin/staff"),
      ]);
      const roomsData = await roomsRes.json();
      const staffData = await staffRes.json();

      if (Array.isArray(roomsData)) setRooms(roomsData);
      if (Array.isArray(staffData)) setStaff(staffData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateRoom = async (roomId: string, data: any) => {
    try {
      const res = await fetch(`/api/admin/rooms/${roomId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Room updated successfully");
        fetchData();
      } else {
        toast.error("Failed to update room");
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin opacity-20" />
      </div>
    );
  }

  const filteredRooms =
    activeFilter === "all"
      ? rooms
      : rooms.filter((r) => r.status === activeFilter);

  const statuses = [
    {
      id: "available",
      label: "Available",
      color: "bg-green-500",
      icon: <Check className="h-3 w-3" />,
    },
    {
      id: "occupied",
      label: "Occupied",
      color: "bg-orange-500",
      icon: <Bed className="h-3 w-3" />,
    },
    {
      id: "to_clean",
      label: "To Clean",
      color: "bg-blue-600",
      icon: <Sparkles className="h-3 w-3" />,
    },
    {
      id: "out_of_service",
      label: "Out of Service",
      color: "bg-zinc-600",
      icon: <AlertCircle className="h-3 w-3" />,
    },
    {
      id: "repair",
      label: "Re-pair",
      color: "bg-red-500",
      icon: <Hammer className="h-3 w-3" />,
    },
  ];

  return (
    <div className="space-y-8 p-8">
      <DashboardHeader
        title="Room Manager"
        subtitle={`Live overview of ${rooms.length} property rooms.`}
        showFilters={false}
      />

      <div className="flex flex-wrap items-center gap-2">
        <FilterButton
          label="All"
          active={activeFilter === "all"}
          onClick={() => setActiveFilter("all")}
        />
        {statuses.map((s) => (
          <FilterButton
            key={s.id}
            label={s.label}
            active={activeFilter === s.id}
            dotColor={s.color}
            onClick={() => setActiveFilter(s.id)}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredRooms.map((room) => {
          const currentStatus =
            statuses.find((s) => s.id === room.status) || statuses[0]!;
          const assignedStaff = staff.find(
            (s) => s.id === room.assignedStaffId,
          );

          return (
            <div
              key={room.id}
              className="group border-border bg-card rounded-2xl border shadow-sm transition-all hover:shadow-md"
            >
              <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                <img
                  src={room.image}
                  alt={room.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <span
                    className={cn(
                      "flex items-center gap-1.5 rounded-xl px-3 py-1 text-[10px] font-bold text-white uppercase backdrop-blur-md",
                      currentStatus.color,
                    )}
                  >
                    {currentStatus.icon}
                    {currentStatus.label}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-medium">{room.name}</h3>
                    <p className="text-muted-foreground mt-0.5 font-mono text-xs tracking-tighter">
                      UNIT SKU: {room.number}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="text-muted-foreground hover:text-foreground hover:bg-muted flex h-10 w-10 items-center justify-center rounded-full transition-colors">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-56 rounded-2xl p-2"
                    >
                      <DropdownMenuLabel className="text-muted-foreground px-2 py-1.5 text-[10px] font-bold uppercase">
                        Change Status
                      </DropdownMenuLabel>
                      {statuses.map((s) => (
                        <DropdownMenuItem
                          key={s.id}
                          className="flex items-center gap-2 rounded-xl"
                          onClick={() =>
                            handleUpdateRoom(room.id, { status: s.id })
                          }
                        >
                          <div
                            className={cn("h-2 w-2 rounded-full", s.color)}
                          />
                          {s.label}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel className="text-muted-foreground px-2 py-1.5 text-[10px] font-bold uppercase">
                        Assign Personnel
                      </DropdownMenuLabel>
                      <DropdownMenuItem
                        className="flex items-center gap-2 rounded-xl"
                        onClick={() =>
                          handleUpdateRoom(room.id, { assignedStaffId: null })
                        }
                      >
                        <User className="h-3 w-3 opacity-50" />
                        Unassigned
                      </DropdownMenuItem>
                      {staff.map((s) => (
                        <DropdownMenuItem
                          key={s.id}
                          className="flex items-center gap-2 rounded-xl"
                          onClick={() =>
                            handleUpdateRoom(room.id, { assignedStaffId: s.id })
                          }
                        >
                          <User className="h-3 w-3 opacity-50" />
                          {s.firstName} {s.lastName}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="border-border/50 flex items-end justify-between border-b pb-4">
                    <div className="space-y-1">
                      <p className="text-muted-foreground text-[10px] font-bold uppercase">
                        Assigned To
                      </p>
                      <p className="flex items-center gap-2 text-sm font-bold">
                        <User className="text-primary h-3.5 w-3.5" />
                        {assignedStaff
                          ? `${assignedStaff.firstName} ${assignedStaff.lastName}`
                          : "No one assigned"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground text-[10px] font-bold uppercase">
                        Rate
                      </p>
                      <p className="text-lg font-medium">{room.rate}</p>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="border-border hover:bg-muted mt-8 h-12 w-full rounded-2xl bg-transparent font-bold transition-all"
                  asChild
                >
                  <a href={`/admin/rooms/${room.id}`}>View Room History</a>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FilterButton({
  label,
  active,
  dotColor,
  onClick,
}: {
  label: string;
  active?: boolean;
  dotColor?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-medium  uppercase transition-all",
        active
          ? "shadow-primary/20 bg-[#00303e] text-white shadow-lg"
          : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground hover:border-border border border-transparent",
      )}
    >
      {dotColor && <span className={cn("h-2 w-2 rounded-full", dotColor)} />}
      {label}
    </button>
  );
}
