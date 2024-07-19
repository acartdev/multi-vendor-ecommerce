import Link from "next/link";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";
import { Circle, CircleDot } from "lucide-react";

export default function PriceFilter({ slug }) {
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort");
  const currentMin = searchParams.get("min");
  const currentMax = searchParams.get("max");
  const router = useRouter();
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    setValue("min", currentMin ? parseInt(currentMin) : "");
    setValue("max", currentMax ? parseInt(currentMax) : "");
  }, [currentMin, currentMax, setValue]);

  const onSubmit = (data) => {
    const { min, max } = data;
    const minQuery = min ? `&min=${min}` : "";
    const maxQuery = max ? `&max=${max}` : "";
    const sortQuery = sort ? `&sort=${sort}` : "";

    if (min < 0 || max < 0 || (min === "" && max === "")) {
      router.push(`/category/${slug}?${sortQuery}`);
    }
    router.push(`/category/${slug}?${sortQuery}${minQuery}${maxQuery}`);
  };

  const handleReset = () => {
    reset();
    router.push(`/category/${slug}`);
  };

  const priceRanges = [
    {
      display: "Under 300",
      max: 300,
    },
    {
      display: "Between 300 and 400",
      min: 300,
      max: 400,
    },
    {
      display: "Above 700",
      min: 700,
    },
  ];

  return (
      <div className="">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-xl">Price Filters</h2>
          <button
            onClick={handleReset}
            className="btn btn-sm  h-full   join-item"
          >
            Reset
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 py-4 text-sm">
          {priceRanges.map((range, i) => {
            const minQuery = range.min ? `&min=${range.min}` : "";
            const maxQuery = range.max ? `&max=${range.max}` : "";
            const sortQuery = sort ? `&sort=${sort}` : "";
            const isActive =
              (range.min ? currentMin == range.min : !currentMin) &&
              (range.max ? currentMax == range.max : !currentMax);
            return (
              <Link
                key={i}
                href={`/category/${slug}?${sortQuery}${minQuery}${maxQuery}`}
                className="flex items-center gap-1 transition-all"
              >
                {isActive ? (
                  <CircleDot className="text-blue-600 w-5 h-5" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
                <div className={isActive ? "text-blue-600 font-semibold" : ""}>
                  {range.display}
                </div>
              </Link>
            );
          })}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col w-full gap-1">
            <div className="join w-full text-white">
              <input
                className="input input-xs w-full h-full join-item placeholder-slate-300 border-r-2 border-r-slate-500 dark:border-r-slate-950"
                type="number"
                placeholder="Min"
                min="0"
                {...register("min", { validate: (value) => value >= 0 })}
              />
              <input
                className="input input-xs w-full h-full join-item placeholder-slate-300"
                type="number"
                placeholder="Max"
                min="0"
                {...register("max", { validate: (value) => value >= 0 })}
              />
            </div>
            <button type="submit" className={`btn btn-sm h-full join-item  `}>
              Filter
            </button>
          </div>
        </form>
      </div>
  );
}
