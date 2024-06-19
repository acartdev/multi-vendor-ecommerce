import FormHeader from "@/components/backoffice/FormHeader";
import MarketsForm from "@/components/backoffice/form/MarketForm";
import { getData } from "@/lib/getData";
import React from "react";

export default async function NewMarket() {
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
      <MarketsForm categories={categories} />
    </div>
  );
}
