"use client";

import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Bell,
  CheckCircle2,
  Info,
  AlertTriangle,
  Clock,
  User,
  ExternalLink,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/admin/notifications");
      const data = await res.json();
      setNotifications(data);
    } catch (error) {
      console.error("Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/admin/notifications/${id}`, { method: "PATCH" });
      setNotifications(
        notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
      );
    } catch (error) {
      toast.error("Failed to update notification");
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      await fetch(`/api/admin/notifications/${id}`, { method: "DELETE" });
      setNotifications(notifications.filter((n) => n.id !== id));
      toast.success("Notification removed");
    } catch (error) {
      toast.error("Failed to delete notification");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="bg-card border-border flex w-full flex-col rounded-none border-l p-0  sm:max-w-md"
      >
        <SheetHeader className="border-border bg-muted/10 border-b p-10">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-3 text-3xl font-medium uppercase">
              <Bell className="text-primary h-7 w-7" />
              Intelligence
            </SheetTitle>
            <button
              onClick={() =>
                notifications.forEach((n) => !n.read && markAsRead(n.id))
              }
              className="text-primary uppercase opacity-60 hover:underline"
            >
              Flush All
            </button>
          </div>
          <SheetDescription className="text-muted-foreground mt-2 text-xs font-bold tracking-widest uppercase opacity-70">
            Internal system alerts and property signals.
          </SheetDescription>
        </SheetHeader>

        <div className="custom-scrollbar flex-1 overflow-y-auto">
          {loading ? (
            <div className="text-muted-foreground animate-pulse p-12 text-center text-xs font-black tracking-widest uppercase">
              Accessing Data Streams...
            </div>
          ) : notifications.length > 0 ? (
            <div className="divide-border/50 divide-y">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => !notif.read && markAsRead(notif.id)}
                  className={cn(
                    "hover:bg-muted/30 group relative cursor-pointer p-8 transition-all",
                    !notif.read ? "bg-primary/[0.03]" : "opacity-60",
                  )}
                >
                  <div className="flex gap-6">
                    <div
                      className={cn(
                        "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-lg",
                        notif.type === "success" &&
                          "bg-emerald-500/10 text-emerald-600",
                        notif.type === "warning" &&
                          "bg-amber-500/10 text-amber-600",
                        notif.type === "error" &&
                          "bg-rose-500/10 text-rose-600",
                        notif.type === "info" && "bg-sky-500/10 text-sky-600",
                      )}
                    >
                      {notif.type === "success" && (
                        <CheckCircle2 className="h-6 w-6" />
                      )}
                      {notif.type === "warning" && (
                        <AlertTriangle className="h-6 w-6" />
                      )}
                      {notif.type === "error" && <Trash2 className="h-6 w-6" />}
                      {notif.type === "info" && <Info className="h-6 w-6" />}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <p className="text-foreground text-sm font-black tracking-tight uppercase">
                          {notif.title}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notif.id);
                          }}
                          className="p-1 opacity-0 transition-opacity group-hover:opacity-100 hover:text-rose-500"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="text-muted-foreground text-xs leading-relaxed font-medium">
                        {notif.message}
                      </p>
                      <div className="flex items-center justify-between pt-3">
                        <div className="text-muted-foreground flex items-center gap-2 text-[10px] font-black tracking-widest uppercase opacity-50">
                          <Clock className="h-3 w-3" />
                          {formatDistanceToNow(new Date(notif.createdAt), {
                            addSuffix: true,
                          })}
                        </div>
                        {!notif.read && (
                          <div className="bg-primary h-2 w-2 animate-pulse rounded-full" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-muted-foreground flex h-full flex-col items-center justify-center p-12 opacity-30">
              <Bell className="mb-6 h-20 w-20" />
              <p className="text-xs font-black tracking-widest uppercase">
                Silence in the Hub
              </p>
              <p className="mt-2 text-center text-xs font-medium">
                No active signals detected.
              </p>
            </div>
          )}
        </div>

        <div className="border-border bg-muted/20 border-t p-10">
          <Link
            href="/admin/settings"
            onClick={onClose}
            className="block w-full rounded-none bg-[#00303e] py-2 text-center  text-white uppercase shadow-xl transition-all hover:opacity-90"
          >
            Configure Protocols
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
