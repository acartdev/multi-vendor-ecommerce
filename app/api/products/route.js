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
    const isImagesUrl =  imagesUrl && imagesUrl.length > 0 ? imagesUrl[0].url : null;
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
  try {
    const products = await db.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        imagesUrl: true,
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Fetch Products", error },
      { status: 500 }
    );
  }
}
