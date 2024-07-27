import { authOptions } from "@/lib/authOptions";
import { getData } from "@/lib/getData";
import { getServerSession } from "next-auth";
import React from "react";
import OverviewCards from "./form/OverviewCards";
import VerifyEmail from "@/app/(front-end)/verify-email/page";

export default async function FarmerDashboard() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const { name, email, id, role, emailVerified, status = false } = user;
  const saleById = await getData(`sales/user/${id}`);
  const productsById = await getData(`products/user/${id}`);
  if (!status) {
    return <VerifyEmail />;
  }
  return (
    <div>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <OverviewCards sales={saleById} products={productsById} />
      </div>
    </div>
  );
}
