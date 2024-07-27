"use client";
import React from "react";
import TrainingCarousel from "./TrainingCarousel";
import Link from "next/link";
import BlogCard from "./BlogCard";
import { usePathname, useRouter } from "next/navigation";
import { Undo2 } from "lucide-react";

export default function CommunityTrainings({ trainings = [],title }) {
  const path = usePathname();
  const router = useRouter();

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-9 max-w-7xl">
        <div className="">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold  sm:text-4xl">
             {title}
            </h2>
            {path === "/blogs" ? (
              <span onClick={() => router.back()} className="btn text-slate-50">
                <Undo2 />
              </span>
            ) : (
              <Link href="/blogs" className="btn text-slate-50">
                See All
              </Link>
            )}
          </div>
          <p className="mt-5 text-base font-normal leading-7 text-gray-500 ">
            Create custom landing pages with Rareblocks that converts more
            visitors than any website.
          </p>
        </div>

        <div className="grid max-w-md grid-cols-1 mx-auto mt-12 sm:mt-16 md:grid-cols-3 gap-y-12 md:gap-x-8 lg:gap-x-16 md:max-w-none">
          {trainings &&
            trainings.map((item, i) => {
              return <BlogCard key={i} training={item} />;
            })}
        </div>
      </div>
    </section>
  );
}
