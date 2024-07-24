"use client";
import TextInput from "@/components/FormInputs/TextInput";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import NavButtons from "../NavButtons";
import { useDispatch, useSelector } from "react-redux";

import {
  setCurrentStep,
  updateOnboardingFormData,
} from "@/redux/slices/onboardingSlice";
import { getData } from "@/lib/getData";
import toast from "react-hot-toast";

export default function BasicInformationForm({ farmerId }) {
  const dispatch = useDispatch();
  const currentStep = useSelector((store) => store.onboarding.currentStep);
  const [user, setUser] = useState([]);
  let email = user?.email ;
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    try {
      const userResponse = await getData(`users/${farmerId}`);
      if (userResponse.status === 500) {
        console.error("ID ของคุณไม่ถูกต้อง");
        toast.error("ID ของคุณไม่ถูกต้อง");
        return;
      }
      setUser(userResponse)
      reset({ ...exitingFormData, email:email }); 
    } catch (error) {
      console.error("ID ของคุณไม่ถูกต้อง", error);
      toast.error("ID ของคุณไม่ถูกต้อง");
    }
  };
  const exitingFormData = useSelector(
    (store) => store.onboarding.onboardingFormData
  );
  console.log(exitingFormData);

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
          label="Email Farmer"
          name="email"
          register={register}
          errors={errors}
          defaultValue={email}
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
