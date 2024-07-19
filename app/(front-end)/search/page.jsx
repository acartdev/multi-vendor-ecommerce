import FilterComponent from "@/components/frontend/Filter/FilterComponent";
import { getData } from "@/lib/getData";
import React from "react";

export default async function Search({ searchParams }) {
  const { q, page } = searchParams;

  let products;
  let url = `products?q=${q}`;
  if (page) {
    url += `&page=${page || 1}`;
  }
  products = await getData(url);
  const category = {
    title: q,
    slug: "",
    products,
    isSearch:true
  };
  return (
    <div>
      <FilterComponent
        category={category}
        products={products}
      />
    </div>
  );
}
