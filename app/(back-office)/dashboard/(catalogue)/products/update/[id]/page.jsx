// "use client";
import FormHeader from "@/components/backoffice/FormHeader";
import ProductForm from "@/components/backoffice/form/ProductForm";
import { getData } from "@/lib/getData";
import React from "react";

export default async function UpdateProduct({ params: { id }}) {
  const product = await getData(`products/${id}`)

  const categoriesData = await getData("categories");
  const userData = await getData("users");
  const farmersData = userData.filter((user) => user.role === "FARMER");

  const farmers = farmersData.map((farmer) => {
    return {
      id: farmer.id,
      title: farmer.name,
    };
  });

  const categories = categoriesData.map((category) => {
    return {
      id: category.id,
      title: category.title,
    };
  });
  return (
    <div>
      <FormHeader title="Update Product" />
      <ProductForm categories={categories} farmers={farmers} updateData={product} />{" "}
    </div>
  );
}
