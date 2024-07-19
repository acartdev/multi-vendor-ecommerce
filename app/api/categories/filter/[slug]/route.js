import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { slug } }) {
  try {
    const existingCategory = await db.category.findUnique({
      where: {
        slug,
      },
      include: {
        products: true,
      },
    });
    if (!existingCategory) {
      return NextResponse.json(
        {
          data: null,
          message: "Category Not Found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(existingCategory);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Fetch Category", error },
      { status: 500 }
    );
  }
}
