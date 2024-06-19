import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const existingOrder = await db.order.findMany({
      where: {
        userId: id,
      },
      include: {
        orderItems: true,
      },
    });
    if (!existingOrder) {
      return NextResponse.json(
        {
          data: null,
          message: "Order Not Found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(existingOrder);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Fetch Order", error },
      { status: 500 }
    );
  }
}
