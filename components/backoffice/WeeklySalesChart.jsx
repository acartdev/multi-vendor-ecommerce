"use client";
import React, { useState } from "react";

import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
// tab[0].type
export default function WeeklySalesChart() {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const tab = [
    {
      title: "Sales",
      type: "sales",
      data: {
        labels,
        datasets: [
          {
            label: "Sale",
            data: labels.map(() =>
              faker.datatype.number({ min: -1000, max: 1000 })
            ),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      },
    },
    {
      title: "Orders",
      type: "orders",
      data: {
        labels,
        datasets: [
          {
            label: "Orders",
            data: labels.map(() =>
              faker.datatype.number({ min: -1000, max: 1000 })
            ),
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      },
    },
  ];
  const [chartToDisplay, setChartToDisplay] = useState(tab[0].type);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
    },
  };

  return (
    <div className=" bg-slate-50 dark:bg-slate-700 p-8 rounded-md shadow-md ">
      <h2 className=" text-slate-700 dark:text-slate-100 md:text-xl font-bold mb-4">Best Selling Products Chart</h2>
      {/* Chart */}
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-200 dark:border-gray-200">
        <ul className="flex flex-wrap -mb-px">
          {tab.map((tab, i) => (
            <li key={i} className="me-2">
              <button
                className={
                  chartToDisplay == tab.type
                    ? "inline-block p-4 text-orange-500 border-b-2 border-orange-500 rounded-t-lg active dark:text-orange-500 dark:border-orange-500"
                    : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-slate-600 dark:hover:text-gray-50"
                }
                onClick={() => setChartToDisplay(tab.type)}
              >
                {tab.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {tab.map((tab, i) => {
        if (chartToDisplay === tab.type) {
          return <Line key={i} options={options} data={tab.data} />;
        }
        return null;
      })}
    </div>
  );
}
