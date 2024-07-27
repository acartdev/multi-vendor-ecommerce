"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function StatusColumn({ row, accessorKey }) {
  const savedStatus = row.getValue(`${accessorKey}`);
  const userId = row.original.id;
  const [status, setStatus] = useState(savedStatus);
  const [loading, setLoading] = useState(false);

  async function handleChange(e) {
    const newStatus = e.target.value === "true"; // แปลงสตริงเป็นบูลีน
    setStatus(newStatus);
    const data = {
      status: newStatus,
      emailVerified: true,
    };

    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/farmers/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setLoading(false);
        toast.success(`Farmer Status Updated Successfully`);
      } else {
        setLoading(false);
        toast.error("Something Went wrong");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const selectBorderStyle = {
    borderColor: status ? "green" : "red",
  };

  return (
    <>
      {loading ? (
        <div className="loading loading-spinner"></div>
      ) : (
        <select
          id="status"
          className={`${
            savedStatus ? "select select-success" : "select select-error"
          }`}
          style={selectBorderStyle}
          value={status.toString()} // ตั้งค่า value ของ select element เป็นสถานะปัจจุบัน
          onChange={handleChange} // เรียก handleChange เมื่อมีการเปลี่ยนแปลงค่า select
        >
          <option value="true">APPROVED</option>
          <option value="false">PENDING</option>
        </select>
      )}
    </>
  );
}