import FormHeader from "@/components/backoffice/FormHeader";
import TrainingForm from "@/components/backoffice/form/TrainingForm";
import { getData } from "@/lib/getData";
import React from "react";

export default async function UpdateTraining({ params: { id } }) {
  const Training = await getData(`trainings/${id}`);
  const categoriesData = await getData("categories");

  const categories = categoriesData.map((category) => {
    return {
      id: category.id,
      title: category.title,
    };
  });
  return (
    <div>
      <FormHeader title="Update Training" />
      <TrainingForm categories={categories} updateData={Training} />
    </div>
  );
}
