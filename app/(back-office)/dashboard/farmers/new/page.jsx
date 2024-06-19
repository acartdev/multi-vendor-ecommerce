"use client";
import FormHeader from "@/components/backoffice/FormHeader";
import FarmerForm from "@/components/backoffice/form/FarmerForm";

export default function NewFarmer() {
  return (
    <div>
      <FormHeader title="New Farmers" />
      <FarmerForm />
    </div>
  );
}
