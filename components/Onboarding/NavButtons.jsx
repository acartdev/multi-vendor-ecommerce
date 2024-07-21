import { setCurrentStep } from "@/redux/slices/onboardingSlice";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function NavButtons() {
  const dispatch = useDispatch();
  const currentStep = useSelector((store)=>store.onboarding.currentStep);
  const handlePrevious = () => {
    // update the currentStep
    dispatch(setCurrentStep(currentStep - 1));
  };
  return (
    <div
      className={`flex items-center w-full sm:col-span-2 mt-4 ${
        currentStep > 1 ? "justify-between" : "justify-end"
      } `}
    >
      {currentStep > 1 && (
        <button type="button" className="btn" onClick={handlePrevious}>
          <ChevronLeft />
          <span className=" uppercase">Previous</span>
        </button>
      )}
      <button type="submit" className="btn">
        <span className=" uppercase">Next</span>
        <ChevronRight />
      </button>
    </div>
  );
}
