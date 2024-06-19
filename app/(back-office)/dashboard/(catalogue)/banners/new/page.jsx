import FormHeader from "@/components/backoffice/FormHeader";
import BannersForm from "@/components/backoffice/form/BannerForm";
import React from "react";

export default function NewBanner() {
  return (
    <div>
      <FormHeader title="New Banner" />
      <BannersForm />
    </div>
  );
}
