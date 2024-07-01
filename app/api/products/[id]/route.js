import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const existingProduct = await db.product.findUnique({
      where: {
        id,
      },
    });
    if (!existingProduct) {
      return NextResponse.json(
        {
          data: null,
          message: "Product Not Found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(existingProduct);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Fetch Product", error },
      { status: 500 }
    );
  }
}
export async function DELETE(request, { params: { id } }) {
  try {
    const existingProduct = await db.product.findUnique({
      where: {
        id,
      },
    });
    if (!existingProduct) {
      return NextResponse.json(
        {
          data: null,
          message: "Product Not Found",
        },
        { status: 404 }
      );
    }
    const deletedProduct = await db.product.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(deletedProduct);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Delete Product", error },
      { status: 500 }
    );
  }
}
export async function PUT(request, { params: { id } }) {
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
  try {
    const existingProduct = await db.product.findUnique({
      where: {
        id,
      },
    });
    if (!existingProduct) {
      return NextResponse.json(
        {
          data: null,
          message: "Product Not Found",
        },
        { status: 404 }
      );
    }
    const UpdateProduct = await db.product.update({
      where: {
        id,
      },
      data: {
        barcode,
        category: {
          connect: {
            id: categoryId,
          },
        },
        description,
        user: {
          connect: {
            id: farmerId,
          },
        },
        imagesUrl,
        imageUrl:imagesUrl[0],
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
    return NextResponse.json(UpdateProduct);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Update Product", error },
      { status: 500 }
    );
  }
}
