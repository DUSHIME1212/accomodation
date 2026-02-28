import React from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-foreground min-h-screen bg-slate-50/50 dark:bg-zinc-950">
      <AdminSidebar />
      <div className="pl-64">
        <AdminTopbar />
        <main className="min-h-[calc(100vh-64px)] overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
