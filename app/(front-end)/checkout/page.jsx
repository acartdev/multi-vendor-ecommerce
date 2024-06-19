import CartBanner from "@/components/Checkout/CartBanner";
import StepForm from "@/components/Checkout/StepForm";
import Steps from "@/components/Checkout/Steps";
import React from "react";

export default function Checkout() {
  const steps = [
    {
      number: 1,
      title: "Personal Details",
    },
    {
      number: 2,
      title: "Shipping Details",
    },
    {
      number: 3,
      title: "Payment Method",
    },
    {
      number: 4,
      title: "Order Summary",
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
          {/* Banner */}
          <CartBanner />
          {/* FORM */}
          <StepForm />
        </div>
      </div>
    </div>
  );
}
