import PageHeader from "@/components/layout/page-header";
import { productService } from "@/src/service/product";
import React, { Suspense } from "react";
import CashierTransactionList from "./cashier-transaction-list.";

export default async function CashierTransactionPage() {
  const { getAllProductsServer } = productService;

  const products = await getAllProductsServer();

  return (
    <Suspense>
      <PageHeader title="Riwayat Transaksi Kasir" />
      <CashierTransactionList products={products} />
    </Suspense>
  );
}
