import PageHeader from "@/components/backoffice/PageHeader";
import DataTable from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import React, { Suspense } from "react";
import { columns } from "./columns";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Loading from "@/app/api/loading"; // นำเข้า Loading component

// คอมโพเนนต์สำหรับดึงข้อมูลผลิตภัณฑ์
const ProductsData = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null; // หรือสามารถแสดงข้อความที่เหมาะสม
  }

  const id = session.user.id;
  const role = session.user.role;
  const allProducts = await getData("products");
  const farmerProducts = allProducts.filter((product) => product.userId === id);

  return { allProducts, farmerProducts, role };
};

const Page = () => {
  return (
    <div className="mt-8">
      {/* Header */}
      <PageHeader
        heading="Product"
        linkTitle="Add Products"
        href="/dashboard/products/new"
      />

      <div className="py-8">
        <Suspense fallback={<Loading />}>
          <ProductsDataComponent />
        </Suspense>
      </div>
    </div>
  );
};

// คอมโพเนนต์สำหรับแสดงข้อมูลผลิตภัณฑ์
const ProductsDataComponent = async () => {
  const { allProducts, farmerProducts, role } = await ProductsData();

  return (
    <>
      {role === "ADMIN" ? (
        <DataTable data={allProducts} columns={columns} />
      ) : (
        <DataTable data={farmerProducts} columns={columns} filterKeys={["title", "createdAt"]} />
      )}
    </>
  );
};

export default Page;