import PageHeader from "@/components/layout/page-header";
import React from "react";
import AddForm from "./components/add-form";

type Props = {};

export default function AddProductPage({}: Props) {
  return (
    <div>
      <PageHeader title="Tambah Barang" />
      <AddForm />
    </div>
  );
}
