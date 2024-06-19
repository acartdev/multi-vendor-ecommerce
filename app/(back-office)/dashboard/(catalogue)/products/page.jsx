import PageHeader from "@/components/backoffice/PageHeader";
import DataTable from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import React from "react";
import { columns } from "./columns";

const page = async() => {
  const products = await getData("products")
  return (
    <div className="mt-8">
      {/* Header */}
      <PageHeader
        heading="Product"
        linkTitle="Add Products"
        href="/dashboard/products/new"
      />

      <div className="py-8">
        <DataTable data={products} columns={columns} />
      </div>
    </div>
  );
};

export default page;
