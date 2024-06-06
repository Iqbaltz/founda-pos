import React, { Suspense } from "react";
import PageHeader from "@/components/layout/page-header";
import ProductTransactionList from "./product-transaction-list";

export default async function ProductsPage() {
  return (
    <Suspense>
      <PageHeader title="Transaksi Barang Masuk" />
      <ProductTransactionList />
    </Suspense>
  );
}
