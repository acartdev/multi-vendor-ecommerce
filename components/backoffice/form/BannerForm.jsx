"use client";
import ImageInput from "@/components/FormInputs/ImageInput";
import SelectInput from "@/components/FormInputs/SelectInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextArealInput";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import FormHeader from "@/components/backoffice/FormHeader";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function BannersForm({ updateData = {} }) {
  const initialImageUrl = updateData?.imageUrl ?? "";
  const id = updateData?.id ?? "";

  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [loading, setLoading] = useState(false);
  1;
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
    router.push("/dashboard/banners");
    router.refresh();
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl;
    if (id) {
      makePutRequest(
        setLoading,
        `api/banners/${id}`,
        data,
        "Banners",
        reset,
        redirect
      );
    } else {
      makePostRequest(
        setLoading,
        "api/banners",
        data,
        "Banners",
        reset,
        redirect
      );
      setImageUrl("");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border rounded-lg shadow-md
      sm:p-6 md:p-8 dark:bg-slate-700  mx-auto "
    >
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
        <TextInput
          label="Banners Title"
          name="title"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Banners Link"
          name="link"
          type="url"
          register={register}
          errors={errors}
          className="w-full"
        />
        <ImageInput
          label="Banners Image"
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="bannersImageUploader"
        />
        <ToggleInput
          label="Banners Status"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />

        <SubmitButton
          isLoading={loading}
          buttonTitle={id ? "Update Banner" : "Create Banner"}
          LoadingButtonTitle={
            id
              ? "Update Banner please wait..."
              : "Create Banner please wait..."
          }
        />
      </div>
    </form>
  );
}
