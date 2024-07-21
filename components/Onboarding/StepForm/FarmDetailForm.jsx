"use client";
import TextInput from "@/components/FormInputs/TextInput";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import NavButtons from "../NavButtons";
import { Circle, Truck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  updateOnboardingFormData,
} from "@/redux/slices/onboardingSlice";
import ArrayItemsInput from "@/components/FormInputs/ArrayItemsInput";

export default function FarmDetailForm() {
  const dispatch = useDispatch();
  const currentStep = useSelector((store) => store.onboarding.currentStep);
  const exitingFormData = useSelector(
    (store) => store.onboarding.onboardingFormData
  );

  const initialProducts = exitingFormData.products || [];
  const [products, setProducts] = useState(initialProducts);
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { ...exitingFormData } });

  const processData = (data) => {
    data.products = products

    // update the onboarding data
    dispatch(updateOnboardingFormData(data));
    // update the currentStep
    dispatch(setCurrentStep(currentStep + 1));
  };
  console.log(exitingFormData);
  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className=" text-xl font-semibold mb-4">Farm Details</h2>

      <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
        <TextInput
          label="What is Siz ofLand in Accres"
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
        <ArrayItemsInput
          setItems={setProducts}
          items={products}
          itemTitle="Product"
        />
      </div>
      <NavButtons />
    </form>
  );
}
