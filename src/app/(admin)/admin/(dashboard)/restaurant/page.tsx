"use client";

import React, { useState } from "react";
import { DashboardHeader } from "@/components/admin/DashboardHeader";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  UtensilsCrossed,
  Coffee,
  Wine,
  Clock,
  Star,
  ChevronRight,
  Users,
  DollarSign,
  TrendingUp,
  Plus,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const MENU_CATEGORIES = [
  {
    name: "Breakfast",
    icon: Coffee,
    items: [
      {
        name: "Continental Breakfast",
        price: 18,
        description: "Assorted pastries, fresh fruit, yogurt, and coffee",
      },
      {
        name: "Full English",
        price: 25,
        description: "Eggs, bacon, sausage, toast, beans, and grilled tomato",
      },
      {
        name: "Avocado Toast",
        price: 16,
        description:
          "Sourdough with smashed avocado, poached eggs, and microgreens",
      },
      {
        name: "Pancake Stack",
        price: 14,
        description: "Fluffy buttermilk pancakes with maple syrup and berries",
      },
    ],
  },
  {
    name: "Lunch & Dinner",
    icon: UtensilsCrossed,
    items: [
      {
        name: "Caesar Salad",
        price: 16,
        description:
          "Crispy romaine, house Caesar dressing, croutons, parmesan",
      },
      {
        name: "Club Sandwich",
        price: 22,
        description:
          "Triple-decker with turkey, bacon, lettuce, tomato, and mayo",
      },
      {
        name: "Grilled Salmon",
        price: 38,
        description:
          "Atlantic salmon with lemon butter sauce and seasonal vegetables",
      },
      {
        name: "Beef Tenderloin",
        price: 55,
        description: "8oz filet with truffle butter and roasted potatoes",
      },
      {
        name: "Pasta Primavera",
        price: 24,
        description: "Fettuccine with seasonal vegetables in light cream sauce",
      },
    ],
  },
  {
    name: "Bar & Drinks",
    icon: Wine,
    items: [
      {
        name: "House Wine (glass)",
        price: 12,
        description: "Selection of red, white, or rosé",
      },
      {
        name: "Classic Cocktails",
        price: 16,
        description: "Mojito, Old Fashioned, Negroni, or Cosmopolitan",
      },
      {
        name: "Fresh Juice",
        price: 8,
        description: "Orange, apple, watermelon, or ginger shots",
      },
      {
        name: "Specialty Coffee",
        price: 7,
        description: "Espresso, flat white, cappuccino, latte",
      },
    ],
  },
];

const RECENT_ORDERS = [
  {
    id: "#R001",
    room: "S-12",
    guest: "Marcus Richardson",
    item: "Full English Breakfast",
    amount: 25,
    status: "delivered",
    time: "08:42",
  },
  {
    id: "#R002",
    room: "S-07",
    guest: "Elena Vasquez",
    item: "Caesar Salad + Sparkling Water",
    amount: 24,
    status: "preparing",
    time: "12:15",
  },
  {
    id: "#R003",
    room: "S-14",
    guest: "David Chen",
    item: "Beef Tenderloin + House Wine",
    amount: 67,
    status: "pending",
    time: "19:30",
  },
  {
    id: "#R004",
    room: "S-03",
    guest: "Sarah Johnson",
    item: "Continental Breakfast",
    amount: 18,
    status: "delivered",
    time: "08:10",
  },
  {
    id: "#R005",
    room: "S-09",
    guest: "James Wilson",
    item: "Club Sandwich + Fresh Juice",
    amount: 30,
    status: "preparing",
    time: "13:05",
  },
];

const ORDER_STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-700",
  preparing: "bg-blue-500/10 text-blue-600",
  delivered: "bg-green-500/10 text-green-600",
  cancelled: "bg-red-500/10 text-red-600",
};

export default function RestaurantPage() {
  const [activeCategory, setActiveCategory] = useState("Breakfast");
  const [activeTab, setActiveTab] = useState("menu");

  // Modal states
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);

  const category = MENU_CATEGORIES.find((c) => c.name === activeCategory);

  return (
    <div className="space-y-8 p-8 font-sans">
      <DashboardHeader
        title="Restaurant"
        subtitle="Manage in-room dining, menu items, and guest orders."
        showFilters={false}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Today's Orders",
            value: "24",
            icon: UtensilsCrossed,
            color: "text-blue-600",
          },
          {
            label: "Active Orders",
            value: "5",
            icon: Clock,
            color: "text-orange-600",
          },
          {
            label: "Revenue Today",
            value: "$1,245",
            icon: DollarSign,
            color: "text-green-600",
          },
          {
            label: "Avg. Rating",
            value: "4.8★",
            icon: Star,
            color: "text-yellow-500",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="border-border bg-card rounded-2xl border p-6 shadow-sm"
          >
            <div className="mb-2 flex items-center justify-between">
              <p className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                {s.label}
              </p>
              <div className={cn("bg-muted/50 rounded-full p-2", s.color)}>
                <s.icon className="h-4 w-4" />
              </div>
            </div>
            <p className={cn("text-3xl font-medium", s.color)}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-border border-b">
        <div className="flex gap-4">
          {["menu", "orders"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "-mb-px border-b-4 px-8 py-4 text-xs font-medium tracking-widest uppercase transition-all",
                activeTab === tab
                  ? "border-[#00303e] text-[#00303e]"
                  : "text-muted-foreground hover:text-foreground border-transparent",
              )}
            >
              {tab === "menu" ? "Menu Management" : "Active Orders"}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "menu" && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Category Sidebar */}
          <div className="space-y-3">
            <p className="text-muted-foreground mb-4 text-[10px] font-medium tracking-widest uppercase">
              Categories
            </p>
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={cn(
                  "flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-sm font-bold shadow-sm transition-all",
                  activeCategory === cat.name
                    ? "border-[#00303e] bg-[#00303e] text-white shadow-lg shadow-[#00303e]/20"
                    : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-foreground",
                )}
              >
                <div className="flex items-center gap-3">
                  <cat.icon className="h-4 w-4" />
                  {cat.name}
                </div>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium opacity-60">
                  {cat.items.length}
                </span>
              </button>
            ))}
            <Button
              onClick={() => setIsAddCategoryOpen(true)}
              className="border-border text-foreground hover:bg-muted mt-4 h-14 w-full gap-2 rounded-2xl border bg-transparent font-bold"
            >
              <Plus className="h-4 w-4" />
              Add Category
            </Button>
          </div>

          {/* Menu Items */}
          <div className="space-y-6 lg:col-span-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-medium">{activeCategory}</h3>
                <p className="text-muted-foreground text-xs font-bold tracking-tighter uppercase">
                  Manage items in this category
                </p>
              </div>
              <Button
                onClick={() => setIsAddItemOpen(true)}
                className="shadow-primary/20 h-12 gap-2 rounded-2xl bg-[#00303e] px-6 font-bold text-white shadow-lg"
              >
                <Plus className="h-4 w-4" />
                Add New Item
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {category?.items.map((item, i) => (
                <div
                  key={i}
                  className="border-border bg-card group hover:border-primary/30 flex flex-col gap-4 rounded-2xl border p-8 shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="text-xl leading-tight font-medium">
                        {item.name}
                      </h4>
                      <p className="text-muted-foreground max-w-[200px] text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <p className="ml-4 shrink-0 text-2xl font-medium text-green-600">
                      ${item.price}
                    </p>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border h-10 rounded-xl px-6 font-bold"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-10 rounded-xl border-red-200 px-6 font-bold text-red-600 hover:border-red-500 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "orders" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-3xl font-medium">Incoming Orders</h3>
              <p className="text-muted-foreground text-xs font-bold tracking-tighter uppercase">
                Kitchen queue & delivery status
              </p>
            </div>
            <div className="bg-muted/50 flex rounded-2xl p-1">
              {["All", "Pending", "Preparing", "Delivered"].map((s) => (
                <button
                  key={s}
                  className="rounded-xl px-6 py-2 text-[10px] font-medium tracking-widest uppercase transition-all hover:bg-white"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="border-border bg-card overflow-hidden rounded-2xl border shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-border text-muted-foreground bg-muted/20 border-b">
                  {[
                    "Order ID",
                    "Room",
                    "Guest",
                    "Item Details",
                    "Amount",
                    "Time",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-5 text-left text-[10px] font-medium tracking-widest uppercase"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-border/50 divide-y">
                {RECENT_ORDERS.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-muted/30 group transition-colors"
                  >
                    <td className="text-muted-foreground px-6 py-6 font-mono text-xs font-bold">
                      {order.id}
                    </td>
                    <td className="text-primary px-6 py-6 font-medium">
                      {order.room}
                    </td>
                    <td className="px-6 py-6 font-bold">{order.guest}</td>
                    <td className="text-muted-foreground px-6 py-6 font-medium">
                      {order.item}
                    </td>
                    <td className="px-6 py-6 font-medium text-green-600">
                      ${order.amount}
                    </td>
                    <td className="text-muted-foreground px-6 py-6 font-bold">
                      {order.time}
                    </td>
                    <td className="px-6 py-6">
                      <span
                        className={cn(
                          "rounded-full px-3 py-1.5 text-[10px] font-medium tracking-tighter uppercase",
                          ORDER_STATUS_STYLES[order.status],
                        )}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      {order.status === "pending" && (
                        <Button
                          size="sm"
                          className="shadow-primary/10 h-9 rounded-xl bg-[#00303e] px-6 text-[10px] font-medium text-white uppercase shadow-lg"
                        >
                          Confirm
                        </Button>
                      )}
                      {order.status === "preparing" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-primary text-primary h-9 rounded-xl px-6 text-[10px] font-medium uppercase"
                        >
                          Delivered
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
        <DialogContent className="border-border bg-card rounded-3xl p-8 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-3xl font-medium">
              NEW CATEGORY
            </DialogTitle>
            <p className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
              Add a new section to your menu
            </p>
          </DialogHeader>
          <div className="grid gap-6 py-6">
            <div className="grid gap-2">
              <Label
                htmlFor="catName"
                className="text-muted-foreground text-[10px] font-medium uppercase"
              >
                Category Name
              </Label>
              <Input
                id="catName"
                placeholder="e.g. Desserts"
                className="border-border bg-background h-12 rounded-2xl px-4 font-bold"
              />
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="catIcon"
                className="text-muted-foreground text-[10px] font-medium uppercase"
              >
                Icon
              </Label>
              <Input
                id="catIcon"
                placeholder="e.g. Utensils"
                className="border-border bg-background h-12 rounded-2xl px-4 font-bold"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => setIsAddCategoryOpen(false)}
              className="h-14 w-full rounded-2xl bg-[#00303e] text-lg font-medium text-white uppercase shadow-xl"
            >
              Create Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Item Modal */}
      <Dialog open={isAddItemOpen} onOpenChange={setIsAddItemOpen}>
        <DialogContent className="border-border bg-card rounded-3xl p-8 sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-3xl font-medium tracking-tighter uppercase">
              Add menu item
            </DialogTitle>
            <p className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
              Adding to {activeCategory}
            </p>
          </DialogHeader>
          <div className="grid gap-6 py-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label
                  htmlFor="itemName"
                  className="text-muted-foreground text-[10px] font-medium uppercase"
                >
                  Item Name
                </Label>
                <Input
                  id="itemName"
                  placeholder="e.g. Truffle Pasta"
                  className="border-border bg-background h-12 rounded-2xl px-4 font-bold"
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="itemPrice"
                  className="text-muted-foreground text-[10px] font-medium uppercase"
                >
                  Price ($)
                </Label>
                <Input
                  id="itemPrice"
                  type="number"
                  placeholder="0.00"
                  className="border-border bg-background h-12 rounded-2xl px-4 font-bold"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="itemDesc"
                className="text-muted-foreground text-[10px] font-medium uppercase"
              >
                Description
              </Label>
              <Textarea
                id="itemDesc"
                placeholder="Describe the dish, ingredients, etc."
                className="border-border bg-background min-h-[100px] rounded-2xl px-4 py-3 font-bold"
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-muted-foreground text-[10px] font-medium uppercase">
                Category
              </Label>
              <div className="border-border bg-background flex h-12 w-full items-center rounded-2xl border px-4 text-sm font-bold">
                {activeCategory}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => setIsAddItemOpen(false)}
              className="h-14 w-full rounded-2xl bg-[#00303e] text-lg font-medium text-white uppercase shadow-xl"
            >
              Add To Menu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
