"use client";

import React, { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/admin/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  Settings,
  Lock,
  Bell,
  Globe,
  ShieldCheck,
  Save,
  Trash2,
  Camera,
  Moon,
  Sun,
  Monitor,
  Palette,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { toast } from "sonner";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "property", label: "Property Info", icon: Settings },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "notifications", label: "Alerts", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
  ];

  if (!mounted) return null;

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-8">
      <DashboardHeader
        title="Settings"
        subtitle="Customize your administrative experience and property rules."
        showFilters={false}
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Navigation Sidebar */}
        <div className="space-y-2 lg:col-span-3">
          <p className="text-muted-foreground mb-4 px-4 text-[10px] font-medium tracking-widest uppercase">
            Preference Hub
          </p>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex w-full items-center gap-4 rounded-2xl border px-6 py-4 text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "shadow-primary/20 border-[#00303e] bg-[#00303e] text-white shadow-lg"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground border-transparent",
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9">
          <div className="bg-card border-border space-y-10 rounded-3xl border p-12 shadow-xl shadow-black/5">
            {activeTab === "profile" && (
              <div className="space-y-10">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="text-3xl font-medium">YOUR PROFILE</h3>
                    <p className="text-muted-foreground text-sm font-medium">
                      Manage how you appear across the system.
                    </p>
                  </div>
                  <Button
                    onClick={() => toast.success("Profile updated")}
                    className="h-12 gap-2 rounded-2xl bg-[#00303e] px-8 text-xs font-medium tracking-widest text-white uppercase shadow-lg"
                  >
                    <Save className="h-4 w-4" />
                    Sync Profile
                  </Button>
                </div>

                <div className="bg-muted/30 border-border flex items-center gap-12 rounded-3xl border p-8">
                  <div className="group relative">
                    <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-[#00303e] shadow-2xl">
                      <User className="h-12 w-12 text-white" />
                    </div>
                    <button className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                      <Camera className="h-8 w-8 text-white" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-xl font-medium tracking-tighter uppercase">
                      Profile Avatar
                    </h4>
                    <p className="text-muted-foreground max-w-xs text-xs leading-relaxed font-medium">
                      Update your photo. Recommended 512x512px. Max 5MB.
                    </p>
                    <div className="flex gap-3 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border h-10 rounded-xl px-4 font-bold hover:bg-white"
                      >
                        Upload
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-10 rounded-xl border-red-200 px-4 font-bold text-red-600 hover:border-red-500 hover:bg-red-50"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-[10px] font-medium tracking-widest uppercase">
                      Display Name
                    </Label>
                    <Input
                      className="border-border bg-background h-14 rounded-2xl px-5 text-lg font-bold"
                      defaultValue="Dushime Aime"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-[10px] font-medium tracking-widest uppercase">
                      Admin Email
                    </Label>
                    <Input
                      className="border-border bg-background h-14 rounded-2xl px-5 text-lg font-bold"
                      defaultValue="Mdonavann33@gmail.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-[10px] font-medium tracking-widest uppercase">
                      Phone Line
                    </Label>
                    <Input
                      className="border-border bg-background h-14 rounded-2xl px-5 text-lg font-bold"
                      defaultValue="+250 123 456 789"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-[10px] font-medium tracking-widest uppercase">
                      Access Level
                    </Label>
                    <div className="bg-muted/50 border-border text-primary/60 flex h-14 items-center rounded-2xl border px-5 font-medium tracking-widest uppercase">
                      Super Administrator
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div className="space-y-10">
                <div className="space-y-2">
                  <h3 className="text-3xl font-medium uppercase">
                    Interface Style
                  </h3>
                  <p className="text-muted-foreground text-sm font-medium">
                    Personalize how the dashboard looks on your screen.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {[
                    {
                      id: "light",
                      label: "Light",
                      icon: Sun,
                      color: "bg-white text-zinc-900",
                    },
                    {
                      id: "dark",
                      label: "Dark",
                      icon: Moon,
                      color: "bg-zinc-900 text-zinc-100",
                    },
                    {
                      id: "system",
                      label: "System",
                      icon: Monitor,
                      color: "bg-zinc-100 text-zinc-900",
                    },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      className={cn(
                        "group flex flex-col items-center gap-6 rounded-3xl border-2 p-10 transition-all",
                        theme === t.id
                          ? "scale-105 border-[#00303e] bg-[#00303e]/5"
                          : "border-border hover:border-foreground/30 hover:bg-muted/50",
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-20 w-20 items-center justify-center rounded-2xl shadow-2xl transition-transform group-hover:scale-110",
                          t.color,
                        )}
                      >
                        <t.icon className="h-10 w-10" />
                      </div>
                      <p className="text-xs font-medium tracking-widest uppercase">
                        {t.label}
                      </p>
                      {theme === t.id && (
                        <div className="h-2 w-2 animate-pulse rounded-full bg-[#00303e]" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="bg-muted/30 border-border space-y-6 rounded-3xl border p-8">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium tracking-tighter uppercase">
                        Animations
                      </h4>
                      <p className="text-muted-foreground text-xs font-medium">
                        Enable smooth transitions across the interface.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator className="bg-border/50" />
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium tracking-tighter uppercase">
                        Glassmorphism
                      </h4>
                      <p className="text-muted-foreground text-xs font-medium">
                        Apply blur effects to sidebar and modals.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "property" && (
              <div className="space-y-10">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="text-3xl font-medium uppercase">
                      Property Logic
                    </h3>
                    <p className="text-muted-foreground text-sm font-medium">
                      Global rules for bookings and operation flow.
                    </p>
                  </div>
                  <Button
                    onClick={() => toast.success("Property rules saved")}
                    className="h-12 gap-2 rounded-2xl bg-[#00303e] px-8 text-xs font-medium tracking-widest text-white uppercase shadow-lg"
                  >
                    <Save className="h-4 w-4" />
                    Commit Flow
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-[10px] font-medium tracking-widest uppercase">
                      Organization Name
                    </Label>
                    <Input
                      className="border-border bg-background h-14 rounded-2xl px-5 text-lg font-bold"
                      defaultValue="Alu Accomodation"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-[10px] font-medium tracking-widest uppercase">
                      Fiscal Currency
                    </Label>
                    <select className="border-border bg-background h-14 w-full rounded-2xl border px-5 text-lg font-bold">
                      <option value="USD">USD - $</option>
                      <option value="RWF">RWF - f</option>
                      <option value="EUR">EUR - €</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-[10px] font-medium tracking-widest uppercase">
                      Base Tax Rate
                    </Label>
                    <div className="relative">
                      <Input
                        type="number"
                        className="border-border bg-background h-14 rounded-2xl px-5 pr-12 text-lg font-bold"
                        defaultValue="18"
                      />
                      <span className="absolute top-1/2 right-5 -translate-y-1/2 font-medium opacity-30">
                        %
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="decoration-primary/20 text-xl font-medium underline">
                    Operational Rules
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      {
                        label: "INSTANT RESERVATION",
                        desc: "Enable real-time guest booking without manual approval.",
                      },
                      {
                        label: "MANDATORY CHECKOUT",
                        desc: "Require staff signature for every guest departure.",
                      },
                      {
                        label: "AUTO-ASSIGN STAFF",
                        desc: "Automatically assign cleaning staff to dirty rooms.",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="bg-muted/20 border-border hover:bg-muted/40 flex items-center justify-between rounded-2xl border p-6 transition-colors"
                      >
                        <div className="space-y-1">
                          <p className="text-xs font-medium tracking-widest uppercase">
                            {item.label}
                          </p>
                          <p className="text-muted-foreground text-xs font-medium">
                            {item.desc}
                          </p>
                        </div>
                        <Switch defaultChecked={i === 0} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-10">
                <div className="space-y-2">
                  <h3 className="text-3xl font-medium uppercase">
                    System Shield
                  </h3>
                  <p className="text-muted-foreground text-sm font-medium">
                    Maintain auth patterns and security protocols.
                  </p>
                </div>

                <div className="max-w-xl space-y-8">
                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-[10px] font-medium tracking-widest uppercase">
                        Current Passcode
                      </Label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="border-border bg-background h-14 rounded-2xl px-5 font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-[10px] font-medium tracking-widest uppercase">
                        New Passcode
                      </Label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="border-border bg-background h-14 rounded-2xl px-5 font-bold"
                      />
                    </div>
                  </div>
                  <Button className="h-14 w-full rounded-2xl bg-[#00303e] font-medium tracking-widest text-white uppercase shadow-2xl">
                    Revise Security Path
                  </Button>
                </div>

                <div className="space-y-4 rounded-3xl border border-red-200 bg-red-50/50 p-8">
                  <div className="flex items-center gap-3 text-xs font-medium tracking-widest text-red-600 uppercase">
                    <Trash2 className="h-5 w-5" />
                    Danger Protocol
                  </div>
                  <p className="max-w-lg text-xs leading-relaxed font-medium text-red-800">
                    Deactivating this admin hub will wipe all local caches,
                    sessions, and revoked API tokens. This action requires root
                    confirmation.
                  </p>
                  <Button
                    variant="outline"
                    className="rounded-xl border-red-200 text-[10px] font-medium tracking-widest text-red-600 uppercase transition-all hover:border-red-500 hover:bg-red-50"
                  >
                    Wipe Hub Data
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
