"use client"
import React from "react";
import PersonalDetailsForm from "./StepForm/PersonalDetailsForm";
import ShippingDetailsForm from "./StepForm/ShippingDetailsForm";
import PaymentMethodForm from "./StepForm/PaymentMethodForm";
import OrderSummaryForm from "./StepForm/OrderSummaryForm";
import { useSelector } from "react-redux";

export default function StepForm() {
  const currentStep = useSelector((store)=>store.checkout.currentStep);
  const renderFormByStep = (step) => {
    if (step === 1) {
      return <PersonalDetailsForm/>;
    } else if (step === 2) {
      return <ShippingDetailsForm/>;
    } else if (step === 3) {
      return <PaymentMethodForm/>;
    } else if (step === 4) {
      return <OrderSummaryForm/>;
    }
  };

  return <div>{renderFormByStep(currentStep)}</div>;
}
