import PageHeader from "@/components/backoffice/PageHeader";
import DataTable from "@/components/data-table-components/DataTable";
import React from "react";
import { columns } from "./columns";
import { getData } from "@/lib/getData";

const Coupons = async() => {
  const coupons =await getData("coupons");
  return (
    <div className="mt-8">
      {/* Header */}
      <PageHeader
        heading="Coupons"
        linkTitle="Add Coupons"
        href="/dashboard/coupons/new"
      />
      <div className="py-8">
        <DataTable data={coupons} columns={columns} />
      </div>
    </div>
  );
};

export default Coupons;
