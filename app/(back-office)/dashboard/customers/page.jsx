import DataTable from "@/components/data-table-components/DataTable";
import React from "react";
import { columns } from "./columns";
import { getData } from "@/lib/getData";
import Heading from "@/components/backoffice/Heading";

const Customers = async () => {
  const customers = await getData("customers");

  return (
    <div className="mt-8">
      <Heading title="Customers" />
      <div className="py-8">
        <DataTable data={customers} columns={columns} filterKeys={["name","email","createdAt"]} />
      </div>
    </div>
  );
};

export default Customers;
