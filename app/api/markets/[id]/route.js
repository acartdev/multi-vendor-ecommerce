import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const existingMarket = await db.market.findUnique({
      where: {
        id,
      },
      include: {
        categories: true,
      },
    });
    if (!existingMarket) {
      return NextResponse.json(
        {
          data: null,
          message: "Market Not Found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(existingMarket);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Fetch Market", error },
      { status: 500 }
    );
  }
}
export async function DELETE(request, { params: { id } }) {
  try {
    const existingMarket = await db.market.findUnique({
      where: {
        id,
      },
    });
    if (!existingMarket) {
      return NextResponse.json(
        {
          data: null,
          message: "Market Not Found",
        },
        { status: 404 }
      );
    }
    const deletedMarket = await db.market.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(deletedMarket);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Delete Market", error },
      { status: 500 }
    );
  }
}
export async function PUT(request, { params: { id } }) {
  try {
    const { title, slug, categoryIds, logoUrl, description, isActive } =
      await request.json();
    const existingMarket = await db.market.findUnique({
      where: {
        id,
      },
      include: {
        categories: true,
      },
    });
    if (!existingMarket) {
      return NextResponse.json(
        {
          data: null,
          message: "Market Not Found",
        },
        { status: 404 }
      );
    }
    const updateMarket = await db.market.update({
      where: {
        id,
      },
      data: {
        title,
        slug,
        categoryIds,
        logoUrl,
        description,
        isActive,
      },
    });
    return NextResponse.json(updateMarket);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Update Market", error },
      { status: 500 }
    );
  }
}
