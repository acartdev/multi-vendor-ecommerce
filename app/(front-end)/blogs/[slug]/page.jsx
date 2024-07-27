import RecentTrainings from "@/components/frontend/RecentTrainings";
import { getData } from "@/lib/getData";
import Image from "next/image";
import React from "react";
import Link from "next/link";

import moment from "moment";
import "moment/locale/th";
import TrainingHtml from "@/components/frontend/TrainingHtml";
moment.locale("th");

export default async function page({ params: { slug } }) {
  const training = await getData(`trainings/training/${slug}`);
  const trainingId = training.id;
  const allTrainings = await getData("trainings");
  const filteredTrainings = allTrainings.filter(
    (training) => training.id !== trainingId
  );

  return (
    <section className="px-4">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-7 lg:gap-x-12">
          <div className="bg-gray-100 lg:col-span-5 rounded-xl p-6">
            <div className="mx-auto">
              <p className="text-base font-medium text-gray-500">
                {moment(training.createdAt).format("L")}
              </p>
              <h1 className="my-4 text-4xl font-bold text-gray-900 sm:text-5xl">
                {training.title}
              </h1>
            </div>

            <Link
              href={training.imageUrl}
              className="mt-3 sm:mt-6 aspect-w-16 aspect-h-9 lg:aspect-h-6"
            >
              <Image
                className="object-cover w-full h-[30rem] rounded-sm"
                width={200}
                height={200}
                src={training.imageUrl}
                alt={training.title}
              />
            </Link>
            <div className=" py-4  border-b border-gray-700">
              {training.description}
            </div>
            <TrainingHtml content={training.content} />
          </div>
            <RecentTrainings resentTraining={filteredTrainings.slice(0,10)} />
        </div>
      </div>
    </section>
  );
}
