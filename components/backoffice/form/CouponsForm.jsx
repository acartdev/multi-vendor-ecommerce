"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { generateCouponCode } from "@/lib/generateCouponCode";
import { generateIsoFormattedDate } from "@/lib/generateIsoFormattedDate";
import { convertIsoDateToNormal } from "@/lib/convertIsoDateToNormal";

export default function CouponsForm({ updateData = {} }) {
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const vendorId = session?.user?.id;
  const expiryDateNormal = convertIsoDateToNormal(updateData.expiryDate);
  const id = updateData?.id ?? "";
  updateData.expiryDate = expiryDateNormal;

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isActive: true,
      ...updateData,
    },
  });

  const isActive = watch("isActive");
  const router = useRouter();

  const redirect = () => {
    router.push("/dashboard/coupons");
    router.refresh();
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const couponCode = generateCouponCode(data.title, data.expiryDate);
      const isoFormattedDate = generateIsoFormattedDate(data.expiryDate);
      data.vendorId = vendorId;
      data.couponCode = couponCode;
      data.expiryDate = isoFormattedDate;

      if (id) {
        await makePutRequest(
          `api/coupons/${id}`,
          data,
          "Coupons",
          reset,
          redirect
        );
      } else {
        await makePostRequest("api/coupons", data, "Coupons", reset, redirect);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error (e.g., show a notification)
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-slate-700 mx-auto"
    >
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
        <TextInput
          label="Coupons Title"
          name="title"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Coupons Expiry Date"
          name="expiryDate"
          type="date"
          register={register}
          errors={errors}
          className="w-full"
        />
        <ToggleInput
          label="Coupons Status"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />
        <SubmitButton
          isLoading={loading}
          buttonTitle={id ? "Update Coupons" : "Create Coupons"}
          LoadingButtonTitle={id ? "Updating..." : "Creating..."}
        />
      </div>
    </form>
  );
}
