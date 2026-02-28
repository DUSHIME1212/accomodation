"use client";

import React from "react";
import { Plus, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  showFilters?: boolean;
}

export function DashboardHeader({
  title,
  subtitle,
  showFilters = true,
}: DashboardHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#0a0a0a] px-8 py-12 text-white shadow-2xl">
      {/* Background Image / Pattern */}
      <div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center opacity-40 mix-blend-overlay"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />

      <div className="relative z-10 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl tracking-tight">{title}</h1>
            {subtitle && <p className="text-zinc-400">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="h-11 rounded-xl border-zinc-800 bg-white/5 px-4 text-white backdrop-blur-md hover:bg-white/10"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              Jan 12, 2025
            </Button>
            <Button className="h-11 rounded-xl bg-blue-600 px-6 text-white hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              New reservation
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="flex flex-wrap items-center gap-2">
            <FilterButton label="All" active />
            <FilterButton label="New" dotColor="bg-purple-500" />
            <FilterButton label="Confirmed" dotColor="bg-green-500" />
            <FilterButton label="Checked in" dotColor="bg-orange-500" />
            <FilterButton label="Checked out" dotColor="bg-blue-500" />
            <FilterButton label="Completed" dotColor="bg-zinc-400" />
            <FilterButton label="Cancelled" dotColor="bg-red-500" />
          </div>
        )}
      </div>
    </div>
  );
}

function FilterButton({
  label,
  active,
  dotColor,
}: {
  label: string;
  active?: boolean;
  dotColor?: string;
}) {
  return (
    <button
      className={cn(
        "-lg flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium backdrop-blur-md transition-all",
        active
          ? "bg-white text-black"
          : "bg-white/10 text-zinc-300 hover:bg-white/20",
      )}
    >
      {dotColor && (
        <span className={cn("-full h-2 w-2 rounded-xs", dotColor)} />
      )}
      {label}
    </button>
  );
}
