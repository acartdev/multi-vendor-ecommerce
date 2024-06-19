"use client";
import { ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export default function Steps({ steps }) {
  const currentStep = useSelector((store) => store.checkout.currentStep);
  return (
    <div>
      <nav className="flex text-sm mb-6">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <span
              className="font-medium text-gray-500 md:ms-2 dark:text-gray-400"
            >
              <span>Cart</span>
      
            </span>
          </li>
          {steps.map((step, i) => (
            <li key={i}>
              <div className="flex items-center">
                <ChevronRight className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" />
                <span
                  className={`ms-1 text-sm 
                  ${
                    step.number === currentStep
                      ? "font-bold text-black dark:text-white "
                      : "font-medium text-gray-500 md:ms-2 dark:text-gray-400"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
