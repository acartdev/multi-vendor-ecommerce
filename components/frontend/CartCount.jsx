"use client";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export default function CartCount() {
  const countItems = useSelector((store) => store.cart);
  return (
    <Link
      href="/cart"
      className="flex indicator items-center justify-center space-x-1 text-slate-900 dark:text-slate-200"
    >
      <ShoppingCart />
      {countItems != 0 && (
        <div className="indicator-item badge indicator-start badge-error font-semibold text-slate-100">
          {countItems.length}
        </div>
      )}
    </Link>
  );
}
