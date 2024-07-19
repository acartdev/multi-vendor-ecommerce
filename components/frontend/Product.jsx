"use client";
import { addToCart } from "@/redux/slices/cartSlice";
import { Images, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function Product({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Item added Successfully");
  };
  return (
    <div className=" rounded-lg mr-3 flex flex-col justify-center items-center shadow-lg dark:bg-slate-900 dark:shadow-custom-dark py-4 mb-6">
      <Link href={`/products/${product.slug}`}>
        {product.imageUrl && product.imageUrl.length > 0 ? (
          <Image
            src={
              product.imageUrl 
            }
            alt={product.title}
            width={160}
            height={160}
            className=" w-40 h-40 object-cover rounded-md "
          />
        ) : (
          <Images className="w-40 h-40 object-cover rounded-md" />
        )}
      </Link>

      <Link href={`/products/${product.slug}`}>
        <h2 className="  text-center text-gray-800 dark:text-gray-50 m-2">
          {product.title}
        </h2>
      </Link>
      <div className="flex justify-between items-center gap-6">
        <p>{product.salePrice}฿</p>
        <button
          onClick={() => handleAddToCart()}
          className="btn btn-sm btn-success text-white  flex justify-center items-center "
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
}
