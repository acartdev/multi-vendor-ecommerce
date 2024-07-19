import FilterComponent from "@/components/frontend/Filter/FilterComponent";
import { getData } from "@/lib/getData";
import React from "react";
export default async function page({ params: { slug }, searchParams }) {
  const decodedSlug = decodeURIComponent(slug);
  const { sort, min, max, page } = searchParams;
  const category = await getData(`categories/filter/${decodedSlug}`); 
  let products;
  let url = `products?category=${category.id}`;
  if (page) {
    url += `&page=${page || 1}`;
  }
  if (sort) {
    url += `&sort=${sort}`;
  }
  if (min && max) {
    url += `&min=${min}&max=${max}`;
  } else if (min) {
    url += `&min=${min}`;
  } else if (max) {
    url += `&max=${max}`;
  }

  products = await getData(url);
  return (
    <div>
      <FilterComponent
        category={category}
        products={products}
        slug={slug}
        sort={sort}
        min={min}
        max={max}
      />
    </div>
  );
}
