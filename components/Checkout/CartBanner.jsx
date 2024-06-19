"use client"
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export default function CartBanner() {
  const cartItems = useSelector((store) => store.cart) ;
  const subTotal = cartItems.reduce((total, currentItem) => {
    return total + currentItem.salePrice * currentItem.qty;
  }, 0);
  return (
    <div className="sm:flex justify-between p-4 mb-6 bg-slate-100 dark:bg-gray-700 rounded-xl">
      <div className="flex items-center text-sm">
        <div className="btn btn-circle border-none text-white bg-slate-400 dark:bg-gray-800">
          <ShoppingBag />
        </div>
        <div className="ml-2">
          You have <span className="font-bold">{cartItems.length}</span> items
          in cart. Sub total is{" "}
          <span className="font-bold">{subTotal.toLocaleString()} ฿</span>{" "}
        </div>
      </div>
      <Link
        href="/cart"
        className="btn btn-outline bg-white text-black dark:bg-gray-800 dark:text-slate-400 dark:hover:btn-active"
      >
        Edit Cart
      </Link>
    </div>
  );
}
