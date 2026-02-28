"use client";

import React, { useState } from "react";
import {
  Search,
  Mail,
  Bell,
  MessageSquare,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NotificationPanel } from "./NotificationPanel";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AdminTopbar() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <>
      <header className="border-border bg-card/80 sticky top-0 z-30 flex h-20 items-center justify-between border-b px-10 shadow-sm backdrop-blur-3xl">
        <div className="flex w-1/2 max-w-xl items-center gap-6">
          <div className="group relative w-full">
            <Search className="text-muted-foreground group-focus-within:text-primary absolute top-1/2 left-5 h-4 w-4 -translate-y-1/2 transition-colors" />
            <Input
              placeholder="Query intelligence database..."
              className="bg-muted/30 focus-visible:ring-primary/10 h-12 w-full rounded-2xl border-none pl-12 text-sm font-medium transition-all focus-visible:bg-white focus-visible:shadow-lg"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="border-border/50 flex items-center gap-2 border-r pr-4">
            <Link
              href="/admin/messaging"
              className="bg-muted/30 hover:bg-muted/50 flex h-11 w-11 items-center justify-center rounded-2xl shadow-sm transition-all active:scale-95"
            >
              <MessageSquare className="text-muted-foreground h-5 w-5" />
            </Link>
            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="bg-muted/30 hover:bg-muted/50 relative flex h-11 w-11 items-center justify-center rounded-2xl shadow-sm transition-all  active:scale-95"
            >
              <Bell className="text-muted-foreground h-5 w-5" />
              <span className="absolute top-3 right-3 h-2 w-2 animate-pulse rounded-full bg-[#00303e] ring-2 ring-white" />
            </button>
          </div>

          <div className="group hover:bg-muted/10 flex cursor-pointer items-center gap-4 rounded-2xl p-1 pl-2 transition-colors">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium tracking-tighter text-[#00303e] uppercase ">
                Aime Dushime
              </p>
              <div className="flex items-center justify-end gap-1">
                <ShieldCheck className="h-3 w-3 text-emerald-500" />
                <p className="text-muted-foreground text-[10px] font-medium tracking-widest uppercase opacity-60">
                  Super Admin
                </p>
              </div>
            </div>
            <Avatar className="ring-border/50 h-12 w-12 overflow-hidden rounded-2xl border-4 border-white shadow-xl ring-1 shadow-black/5">
              <AvatarImage src="https://github.com/shadcn.png" alt="Admin" />
              <AvatarFallback className="bg-[#00303e] font-medium text-white">
                AD
              </AvatarFallback>
            </Avatar>
            <ChevronDown className="h-4 w-4 opacity-20 transition-opacity group-hover:opacity-100" />
          </div>
        </div>
      </header>

      <NotificationPanel
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </>
  );
}
