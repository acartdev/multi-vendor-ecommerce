"use client";
import ImageInput from "@/components/FormInputs/ImageInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextAreaInput from "@/components/FormInputs/TextArealInput";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function CategoryForm({ updateData = {} }) {
  const initialImageUrl = updateData?.imageUrl ?? "";
  const id = updateData?.id ?? "";

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
    router.push("/dashboard/categories");
    router.refresh()
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl;

    if (id) {
      makePutRequest(
        setLoading,
        `api/categories/${id}`,
        data,
        "Category",
        reset,
        redirect
      );
    } else {
      makePostRequest(
        setLoading,
        "api/categories",
        data,
        "Category",
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
          label="Category Title"
          name="title"
          register={register}
          errors={errors}
        />

        <TextAreaInput
          label="Category Description"
          name="description"
          register={register}
          errors={errors}
        />
        <ImageInput
          label="Category Image"
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="categoryImageUploader"
        />
        <ToggleInput
          label="Category Status"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />

        <SubmitButton
          isLoading={loading}
          buttonTitle={id ? "Update Category" : "Create Category"}
          LoadingButtonTitle={
            id
              ? "Update Category please wait..."
              : "Create Category please wait..."
          }
        />
      </div>
    </form>
  );
}
