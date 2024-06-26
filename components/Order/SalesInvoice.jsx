"use client";

import Image from "next/image";
import React, { useRef } from "react";
import logo from "../../public/logo.png";
import moment from "moment";
import "moment/locale/th";
import { useReactToPrint } from "react-to-print";
moment.locale("th");

export default function SalesInvoice({ order }) {
  const subTotal = order?.orderItems.reduce((total, currentItem) => {
    return total + currentItem.price * currentItem.quantity;
  }, 0);

  const invoiceRef = useRef();
  
  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });
  return (
    <div className="flex flex-col">
      {/* Download */}
      <div className="flex sm:items-end sm:justify-end ">
        <button
          onClick={handlePrint}
          type="button"
          className=" inline-flex items-center justify-center w-full sm:w-auto  px-4 py-3 text-xs font-bold  transition-all duration-200 bg-black text-white dark:bg-gray-100 dark:text-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-400 dark:hover:bg-gray-400"
        >
          Download/Print
        </button>
      </div>

      {/* Invoice */}
      <div ref={invoiceRef}  >
        <div className="mt-10 sm:max-w-2xl lg:max-w-4xl mx-auto border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 border-gray-500 p-8 rounded-sm ">
          {/* Header */}
          <div className="flex justify-between border-b border-gray-500 pb-8">
            <div className="flex flex-col ">
              <h2>Bill From:</h2>
              <p>Shoppify Hardware Store</p>
              <p>150 Eleign Street</p>
              <p>Canada</p>
              <p>shopiifystore@gmail.com</p>
            </div>
            <Image src={logo} alt="logo" className="w-24 h-16" />
          </div>
          {/* Header End */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between border-b border-gray-500 py-8">
            <div className="flex flex-col ">
              <h2>Bill To:</h2>
              <p>
                {order.firstName} {order.lastName}
              </p>
              <p>{order.streetAddress}</p>
              <p>{order.city}</p>
              <p>{order.emailAddress}</p>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <p>Invoice </p>
                <p>#{order.orderNumber}</p>
              </div>
              <div className="flex justify-between gap-5">
                <p>Invoice Date</p>
                <p>{moment(order.createdAt).format("L")}</p>
              </div>
              <div className="flex justify-between">
                <p>Amount Due</p>
                <p>{subTotal.toLocaleString()} ฿</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-x-auto ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Item
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Item Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Unit Cost
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Line Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems.map((item, i) => {
                  return (
                    <tr
                      key={i}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.title}
                      </th>
                      <td className="px-6 py-4">Silver</td>
                      <td className="px-6 py-4">
                        {item.quantity.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        {item.price.toLocaleString()} ฿
                      </td>
                      <td className="px-6 py-4">
                        {(item.quantity * item.price).toLocaleString()} ฿
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between border-b border-gray-500 py-8">
            <div className="flex flex-col">
              <h2>NOTES</h2>
              <p>Free Shipping for 30 Days Money back guarantee</p>
            </div>
            <div className="flex flex-col">
              <div className="flex  gap-5 justify-between">
                <p>SubTotal</p>
                <p>{subTotal.toLocaleString()} ฿</p>
              </div>
              <div className="flex  gap-5  justify-between">
                <p>Tax</p>
                <p>0 ฿</p>
              </div>
              <div className="flex  gap-5 justify-between">
                <p>Total</p>
                <p>{subTotal.toLocaleString()} ฿</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center pt-8">
            <Image src={logo} alt="logo" className="w-24 h-16" />
          </div>
        </div>
      </div>
    </div>
  );
}
