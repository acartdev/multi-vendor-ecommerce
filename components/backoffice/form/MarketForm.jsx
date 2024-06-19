"use client";
import ImageInput from "@/components/FormInputs/ImageInput";
import SelectInput from "@/components/FormInputs/SelectInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextAreaInput from "@/components/FormInputs/TextArealInput";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function MarketsForm({ categories, updateData = {} }) {
  const id = updateData?.id ?? "";
  const initialImageUrl = updateData?.logoUrl ?? "";
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [loading, setLoading] = useState(false);

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
    router.push("/dashboard/markets");
    router.refresh();
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.logoUrl = imageUrl;
    console.log(data);
    if (id) {
      makePutRequest(
        setLoading,
        `api/markets/${id}`,
        data,
        "Markets",
        reset,
        redirect
      );
    } else {
      makePostRequest(
        setLoading,
        "api/markets",
        data,
        "Markets",
        reset,
        redirect
      );
    }
    setImageUrl("");
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border rounded-lg shadow-md
      sm:p-6 md:p-8 dark:bg-slate-700  mx-auto "
    >
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
        <TextInput
          label="Market Title"
          name="title"
          register={register}
          errors={errors}
          className="w-full"
        />
        <SelectInput
          label="Select Categories"
          name="categoryIds"
          register={register}
          errors={errors}
          className="w-full"
          options={categories}
          multiple={true}
        />
        <ImageInput
          label="Market Logo"
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="marketsLogoUploader"
        />
        <TextAreaInput
          label="Market Description"
          name="description"
          register={register}
          errors={errors}
        />
        <ToggleInput
          label="Market Status"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />

        <SubmitButton
          isLoading={loading}
          buttonTitle={id ? "Update Market" : "Create Market"}
          LoadingButtonTitle={
            id
              ? "Update Market please wait..."
              : "Create Market please wait..."
          }
        />
      </div>
    </form>
  );
}
