import PageHeader from "@/components/layout/page-header";
import React from "react";
import EditForm from "./components/edit-form";
import { paymentMethodService } from "@/src/service/payment-method";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditPaymentMethodPage({ params }: Props) {
  const { getPaymentMethodServer } = paymentMethodService;
  const paymentMethodName = await getPaymentMethodServer(Number(params.id));

  return (
    <div>
      <PageHeader title="Edit Metode Pembayaran" />
      <EditForm paymentMethodName={paymentMethodName?.name} />
    </div>
  );
}
