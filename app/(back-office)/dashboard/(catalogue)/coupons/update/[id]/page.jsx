import FormHeader from "@/components/backoffice/FormHeader";
import CouponsForm from "@/components/backoffice/form/CouponsForm";
import { getData } from "@/lib/getData";
import React, { Suspense } from "react";
import Loading from "@/app/api/loading"; // นำเข้า Loading component

// คอมโพเนนต์สำหรับดึงข้อมูลคูปอง
const CouponData = async ({ id }) => {
  const coupon = await getData(`/coupons/${id}`);
  return <CouponsForm updateData={coupon} />;
};

export default function UpdateCoupons({ params: { id } }) {
  return (
    <div>
      <FormHeader title="Update Coupon" />
      <Suspense fallback={<Loading />}>
        <CouponData id={id} />
      </Suspense>
    </div>
  );
}