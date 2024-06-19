import React from "react";
import Heading from "./Heading";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function PageHeader({ heading, linkTitle, href }) {
  return (
    <div className="flex justify-between ">
      <Heading title={heading} />
      <Link
        className="text-white bg-green-500 hover:bg-green-600 focus:ring-4
      focus:outline-none focus:ring-green-300 font-medium rounded-lg px-5 py-3 text-centerฃ
      inline-flex items-center dark:focus:ring-green 55 me-2 text-sm space-x-3 transition-all ease-in duration-75 shadow-md"
        href={href}
      >
        <Plus />
        <span>{linkTitle}</span>
      </Link>
    </div>
  );
}
