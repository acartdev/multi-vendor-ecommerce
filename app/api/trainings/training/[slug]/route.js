import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { slug } }) {
  try {
    const existingTraining = await db.training.findUnique({
      where: {
        slug,
      },
      include: {
        category: true,
      },
    });
    if (!existingTraining) {
      return NextResponse.json(
        {
          data: null,
          message: "Training Not Found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(existingTraining);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Fetch Training", error },
      { status: 500 }
    );
  }
}
