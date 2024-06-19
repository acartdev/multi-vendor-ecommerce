import Link from "next/link";
import React from "react";

export default function CartSubTotalCard({subTotal}) {
  const snipping = 0;
  const tax = 0;
  const totalPrice = subTotal + snipping + tax;
  return (
    <div
      className=" col-span-full sm:col-span-4 bg-white border border-gray-500 rounded-lg
 dark:bg-gray-800 dark:border-gray-500 overflow-hidden p-5  font-bold"
    >
      <h2 className=" text-2xl font-bold py-3">Cart Total</h2>

      <div className="flex items-center justify-between border-b border-gray-500 dark:border-gray-400 pb-4">
        <h2>Subtotal</h2>
        <span>{subTotal.toLocaleString()} ฿</span>
      </div>

      <div className="flex items-center justify-between py-4">
        <h2>Tax</h2>
        <span>{tax.toLocaleString()} ฿</span>
      </div>

      <div className="flex items-center justify-between pb-4">
        <h2>Sipping</h2>
        <span>{snipping.toLocaleString()} ฿</span>
      </div>
      <p className="text-gray-500 dark:text-gray-400 font-normal border-b border-gray-500 dark:border-gray-400 pb-4">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit
        reiciendis quaerat adipisci molestiae blanditiis labore ipsum, incidunt
        recusandae, asperiores non vitae aut veritatis nemo consequatur earum
        explicabo enim animi porro.
      </p>

      <div className="flex items-center justify-between py-4 ">
        <h2>Total</h2>
        <span>{totalPrice.toLocaleString()} ฿</span>
      </div>
      <Link
        href="/checkout"
        className="btn w-full bg-gray-950 hover:bg-gray-800 text-slate-50 dark:text-gray-950 dark:bg-gray-100 dark:hover:bg-gray-400"
      >
        Continue to Checkout
      </Link>
    </div>
  );
}
