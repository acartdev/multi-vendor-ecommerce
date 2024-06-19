import PageHeader from "@/components/backoffice/PageHeader";
import TableActions from "@/components/backoffice/TableActions";
import React from "react";

const page = () => {
  return (
    <div className="mt-8">
      {/* Header */}
      <PageHeader
        heading="Staffs"
        linkTitle="Add Staff"
        href="/dashboard/staffs/new"
      />
      {/* Table Actions*/}
      {/* Export || Search || Bulk Delete*/}
      <TableActions/>
      <div className="py-8">
        <h2>Table</h2>
      </div>
    </div>
  );
};

export default page;
