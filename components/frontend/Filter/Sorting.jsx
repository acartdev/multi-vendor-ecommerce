"use client";
import React from "react";
import Link from "next/link";

export default function Sorting({ title, slug, sort, min, max, isSearch }) {
  const sortingLinks = [
    {
      title: "Relevance",
      href: `/category/${slug}`,
      sort: undefined,
    },
    {
      title: "Price - High to Low",
      href: `/category/${slug}`,
      sort: "desc",
    },
    {
      title: "Price - Low to High",
      href: `/category/${slug}`,
      sort: "asc",
    },
  ];

  const generateSortQuery = (sort) => {
    return sort ? `&sort=${sort}` : "";
  };

  const generatePriceQuery = (min, max) => {
    let query = "";
    if (min) query += `&min=${min}`;
    if (max) query += `&max=${max}`;
    return query;
  };

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold">{isSearch && "Search Result - "} {title}</h2>
      <div className="flex items-center gap-3 text-sm">
        <p className="font-bold">Sort by :</p>
        <div className="flex">
          {sortingLinks.map((link, i) => {
            const isActive =
              link.sort === sort ||
              (sort === undefined && link.sort === undefined);
            const sortQuery = generateSortQuery(link.sort);
            const priceQuery = generatePriceQuery(min, max);

            return (
              <Link
                key={i}
                href={`${link.href}?${sortQuery}${priceQuery}`}
                className={`btn btn-xs sm:btn-sm rounded-none ${
                  isActive ? "text-white " : "btn-outline "
                }`}
              >
                {link.title}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
