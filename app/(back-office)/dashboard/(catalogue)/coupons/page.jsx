import PageHeader from "@/components/backoffice/PageHeader";
import DataTable from "@/components/data-table-components/DataTable";
import React, { Suspense } from "react";
import { columns } from "./columns";
import { getData } from "@/lib/getData";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Loading from "@/app/api/loading"; // นำเข้า Loading component

// คอมโพเนนต์สำหรับดึงข้อมูลคูปอง
const CouponsData = async () => {
  const allCoupons = await getData("coupons");
  const session = await getServerSession(authOptions);

  if (!session) {
    return null; // หรือสามารถแสดงข้อความที่เหมาะสม
  }

  const id = session.user.id;
  const role = session.user.role;
  const farmerCoupons = allCoupons.filter((coupon) => coupon.vendorId === id);

  return { allCoupons, farmerCoupons, role };
};

const Coupons = () => {
  return (
    <div className="mt-8">
      {/* Header */}
      <PageHeader
        heading="Coupons"
        linkTitle="Add Coupons"
        href="/dashboard/coupons/new"
      />
      <div className="py-8">
        <Suspense fallback={<Loading />}>
          <CouponsDataComponent />
        </Suspense>
      </div>
    </div>
  );
};

// คอมโพเนนต์สำหรับแสดงข้อมูลคูปอง
const CouponsDataComponent = async () => {
  const { allCoupons, farmerCoupons, role } = await CouponsData();

  return (
    <>
      {role === "ADMIN" ? (
        <DataTable data={allCoupons} columns={columns} filterKeys={["title", "createdAt"]} />
      ) : (
        <DataTable data={farmerCoupons} columns={columns} filterKeys={["title", "couponCode", "expiryDate", "createdAt"]} />
      )}
    </>
  );
};

export default Coupons;