import { Layers } from "lucide-react";
import React from "react";

export default function LargeCard({ data }) {
  const { period, sales, color, icon: Icon } = data;
  return (
    <div
      className={` rounded-lg text-white shadow-md p-8 flex items-center flex-col gap-2 ${color} opacity-90 dark:opacity-100`}
    >
      <Icon />
      <h4>{period}</h4>
      <h2 className=" text-2xl lg:text-3xl">฿.{sales}</h2>
    </div>
  );
}
