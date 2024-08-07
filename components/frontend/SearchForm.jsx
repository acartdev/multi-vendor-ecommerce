import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

export default function SearchForm() {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();
  const handleSearch = (data) => {
    const { search } = data; 
    reset()
    router.push(`/search?q=${search}`);
  };
  return (
    <form onSubmit={handleSubmit(handleSearch)} className="flex items-center w-full max-w-xs sm:max-w-sm lg:max-w-lg  ">
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Search className="w-4 h-4 text-slate-300" />
        </div>
        <input
          {...register("search")}
          type="text"
          id="simple-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Products..."
        />
      </div>
      <button
        type="submit"
        className="p-2.5 ms-2 text-sm font-medium text-white bg-slate-800 rounded-lg border hover:bg-slate-900 focus:ring-4 focus:outline-none focus:ring-blue-300
          dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-blue-800"
      >
        <Search className="w-4 h-4" />
        <span className="sr-only">Search</span>
      </button>
    </form>
  );
}
