import CartBanner from "@/components/Checkout/CartBanner";
import StepForm from "@/components/Onboarding/StepForm";
import Steps from "@/components/Onboarding/Steps";

import React from "react";

export default function page({ params: { id } }) {
  const steps = [
    {
      number: 1,
      title: "Basic information",
    },
    {
      number: 2,
      title: "Farm Details",
    },
    {
      number: 3,
      title: "Additional information",
    },
    {
      number: 4,
      title: "Summary",
    },
  ];
  return (
    <div className="min-h-screen ">
      <div
        className="max-w-3xl p-6 my-6 mx-auto bg-slate-50 shadow-md border border-gray-300 rounded-lg
      dark:bg-gray-900 dark:border-gray-500   "
      >
        {/* STEPS */}
        <Steps steps={steps} />
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          {/* FORM */}
          <StepForm farmerId={id}/>
        </div>
      </div>
    </div>
  );
}
