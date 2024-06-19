"use client";
// import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SubmitButton from "../FormInputs/SubmitButton";
import TextInput from "../FormInputs/TextInput";

export default function RegisterForm({ role = "USER" }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  async function onSubmit(data) {
    try {
      console.log(data);
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log(responseData);
        setEmailErr("");
        setLoading(false);
        toast.success("User Created Successfully");
        reset();
        // router.push("/login");
        // const userRole = responseData.data.role
        // if(userRole)
        if (role === "USER") {
          router.push("/");
        } else {
          router.push(`/verify-email`);
        }
      } else {
        setLoading(false);
        if (response.status === 409) {
          setEmailErr("User with this Email already exists");
          toast.error("User with this Email already exists");
        } else {
          // Handle other errors
          console.error("Server Error:", responseData.error);
          toast.error("Oops Something Went wrong");
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Network Error:", error);
      toast.error("Something Went wrong, Please Try Again");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <TextInput
        label=""
        name="role"
        type="hidden"
        register={register}
        errors={errors}
        defaultValue={role}
        className="sm:col-span-2 mb-3"
      />
      <TextInput
        label="Full Name"
        name="name"
        register={register}
        errors={errors}
        className="sm:col-span-2 mb-3"
      />

      <TextInput
        label="Email Address"
        name="email"
        register={register}
        errors={errors}
        type="email"
        className="sm:col-span-2 mb-3"
      />
      <TextInput
        label="Password"
        name="password"
        register={register}
        errors={errors}
        type="password"
        className="sm:col-span-2 mb-3"
      />
      {emailErr && (
        <div className="text-sm text-red-600 dark:text-red-400 -mt-3 mb-2">
          {emailErr}
        </div>
      )}
      <div className="w-full">
        <SubmitButton
          isLoading={loading}
          buttonTitle="Register"
          LoadingButtonTitle="Creating please wait..."
          className="w-full justify-center"
        />
      </div>

      <div className="flex items-center ">
        <div className="w-full bg-slate-500 h-[1px]"></div>
        <span className="mx-2">or</span>
        <div className="w-full bg-slate-500 h-[1px]"></div>
      </div>

      <div className="flex gap-2 justify-center sm:justify-between">
        <p className="  text-[0.75rem] font-light text-gray-500 dark:text-gray-400">
          Already have an Account?{" "}
          <Link
            href="/login"
            className="font-medium text-purple-600 hover:underline dark:text-purple-500"
          >
            Login
          </Link>
        </p>
        <p className="text-[0.75rem] font-light text-gray-500 dark:text-gray-400">
          Already have an {role === "USER" ? "Farmer?" : "User?" } {" "}
          <Link
            href={role === "USER" ? "/register-farmer" : "register"}
            className="font-medium text-purple-600 hover:underline dark:text-purple-500"
          >
            Register 
          </Link>
        </p>
      </div>
    </form>
  );
}
