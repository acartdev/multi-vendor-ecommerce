"use client";
import TextInput from "@/components/FormInputs/TextInput";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import NavButtons from "../NavButtons";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  updateCheckoutFormData,
} from "@/redux/slices/checkoutSlice";
import { useSession } from "next-auth/react";

export default function PersonalDetailsForm() {
  const dispatch = useDispatch();
  const currentStep = useSelector((store) => store.checkout.currentStep);

  const exitingFormData = useSelector(
    (store) => store.checkout.checkoutFormData
  );
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

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
    data.userId = userId;
    // update the checkout data
    dispatch(updateCheckoutFormData(data));
    // update the currentStep
    dispatch(setCurrentStep(currentStep + 1));
  };
  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className=" text-xl font-semibold mb-4">Personal Details</h2>

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
          label="Email Address"
          name="email"
          type="email"
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
        <NavButtons />
      </div>
    </form>
  );
}
