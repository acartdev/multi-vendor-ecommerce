import { getData } from "@/lib/getData";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function SidebarCategories() {
    const categories = await getData("categories");
  return (
    <div
      className="sm:col-span-3 hidden sm:block bg-white border border-gray-300 rounded-lg
       dark:bg-gray-800 dark:border-gray-700 overflow-hidden "
    >
      <h2
        className=" py-4 px-6 bg-gray-100  dark:bg-gray-800
        font-semibold border-b border-gray-300 dark:border-slate-700 "
      >
        Shop By Category ({categories.length})
      </h2>
      <div className=" py-4 px-6 space-y-4 h-[300px] overflow-y-auto flex flex-col gap-2 w-full">
        {categories.map((category, i) => {
          return (
            <Link
              key={i}
              href={category.slug}
              className=" flex items-center gap-3 rounded-full hover:bg-slate-100
                hover:dark:bg-slate-600 transition-all duration-300 "
            >
              <Image
                src={category.imageUrl}
                width={600}
                height={400}
                alt={category.title}
                className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-slate-900"
              />
              <span className=" line-clamp-1">{category.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
