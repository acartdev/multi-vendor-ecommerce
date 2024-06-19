"use client";

import React from "react";
import CartProduct from "./CartProduct";

export default function CartItems({ cartItems }) {
  return (
    <div className=" col-span-full sm:col-span-8">
      <div>
        {" "}
        <h2 className="py-2 mb-6 font-bold text-2xl">Your Cart</h2>
        <div
          className="flex items-center justify-between border-b
  border-gray-400 dark:border-slate-700 text-gray-500 pb-3 font-semibold text-sm mb-4"
        >
          <h2 className=" uppercase">Product</h2>
          <h2 className=" uppercase">Quantity</h2>
          <h2 className=" uppercase">Price</h2>
        </div>
      </div>

      {cartItems.map((item, i) => (
        <div key={i} className="">
          <CartProduct cartItem={item} />
        </div>
      ))}

      <div className="flex items-center gap-2 py-4">
        <input
          type="text"
          className="block py-3 ps-10 text-sm text-gray-900 border-1 border-gray-300
          rounded-lg  bg-white focus:ring-slate-700 focus:border-slate-700
        dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
        dark:focus:ring-slate-400 dark:focus:border-slate-400  shadow-inner w-full sm:w-1/2 "
          placeholder="Enter Coupon"
        />
        <button className="btn text-slate-50 bg-gray-800">Apply Coupon</button>
      </div>
    </div>
  );
}
