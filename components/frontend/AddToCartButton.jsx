"use client";
import { addToCart } from "@/redux/slices/cartSlice";
import { ShoppingBag } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function AddToCartButton({product}) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Item added Successfully");
  };
  return (
    <button
      onClick={() => handleAddToCart()}
      className="btn btn-success btn-sm text-white  flex justify-center items-center "
    >
      <ShoppingBag className="w-5 h-5" />
      <span>Add to Cart</span>
    </button>
  );
}
