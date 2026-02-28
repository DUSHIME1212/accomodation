"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { format, startOfMonth } from "date-fns";
import { Loader2 } from "lucide-react";

interface Apartment {
  id: string;
  name: string;
}

interface CalendarData {
  month: string;
  bookings: Array<{
    id: string;
    checkIn: string;
    checkOut: string;
    status: string;
    firstName: string;
    lastName: string;
  }>;
  blockedDates: Array<{
    id: string;
    startDate: string;
    endDate: string;
    reason?: string;
  }>;
}

export function CalendarView({ apartments }: { apartments: Apartment[] }) {
  const [selectedApartment, setSelectedApartment] = React.useState<string>(
    apartments[0]?.id || "",
  );
  const [month, setMonth] = React.useState<Date>(startOfMonth(new Date()));
  const [data, setData] = React.useState<CalendarData | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!selectedApartment) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          apartmentId: selectedApartment,
          month: month.toISOString(),
        });
        const res = await fetch(`/api/admin/calendar?${queryParams}`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error("Failed to fetch calendar data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedApartment, month]);

  const bookedDays =
    data?.bookings.map((b) => ({
      from: new Date(b.checkIn),
      to: new Date(b.checkOut),
    })) || [];

  // Handle potentially missing blockedDates if the API fails or schema is weird
  const blockedDays = (data?.blockedDates || []).map((b) => ({
    from: new Date(b.startDate),
    to: new Date(b.endDate),
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Availability Calendar
        </h2>
        <div className="w-[300px]">
          <Select
            value={selectedApartment}
            onValueChange={setSelectedApartment}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select apartment" />
            </SelectTrigger>
            <SelectContent>
              {apartments.map((apt) => (
                <SelectItem key={apt.id} value={apt.id}>
                  {apt.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Calendar Overview</CardTitle>
            <CardDescription>
              View bookings and blocked dates for {format(month, "MMMM yyyy")}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center p-6">
            <Calendar
              mode="single"
              selected={month}
              onSelect={(date) => date && setMonth(date)}
              month={month}
              onMonthChange={setMonth}
              modifiers={{
                booked: bookedDays,
                blocked: blockedDays,
              }}
              modifiersStyles={{
                booked: {
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)",
                  opacity: 0.8,
                },
                blocked: {
                  backgroundColor: "var(--destructive)",
                  color: "var(--destructive-foreground)",
                  opacity: 0.8,
                },
              }}
              className="rounded-none-md border p-4"
            />
          </CardContent>
          <div className="bg-muted/50 flex justify-center gap-6 border-t p-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary rounded-none-full h-3 w-3 opacity-80" />
              <span className="text-sm font-medium">Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-destructive rounded-none-full h-3 w-3 opacity-80" />
              <span className="text-sm font-medium">Blocked</span>
            </div>
          </div>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex h-[100px] items-center justify-center">
                <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h4 className="text-muted-foreground mb-2 text-sm font-medium">
                    Month Summary
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted rounded-none-lg p-3 text-center">
                      <div className="text-2xl font-bold">
                        {data?.bookings.length || 0}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        Bookings
                      </div>
                    </div>
                    <div className="bg-muted rounded-none-lg p-3 text-center">
                      <div className="text-2xl font-bold">
                        {data?.blockedDates?.length || 0}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        Blocked
                      </div>
                    </div>
                  </div>
                </div>

                {data?.bookings && data.bookings.length > 0 && (
                  <div>
                    <h4 className="text-muted-foreground mb-2 text-sm font-medium">
                      Upcoming Bookings
                    </h4>
                    <div className="max-h-[300px] space-y-2 overflow-y-auto pr-2">
                      {data.bookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="bg-muted/50 rounded-2xl border p-2 text-sm"
                        >
                          <div className="font-medium">
                            {booking.firstName} {booking.lastName}
                          </div>
                          <div className="text-muted-foreground text-xs">
                            {format(new Date(booking.checkIn), "MMM d")} -{" "}
                            {format(new Date(booking.checkOut), "MMM d")}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
