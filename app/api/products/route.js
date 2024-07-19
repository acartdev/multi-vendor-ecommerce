import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const {
      barcode,
      categoryId,
      description,
      farmerId,
      imagesUrl,
      isActive,
      isWholeSale,
      productCode,
      productPrice,
      salePrice,
      sku,
      slug,
      tags,
      title,
      unit,
      wholesalePrice,
      wholesaleQty,
      productStock,
      qty,
    } = await request.json();
    const isImagesUrl =
      imagesUrl && imagesUrl.length > 0 ? imagesUrl[0].url : null;
    const exitingProduct = await db.product.findUnique({
      where: {
        slug,
      },
    });
    if (exitingProduct) {
      return NextResponse.json(
        {
          data: null,
          message: "Product already exists",
        },
        { status: 409 }
      );
    }
    const result = await db.$transaction(async (prisma) => {
      const newProduct = await prisma.product.create({
        data: {
          barcode,
          categoryId,
          description,
          userId: farmerId,
          imageUrl: isImagesUrl,
          isActive,
          isWholeSale,
          productCode,
          productPrice: parseFloat(productPrice),
          salePrice: parseFloat(salePrice),
          sku,
          slug,
          tags,
          title,
          unit,
          wholesalePrice: parseFloat(wholesalePrice),
          wholesaleQty: parseInt(wholesaleQty),
          productStock: parseInt(productStock),
          qty: parseInt(qty),
        },
      });

      if (imagesUrl && imagesUrl.length > 0) {
        const newImageItems = await prisma.imageItems.createMany({
          data: imagesUrl.map((item) => ({
            key: item.key,
            url: item.url,
            productId: newProduct.id,
          })),
        });
        console.log(newImageItems);
      }
      return { newProduct };
    });

    return NextResponse.json(result.newProduct);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to create Product", error },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  const categoryId = request.nextUrl.searchParams.get("category");
  const sort = request.nextUrl.searchParams.get("sort");
  const searchQuery = request.nextUrl.searchParams.get("q");
  const minPrice = parseFloat(request.nextUrl.searchParams.get("min"));
  const maxPrice = parseFloat(request.nextUrl.searchParams.get("max"));
  const page = parseFloat(request.nextUrl.searchParams.get("page")) || 1;
  const pageSize = 4;
  let products;
  try {
    const whereClause = {
      categoryId: categoryId,
    };

    if (minPrice && maxPrice) {
      whereClause.salePrice = {
        gte: minPrice,
        lte: maxPrice,
      };
    } else if (minPrice) {
      whereClause.salePrice = {
        gte: minPrice,
      };
    } else if (maxPrice) {
      whereClause.salePrice = {
        lte: maxPrice,
      };
    }

    if (categoryId) {
      if (sort) {
        products = await db.product.findMany({
          where: whereClause,
          orderBy: {
            salePrice: sort === "asc" ? "asc" : "desc",
          },
          include: {
            imagesUrl: true,
          },
          skip: (page - 1) * pageSize,
          take: pageSize,
        });
      } else {
        products = await db.product.findMany({
          where: whereClause,
          orderBy: {
            createdAt: "desc",
          },
          include: {
            imagesUrl: true,
          },
          skip: (page - 1) * pageSize,
          take: pageSize,
        });
      }
    } else {
      products = await db.product.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          imagesUrl: true,
        },
      });
    }
    if (searchQuery) {
      products = await db.product.findMany({
        where: {
          OR: [{ title: { contains: searchQuery, mode: "insensitive" } }],
        },
      });
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { message: "Failed to Fetch Products", error },
      { status: 500 }
    );
  }
}
// export async function GET(request, searchParams) {
//   const { categoryId, sort, q, min, max, page = 1 } = searchParams;
//   const pageSize = 4;
//   try {
//     let whereClause = {};

//     if (categoryId) {
//       whereClause.categoryId = categoryId;
//     }

//     if (min && max) {
//       whereClause.salePrice = {
//         gte: min,
//         lte: max,
//       };
//     } else if (min) {
//       whereClause.salePrice = {
//         gte: min,
//       };
//     } else if (max) {
//       whereClause.salePrice = {
//         lte: max,
//       };
//     }

//     if (q) {
//       whereClause = {
//         OR: [{ title: { contains: q, mode: "insensitive" } }],
//       };
//     }

//     const products = await db.product.findMany({
//       where: whereClause,
//       orderBy: sort ? { salePrice: sort } : { createdAt: "desc" },
//       include: {
//         imagesUrl: true,
//       },
//       skip: (page - 1) * pageSize,
//       take: pageSize,
//     });
//     // แยกเคสดึงแค่ category ปกติ
//     const allProducts = await db.product.findMany({
//       orderBy: {
//         createdAt: "desc",
//       },
//       include: {
//         imagesUrl: true,
//       },
//     });
//     return NextResponse.json({ products, allProducts });
//   } catch (error) {
//     console.error("Failed to fetch products:", error);
//     return NextResponse.json(
//       { message: "Failed to Fetch Products", error },
//       { status: 500 }
//     );
//   }
// }
