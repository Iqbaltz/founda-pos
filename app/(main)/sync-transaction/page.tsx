import PageHeader from "@/components/layout/page-header";
import React, { Suspense } from "react";
import SyncTransactionList from "./sync-transaction-list";

type Props = {};

export default function SyncTransactionPage({}: Props) {
  return (
    <Suspense>
      <PageHeader title="Transaksi Pending" />
      <SyncTransactionList />
    </Suspense>
  );
}
