import Link from "next/link";
import React from "react";
import CategoryCarousel from "./CategoryCarousel";

export default function CategoryList({ category, isMarketPage }) {
  return (
    <div
      className=" p-4 bg-white border border-gray-300 rounded-lg
  dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
    >
      <div
        className=" py-2 px-6 mb-6 dark:bg-gray-800
      font-semibold border-b border-gray-300 dark:border-slate-700
      flex justify-between items-center"
      >
        <h2>{category.title}</h2>
        <Link href={`category/${category.slug}`} className="btn text-slate-50">
          See All
        </Link>
      </div>
      <CategoryCarousel
        products={category.products}
        isMarketPage={isMarketPage}
      />
    </div>
  );
}
