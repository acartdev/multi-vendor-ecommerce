"use client";
import TextInput from "@/components/FormInputs/TextInput";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import NavButtons from "../NavButtons";
import { Circle, CircleDollarSign, CreditCard, HeartHandshake, Truck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep, updateCheckoutFormData } from "@/redux/slices/checkoutSlice";

export default function PaymentMethodForm() {
  const dispatch = useDispatch();
  const currentStep = useSelector((store) => store.checkout.currentStep);
  const exitingFormData = useSelector((store) => store.checkout.checkoutFormData);
  
  const [paymentMethod,setPaymentMethod] = useState("")
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { ...exitingFormData } });



  const processData = (data) => {
    data.paymentMethod = paymentMethod
    // console.log(data);
    
    // update the checkout data
    dispatch(updateCheckoutFormData(data));
    // update the currentStep
    dispatch(setCurrentStep(currentStep + 1));
  };
  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className=" text-xl font-semibold mb-4">Payment Method</h2>

      <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">

        {/* Payment Method Cost */}

        <div className=" sm:col-span-2">
          <h2 className=" text-lg font-medium mb-4">
            Which Payment Method do You Prefer ?
          </h2>
          <ul className="grid w-full gap-6 md:grid-cols-2">
            <li>
              <input
                onChange={(e)=>setPaymentMethod(e.target.value)}
                type="radio"
                id="hosting-small"
                name="hosting"
                value="Cash on Delivery"
                className="hidden peer"
                required
              />
              <label
                htmlFor="hosting-small"
                className="inline-flex items-center justify-between w-full p-5 text-gray-400 peer-checked:border-2 peer-checked:font-bold bg-white border border-gray-300 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-white dark:peer-checked:border-white peer-checked:border-gray-600 peer-checked:text-gray-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                {/* Design */}
                <div className="flex items-center gap-4">
                  <CircleDollarSign className="w-7 h-7 ms-3 rtl:rotate-180" />
                  <div className="">
                    <p>Cash on Delivery</p>
                  </div>
                </div>
                <Circle className="w-7 h-7 ms-3 " />
              </label>
        
            </li>
            <li>
              <input
                onChange={(e)=>setPaymentMethod(e.target.value)}
                type="radio"
                id="hosting-big"
                name="hosting"
                value="Credit Card"
                className="hidden peer"
                required

              />
              <label
                htmlFor="hosting-big"
                className="inline-flex items-center justify-between w-full p-5 text-gray-400 peer-checked:border-2 peer-checked:font-bold bg-white border border-gray-300 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-white dark:peer-checked:border-white peer-checked:border-gray-600 peer-checked:text-gray-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="flex items-center gap-4">
                  <CreditCard className="w-7 h-7 ms-3 rtl:rotate-180" />
                  <div className="">
                    <p>Credit Card</p>
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
