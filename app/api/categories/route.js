import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { title, slug, marketsIds, imageUrl, description, isActive } =
      await request.json();
    const newCategory = {
      title,
      slug,
      marketsIds,
      imageUrl,
      description,
      isActive,
    };
    const exitingCategory = await db.category.findUnique({
      where: {
        slug,
      },
    });
    if (exitingCategory) {
      return NextResponse.json(
        {
          data: null,
          message: "Category already exists",
        },
        { status: 409 }
      );
    }
    const category = await db.category.create({
      data: newCategory,
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to create Category", error },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const category = await db.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include:{
        products: true
      }
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Fetch Category", error },
      { status: 500 }
    );
  }
}
