import React from "react";
import LargeCard from "./LargeCard";
import { CalendarCheck, CalendarClock, CalendarDays, Layers } from "lucide-react";

export default function LargeCards() {
  const orderState = [
    {
      period: "Today Orders",
      sales: 110000,
      color: "bg-green-600",
      icon: CalendarCheck

    },
    {
      period: "Yesterday Orders",
      sales: 130000,
      color: "bg-blue-600",
      icon: CalendarClock

    },
    {
      period: "This Month",
      sales: 3000000,
      color: "bg-orange-600",
      icon: CalendarDays

    },
    {
      period: "All-Time Sales",
      sales: 5000000,
      color: "bg-purple-600",
      icon: Layers

    },
  ];
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2
      md:grid-cols-3 lg:grid-cols-4 gap-4 py-8"
    >
      {

        orderState.map((item,i)=>(
          <LargeCard key={i} className=" bg-green-600" data={item} />
        ))
      }

    </div>
  );
}
