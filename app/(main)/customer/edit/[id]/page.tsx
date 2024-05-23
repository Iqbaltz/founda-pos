import PageHeader from "@/components/layout/page-header";
import React from "react";
import EditForm from "./components/edit-form";
import { customerService } from "@/src/service/customer";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditCustomerPage({ params }: Props) {
  const { getCustomerServer } = customerService;
  const customer = await getCustomerServer(Number(params.id));

  return (
    <div>
      <PageHeader title="Edit Customer" />
      <EditForm
        customerName={customer?.data?.name}
        customerAddress={customer?.data?.address}
        customerPhoneNumber={customer?.data?.phone_number}
      />
    </div>
  );
}
