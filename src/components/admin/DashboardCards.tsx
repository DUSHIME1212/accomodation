"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  subtitle?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  isPositive,
  subtitle,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "border-border bg-card/50 rounded-2xl border p-6 shadow-sm backdrop-blur-md transition-all hover:shadow-md",
        className,
      )}
    >
      <p className="text-muted-foreground text-[10px] font-medium tracking-[0.2em] uppercase">
        {title}
      </p>
      {subtitle && (
        <p className="text-muted-foreground mt-1 text-[10px] italic opacity-60">
          {subtitle}
        </p>
      )}

      <div className="mt-4 flex items-baseline gap-3">
        <h3 className="text-3xl font-medium tracking-tight">{value}</h3>
        {change && (
          <div
            className={cn(
              "flex items-center gap-1 rounded-xl px-2 py-0.5 text-[10px] font-medium uppercase",
              isPositive
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
            )}
          >
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {change}
          </div>
        )}
      </div>
    </div>
  );
}

interface ActionCardProps {
  title: string;
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
}

export function ActionCard({ title, icon, color, onClick }: ActionCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex h-48 w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl text-white shadow-lg transition-all hover:scale-[1.02] active:scale-95",
        color,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/30 bg-white/20 shadow-inner backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
        {icon}
      </div>
      <span className="text-xl font-medium tracking-tight">{title}</span>
    </button>
  );
}
