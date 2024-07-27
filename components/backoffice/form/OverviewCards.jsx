"use client";
import { Box, Coins, Wallet } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import SlotCounter from "react-slot-counter";

export default function OverviewCards({ sales, products }) {
  const productsCount = products.length.toLocaleString().padStart(2, "0") || 0;
  const salesCount = sales.length.toLocaleString().padStart(2, "0") || 0;
  const totalSales =
    sales
      .reduce((total, item) => total + item.total, 0)
      .toLocaleString()
      .padStart(2, "0") || 0;

  const analytics = [
    {
      title: "Products",
      count: productsCount,
      link: "dashboard/products",
      icon: <Box className="w-14 h-14" />,
    },
    {
      title: "Sales",
      count: salesCount,
      link: "/dashboard/sales",
      icon: <Coins className="w-14 h-14" />,
    },
    {
      title: "Total Revenue",
      count: totalSales,
      link: "/dashboard/sales",
      icon: <Wallet className="w-14 h-14" />,
    },
  ];

  return (
    <section className="text-gray-700 body-font">
      <div className="container px-5 mx-auto">
        <div className="flex flex-wrap text-center">
          {analytics.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className="p-4 md:w-1/4 sm:w-1/2 w-full "
            >
              <div
                className={`group border-2 border-gray-600 px-4 py-4 rounded-lg transition duration-300 hover:scale-105 hover:border-gray-400 dark:hover:border-white cursor-pointer`}
              >
                <div
                  className={`inline-block mb-1 duration-300  group-hover:text-gray-400 group-hover:dark:text-gray-400" 
                  `}
                >
                  {item.icon}
                </div>
                <div className=" group-hover:font-semibold text-3xl">
                  {" "}
                  <SlotCounter
                    value={item.count}
                    startValue="0000"
                    valueClassName={` group-hover:-translate-y-1 group-hover:text-gray-700 group-hover:dark:text-white title-font dark:text-gray-500 duration-300 `}
                  ></SlotCounter>
                </div>
                <p
                  className={`title-font font-medium text-xl leading-relaxed duration-300 group-hover:text-gray-400
                  `}
                >
                  {item.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
