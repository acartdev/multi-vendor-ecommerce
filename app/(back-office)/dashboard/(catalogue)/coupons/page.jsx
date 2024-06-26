import PageHeader from "@/components/backoffice/PageHeader";
import DataTable from "@/components/data-table-components/DataTable";
import React from "react";
import { columns } from "./columns";
import { getData } from "@/lib/getData";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const Coupons = async () => {
  const allCoupons = await getData("coupons");
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  const id = session?.user?.id;
  const role = session?.user?.role;
  const farmerCoupons = allCoupons.filter((coupon) => coupon.vendorId === id);
  return (
    <div className="mt-8">
      {/* Header */}
      <PageHeader
        heading="Coupons"
        linkTitle="Add Coupons"
        href="/dashboard/coupons/new"
      />
      <div className="py-8">
        {" "}
        {role === "ADMIN" ? (
          <DataTable data={allCoupons} columns={columns} />
        ) : (
          <DataTable data={farmerCoupons} columns={columns} />
        )}
      </div>
    </div>
  );
};

export default Coupons;
