import { getData } from "@/lib/getData";
import React from "react";
import Product from "../Product";
import Paginate from "./Pageinate";

export default async function FilteredProducts({
  products = [],
  productCount,
}) {
  const pageSize = 4;
  const totalPages = Math.ceil(productCount / pageSize);

  return (
    <div className="">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products &&
          products.map((product, i) => {
            return <Product product={product} key={i} />;
          })}{" "}
      </div>
      <div className="flex items-center justify-center w-full mx-auto">
        <Paginate totalPages={totalPages} />
      </div>
    </div>
  );
}
