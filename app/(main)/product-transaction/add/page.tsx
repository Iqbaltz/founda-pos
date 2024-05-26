import PageHeader from "@/components/layout/page-header";
import React from "react";
import AddForm from "./components/add-form";

type Props = {};

export default function AddProductTransactionPage({}: Props) {
  return (
    <div>
      <PageHeader title="Tambah barang Masuk" />
      <AddForm />
    </div>
  );
}
