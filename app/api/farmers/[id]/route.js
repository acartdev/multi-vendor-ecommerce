import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const existingFarmer = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        farmerProfile: true,
      },
    });
    if (!existingFarmer) {
      return NextResponse.json(
        {
          data: null,
          message: "Farmer Not Found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(existingFarmer);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Fetch Farmer", error },
      { status: 500 }
    );
  }
}
export async function DELETE(request, { params: { id } }) {
  try {
    const existingFarmer = await db.user.findUnique({
      where: {
        id,
      }
    });
    if (!existingFarmer) {
      return NextResponse.json(
        {
          data: null,
          message: "Farmer Not Found",
        },
        { status: 404 }
      );
    }
    const deletedFarmer = await db.user.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(deletedFarmer);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Delete Farmer", error },
      { status: 500 }
    );
  }
}
