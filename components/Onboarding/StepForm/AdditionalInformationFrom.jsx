"use client";
import TextInput from "@/components/FormInputs/TextInput";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import NavButtons from "../NavButtons";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep,
  updateOnboardingFormData,
} from "@/redux/slices/onboardingSlice";
import TextAreaInput from "@/components/FormInputs/TextArealInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";

export default function AdditionalInformationFrom() {
  const dispatch = useDispatch();
  const currentStep = useSelector((store) => store.onboarding.currentStep);
  const exitingFormData = useSelector((store) => store.onboarding.onboardingFormData);
  const initialImageUrl = exitingFormData.ImageUrl || "";
  const [ImageUrl, setImageUrl] = useState(initialImageUrl);
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { ...exitingFormData } });

  const processData = (data) => {
    data.ImageUrl = ImageUrl
    // console.log(data);
    
    // update the onboarding data
    dispatch(updateOnboardingFormData(data));
    // update the currentStep
    dispatch(setCurrentStep(currentStep + 1));
  };
  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className=" text-xl font-semibold mb-4">Additional information</h2>

      <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
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
          className="hidden"
        />

      </div>
      <NavButtons />
    </form>
  );
}
