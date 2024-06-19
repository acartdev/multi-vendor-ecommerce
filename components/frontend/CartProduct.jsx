"use client";
import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import {
  decrementQty,
  incrementQty,
  removeFromCart,
} from "@/redux/slices/cartSlice";

export default function CartProduct({ cartItem }) {
  const dispatch = useDispatch();

  const handleDelete = (cartId) => {
    dispatch(removeFromCart(cartId));
  };
  const handleIncrementQty = (cartId) => {
    dispatch(incrementQty(cartId));
  };
  const handleDecrement = (cartId) => {
    dispatch(decrementQty(cartId));
  };
  return (
    <div
      className="flex items-center justify-between border-b
border-gray-400 dark:border-slate-700 pb-3 font-semibold text-sm mb-4"
    >
      <div className="flex items-center gap-3">
        <Image
          src={cartItem.imageUrl}
          width={100}
          height={100}
          alt="123"
          className="rounded-xl w-20 h-20"
        />
        <div className="flex flex-col ">
          <h2 className=" font-bold">{cartItem.title}</h2>
        </div>
      </div>

      <div className="flex gap-x-3 items-center rounded-xl border px-4 py-1  border-gray-400 dark:border-gray-400 ">
        <button
          onClick={() => handleDecrement(cartItem.id)}
          className=" border-r  border-gray-400 dark:border-gray-400"
        >
          <Minus className="w-5 h-5 mr-2" />
        </button>
        <p className=" flex-grow">{cartItem.qty}</p>
        <button className=" border-l border-gray-400 dark:border-gray-400">
          <Plus
            onClick={() => handleIncrementQty(cartItem.id)}
            className="w-5 h-5 ml-2"
          />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <h4>{cartItem.salePrice.toLocaleString()} ฿</h4>
        <button onClick={() => handleDelete(cartItem.id)}>
          <Trash2 className="text-red-500  w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
