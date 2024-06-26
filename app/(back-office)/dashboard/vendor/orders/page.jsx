import PageHeader from "@/components/backoffice/PageHeader";
import DataTable from "@/components/data-table-components/DataTable";
import React from "react";
import { columns } from "./columns";
import { getData } from "@/lib/getData";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const Coupons = async () => {
  const allSales = await getData("sales");
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }

  // Fetch all the Sale
  // Filter by venderId => to get sale for this vendor
  // Fetch Order by Id
  // Customer Name ,email ,phone ,OrderNumber 

  const id = session?.user?.id;
  const role = session?.user?.role;
  const farmerSales = allSales.filter((sale) => sale.vendorId === id);
  return (
    <div className="mt-8">
      {/* Header */}
      {/* <PageHeader
        heading="Coupons"
        linkTitle="Add Coupons"
        href="/dashboard/coupons/new"
      /> */}
      <div className="py-8">
        {" "}
        {role === "ADMIN" ? (
          <DataTable data={allSales} columns={columns} />
        ) : (
          <DataTable data={farmerSales} columns={columns} />
        )}
      </div>
    </div>
  );
};

export default Coupons;
