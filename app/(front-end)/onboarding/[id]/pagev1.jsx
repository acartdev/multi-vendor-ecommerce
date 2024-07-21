import FarmerForm from "@/components/backoffice/form/FarmerForm";
import { getData } from "@/lib/getData";
import React from "react";

export default async function page({ params: { id } }) {
    const user = await getData(`users/${id}`)
  return (
    <div className="flex flex-col gap-6 px-16 ">
      <div className="max-w-4xl px-4 mx-auto ">
        <h2> Hello {user?.name}, Tell More About Yor self</h2>
      </div>
      <FarmerForm user={user} />
    </div>
  );
}
