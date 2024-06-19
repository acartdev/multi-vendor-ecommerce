import FormHeader from "@/components/backoffice/FormHeader";
import MarketsForm from "@/components/backoffice/form/MarketForm";
import { getData } from "@/lib/getData";
import React from "react";

export default async function UpdateMarket({ params: { id } }) {
  const market = await getData(`markets/${id}`);
  const categoriesData = await getData("categories");

  const categories = categoriesData.map((category) => {
    return {
      id: category.id,
      title: category.title,
    };
  });
  return (
    <div>
      <FormHeader title="New Markets" />
      <MarketsForm categories={categories} updateData={market}/>
    </div>
  );
}
