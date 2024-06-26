"use client";
import Breadcrumb from "@/components/frontend/Breadcrumb";
import CartItems from "@/components/frontend/CartItems";
import CartSubTotalCard from "@/components/frontend/CartSubTotalCard";
import EmptyCart from "@/components/frontend/EmptyCart";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function page() {

  const cartItems = useSelector((store) => store.cart);
  console.log(cartItems);

  const subTotal = cartItems.reduce((total, currentItem) => {
    return total + currentItem.salePrice * currentItem.qty;
  }, 0);
  // .toFixed(2);
  
  return (
    <div className="px-6">
      <Breadcrumb />
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-12 gap-x-10 ">
          <CartItems cartItems={cartItems} />
          <CartSubTotalCard subTotal={subTotal} />
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}
