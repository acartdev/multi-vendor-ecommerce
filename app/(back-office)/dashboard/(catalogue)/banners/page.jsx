import PageHeader from "@/components/backoffice/PageHeader";
import DataTable from "@/components/data-table-components/DataTable";
import React from "react";
import { columns } from "./columns";
import { getData } from "@/lib/getData";

const page = async() => {
  const banners =await getData("banners")
  return (
    <div className="mt-8">
      {/* Header */}
      <PageHeader
        heading="Banners"
        linkTitle="Add Banners"
        href="/dashboard/banners/new"
      />
      <div className="py-8">
      <DataTable data={banners} columns={columns} />
      </div>
    </div>
  );
};

export default page;
