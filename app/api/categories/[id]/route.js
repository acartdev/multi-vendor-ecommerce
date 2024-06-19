import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const existingCategory = await db.category.findUnique({
      where: {
        id,
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
export async function DELETE(request, { params: { id } }) {
  try {
    const existingCategory = await db.category.findUnique({
      where: {
        id,
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
    const deletedCategory = await db.category.delete({
      where: {
        id,
      },
      include: {
        //เป็นการ cascade
        products: true,
      },
    });
    return NextResponse.json(deletedCategory);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Delete Category", error },
      { status: 500 }
    );
  }
}
export async function PUT(request, { params: { id } }) {
  try {
    const { title, slug, marketsIds, imageUrl, description, isActive } =
      await request.json();

    const existingCategory = await db.category.findUnique({
      where: {
        id,
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
    const updateCategory = await db.category.update({
      where: {
        id,
      },
      data: { title, slug, marketsIds, imageUrl, description, isActive },
    });
    return NextResponse.json(updateCategory);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Update Category", error },
      { status: 500 }
    );
  }
}
