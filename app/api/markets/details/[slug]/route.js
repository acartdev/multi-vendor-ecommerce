import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { slug } }) {
  try {
    const existingMarket = await db.market.findUnique({
      where: {
        slug,
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
// export async function DELETE(request, { params: { slug } }) {
//   try {
//     const existingMarket = await db.market.findUnique({
//       where: {
//         slug,
//       },
//     });
//     if (!existingMarket) {
//       return NextResponse.json(
//         {
//           data: null,
//           message: "Market Not Found",
//         },
//         { status: 404 }
//       );
//     }
//     const deletedMarket = await db.market.delete({
//       where: {
//         slug,
//       },
//     });
//     return NextResponse.json(deletedMarket);
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       { message: "Failed to Delete Market", error },
//       { status: 500 }
//     );
//   }
// }
// export async function PUT(request, { params: { slug } }) {
//   try {
//     const { title, slug, categoryIds, logoUrl, description, isActive } =
//       await request.json();
//     const existingMarket = await db.market.findUnique({
//       where: {
//         slug,
//       },
//       include: {
//         categories: true,
//       },
//     });
//     if (!existingMarket) {
//       return NextResponse.json(
//         {
//           data: null,
//           message: "Market Not Found",
//         },
//         { status: 404 }
//       );
//     }
//     const updateMarket = await db.market.update({
//       where: {
//         slug,
//       },
//       data: {
//         title,
//         slug,
//         categoryIds,
//         logoUrl,
//         description,
//         isActive,
//       },
//     });
//     return NextResponse.json(updateMarket);
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       { message: "Failed to Update Market", error },
//       { status: 500 }
//     );
//   }
// }
