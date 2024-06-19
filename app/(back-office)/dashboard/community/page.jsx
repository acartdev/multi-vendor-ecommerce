import PageHeader from "@/components/backoffice/PageHeader";
import DataTable from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import React from "react";
import { columns } from "./columns";

const page = async() => {
  const communities = await getData("trainings")
  return (
    <div className="mt-8">
      {/* Header */}
      <PageHeader
        heading="Community Training"
        linkTitle="Add Training"
        href="/dashboard/community/new"
      />

      <div className="py-8">
        <DataTable data={communities} columns={columns} />
      </div>
    </div>
  );
};

export default page;
