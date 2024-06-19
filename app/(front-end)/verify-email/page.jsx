import { Info } from "lucide-react";
import React from "react";

export default function VerifyEmail() {
  return (
    <div className="max-w-2xl mx-auto min-h-screen px-8 mt-36">
      <div
        id="alert-additional-content-2"
        className="p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-900 dark:text-red-400 dark:border-red-800"
        role="alert"
      >
        <div className="flex items-center">
          <Info className="flex-shrink-0 w-4 h-4 me-2" />
          <span className="sr-only">Info</span>
          <h3 className="text-lg font-medium">
            Email Sent-Verify your account
          </h3>
        </div>
        <div className="mt-2 mb-4 text-sm">
          Thank you for creating creating an account with Us, we have sent you
          an email, check on the link to complete your on boarding process
        </div>
      </div>
    </div>
  );
}
