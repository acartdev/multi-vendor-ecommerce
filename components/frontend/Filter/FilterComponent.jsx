import React from "react";
import Breadcrumb from "./Breadcrumb";
import Sorting from "./Sorting";
import Filters from "./Filters";
import FilteredProducts from "./FilteredProducts";

export default function FilterComponent({
  category,
  products,
  sort,
  min,
  max,
}) {
  const { title, slug } = category;
  const productCount = category.products.length;
  return (
    <div>
      <div className="py-8 px-4  ">
        <Breadcrumb title={title} resultCount={productCount} />
        <Sorting
          title={title}
          slug={slug}
          sort={sort}
          min={min}
          max={max}
          isSearch={category.isSearch}
        />
      </div>
      <div className="grid grid-cols-12 gap-8 ">
        <div className="sm:col-span-3 ">
          <Filters slug={slug} sort={sort} />
        </div>
        <div className="col-span-12 sm:col-span-9">
          <FilteredProducts products={products} productCount={productCount} />
        </div>
      </div>
    </div>
  );
}
