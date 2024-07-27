import Image from "next/image";
import Link from "next/link";
import React from "react";
import moment from "moment";
import "moment/locale/th";
import { MoveRight } from "lucide-react";
moment.locale("th");

export default function BlogCard({ training }) {
  const category = training.category;
  return (
    <div className="group shadow p-3 rounded-sm">
      <div className="relative">
        <div className="block overflow-hidden aspect-w-16 aspect-h-9 rounded-xl  ">
          <Image
            className="object-cover w-full h-[16rem] transition-all duration-200 transform group-hover:scale-110 "
            src={training.imageUrl}
            alt={training.title}
            width={200}
            height={200}
          />
        </div>
        <span className="absolute px-3 py-2 text-xs font-bold tracking-widest text-gray-900 uppercase bg-white rounded left-3 top-3">
          {category.title}
        </span>
      </div>
      <p className="mt-6 text-sm font-medium text-gray-500">
        {moment(training.createdAt).format("L")}
      </p>
      <p className="mt-4 text-xl font-bold leading-tight xl:pr-8">
        <Link href={`/blogs/${training.slug}`} className="line-clamp-2">
          {training.title}
        </Link>
      </p>
      <div className="mt-6">
        <Link
         href={`/blogs/${training.slug}`}
          className="inline-flex items-center pb-2 text-xs font-bold tracking-widest uppercase border-b border-gray-900 dark:border-gray-200 group"
        >
          Continue Reading
          <MoveRight className="w-4 h-4 ml-2 transition-all duration-200 transform group-hover:translate-x-2" />
        </Link>
      </div>
    </div>
  );
}
