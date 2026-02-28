"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Calendar,
  BedDouble,
  UtensilsCrossed,
  Settings,
  LogOut,
  ChevronRight,
  LayoutGrid,
  MessageSquare,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin", exact: true },
  { label: "Bookings", icon: Users, href: "/admin/guests" },
  { label: "Reservations", icon: Calendar, href: "/admin/reservations" },
  { label: "Rooms Hub", icon: BedDouble, href: "/admin/rooms", exact: true },
  { label: "Occupancy", icon: LayoutGrid, href: "/admin/rooms/management" },
  { label: "Restaurant", icon: UtensilsCrossed, href: "/admin/restaurant" },
  { label: "Messaging", icon: MessageSquare, href: "/admin/messaging" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-border bg-card fixed top-0 left-0 z-40 h-screen w-64 border-r transition-transform">
      <div className="flex h-full flex-col px-3 py-4">
        <div className="mb-10 flex items-center gap-3 px-4 py-6">
          <div className="shadow-primary/20 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#00303e] text-white shadow-xl transition-transform hover:scale-110">
            <Home className="h-5 w-5" />
          </div>
          <span className="text-xl font-medium tracking-tighter text-[#00303e] uppercase">
            Nextgen
          </span>
        </div>

        <nav className="flex-1 space-y-2 px-2">
          {NAV_ITEMS.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center justify-between rounded-2xl border border-transparent px-5 py-3.5 text-sm font-medium tracking-widest uppercase transition-all duration-300",
                  isActive
                    ? "shadow-primary/10 border-[#00303e] bg-[#00303e] text-white shadow-xl"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground hover:border-border",
                )}
              >
                <div className="flex items-center gap-4">
                  <item.icon
                    className={cn(
                      "h-4 w-4 transition-transform group-hover:scale-110",
                      isActive
                        ? "text-white"
                        : "text-muted-foreground/60 group-hover:text-foreground",
                    )}
                  />
                  <span className="text-[10px]">{item.label}</span>
                </div>
                {isActive && (
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="border-border mt-auto space-y-2 border-t px-2 pt-6">
          <Link
            href="/admin/settings"
            className={cn(
              "flex items-center gap-4 rounded-2xl border border-transparent px-5 py-3.5 text-[10px] font-medium tracking-widest uppercase transition-all duration-300",
              pathname.startsWith("/admin/settings")
                ? "bg-[#00303e] text-white shadow-xl"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
          <button className="flex w-full items-center gap-4 rounded-2xl border border-transparent px-5 py-3.5 text-[10px] font-medium tracking-widest text-rose-500 uppercase transition-all duration-300 hover:border-rose-100 hover:bg-rose-50/50">
            <LogOut className="h-4 w-4" />
            <span>Terminate Hub</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
