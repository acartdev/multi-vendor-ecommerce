import PageHeader from "@/components/backoffice/PageHeader";
import DataTable from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import React from "react";
import { columns } from "./columns";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  const id = session?.user?.id;
  const role = session?.user?.role;
  const allProducts = await getData("products");
  const farmerProducts = allProducts.filter((product) => product.userId === id);
  return (
    <div className="mt-8">
      {/* Header */}
      <PageHeader
        heading="Product"
        linkTitle="Add Products"
        href="/dashboard/products/new"
      />

      <div className="py-8">
        {role === "ADMIN" ? (
          <DataTable data={allProducts} columns={columns} />
        ) : (
          <DataTable data={farmerProducts} columns={columns}  filterKeys={["title","createdAt"]} />
        )}
      </div>
    </div>
  );
};

export default page;
