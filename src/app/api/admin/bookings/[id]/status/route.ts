import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const { status } = await request.json();

    if (!status) {
      return NextResponse.json(
        { error: "Status is required" },
        { status: 400 },
      );
    }

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: { status: status.toLowerCase() },
    });

    return NextResponse.json(updatedBooking);
  } catch (error: any) {
    console.error("Update booking status error:", error);
    return NextResponse.json(
      { error: "Failed to update booking status" },
      { status: 500 },
    );
  }
}
