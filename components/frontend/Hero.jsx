import Image from "next/image";
import Link from "next/link";
import React from "react";
import HeroCarousel from "./HeroCarousel";
import { CircleDollarSign, FolderSync, HelpCircle } from "lucide-react";
import { getData } from "@/lib/getData";
import SidebarCategories from "./SidebarCategories";

export default async function Hero() {
  const banners = await getData("banners");

  return (
    <div className="grid grid-cols-12 gap-8 px-8 lg:px-0">
      <SidebarCategories />

      <div className="col-span-full sm:col-span-9 lg:col-span-7 rounded-md ">
        <HeroCarousel banners={banners} />
      </div>

      <div className="lg:col-span-2 hidden lg:block p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-slate-700  rounded-md ">
        <Link href="#" className="flex items-center space-x-1 mb-3">
          <HelpCircle className=" shrink-0 w-5 h-5" />
          <div className="flex flex-col">
            <h2 className=" uppercase text-sm"> Help Center</h2>
            <p className="text-[0.6rem]">Guide to customer Care</p>
          </div>
        </Link>
        <Link href="#" className="flex items-center space-x-1 mb-3">
          <FolderSync className=" shrink-0 w-5 h-5" />
          <div className="flex flex-col ">
            <h2 className=" uppercase text-sm"> Easy Return</h2>
            <p className="text-[0.6rem]">Quick Return</p>
          </div>
        </Link>
        <Link href="#" className="flex items-center space-x-1 mb-4">
          <CircleDollarSign className=" shrink-0 w-5 h-5" />
          <div className="flex flex-col ">
            <h2 className=" uppercase text-sm"> Sell on UDVC</h2>
            <p className="text-[0.6rem]">Million of Vistors</p>
          </div>
        </Link>

        <div className=" space-y-4">
          <Image
            alt="giff"
            width={160}
            height={160}
            src="https://fakeimg.pl/250x250"
            className=" object-cover rounded-md"
          />
          <Image
            alt="160"
            width={250}
            height={160}
            src="https://fakeimg.pl/250x250"
            className=" object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  );
}
