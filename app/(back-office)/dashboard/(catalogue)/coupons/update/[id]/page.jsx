import FormHeader from "@/components/backoffice/FormHeader";
import CouponsForm from "@/components/backoffice/form/CouponsForm";
import { getData } from "@/lib/getData";
import React from "react";

export default async function UpdateCoupons({ params: { id } }) {
  const coupon = await getData(`/coupons/${id}`);
  return (
    <div>
      <FormHeader title="Update Coupon" />
      <CouponsForm updateData={coupon} />
    </div>
  );
}
