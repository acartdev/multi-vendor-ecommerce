import React from "react";

export default function SmallCard({ data }) {
  const { title, number, iconBg, icon:Icon } = data;
  return (
    <div className={` rounded-lg bg-slate-50 dark:bg-slate-700 shadow-md py-6 px-4`}>
      <div className="flex space-x-4">
        <div
          className={`w-12 h-12 ${iconBg}
          rounded-full flex items-center justify-center opacity-70 dark:opacity-100`}
        >
          <Icon  />
        </div>
        <div className="text-slate-600 dark:text-slate-100">
          <p>{title}</p>
          <h3 className="text-2xl font-bold">{number}</h3>
        </div>
      </div>
    </div>
  );
}
