"use client";
import TextInput from "@/components/FormInputs/TextInput";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import NavButtons from "../NavButtons";
import { Circle, Truck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  updateCheckoutFormData,
} from "@/redux/slices/checkoutSlice";

export default function ShippingDetailsForm() {
  const dispatch = useDispatch();
  const currentStep = useSelector((store) => store.checkout.currentStep);
  const exitingFormData = useSelector((store) => store.checkout.checkoutFormData);
  const initialShippingCost = exitingFormData.shippingCost || ""
  
  const [shippingCost, setShippingCost] = useState(initialShippingCost);
    
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { ...exitingFormData } });

  const processData = (data) => {
    data.shippingCost = shippingCost;
    // console.log(data);

    // update the checkout data
    dispatch(updateCheckoutFormData(data));
    // update the currentStep
    dispatch(setCurrentStep(currentStep + 1));
  };
  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className=" text-xl font-semibold mb-4">Shipping Details</h2>

      <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
        <TextInput
          label="Street Address"
          name="streetAddress"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="City"
          name="city"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Country"
          name="country"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="District"
          name="district"
          register={register}
          errors={errors}
          className="w-full"
        />

        {/* Shipping Cost */}

        <div className=" sm:col-span-2">
          <h2 className=" text-xl font-semibold mb-4">
            Shipping Detailssdsdsds
          </h2>
          <ul className="grid w-full gap-6 md:grid-cols-2">
            <li>
              <input
                onChange={(e) => setShippingCost(e.target.value)}
                type="radio"
                id="hosting-small"
                name="hosting"
                value="8.0"
                className="hidden peer"
                required
              />
              <label
                htmlFor="hosting-small"
                className="inline-flex items-center justify-between w-full p-5 text-gray-400 peer-checked:border-2 peer-checked:font-bold bg-white border border-gray-300 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-white dark:peer-checked:border-white peer-checked:border-gray-600 peer-checked:text-gray-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                {/* Design */}
                <div className="flex items-center gap-4">
                  <Truck className="w-7 h-7 ms-3 rtl:rotate-180" />
                  <div className="">
                    <p>UPS</p>
                    <p>Delivery Cost: 8 ฿</p>
                  </div>
                </div>
                <Circle className="w-7 h-7 ms-3 " />
              </label>
            </li>
            <li>
              <input
                onChange={(e) => setShippingCost(e.target.value)}
                type="radio"
                id="hosting-big"
                name="hosting"
                value="20.0"
                className="hidden peer"
                required
              />
              <label
                htmlFor="hosting-big"
                className="inline-flex items-center justify-between w-full p-5 text-gray-400 peer-checked:border-2 peer-checked:font-bold bg-white border border-gray-300 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-white dark:peer-checked:border-white peer-checked:border-gray-600 peer-checked:text-gray-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="flex items-center gap-4">
                  <Truck className="w-7 h-7 ms-3 rtl:rotate-180" />
                  <div className="">
                    <p>UPS</p>
                    <p>Delivery Cost: 20 ฿</p>
                  </div>
                </div>
                <Circle className="w-7 h-7 ms-3 " />
              </label>
            </li>
          </ul>
        </div>
      </div>
      <NavButtons />
    </form>
  );
}
