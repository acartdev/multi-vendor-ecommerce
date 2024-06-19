import PageHeader from "@/components/backoffice/PageHeader";
import DataTable from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import React from "react";
import { columns } from "./columns";

const page = async () => {
  const markets = await getData("markets");
  return (
    <div className="mt-8">
      {/* Header */}
      <PageHeader
        heading="Markets"
        linkTitle="Add Markets"
        href="/dashboard/markets/new"
      />

      <div className="py-8">
        <DataTable data={markets} columns={columns} />
      </div>
    </div>
  );
};

export default page;
