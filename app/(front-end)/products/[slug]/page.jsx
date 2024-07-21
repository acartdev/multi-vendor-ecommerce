import CategoryCarousel from "@/components/frontend/CategoryCarousel";
// import Breadcrumb from "@/components/frontend/breadcrumb";
import { getData } from "@/lib/getData";
import { Minus, Plus, Send, Share2, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";
import AddToCartButton from "@/components/frontend/AddToCartButton";

const NoSSRBreadcrumb = dynamic(
  () => import("@/components/frontend/breadcrumb"),
  { ssr: false }
);
export default async function ProductDetailPage({ params: { slug } }) {
  const product = await getData(`products/product/${slug}`);
  const { id } = product;
  const categoryId = product.categoryId;
  const category = await getData(`categories/${categoryId}`);
  const categoryProducts = category.products;
  const products = categoryProducts.filter((product) => product.id !== id);
  return (
    <div>
      <NoSSRBreadcrumb />
      <div className="grid grid-cols-12 gap-8 my-6">
        <div className=" col-span-3">
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={566}
            height={566}
            className="w-full rounded-sm"
          />
        </div>

        <div className=" col-span-6">
          <div className=" flex justify-between items-center">
            <h2 className="text-xl lg:text-3xl font-semibold">
              {product.title}
            </h2>
            <button>
              <Share2 />
            </button>
          </div>
          <div className=" border-b border-gray-500">
            <p className=" py-2">{product.description}</p>
            <div className="flex items-center gap-4 mb-4">
              <p>SKU: {product.sku}</p>
              <p
                className=" bg-green-300 text-sm py-1 px-3 rounded-full
            text-slate-900 shadow-sm "
              >
                <b>Stock:</b> {product.qty}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 py-4 border-b border-gray-500">
            <div className="flex items-center gap-4">
              <h4 className=" text-2xl font-semibold">
                {product.productPrice.toLocaleString()}฿
              </h4>
              <del className=" text-slate-400 text-sm">
                {product.salePrice.toLocaleString()}฿
              </del>
            </div>
            <div className="flex items-center">
              <Tag className="w-4 h-4 text-slate-950 dark:text-slate-400 me-2" />
              <span className="text-sm">Save 50% right now</span>
            </div>
          </div>

          <div className="flex justify-between items-center py-4">
            {/* <div className="flex gap-x-3 items-center rounded-xl border px-4 py-1  border-gray-500 dark:border-gray-400 ">
              <button className=" border-r  border-gray-500 dark:border-gray-400">
                <Minus className="w-5 h-5 mr-2" />
              </button>
              <p className=" flex-grow">1</p>
              <button className=" border-l border-gray-500 dark:border-gray-400">
                <Plus className="w-5 h-5 ml-2" />
              </button>
            </div> */}
            <AddToCartButton product={product} />
            <p>Something Here</p>
          </div>
 
        </div>

        <div
          className=" col-span-3 hidden sm:block bg-white border border-gray-300 rounded-lg
       dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
        >
          <h2
            className=" py-4 px-6 bg-gray-100  dark:bg-gray-800
        font-semibold border-b border-gray-300 dark:border-slate-700 "
          >
            DELIVERY & RETURNS
          </h2>

          <div className="px-6 py-4">
            <div className="flex btn  text-white border-none bg-orange-500 hover:bg-orange-600 dark:bg-orange-400 dark:hover:bg-orange-500">
              <span> Product Express </span>
              <Send />
            </div>
            <div className="py-3 text-sm  border-b border-gray-300 dark:border-slate-700">
              Eligible for Free Delivery.
              <Link href="#"> View Detail</Link>
            </div>
            <h2 className="text-slate-400 py-2">Choose your Location</h2>

            <div className=" pb-3">
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-400 focus:border-orange-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-400 dark:focus:border-orange-400"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </select>
            </div>
            <div className=" pb-3">
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-400 focus:border-orange-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-400 dark:focus:border-orange-400"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </select>
            </div>
            <div className=" pb-3">
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-400 focus:border-orange-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-400 dark:focus:border-orange-400"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div
        className=" bg-white border border-gray-300 rounded-lg
      dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
      >
        {products && products.length > 0 && (
          <>
            <h2 className="m-4 text-xl font-semibold">Similar Products</h2>
            <CategoryCarousel products={products} />
          </>
        )}
      </div>
    </div>
  );
}
