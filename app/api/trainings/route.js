import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const {
      title,
      slug,
      imageUrl,
      categoryId,
      description,
      content,
      isActive,
    } = await request.json();

    const exitingTraining = await db.training.findUnique({
      where: {
        slug,
      },
    });
    console.log("Existing training:", exitingTraining);
    if (exitingTraining) {
      return NextResponse.json(
        {
          data: null,
          message: "Training already exists",
        },
        { status: 409 }
      );
    }
    const newTraining = await db.training.create({
      data: {
        title,
        slug,
        imageUrl,
        categoryId,
        description,
        content,
        isActive,
      },
    });
    return NextResponse.json(newTraining);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to create Training", error },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const trainings = await db.training.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
      },
    });
    return NextResponse.json(trainings);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Fetch Trainings", error },
      { status: 500 }
    );
  }
}
