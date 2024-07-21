"use client";
import TextInput from "@/components/FormInputs/TextInput";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import NavButtons from "../NavButtons";
import { useDispatch, useSelector } from "react-redux";

import { useSession } from "next-auth/react";
import {
  setCurrentStep,
  updateOnboardingFormData,
} from "@/redux/slices/onboardingSlice";

export default function BasicInformationForm() {
  const dispatch = useDispatch();
  const currentStep = useSelector((store) => store.onboarding.currentStep);

  const exitingFormData = useSelector(
    (store) => store.onboarding.onboardingFormData
  );
  // const { data: session, status } = useSession();
  // const userId = session?.user?.id;

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...exitingFormData },
  });

  const processData = (data) => {
    // console.log(data);
    // if (userId) {
    //   data.userId = userId;
      // update the onboarding data
      dispatch(updateOnboardingFormData(data));
      // update the currentStep
      dispatch(setCurrentStep(currentStep + 1));
    // }
  };
  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className=" text-xl font-semibold mb-4">Basic information</h2>

      <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
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
          label="Phone Number"
          name="phone"
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
        <NavButtons />
      </div>
    </form>
  );
}
