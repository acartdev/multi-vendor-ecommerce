import Image from "next/image";
import React from "react";
import moment from "moment";
import "moment/locale/th";
import Link from "next/link";
moment.locale("th");

export default function RecentTrainings({ resentTraining }) {
  return (
    <div className="col-span-2">
      <div className="sm:sticky sm:top-3 w-full">
      <p className="text-xl font-bold text-gray-900">Recent Training</p>
      <div className="mt-6 space-y-5">
        {resentTraining.map((training, i) => {
          return (
            <Link href={`/blogs/${training.slug}`}  key={i}>
              <div
                className=" overflow-hidden transition-all duration-200  border border-gray-200 rounded-lg hover:shadow-lg hover:bg-gray-50 hover:-translate-y-1"
              >
                <div className="p-4">
                  <div className="flex items-start lg:items-center ">
                    <Image
                      className="object-cover w-20 h-20 rounded-lg shrink-0"
                      src={training.imageUrl}
                      alt={training.title}
                      width={200}
                      height={200}
                    />
                    <div className="ml-5">
                      <p className="text-sm font-medium text-gray-900">
                        {moment(training.createdAt).format("L")}
                      </p>
                      <p className="text-lg leading-7 font-bold text-gray-900 mt-2.5">
                        <span className="line-clamp-2">{training.title}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      </div>
    </div>
  );
}
