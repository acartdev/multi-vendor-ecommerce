import React from "react";
import { Download, Search, Trash2 } from "lucide-react";


export default function TableActions() {
  return (
    <div className="flex justify-between items-center py-6 px-8 bg-white dark:bg-slate-700 rounded-lg gap-8 mt-12 shadow-md">
      <button className="inline-flex justify-center  p-0.5  items-center transition-all ease-in duration-75 relative  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
        <div className="inline-flex items-center space-x-3 relative px-5 py-3  bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 shadow-inner">
          <Download />
          <span>Export</span>
        </div>
      </button>
      {/* Search */}
      <div className="flex-grow  ">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <Search className="w-4 h-4 text-gray-500 dark:text-gray-400 " />
          </div>
          <input
            type="text"
            id="table-search"
            className="block py-3  ps-10 text-sm text-gray-900 border-2 border-gray-300
          rounded-lg  bg-white focus:ring-green-700 focus:border-green-700
          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
          dark:focus:ring-green-500 dark:focus:border-green-500 w-full shadow-inner"
            placeholder="Search for items"
          />
        </div>
      </div>
      {/* Delete */}
      <button
        className=" flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4
  focus:outline-none focus:ring-red-300 font-medium rounded-lg px-5 py-3 text-center transition-all ease-in duration-75
  dark:focus:ring-red me-2 text-sm space-x-3 shadow-md"
      >
        <Trash2 />
        <span>Bulk Delete</span>
      </button>
    </div>
  );
}
