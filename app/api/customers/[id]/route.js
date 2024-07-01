import db from "@/lib/db";
import { NextResponse } from "next/server";


export async function PUT(request, { params: { id } }) {
  try {
    const {
      city,
      country,
      dateOfBirth,
      district,
      emailAddress,
      firstName,
      lastName,
      name,
      phoneNumber,
      profileImage,
      streetAddress,
      username,
      userId,
    } = await request.json();

    const existingCustomer = await db.userProfile.findUnique({
      where: {
        id,
      },
    });
    if (!existingCustomer) {
      return NextResponse.json(
        {
          data: null,
          message: "User Profile Not Found",
        },
        { status: 404 }
      );
    }
    const updateUser = await db.userProfile.update({
      where: {
        id,
      },
      data: {
        city,
        country,
        dateOfBirth,
        district,
        emailAddress,
        firstName,
        lastName,
        name,
        phoneNumber,
        profileImage,
        streetAddress,
        username,
        userId,
      },
    });
    return NextResponse.json(updateUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Update Customer", error },
      { status: 500 }
    );
  }
}
