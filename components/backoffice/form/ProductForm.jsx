"use client";
import ArrayItemsInput from "@/components/FormInputs/ArrayItemsInput";
import MultipleImageInput from "@/components/FormInputs/MultipleImageInput";
import SelectInput from "@/components/FormInputs/SelectInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextAreaInput from "@/components/FormInputs/TextArealInput";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import { generateUserCode } from "@/lib/generateUserCode";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function ProductForm({ categories, farmers, updateData = {} }) {
  const id = updateData?.id ?? "";
  const initialImage = updateData?.imageUrl ?? "";
  const initialTags = updateData?.tags ?? [];
  // const [imageUrl, setImageUrl] = useState(initialImage);
  const [imagesUrl, setImagesUrl] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState(initialTags);

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isActive: true,
      isWholeSale: false,
      ...updateData,
    },
  });

  const isActive = watch("isActive");
  const isWholeSale = watch("isWholeSale");

  const router = useRouter();
  const redirect = () => {
    router.push("/dashboard/products");
    router.refresh();
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const slug = generateSlug(data.title);
    data.slug = slug;
    const productCode = generateUserCode("LLP", data.title);
    data.productCode = productCode;
    data.imagesUrl = imagesUrl; 
    data.tags = tags;
    data.qty = 1;
    console.log(data);


    if (id) {
      makePutRequest(
        setLoading,
        `api/products/${id}`,
        data,
        "Product",
        reset,
        redirect
      );
    } else {
      makePostRequest(
        setLoading,
        "api/products",
        data,
        "Product",
        reset,
        redirect
      );
    }
    setImagesUrl("");
    setTags([]);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border rounded-lg shadow-md
        sm:p-6 md:p-8 dark:bg-slate-700  mx-auto "
    >
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
        <TextInput
          label="Product Title"
          name="title"
          register={register}
          errors={errors}
        />
        <TextInput
          label="Product SKU"
          name="sku"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Product Barcode"
          name="barcode"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Product Price (Before Discount)"
          name="productPrice"
          type="number"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Product Sale Price (Discounted)"
          name="salePrice"
          type="number"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Product Stock"
          name="productStock"
          type="number"
          register={register}
          errors={errors}
          className="w-full"
        />

        <TextInput
          label="Unit of Measurement(eg kilograms)"
          name="unit"
          register={register}
          errors={errors}
          className="w-full"
        />
        <SelectInput
          label="Select Category"
          name="categoryId"
          register={register}
          errors={errors}
          className="w-full"
          options={categories}
        />
        <SelectInput
          label="Select Farmer"
          name="farmerId"
          register={register}
          errors={errors}
          className="w-full"
          options={farmers}
        />
        <ToggleInput
          label="Support Wholesale Selling"
          name="isWholeSale"
          trueTitle="Supported"
          falseTitle="Not Supported"
          register={register}
        />
        {isWholeSale && (
          <>
            <TextInput
              label="Wholesale Price"
              name="wholesalePrice"
              type="number"
              register={register}
              errors={errors}
              className="w-full"
            />
            <TextInput
              label="Minimum Whole Qty"
              name="wholesaleQty"
              type="number"
              register={register}
              errors={errors}
              className="w-full"
            />
          </>
        )}
        <MultipleImageInput
          label="Product Images"
          imagesUrl={imagesUrl}
          setImagesUrl={setImagesUrl}
          endpoint="multipleProductImageUploader"
        />
        {/* Tags */}
        <ArrayItemsInput items={tags} setItems={setTags} itemTitle="Tag" />
        <TextAreaInput
          label="Product Description"
          name="description"
          register={register}
          errors={errors}
        />
        <ToggleInput
          label="Product Status"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />
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
