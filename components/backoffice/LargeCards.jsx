import React from "react";
import LargeCard from "./LargeCard";
import {
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  Layers,
} from "lucide-react";
import { calculateSalesForRange } from "@/lib/calculateSalesForRange";

export default function LargeCards({ sales }) {
  const totalSales = sales
    .reduce((total, item) => total + item.total, 0)
    .toLocaleString();
  const todaySales = calculateSalesForRange(sales, "today").toLocaleString();
  const weeklySales = calculateSalesForRange(sales, "week").toLocaleString();
  const monthlySales = calculateSalesForRange(sales, "month").toLocaleString();

  const orderState = [
    {
      period: "Today Orders",
      sales: todaySales,
      color: "bg-green-600",
      icon: CalendarCheck,
    },
    {
      period: "Week Orders",
      sales: weeklySales,
      color: "bg-blue-600",
      icon: CalendarClock,
    },
    {
      period: "Month Orders",
      sales: monthlySales,
      color: "bg-orange-600",
      icon: CalendarDays,
    },
    {
      period: "All-Time Sales",
      sales: totalSales,
      color: "bg-purple-600",
      icon: Layers,
    },
  ];
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2
      md:grid-cols-3 lg:grid-cols-4 gap-4 py-8"
    >
      {orderState.map((item, i) => (
        <LargeCard key={i} className=" bg-green-600" data={item} />
      ))}
    </div>
  );
}
