import PageHeader from "@/components/backoffice/PageHeader";
import TableActions from "@/components/backoffice/TableActions";
import DataTable from "@/components/data-table-components/DataTable";
import React from "react";
import { columns } from "./columns";
import { getData } from "@/lib/getData";

const page = async () => {
  const farmers = await getData("users");
  return (
    <div className="mt-8">
      {/* Header */}
      <PageHeader
        heading="Farmers"
        linkTitle="Add Farmers"
        href="/dashboard/farmers/new"
      />

      <div className="py-8">
        <DataTable data={farmers} columns={columns} filterKeys={["name","email"]}/>
      </div>
    </div>
  );
};

export default page;
