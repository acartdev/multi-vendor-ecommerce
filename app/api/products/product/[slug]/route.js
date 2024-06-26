import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { slug } }) {
  try {
    const existingProduct = await db.product.findUnique({
      where: {
        slug,
      },
    });
    if (!existingProduct) {
      return NextResponse.json(
        {
          data: null,
          message: "Product Not Found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(existingProduct);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Fetch Product", error },
      { status: 500 }
    );
  }
}
