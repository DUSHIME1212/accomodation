import prisma from "@/lib/prisma";
import { CalendarView } from "./CalendarView";

export const dynamic = "force-dynamic";

export default async function AdminCalendarPage() {
  const apartments = await prisma.apartment.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="container mx-auto py-10">
      <CalendarView apartments={apartments} />
    </div>
  );
}
