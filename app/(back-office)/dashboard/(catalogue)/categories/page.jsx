import PageHeader from "@/components/backoffice/PageHeader";
import DataTable from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import React from "react";
import { columns } from "./columns";

const page = async () => {
  const categories = await getData("categories");
  return (
    <div className="mt-8">
      {/* Header */}
      <PageHeader
        heading="Categories"
        linkTitle="Add Category"
        href="/dashboard/categories/new"
      />

      <div className="py-8">
        <DataTable data={categories} columns={columns} />
      </div>
    </div>
  );
};

export default page;
