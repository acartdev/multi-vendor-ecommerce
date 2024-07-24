"use client";
import React from "react";

import { useSelector } from "react-redux";
import BasicInformationForm from "./StepForm/BasicInformationForm";
import FarmDetailForm from "./StepForm/FarmDetailForm";
import Summary from "./StepForm/Summary";
import AdditionalInformationFrom from "./StepForm/AdditionalInformationFrom";

export default function StepForm({ farmerId }) {
  const currentStep = useSelector((store) => store.onboarding.currentStep);
  const renderFormByStep = (step) => {
    if (step === 1) {
      return <BasicInformationForm farmerId={farmerId} />;
    } else if (step === 2) {
      return <FarmDetailForm />;
    } else if (step === 3) {
      return <AdditionalInformationFrom />;
    } else if (step === 4) {
      return <Summary farmerId={farmerId} />;
    }
  };

  return <div>{renderFormByStep(currentStep)}</div>;
}
