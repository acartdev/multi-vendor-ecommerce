"use client";
import ArrayItemsInput from "@/components/FormInputs/ArrayItemsInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextAreaInput from "@/components/FormInputs/TextArealInput";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import { makePostRequest } from "@/lib/apiRequest";
import { generateUserCode } from "@/lib/generateUserCode";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function FarmerForm({ user }) {
  const [ImageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isActive: true,
      ...user, //เอาค่าเดิมมากระจายใส่ข้อมูลใน form
    },
  });

  const isActive = watch("isActive");

  const router = useRouter();
  const redirect = () => {
    router.push("/login");
    router.refresh()
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const code = generateUserCode("LFF", data.name);
    data.code = code;
    data.userId = user.id
    data.products = products
    data.profileImageUrl = ImageUrl

    makePostRequest(
      setLoading,
      "api/farmers",
      data,
      "Farmers Profile",
      reset,
      redirect
    );
    setImageUrl("")
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border rounded-lg shadow-md
      sm:p-6 md:p-8 dark:bg-slate-700 mx-auto "
    >
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">

        <TextInput
          label="Farmer's Full Name"
          name="name"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Farmer's Phone"
          name="phone"
          type="tel"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Farmer's Email address"
          name="email"
          type="email"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Farmer's Physical Address"
          name="physicalAddress"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Farmer's Contact Person"
          name="contactPerson"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Farmer's Contact Person Phone"
          name="contactPersonPhone"
          type="tel"
          register={register}
          errors={errors}
          className="w-full"
        />
        {/* Accare */}
        <TextInput
          label="What is the Siz of Your Land in Accres"
          name="landSize"
          type="number"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="What is your main Crop that you Culivate "
          name="mainCrop"
          register={register}
          errors={errors}
          className="w-full"
        />
        <ArrayItemsInput setItems={setProducts} items={products} itemTitle="Product" />
        <ImageInput
          label="Farmer Profile Image "
          imageUrl={ImageUrl}
          setImageUrl={setImageUrl}
          endpoint="farmerProfileUploader"
        />
        <TextAreaInput
          label="Farmer's Payment Terms"
          name="terms"
          register={register}
          errors={errors}
          isRequired={false}
        />
        <TextAreaInput
          label="Notes"
          name="notes"
          register={register}
          errors={errors}
          isRequired={false}
        />
        <ToggleInput
          label="Farmers Status"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />

        <SubmitButton
          isLoading={loading}
          buttonTitle="Create Farmers"
          LoadingButtonTitle="Create Farmers please wait..."
        />
      </div>
    </form>
  );
}
