"use client";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextAreaInput from "@/components/FormInputs/TextArealInput";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import FormHeader from "@/components/backoffice/FormHeader";
import { makePostRequest } from "@/lib/apiRequest";
import { generateUserCode } from "@/lib/generateUserCode";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function NewStaff() {
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
    },
  });

  const isActive = watch("isActive");
  const router = useRouter();
  const redirect = () => {
    router.push("/dashboard/staffs");
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const code = generateUserCode("LSM", data.name);
    data.code = code;
    makePostRequest(setLoading, "api/staffs", data, "Staff", reset, redirect);
  };
  return (
    <div>
      <FormHeader title="New Staff" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border rounded-lg shadow-md
      sm:p-6 md:p-8 dark:bg-slate-700 mx-auto "
      >
        <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
          <TextInput
            label="Staff Full Name"
            name="name"
            register={register}
            errors={errors}
          />
          <TextInput
            label="NIN (Id Number)"
            name="nin"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Date of Birth"
            name="dob"
            type="date"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Password"
            name="password"
            type="password"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Staff's Email address"
            name="email"
            type="email"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Staff's Phone"
            name="phone"
            type="tel"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Staff's Physical Address"
            name="physicalAddress"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextAreaInput
            label="Notes"
            name="notes"
            register={register}
            errors={errors}
            isRequired={false}
          />

          <SubmitButton
            isLoading={loading}
            buttonTitle="Create Staff"
            LoadingButtonTitle="Create Staff please wait..."
          />
        </div>
      </form>
    </div>
  );
}
