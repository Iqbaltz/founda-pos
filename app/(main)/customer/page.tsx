import React from "react";
import PageHeader from "@/components/layout/page-header";
import CustomerList from "./customer-list";

export default async function CustomersPage() {
  return (
    <div>
      <PageHeader title="Kategori" />
      <CustomerList />
    </div>
  );
}
