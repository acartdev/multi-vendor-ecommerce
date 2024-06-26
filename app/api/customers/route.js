import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const customers = await db.user.findMany({
      where: {
        role: "USER",
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        userProfile: true,
      },
    });
    return NextResponse.json(customers);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Fetch Customers", error },
      { status: 500 }
    );
  }
}
