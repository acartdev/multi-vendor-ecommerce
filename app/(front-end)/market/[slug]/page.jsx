"use client";
import Breadcrumb from "@/components/frontend/Breadcrumb";
import CategoryList from "@/components/frontend/CategoryList";
import { getData } from "@/lib/getData";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function page({ params: { slug } }) {
  const categoriesData = await getData("categories");
  const categories = categoriesData.filter(
    (category) => category.products && category.products.length > 0
  );
  const market = await getData(`markets/details/${slug}`);
  const marketCategoryIds = market.categoryIds;

  const marketCategories = categories.filter((category) =>
    marketCategoryIds.includes(category.id)
  );

  return (
    <>
      <Breadcrumb />
      <div className="">
        <div className="grid grid-cols-12 gap-6 w-full">
          <div className="col-span-full lg:block p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-slate-700  rounded-md ">
            <div className="flex items-center ">
              <Image
                width={50}
                height={50}
                alt=""
                src={market.logoUrl}
                className="w-20 h-20 rounded-full object-cover border border-gray-300 dark:border-slate-700"
              />
            <div className="pl-4">
              <h2 className=" text-sm sm:text-2xl">{market.title}</h2>
              <p className=" text-sm line-clamp-2">{market.description}</p>
            </div>
            </div>
            <div className="text-sm sm:grid">
              {/* <Link href="#" className="py-2">
                Category1
              </Link>
              <Link href="#" className="py-2">
                Category1
              </Link>
              <Link href="#" className="py-2">
                Category1
              </Link> */}
            </div>
          </div>
          <div className="col-span-full  lg:block space-y-6">
            {marketCategories.map((category, i) => {
              return (
                <div className="" key={i}>
                  <CategoryList category={category} isMarketPage={false} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
