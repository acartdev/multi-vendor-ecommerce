"use client"
import DataTable from "@/components/data-table-components/DataTable";
import React, { useState, useEffect } from "react";
import { columns } from "./columns";
import { getData } from "@/lib/getData";
import Heading from "@/components/backoffice/Heading";

const Customers = async () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData("customers");
        setCustomers(data);
      } catch (err) {
        setError("Failed to fetch customers.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mt-8">
      <Heading title="Customers" />
      <div className="py-8">
        <DataTable data={customers} columns={columns} filterKeys={["name", "email", "createdAt"]} />
      </div>
    </div>
  );
};

export default Customers;
