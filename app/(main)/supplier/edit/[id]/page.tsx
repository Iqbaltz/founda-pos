import PageHeader from "@/components/layout/page-header";
import React from "react";
import EditForm from "./components/edit-form";
import { supplierService } from "@/src/service/supplier";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditSupplierPage({ params }: Props) {
  const { getSupplierServer } = supplierService;
  const supplier = await getSupplierServer(Number(params.id));

  return (
    <div>
      <PageHeader title="Edit Supplier" />
      <EditForm
        supplierName={supplier?.data?.name}
        supplierAddress={supplier?.data?.address}
        supplierPhoneNumber={supplier?.data?.phone_number}
      />
    </div>
  );
}
