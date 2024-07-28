import FormHeader from "@/components/backoffice/FormHeader";
import CategoryForm from "@/components/backoffice/form/CategoryForm";
import { getData } from "@/lib/getData";
import React, { Suspense } from "react";
import Loading from "@/app/api/loading"; // นำเข้า Loading component

// คอมโพเนนต์สำหรับดึงข้อมูลหมวดหมู่
const CategoryData = ({ id }) => {
  const category = getData(`/categories/${id}`);
  return <CategoryForm updateData={category} />;
};

export default function UpdateCategory({ params: { id } }) {
  return (
    <div>
      <FormHeader title="Update Category" />
      <Suspense fallback={<Loading />}>
        <CategoryData id={id} />
      </Suspense>
    </div>
  );
}