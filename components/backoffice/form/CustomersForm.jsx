"use client";
import ImageInput from "@/components/FormInputs/ImageInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextInput from "@/components/FormInputs/TextInput";
import { makePutRequest } from "@/lib/apiRequest";
import { generateIsoFormattedDate } from "@/lib/generateIsoFormattedDate";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function CustomersForm({ user, userProfile }) {
  const [ImageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const id = user.id
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...userProfile, //เอาค่าเดิมมากระจายใส่ข้อมูลใน form
    },
  });


  const router = useRouter();
  const redirect = () => {
    router.push("/dashboard/customers");
    router.refresh();
  };
  const dateOfBirth = watch("dateOfBirth");

  const onSubmit = async (data) => {
    setLoading(true);
    const expiryDateNormal = generateIsoFormattedDate(dateOfBirth); 
    data.userId = id;
    data.dateOfBirth = expiryDateNormal;
    data.profileImage = ImageUrl;

    makePutRequest(
      setLoading,
      `api/customers/${userProfile.id}`,
      data,
      "Customer Profile",
      reset,
      redirect
    );
    setImageUrl("");

  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border rounded-lg shadow-md
      sm:p-6 md:p-8 dark:bg-slate-700 mx-auto "
    >
      <h2 className=" text-xl font-semibold text-slate-700 dark:text-white mb-4">
        Personal Details
      </h2>

      <div className="sm:col-span-2">
        <div className="grid gap-2  sm:grid-cols-2 sm:gap-4 border-b border-slate-400 dark:border-gray-500 pb-8 ">
          <TextInput
            label="Full Name"
            name="name"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Username"
            name="username"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="First Name"
            name="firstName"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Last Name"
            name="lastName"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Email Address"
            name="emailAddress"
            type="email"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Phone Number"
            name="phoneNumber"
            register={register}
            errors={errors}
            className="w-full"
          />
          <ImageInput
            label="Customer Profile Image "
            imageUrl={ImageUrl}
            setImageUrl={setImageUrl}
            endpoint="CustomerProfileUploader"
          />
        </div>
        {/* Shipping Cost */}

        <h2 className=" text-xl font-semibold my-6">Shipping Detailssdsdsds</h2>
        <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
          <TextInput
            label="Street Address"
            name="streetAddress"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="City"
            name="city"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Country"
            name="country"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="District"
            name="district"
            register={register}
            errors={errors}
            className="w-full"
          />
        </div>
      </div>
      <SubmitButton
        isLoading={loading}
        buttonTitle={id ? "Update Product" : "Create Product"}
        LoadingButtonTitle={
          id ? "Update Product please wait..." : "Create Product please wait..."
        }
      />
    </form>
  );
}
