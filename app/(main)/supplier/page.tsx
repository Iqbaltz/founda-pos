import React from "react";
import PageHeader from "@/components/layout/page-header";
import SupplierList from "./supplier-list";

export default async function ProductsPage() {
  return (
    <div>
      <PageHeader title="Kategori" />
      <SupplierList />
    </div>
  );
}
