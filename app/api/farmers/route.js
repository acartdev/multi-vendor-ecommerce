import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    //แบบไม่ Destructuring ตัวแปร
    const farmerData = await request.json();
    const existingFarmer = await db.user.findUnique({
      where: {
        id: farmerData.userId,
      },
    });
    if (!existingFarmer) {
      return NextResponse.json(
        {
          data: null,
          message: "Not User Found",
        },
        { status: 404 }
      );
    }
// ถ้ามี FarmerProfile อยู่แล้วก็สร้างอีกไม่ได้
    const existingFarmerProfile = await db.farmerProfile.findUnique({
      where: {
        userId: farmerData.userId,
      },
    });
    if (existingFarmerProfile) {
      console.log("Existing Farmer Profile");
      return NextResponse.json(
        {
          data: null,
          message: "Existing Farmer Profile",
        },
        { status: 409}
      );
    }

     await db.user.update({
      where: {
        id: farmerData.userId,
      },
      data: {
        emailVerified: true,
      },
    });
    const newFarmerProfile = await db.farmerProfile.create({
      data: {
        code: farmerData.code,
        contactPerson: farmerData.contactPerson,
        contactPersonPhone: farmerData.contactPersonPhone,
        profileImageUrl: farmerData.profileImageUrl,
        firstName:farmerData.firstName,
        lastName:farmerData.lastName,
        email: farmerData.email,
        notes: farmerData.notes,
        phone: farmerData.phone,
        physicalAddress: farmerData.physicalAddress,
        terms: farmerData.terms,
        products: farmerData.products,
        landSize: parseFloat(farmerData.landSize),
        mainCrop: farmerData.mainCrop,
        isActive: farmerData.isActive,
        userId: farmerData.userId, //userId relation ไปที่ User
      },
    });
    console.log(newFarmerProfile);
    return NextResponse.json(newFarmerProfile);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to create Farmer Profile", error },
      { status: 500 }
    );
  }
}
export async function GET(request) {
  try {
    const profiles = await db.user.findMany({
      where: {
        role: "FARMER",
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        farmerProfile: true,
      },
    });
    return NextResponse.json(profiles);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Fetch Profiles", error },
      { status: 500 }
    );
  }
}
