import React from "react";
import PageHeader from "@/components/layout/page-header";
import ProductList from "./product-list";

export default async function ProductsPage() {
  return (
    <div>
      <PageHeader title="Barang" />
      <ProductList />
    </div>
  );
}
