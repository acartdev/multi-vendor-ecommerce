"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
export default function BestSellingProductsChart() {
  const data = {
    labels: ["Green Lettuce", "Watermelon", "Broccoli", "Maize"],
    datasets: [
      {
        label: "# of Votes",
        data: [50, 10, 20, 20],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
        ],
        borderColor: [
          "rgba(255, 255, 255, 255)",

        ],
        borderWidth: 4,
      },
    ],
  };
  return (
    <div className="  bg-slate-50 dark:bg-slate-700 p-8 rounded-md  shadow-md w-full  ">
      <h2 className="text-slate-700 dark:text-slate-100 md:text-xl font-bold mb-4 ">BestSelling Products Chart</h2>
      {/* Chart */}
      <div className="sm:h-[92%] flex justify-center">

      <Pie data={data} className="sm:p-10"/>
      </div>
    </div>
  );
}
